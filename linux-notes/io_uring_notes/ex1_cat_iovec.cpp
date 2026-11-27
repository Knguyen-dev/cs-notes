#include <stdio.h>
#include <sys/uio.h>
#include <sys/stat.h>
#include <linux/fs.h>
#include <sys/ioctl.h>
#include <fcntl.h>
#include <stdlib.h>

#define BLOCK_SZ    4096

/**
 * Returns the size of the file whose fd is passed in. Handles regular files and block devices.
 */
off_t get_file_size(int fd) {
  struct stat st;
  if (fstat(fd, &st) < 0) {
    perror("fstat");
    return -1;
  }
  if (S_ISBLK(st.st_mode)) {
    unsigned long long bytes;
    if (ioctl(fd, BLKGETSIZE64, &bytes) != 0) {
      perror("ioctl");
      return -1;
    }
    return bytes;
  } else if (S_ISREG(st.st_mode)) {
    return st.st_size;
  }
  return -1;
}

/**
 * Output a string of characters of len length to stout. 
 * We use buffered output to be efficient since we need to output character by character.
 */
void output_to_console(char* buf, int len) {
  while (len--) {
    fputc(*buf++, stdout);
  }
}

int read_and_print_file(char *filename) {
  struct iovec* iovecs;
  int fd = open(filename, O_RDONLY);
  if (fd < 0) {
    perror("open");
    return -1;
  }

  // Get the file size and calculate the number of blocks in the file.
  off_t file_sz = get_file_size(fd);
  off_t bytes_remaining = file_sz;
  int blocks = (int) file_sz / BLOCK_SZ;
  if (file_sz % BLOCK_SZ) blocks++;
  iovecs = malloc(sizeof(struct iovec) * blocks);
  int current_block = 0;

  // For the file, allocate enough blocks to hold its data
  // Each block is described in a iovec structure.
  while (bytes_remaining) {
    off_t bytes_to_read = bytes_remaining;
    if (bytes_to_read > BLOCK_SZ)
      bytes_to_read = BLOCK_SZ;
    void *buf;
    if( posix_memalign(&buf, BLOCK_SZ, BLOCK_SZ)) {
      perror("posix_memalign");
      return 1;
    }
    iovecs[current_block].iov_base = buf;
    iovecs[current_block].iov_len = bytes_to_read;
    current_block++;
    bytes_remaining -= bytes_to_read;
  }

  // The readv() call will block until all iovec buffers are filled 
  // NOTE: This performs the actual vectorized reads.
  int ret = readv(fd, iovecs, blocks);
  if (ret < 0) {
    perror("readv");
    return 1;
  }

  for (int i = 0; i < blocks; i++) {
    output_to_console(iovecs[i].iov_base, iovecs[i].iov_len);
  }
  return 0;
}

int main(int argc, char *argv[]) {
  if (argc < 2) {
    fprintf(stderr, "Usage: %s <filename1> [<filename2> ...]\n", argv[0]);
    return 1;
  }

  /*
  * For each file that is passed in as the argument, call the
  * read_and_print_file() function.
  * */
  for (int i = 1; i < argc; i++) {
    if(read_and_print_file(argv[i])) {
      fprintf(stderr, "Error reading file\n");
      return 1;
    }
  }
  return 0;
}