import requests
import time
import os

'''
+ credits: https://www.youtube.com/watch?v=IEEhzQoKtQU

- Here's a program that will 'download' images 
from unsplash. Here's how it's done with no threading.
The images will be downloaded in order, which will take 
quite a bit of time. Well it may take like 30 seconds, but it 
can be done a lot quicker is what I mean.

NOTE: Tasks where we're downloading stuff and waiting for a response is 
    an IO bound task. This is perfect for threading because most of the time 
    we're waiting around and not doing much.

    - Now if we were processing these images such as resizing or editing them somehow, then that's more 
    of a cpu bound task that requires calculations, rather than downloading the image. So in that case 
    we'd use multiprocessing rather than threading.

'''


# Create 'images' folder if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Clear images folder before downloading new images; for testing 
for fileName in os.listdir('images'):
    filePath = os.path.join("images", fileName)
    try: 
        if os.path.isfile(filePath):
            os.unlink(filePath)
    except Exception as e:
        print(f"Error deleting {filePath}")



t1 = time.perf_counter()

img_urls = [
    'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759',
    'https://images.unsplash.com/photo-1532009324734-20a7a5813719',
    'https://images.unsplash.com/photo-1524429656589-6633a470097c',
    'https://images.unsplash.com/photo-1530224264768-7ff8c1789d79',
    'https://images.unsplash.com/photo-1564135624576-c5c88640f235',
    'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6',
    'https://images.unsplash.com/photo-1522364723953-452d3431c267',
    'https://images.unsplash.com/photo-1513938709626-033611b8cc03',
    'https://images.unsplash.com/photo-1507143550189-fed454f93097',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    'https://images.unsplash.com/photo-1504198453319-5ce911bafcde',
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99',
    'https://images.unsplash.com/photo-1516972810927-80185027ca84',
    'https://images.unsplash.com/photo-1550439062-609e1531270e',
    'https://images.unsplash.com/photo-1549692520-acc6669e2f0c'
]

for imageURL in img_urls:
    # Do GET request and get the binary data representing the image
    imageBytes = requests.get(imageURL).content

    # Parse url name and create a filename for the image
    imageName = f"{imageURL.split('/')[3]}.jpg"

    # Save image to 'images' folder
    with open(os.path.join("images", imageName), "wb") as f:
        # Write those bytes to the file (sends image information to file)
        f.write(imageBytes)
        print(f"{imageName} was 'downloaded'")

t2 = time.perf_counter()

print(f"Took {t2-t1} second(s) for images to be downloaded")