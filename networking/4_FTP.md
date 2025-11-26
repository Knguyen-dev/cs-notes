
# FTP and SFTP
Network protocols used for transferring files between a client and server. Using this, you can download, upload, and manage files on a remote system. 

FTP is insecure, it transmits data in plain-text. Instead always opt to use **SFTP (Secure File Transfer Protocol)**. This does the same thing, but is backed by SSH, allowing for traffic to be fully encrypted. This encrypts both the commands you're running and the data that's being transmitted, protecting against eavesdropping and MITM.

## Available Commands
```bash
# Connect to the remote server using SFTP
sftp username@remote-host

# List files on the remote system
ls

# List files on your local machine
lls

# Change directory on remote system
cd /remote/path

# Change directory on local machine
lcd /local/path

# Download a file from the server to your local machine
get remote_file.txt

# Upload a file from your local machine to the server
put local_file.txt

# Upload an entire directory (recursive)
put -r my_folder/

# Download an entire directory (recursive)
get -r logs/

# Quit the SFTP session
bye
```