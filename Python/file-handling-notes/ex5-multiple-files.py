'''
- Here's an example of working with multiple files. Here
    we're trying to copy the contents in 'test.txt' and make a 
    backup of them in a file called 'test_copy.text'. 

- Using context managers, it makes it easier for us handle the 
    file objects

'''


with open("test.txt", "r") as readFile:
    with open("test_copy.txt", "w") as writeFile:
        # For every line in the read file, write that same line to the write file
        for line in readFile:
            writeFile.write(line)