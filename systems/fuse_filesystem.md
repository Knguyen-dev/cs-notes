# Explaining FUSE 
FUSE (Filesystem in userspace) is a software interface that allows non-privileged users (userspace programs) to create their own filesystems. Traditionally, filesystems (e.g., ext4 or NTFS) are implemented within the operating system kernel. It’s fast and powerful, but there are some drawbacks:
- It’s extremely complex to develop and debug (a mistake can crash the entire OS)
- It requires root/administrator privileges to install or modify.
- The language (usually C) and environment are restrictive.

FUSE changes this by acting as a "bridge". It provides a minimal kernel module that handles the low-level communication with the OS’s Virtual File System (VFS) layer. Then the actual logic (what happens when a file is opened, read, or written) is redirected from the kernel into a userspace program (written in any language like Python, Go, or C++). Here are the key components:
- **FUSE Kernel Module:** The tiny part of the kernel that intercepts filesystem requests like open, read, stat, etc. 
- **Userspace FUSE Library (libfuse):** The library that the userspace program links against. It translates raw kernel messages into simple function calls. For example, when you open a special file, this library calls the `open_file()` function that you implement in your userspace program.
- **Userspace Program (The Filesystem):** This is the application you write. It contains the logic for how files and directories are managed, and it receives function calls from the library.

## What's The Motivation Again?
FUSE lets us treat the standard file/folder interface as a convenient way to interact with any kind of underlying data or service. We can mount our custom program as a file/folder because to the OS, our program is the filesystem. When the user does file operations on our mount, the OS notifies our userspace program to handle it instead. If the user reads a file, our program fetches the data from wherever it wants.

But why do we need FUSE for this? The primary motivation behind FUSE is to simplify filesystem development and expand the definition of a filesystem. Using FUSE to create a filesystem is safer than modifying code in your operating system, which risks crashing the entire OS. If your custom FUSE filesystem crashes or has a bug, only your userspace program dies.

## Bridging Remote or Non-standard Storage
This is the most common and practical application of FUSE. FUSE allows you to treat non-traditional storage locations as if they were local folders:
- **Cloud Storage:** Projects like `s3fs` or `google-drive-ocamlfuse` mount cloud buckets (like Amazon S3 or Google Drive) directly as local directories on your machine. As a result, you can now treat these storage locations as if they were local folders on your filesystem. Of course, behind the hood, when you `cd` into a folder or do `ls`, the userspace program for those services has to handle querying the cloud API to get the results that you see.
- **Network Protocols:** Mounting the filesystem on a remote server as a local folder using SSHFS (SSH Filesystem). When you open a file, SSHFS uses its secure connection to fetch the contents.

### Example 1: Conceptual
Let’s say our FUSE filesystem is mounted at `/mnt/virtualfs` and the user runs: `echo "hello" > /mnt/virtualfs/message.txt`. Here's the flow:
- User writes to a file in our mount
- Linux sees the path belongs to a FUSE mount
- Linux sends a message to our program, "Hey a file called `message.txt` is being created in your mount. Please handle it.".
- Our program now has the freedom to decide what to do next:
  - Save file contents to a database.
  - Encrypt the file contents.
  - Do an HTTP request and return the bytes of that HTTP request to the user.
  - Save the file contents to cloud storage.
  - Save the file contents to disk using a syscall.
  - Do multiple of the above!
  - Or do something else. You can even ignore the request. Do whatever you want.
- When the user later reads the file, the kernel asks our program, "User wants to read `message.txt`, give me the bytes.". THen our program gives the bytes, and the kernel returns them to the user.

This is how `s3fs`, `sshfs`, and `gcsfuse` work. They're all programs that implement a filesystem callback. Note, I also use the word mount a lot. A mount is how you attach any filesystem (real or virtual) to a directory. So when we "mount" something, we’re just attaching a filesystem to a local directory so that we can treat this filesystem as a local directory on our system.

**Note:** When you write a file inside a FUSE mount, you are not writing to disk unless the FUSE userspace program decides to. The mount point is just a doorway; whatever happens behind the door depends on the filesystem implementation (the userspace program). 

### Example 2: sshfs
The sshfs program allows us to mount the filesystem of a remote server we can ssh into, allowing us to treat that remote filesystem as if it were a local folder on our system.
```bash
sshs user@server:/home/data /mnt/data
```
Suddenly, `/mnt/data` looks like a local folder, but there isn't a real folder called `/mnt/data`. When we open a file in `/mnt/data`, `sshfs` will intercept the read request and fetch the file contents over SSH. Essentially, this is a filesystem that was created by a regular program, not the kernel.

### Example 3: s3fs
The `s3fs` program allows us to mount an Amazon S3 bucket to our local filesystem. Here’s the workflow to run an S3FS mount command:
- **Mounting:** The S3FS program is mounted to a local directory e.g., `/mnt/mys3bucket`
- **Interaction:** A user runs a command affecting the mount point e.g. `ls /mnt/mys3bucket`
- **Interception:** The kernel sees the request is for the FUSE mount and passes it to the S3FS userspace program. 
- **Action:** The S3FS program doesn't disk, but instead makes a request to the Amazon S3 API to list the objects in our cloud bucket.
- **Result:** S3FS formats the results received from the cloud and passes them back through FUSE to the kernel, which then displays them to the user.

As a result, we can treat a cloud storage bucket as if it were a local folder on our system. That's what S3FS is!