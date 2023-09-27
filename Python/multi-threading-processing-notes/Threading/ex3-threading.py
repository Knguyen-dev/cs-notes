'''
- Now let's improve this with threading. So
we should just 

'''
import concurrent.futures
import requests
import threading
import time
import os

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
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    'https://images.unsplash.com/photo-1504198453319-5ce911bafcde',
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99',
    'https://images.unsplash.com/photo-1516972810927-80185027ca84',
    'https://images.unsplash.com/photo-1550439062-609e1531270e',
    'https://images.unsplash.com/photo-1549692520-acc6669e2f0c'
]

def downloadImg(imgURL):
    imgBytes = requests.get(imgURL).content
    imgName = f"{imgURL.split('/')[3]}.jpg"
    with open (os.path.join('images', imgName), "wb") as f:
        f.write(imgBytes)
        print(f"{imgName} was 'downloaded'")

with concurrent.futures.ThreadPoolExecutor() as executor:
    # Create and execute threads for downloading the respective images
    executor.map(downloadImg, img_urls)


t2 = time.perf_counter()
print(f"Took {t2-t1} second(s) for images to be downloaded")