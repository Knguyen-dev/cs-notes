'''
- Here's us using os.path.join to do something useful
'''

import os

# Gather directory and pathing info for the file
currentDir = os.getcwd()
subDir = "subdir"
fileName = "myFile.txt"

# Construct file path
filePath = os.path.join(currentDir, subDir, fileName)

# Open file corresponding to that path and get the contents
with open(filePath) as file:
    fileContents = file.read()
    print(fileContents)