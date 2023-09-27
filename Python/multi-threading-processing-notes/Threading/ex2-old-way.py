'''
- Here's another way of threading. We basically
    manage our threads in a loop.

'''
import threading
import time

start = time.perf_counter()

def do_something(seconds):
    time.sleep(seconds)
    print(F"Done sleeping for {seconds} second(s)")

# List of threads we can access later
threads = []

# Create and start threads
for _ in range(10):
    t = threading.Thread(target=do_something, args=[1.5])
    t.start()
    threads.append(t)

# Force main thread to wait until all other threads are done executing before continuing
for thread in threads:
    thread.join()

elapsed = time.perf_counter() - start
print(f"Main thread/program took: {elapsed} second(s)")