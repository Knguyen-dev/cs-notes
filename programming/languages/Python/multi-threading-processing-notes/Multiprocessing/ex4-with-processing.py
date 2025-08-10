'''
NOTE: Sometimes you won't know whether your 
task is more IO bound or cpu bound, but concurrent.futures
makes it easy to test it out as you'll just need to switch 

'ProcessPoolExecutor' to 'ThreadPoolExecutor', or vice versa. Like even in this 
example, even though we're demonstrating multiprocessing, i think using 'ThreadPoolExecutor' and doing 
multithreading seems to have faster times. Here we're doing a lot of reading/writing to disk, meaning
we're reading data from storage (disk or ssd) and writing/saving data to storage
'''


import time
import concurrent.futures
from PIL import Image, ImageFilter
import os
import shutil

def processImg(imgName):
    imgSize = (1200, 1200)
    imgPath = os.path.join("images", imgName)
    img = Image.open(imgPath)
    img = img.filter(ImageFilter.GaussianBlur(15))
    img.thumbnail(imgSize)
    img.save(f"processedImages/{imgName}")
    print(f"{imgName} was processed")



def main():

    # If it already exists destroy it, then we can replace it with a brand new one
    if os.path.exists("processedImages"):
        shutil.rmtree('processedImages')
    os.mkdir("processedImages")

    # Start timer
    start = time.perf_counter()

    # List of image names that should be defined in images folder, which is just a copy of the same one in 'Threading'
    imgNames = os.listdir('images')

    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        # Create and start processes for all of the images; literally map function
        executor.map(processImg, imgNames)

    end = time.perf_counter()
    print(f"It took {end-start} second(s)")

if __name__ == "__main__":
    main()