import time

def timer(f):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = f(*args, **kwargs) 
        stop = time.time()
        print(f"Time took: {stop-start}")
        return result    
    return wrapper

# Using @ syntax eliminates unnecessary lines of code
@timer
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

result = primeFactors(2**20+1)
'''
These two methods are the same:

1.
    @timer
    primeFactors
2.
    primeFactors = timer(primeFactors)
'''
