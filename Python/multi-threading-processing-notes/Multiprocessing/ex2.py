'''
- credits: https://www.youtube.com/watch?v=fKl2JW_qrso

- NOTE: Remember here we use processes to deal with CPU bound tasks, 
    and the multiprocessing library splits these tasks across different CPUs.
'''

import time
import multiprocessing 


def do_something():
    time.sleep(1)
    print("Done sleeping for one second")

def main():
    start = time.perf_counter()

    # Create a process that deals with a task and start it
    a = multiprocessing.Process(target=do_something)
    a.start()

    b = multiprocessing.Process(target=do_something)
    b.start()

    # Force main process to wait for the other processes until moving forward
    a.join()
    b.join()

    end = time.perf_counter()
    print(f"Took {end-start} second(s)")

if __name__ == "__main__":
    main()