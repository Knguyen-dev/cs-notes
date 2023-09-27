import time
import concurrent.futures


start = time.perf_counter()

def do_something(seconds):
    time.sleep(seconds)
    return f"Done sleeping for {seconds} second(s)"

# List of threads we can access later
with concurrent.futures.ThreadPoolExecutor() as executor:

    # Schedules function to be executed, passes in 1 as argument
    # Basically creates a future object, which is kind of like a thread
    results = []

    # Create future objects or threads iteratively
    for _ in range(10):
        f = executor.submit(do_something, _)
        results.append(f)

    # Make it so threads print out their results when they're completed
    for f in concurrent.futures.as_completed(results):
        print(f.result())


