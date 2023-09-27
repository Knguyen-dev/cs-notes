import time
import multiprocessing 


'''
Note here we're using more processes than we have cores. 
Of course that's not ideal, but the computer does have 
ways to switch off cores and maintain a somewhat even distribution 
of work between the processes.

'''


def do_something(seconds):
    time.sleep(seconds)
    print(f"Done sleeping for {seconds} second(s)")

def main():
    start = time.perf_counter()
    
    # Create list of processes
    processes = []

    # Create and start processes
    for _ in range(10):
        p = multiprocessing.Process(target=do_something, args=[3])
        p.start()
        processes.append(p)

    # Force main process to wait for all other processes
    for process in processes:
        process.join()


    end = time.perf_counter()
    print(f"Took {end-start} second(s)")

if __name__ == "__main__":
    main()