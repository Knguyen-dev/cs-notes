import time

# Timer function that takes a function and adds timer functionality to it
def timer(f):
    # Put arguments to cover all bases in case f takes parameters
    def wrapper(*args, **kwargs):
        # Time how long it took and print it
        start = time.time()

        # Evaluate function and return result like normal
        result = f(*args, **kwargs) 

        stop = time.time()
        print(f"Time took: {stop-start}")
        return result    
    # Return modified function
    return wrapper

# Returns all prime factors of n
def primeFactors(n):
    start = time.time()
    factors = []
    divisor = 2
    while n > 1:
        while n % divisor == 0:
            factors.append(divisor)
            n //= divisor
        divisor += 1
    stop = time.time()
    return factors

# Pass function in to be decorated, outputting a new function with timer functionailty
timedFactor = timer(primeFactors)
result = timedFactor(2**20+1)

