with open("test2.txt", "a") as file:

    extraContent = "\nHere's some extra content at the end of the file!"
    file.write(extraContent)