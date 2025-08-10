'''

- Limits how many characters we want to read at a time. When
    you reach the end of the file, it doesn't print anything.

- You can think of "file" as an iterator

- Typical iterative approach for reading a large file:
for line in file:
    print(line)


- Below is a good and simple technique for reading a file until it's done, bit
    it's more controlled in this case. We pass in end="" to print stateent so that it doesn't print any newlines. 

'''

with open("test.txt", "r") as file:
    # Reads first 100 characters
    # content = file.read(100)

    # # Reads next 100 characters
    # content = file.read(100)

    charLimit = 25
    fileContents = file.read(charLimit)

    # While there are still characters in the file, keep iterating
    while len(fileContents) > 0:
        print(fileContents, end="")

        # Update file contents, if they reached the end of the file, an empty string will be returned to fileContents
        fileContents = file.read(charLimit)


