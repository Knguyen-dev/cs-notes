'''
- Using a context manager, we don't have to 
    manually close the file as we only have 
    access in context manager

.read(): Gets all contents of file
.readlines(): Gets a list of all lines in the file, so 
    each element is the content and then a newline character at the end
.readline(): Gets the next line in the file
- .seek(index): Starts at some position in the file


- Iterative approach: Good for reading large files as we print each line

'''


with open("test.txt", "r") as file:  
    for line in file:
        print(line)

