#include <stdio.h>
#include <fcntl.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <assert.h>
#include <errno.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <liburing.h>

#define QD  2
#define BS (16 * 1024)

static int infd, outfd;

/**
 * 
 */
struct io_data {
    int read;
    off_t first_offset, offset;
    size_t first_len;
    struct iovec iov;
};

static int get_file_size(int fd, off_t *size) {
    struct stat st;

    if (fstat(fd, &st) < 0 )
        return -1;
    if(S_ISREG(st.st_mode)) {
        *size = st.st_size;
        return 0;
    } else if (S_ISBLK(st.st_mode)) {
        unsigned long long bytes;

        if (ioctl(fd, BLKGETSIZE64, &bytes) != 0)
            return -1;

        *size = bytes;
        return 0;
    }
    return -1;
}

/**
 * Initialize io_uring ring buffers
 * @param entries Queue depth
 * @param ring Pointer to io_uring struct allocated in the caller that the kernel will populate.
 * @return 0 on success, otherwise non-zero failure.
 */
static int setup_context(unsigned entries, struct io_uring *ring) {
    int ret;
    ret = io_uring_queue_init(entries, ring, 0);
    if( ret < 0) {
        fprintf(stderr, "queue_init: %s\n", strerror(-ret));
        return -1;
    }
    return 0;
}

/**
 * Helper that attempts to submit a request (read or write) to io_uring.
 * @param ring Pointer to io_uring ring buffers.
 * @param data Pointer to struct that contains our application-level io request.
 */
static void queue_prepped(struct io_uring *ring, struct io_data *data) {

  // Attempt to obtain an SQE
  struct io_uring_sqe *sqe;
  sqe = io_uring_get_sqe(ring);
  assert(sqe);

  // Depending on whether we'ere reading or writing
  // submit the corresponding operation to IO_uring.
  if (data->read)
    io_uring_prep_readv(sqe, infd, &data->iov, 1, data->offset);
  else
    io_uring_prep_writev(sqe, outfd, &data->iov, 1, data->offset);

  // Ensure submitted SQE has application-level data
  io_uring_sqe_set_data(sqe, data);
}

/**
 * Submit a write request SQE to io_uring.
 * @param ring The io_uring ring buffers
 * @param data Struct containing the io operation we want to perform.
 */
static void queue_write(struct io_uring *ring, struct io_data *data) {
    data->read = 0;
    data->offset = data->first_offset;
    data->iov.iov_base = data + 1;
    data->iov.iov_len = data->first_len;
    queue_prepped(ring, data);

    // Notify kernel
    io_uring_submit(ring);
}

/**
 * Attempt to submit a read request SQE to io_uring.
 * @param ring io_uring ring buffers
 * @note Notice that this only does the SQE submission. The claler function
 * handles the notification. The idea is that the caller will call this 
 * queue_read() multiple times to batch I/O read requests with io_uring.
 */
static int queue_read(struct io_uring *ring, off_t size, off_t offset) {
   
  // Allocates memory for a user data
  // NOTE 'data' needs to be allocated on heap as 
  // we'll be passing a pointer to it to the kernel, and 
  // accessing the struct later when we get the CQE. If we 
  // allocated on stack, it'd become a dangling pointer when the 
  // function returns.
  struct io_uring_sqe *sqe;
  struct io_data *data;
  data = malloc(size + sizeof(*data));
  if (!data)
    return 1;

  // Attempt to get an SQE position/entry
  sqe = io_uring_get_sqe(ring);
  if (!sqe) {
    free(data);
    return 1;
  }

  // Populate our portion of the SQE for the read request.
  data->read = 1;
  data->offset = data->first_offset = offset;
  data->iov.iov_base = data + 1;
  data->iov.iov_len = size;
  data->first_len = size;
  io_uring_prep_readv(sqe, infd, &data->iov, 1, offset);
  io_uring_sqe_set_data(sqe, data);
  return 0;
}


/**
 * 
 * @param insize The number of requests I think.
 */
int copy_file(struct io_uring *ring, off_t insize) {


  unsigned long reads, writes;
  struct io_uring_cqe *cqe;
  off_t write_left, offset;
  int ret;


  write_left = insize;
  writes = reads = offset = 0;

  // This outer loop ensures all bytes from the source file 
  // are copied.
  while (insize || write_left) {
    int had_reads, got_comp;

    // While loop 1: Create as many readv requests as possible.
    // It tries to enqueue as many as queue depth will allow.
    had_reads = reads;
    while (insize) {
      off_t this_size = insize;
      if (reads + writes >= QD) break;
      if (this_size > BS) this_size = BS;
      else if (!this_size) break;
      if (queue_read(ring, this_size, offset)) break;
      insize -= this_size;
      offset += this_size;
      reads++;
    }

    // At this point, we submitted as many SQEs as possible.
    // Then we'll attempt to notify the kernel that these 
    // read requests exist.
    if (had_reads != reads) {
      ret = io_uring_submit(ring);
      if (ret < 0) {
        fprintf(stderr, "io_uring_submit: %s\n", strerror(-ret));
        break;
      }
    }

    // While Loop 2: Read as many CQEs as possible. In particular 
    // we're trying to find at least one.
    got_comp = 0;
    while (write_left) {
      struct io_data *data;
      if (!got_comp) {
        ret = io_uring_wait_cqe(ring, &cqe);
        got_comp = 1;
      } else {
        ret = io_uring_peek_cqe(ring, &cqe);
        if (ret == -EAGAIN) {
          cqe = NULL;
          ret = 0;
        }
      }
      if (ret < 0) {
        fprintf(stderr, "io_uring_peek_cqe: %s\n",
                strerror(-ret));
        return 1;
      }
      if (!cqe) break;

      data = io_uring_cqe_get_data(cqe);
      if (cqe->res < 0) {
        if (cqe->res == -EAGAIN) {
            queue_prepped(ring, data);
            io_uring_cqe_seen(ring, cqe);
            continue;
        }
        fprintf(stderr, "cqe failed: %s\n",
                strerror(-cqe->res));
        return 1;
    } else if (cqe->res != data->iov.iov_len) {
      /* short read/write; adjust and requeue */
      data->iov.iov_base += cqe->res;
      data->iov.iov_len -= cqe->res;
      queue_prepped(ring, data);
      io_uring_cqe_seen(ring, cqe);
      continue;
      }

      /*
        * All done. If write, nothing else to do. If read,
        * queue up corresponding write.
        * */

      if (data->read) {
        queue_write(ring, data);
        write_left -= data->first_len;
        reads--;
        writes++;
      } else {
        free(data);
        writes--;
      }
      io_uring_cqe_seen(ring, cqe);
    }
  }
  
  return 0;
}

int main(int argc, char *argv[]) {
    struct io_uring ring;
    off_t insize;
    int ret;

    if (argc < 3) {
        printf("Usage: %s <infile> <outfile>\n", argv[0]);
        return 1;
    }

    infd = open(argv[1], O_RDONLY);
    if (infd < 0) {
        perror("open infile");
        return 1;
    }

    outfd = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (outfd < 0) {
        perror("open outfile");
        return 1;
    }

    if (setup_context(QD, &ring))
        return 1;

    if (get_file_size(infd, &insize))
        return 1;

    ret = copy_file(&ring, insize);

    close(infd);
    close(outfd);
    io_uring_queue_exit(&ring);
    return ret;
}