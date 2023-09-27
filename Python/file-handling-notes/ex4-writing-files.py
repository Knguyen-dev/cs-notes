'''
- To write to a file set mode to 'w' for writing. If file
    doesn't exist then it creates one, else if the file already 
    exists it will OVERWRITE the contents of that file

NOTE: If you don't want to overwrite use lowercase 'a' for 
    appending content to a text file.

'''


with open("test2.txt", "w") as file:

    file.write("Hi this is a writing file")
    file.write(". This is going to be directly after it!")

