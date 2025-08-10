'''
- os.stat(path): Returns statistics for a file or folder

- Good way if you want to filter and differentiate files

1. st_mode: The file's mode (permissions) as an integer.
2. st_ino: The file's inode number (on some systems).
3. st_dev: The device on which the file resides.
4. st_nlink: The number of hard links to the file.
5. st_uid: The user ID of the file's owner.
6. st_gid: The group ID of the file's owner.
7. st_size: The size of the file in bytes.
8. st_atime: The time of the last access (in seconds since the epoch).
9. st_mtime: The time of the last modification (in seconds since the epoch).
10. st_ctime: The time of the last change (in seconds since the epoch).
'''

import os
from datetime import datetime

mod_time = os.stat("demo.txt").st_mtime
print(datetime.fromtimestamp(mod_time))