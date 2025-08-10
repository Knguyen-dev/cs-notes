'''


- os.getcwd(): Gets current directory
- os.chdir(path): Changes current directory to path 
- os.listdir(): Lists all files and folders on current directory
- os.mkdir(dirName): Makes a directory
- os.makedirs(path): Makes a directory and allows us to make multiple and nest

- os.rmdir(dirName): Deletes one directory, not any intermediates
- os.removedirs(path): Removes directories in path

- os.path.join(path1, path2): Joins two paths together, allowing us to combine two paths without worrying about slashes and creating paths
- os.path.exists(path): Checks if a path exists
- os.path.isdir(dir): Checks if path is a directory
- os.path.isfile(filePath): Checks if path is a file
'''

import os

# Makes one; can't use to make multiple like second example
os.mkdir("os-demo-1")

# Makes the nested directories like so
os.makedirs("some-demo-1/second-demo")