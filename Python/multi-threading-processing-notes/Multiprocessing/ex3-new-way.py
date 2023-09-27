'''



f1 = executor.submit(do_something, 1): Create and start process, or (future object)

- concurrent.futures.as_completed(results): Returns an iterator of 
    our processes, and goes through them as they're completed

# Iterate through processes and print them as they're completed
for f in concurrent.futures.as_completed(results):
    print(f.result())
    
- executor.map(callbackfunction, list): Creates and starts a process each element in the list with the 
    task being the callback function. In the end this returns a generator, where you
    can retrieve the results of those processes as they're being processed

- .join()?: Apparently if we use the context manager with the concurrent.futures module, whichever you use, processes or threads,
    if it's in the context manager, the main program will wait for them to finish before moving on, which is good.

NOTE: You may notice that the since such as as_completed, executor.map, and submit are 
    also available when doing threading.
'''
import concurrent.futures
import time


def do_something(seconds):
    time.sleep(seconds)
    return f"Done sleeping for {seconds} second(s)"

def main():
    start = time.perf_counter()
    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        seconds = [5,4,3,2,1]
        
        # Create processes for all elements in seconds and with task do_something
        results = executor.map(do_something, seconds) 

        
        # Iterate over iterator of return values from those 
        '''
        NOTE: If your function is going to raise exceptions, exceptions will be 
        detected when we try to retrieve the value from the process. So have your 
        error handling here.
        '''
        for result in results:
            print(result)

if __name__ == "__main__":
    main()