'''
- Here's how we can work with file images. Essentially
    we're reading and writing bytes. In this case 
    we're making a copy of the original image to act as a backup

    
- 'rb' and 'wb' mean read and write bytes
'''

with open("gamer.jpg", "rb") as readFile:
    with open("gamer_copy.jpg", "wb") as writeFile:
        imgBytes = readFile.read()
        writeFile.write(imgBytes)