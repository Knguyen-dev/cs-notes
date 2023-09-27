'''
- os.walk(): Traverses down a directory tree, and returns stuff in a tuple of 3 each time. Good 
    if you forgot where you left something, or some other 
    use case when you'd need this


'''
import os
currentDir = os.getcwd()


for dirpath, dirnames, filenames in os.walk(currentDir):
    print("CurrentPath: ", dirpath)
    print("Directories: ", dirnames)
    print("Files: ", filenames)
    print()