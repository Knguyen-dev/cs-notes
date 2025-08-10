'''
- Now downloading images is IO bound, but processing images isn't. Image processing is more cpu bound as 
    it involves transforming and manipulating data, or image data in this case. So it's perfect for multiprocessing

- Here's an example without multiprocessing, which will take quite a bit of time, about 20 seconds. So if we 
    use multiprocessing to use multiple cpu cores, which means we're distributing the work of 
    the processing of all of these images between the cores.

    - Images here are being processed sequentially.

'''
import time
import concurrent.futures
from PIL import Image, ImageFilter
import os
import shutil
def main():

    # If it already exists destroy it, then we can replace it with a brand new one
    if os.path.exists("processedImages"):
        shutil.rmtree('processedImages')
    os.mkdir("processedImages")

    start = time.perf_counter()

    # List of image names that should be defined in images folder, which is just a copy of the same one in 'Threading'
    imgNames = os.listdir('images')

    # Just setting an ew size for the images
    imgSize = (1200, 1200)

    # Get the images, edit them, and save them to a folder
    for imgName in imgNames:
        imgPath = os.path.join("images", imgName)
        # Get and edit images
        img = Image.open(imgPath)
        img = img.filter(ImageFilter.GaussianBlur(15))
        img.thumbnail(imgSize)

        img.save(f"processedImages/{imgName}")
        print(f"{imgName} was processed")



    end = time.perf_counter()

    print(f"It took {end-start} second(s)")

if __name__ == "__main__":
    main()