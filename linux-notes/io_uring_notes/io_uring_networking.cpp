#include "networking.hpp"

#include <cstdlib> // std::exit
#include <cstring> // memset
#include <unistd.h> // close
#include <sys/types.h>
#include <errno.h>   // for EAGAIN or similar
#include <netdb.h>   // addrinfo, freeaddrinfo, gai_strerror, getadd...
#include <sys/socket.h> // for accept, bind, listen, setsockopt, sockaddr_s...
#include <spdlog/spdlog.h> // for spdlog::error, spdlog::info
#include <liburing.h> // for io_uring




/**
 * Class that handles the network layer of the kv-store server.
 * 
 * @note This class isn't thread safe. It's intended to be used in a single-threaded context,
 * where a network thread is responsible for handling all the network I/O operations.
 * This particular implementation uses io_uring to handle asynchronous IO operations, but 
 * in general I intend to expose a generic interface that can be implemented with other 
 * mechanisms (e.g., epoll, select, etc.).
 */
class NetworkLayer {
public:
  NetworkLayer() { 
    // Initialize io_uring instance
    int ret = io_uring_queue_init(m_QUEUE_DEPTH, &m_ring, 0);
    if (ret < 0) {
      spdlog::error("Failed to initialize io_uring: {}", strerror(-ret));
      std::exit(EXIT_FAILURE);
    }

    // Allocate a region of memory that we'll partition to create
    // fixed-size provided buffers.
    m_buffer_storage = (std::uint8_t *)malloc(m_BUFFER_SIZE * m_BUFFER_COUNT);
    if (!m_buffer_storage) {
      spdlog::error("Failed to malloc m_buffer_storage: {}", strerror(-errno));
      std::exit(EXIT_FAILURE);
    }

    // Setup 
    int err;
    m_buffer_ring = io_uring_setup_buf_ring(
      &m_ring, m_BUFFER_COUNT, m_BUFFER_GROUP_ID, 0, &err
    );
    if (!m_buff_ring) {
      spdlog::error("Failed to do io_uring_setup_buf_ring: {}", strerror(-err));
      std::exit(EXIT_FAILURE);
    }
  }

  ~NetworkLayer() {
    for (auto& [fd, conn]: conn_table) {
      close(fd);
      delete conn;
    }
    io_uring_queue_exit(&m_ring);
  }

  /**
   * Enqueues a single accept() operation on the listening socket
   * @param listenfd The file descriptor of the listening socket.
   * @returns 0 on success, -1 on failure.
   * @note This function won't block. It simply schedules that the kernel 
   * should accept a new connection on the listening socket. The actual
   * accept() operation is performed async by the kernel, and the result 
   * will be available in the CQ. Note that this can be optimized further
   * by batching multiple accept() operations in a single submission to the kernel,
   * having the kernel poll, or multishot accept().
   */
  int queue_accept(int listenfd) {
    // 1. Attempt to get SQE for accept() from io_uring 
    // NOTE: Can fail if SQE is full.
    struct io_uring_sqe *sqe = io_uring_get_sqe(&m_ring);
    if (!sqe) {
      spdlog::error("Failed to get SQE for accept operation: {}", strerror(errno));
      return -1;
    }

    // 2. Prepare the accept() operation and 
    // attach user data to the SQE so that we can identify the 
    // corresponding CQE when it completes.
    io_uring_prep_accept(sqe, listenfd, nullptr, nullptr, 0);
    IOOperation *data = new IOOperation{IOOperationType::ACCEPT, -1};
    if (!data) {
      spdlog::error("Failed to allocate memory for IOOperation data");
      return -1;
    }
    io_uring_sqe_set_data(sqe, data);

    // 3. Submit the operation to the kernel
    int ret = io_uring_submit(&m_ring);
    if (ret < 0) {
      spdlog::error("Failed to submit accept operation to io_uring: {}", strerror(-ret));
      delete data;
      return -1;
    }
    return 0;
  }
  
  /**
   * Enqueues a read operation on a TCP connection socket.
   * @param connfd Fd of the TCP connection associated with the client we're reading from.
   * @return 0 on success, otherwise -1.
   */
  int queue_read(int connfd) {
    struct io_uring_sqe *sqe = io_uring_get_sqe(&m_ring);
    if (!sqe) {
      spdlog::error("Failed to get SQE for read operation: {}", strerror(errno));
      return -1;
    }

    std::vector<std::byte>* rx_buffer = &conn_table[connfd]->rx_buffer;

    // TODO:
    // Passing a vector to the syscall is somewhat unsafe as a reallocation could
    // happen during the read. Use fixed-size buffer preallocation please



    // a. Offset: What if rx_buffer[size] is not indexable (i.e., out of range)?
    // b. Also what if there aren't m_MAX_BYTES_READ within the socket?
    //    Won't io_uring_prep_read just block on that?
    // It's probably correct to pass in a dynamically allocated buffer, 
    // but essentially we'd rather want the ability to read until we blocked. Right now 
    // we're reading an arbitrarily large number of bytes.
    io_uring_prep_read(sqe, connfd, rx_buffer, m_MAX_BYTES_READ, 0);
    IOOperation *data = new IOOperation{IOOperationType::READ, connfd};
    if (!data) {
      spdlog::error("Failed to allocate memory for IOOperation data");
      return -1;
    }
    io_uring_sqe_set_data(sqe, data);
  }

  /**
   * Enqueues a write operation on a TCP connection socket.
   * @param connfd Fd of the TCP connection associated with the client we're writing to.
   * @return 0 on success, otherwise -1.
   */
  int queue_write(int connfd) {


  }

  /**
   * The main event loop tick for the network thread.
   * @param listenfd Fd for the server listening socket.
   */
  void poll_events(int listenfd) {
    // NOTE: Non-blocking call; you could also batch operations
    struct io_uring_cqe *cqe;
    int ret = io_uring_peek_cqe(&m_ring, &cqe);
    if (ret < 0) {
      if (ret == -EAGAIN) {
        return
      }
      spdlog::error("io_uring_peek_cqe failed: {}", strerror(-ret));
      return;
    }

    IOOperation* data = static_cast<IOOperation*>(io_uring_cqe_get_data(cqe));
    switch (data->type) {
      case IOOperation::ACCEPT {
        if (cqe->res < 0) {
          spdlog::error("Accept failed: {}", strerror(-res));
          return;
        }

        // a. Allocate new connection object
        // b. Submit read operation so that we read from this newly accepted client.
        // c. Add another connection request.
        int connfd = cqe->res; 
        conn_table[connfd] = new Connection{connfd};
        queue_read(connfd);
        queue_accept(listenfd);
        break;
      }
      case IOOperation::READ {

        // If read() failed, or peer closed their end.
        // Otherwise, reading on socket succeeded, check if socket has one full message
        if (cqe->res <= 0) {
          close_connection(data->client_fd);
          return;
        }


        // TODO:
        // Do we have a full message's worth of data?
        // If not we probably want to keep reading
        std::vector<std::byte>& rx_buffer = conn_table[connfd]->rx_buffer;
        if (rx_buffer.size() < HEADER_SIZE) {

          return;
        }

        break;
      }
      case IOOperation::WRITE {
        spdlog::INFO("TODO: IOOperation::WRITE incomplete");
        break;  
      }
      default:
        spdlog::WARNING("Unknown IOOPeration: {}", data->type);  
    }
  }



private:
  int m_QUEUE_DEPTH{256};
  struct io_uring m_ring;

  struct io_uring_buf_ring *m_buffer_ring;
  int m_BUFFER_SIZE{4096};
  int m_BUFFER_COUNT{64};
  int m_BUFFER_GROUP_ID{1};
  std::uint8_t *m_buffer_storage;






  /**
   * The type of IO operation being done at the network layer.
   */
  enum class IOOperationType : std::uint8_t {
    ACCEPT,
    READ,
    WRITE
  };

  /**
   * Models an IO operation being submitted into io_uring. 
   * This is used as user_data to allow us to figure out 
   * what type of IO operation that the kernel attempted 
   * and potentially who was involved.
   */
  struct IOOperation {
    IOOperationType type;
    int client_fd;
  };

  
  /**
   * Size of a message header (in bytes).
   * @note If a given connection has at least 20 bytes 
   * then we guarantee that it has a full message.
   */
  const int HEADER_SIZE{20};
  
  // Maximum bytes we'll read within a single shot
  int m_MAX_BYTES_READ{4 * 1024};


  // TODO: Consider replacing this with an array
  // where arr[i] is the connection for fd i
  std::unordered_map<int, Connection*> m_conn_table;

  void close_connection(int connfd) {
    spdlog::info("Closing connfd: {}", connfd);
    close(connfd);
    delete conn_table[connfd];
    conn_table.erase(connfd);
  }

  void buffer_append(std::vector<std::byte>& buffer, const std::byte *data, size_t len) {
    buf.insert(buf.end(), data, data + len);
  }

  void buffer_consume(std::vector<std::byte> &buffer, size_t n) {
    buf.erase(buf.begin(), buf.begin() + n);
  }
};


int open_listening_socket(char* port) {
  struct addrinfo hints, *listp, *p;
  int listenfd, return_code, optval = 1;

  // Look for TCP-based, IPv4 or IPv6, server addresses we can listen on.
  memset(&hints, 0, sizeof(struct addrinfo));
  hints.ai_socktype = SOCK_STREAM;
  hints.ai_flags = AI_PASSIVE | AI_ADDRCONFIG | AI_NUMERICSERV;
  return_code = getaddrinfo(NULL, port, &hints, &listp);
  if (return_code != 0) {
    spdlog::error("getaddrinfo() failed: '{}'", gai_strerror(return_code));
    std::exit(EXIT_FAILURE);
  }

  // Iterate through all adresses and find the first good one 
  for (p = listp; p; p = p->ai_next) {
    listenfd = socket(p->ai_family, p->ai_socktype, p->ai_protocol);
    if (listenfd < 0) {
      continue;
    }

    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, (const void *)&optval, sizeof(int));
    if (bind(listenfd, p->ai_addr, p->ai_addrlen) == 0) {
      break;
    }
    if (close(listenfd) < 0) {
      spdlog::error("Failed to cleanup unused listenfd={}", listenfd);
      std::exit(EXIT_FAILURE);
    }
  }

  // Clean up the linked list 
  if (!p) {
    freeaddrinfo(listp);
    spdlog::error("Failed to find any suitable server IP:port!");
    std::exit(EXIT_FAILURE);
  }

  // Attempt to open the TCP socket for listening
  int LISTENQ = 1024;
  if (listen(listenfd, LISTENQ) < 0) {
    freeaddrinfo(listp);
    close(listenfd);
    spdlog::error("Failed to listen on fd={}!", listenfd);
  }

  // Get the raw IP and port number as a string
  char host[1025];
  char service[32];
  int s = getnameinfo(p->ai_addr, p->ai_addrlen, host, sizeof(host), service,
                      sizeof(service), NI_NUMERICHOST | NI_NUMERICSERV);
  
  if (s == 0) {
    spdlog::info("Server running on {}:{}", host, service);
  } else {
    spdlog::info("Couldn't get server IP:port, but server should be running!");
  }

  freeaddrinfo(listp);
  return listenfd;
}

