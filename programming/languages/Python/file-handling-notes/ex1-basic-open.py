'''
- Basic method for opening files. Then specify
    whether you're reading, writing, etc.

open(some_file_path)
'''

# Open file for reading
file = open("text.txt", "r")

fileName = file.name
fileMode = file.mode

# Then we must close the file to prevent any memory leaks
file.close()