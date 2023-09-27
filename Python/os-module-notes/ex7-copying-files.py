import shutil
import os

# Define source and destination paths
sourceFilePath = os.path.join(os.getcwd(), "subdir", "myFile.txt")
destinationPath = "betterDir"

# Copy to destination. Move is done with shutil.move(source, destination) as well 
shutil.copy(sourceFilePath, destinationPath)