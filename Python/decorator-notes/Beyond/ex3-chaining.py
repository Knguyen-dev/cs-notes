'''

- Let's chain our decorators.
- NOTE: Using wraps so that our functions keep their original names rather than just staying as 'wrapper', which would be confusing and 
    causes problems a lot of the time.
'''

from functools import wraps


def displayArgs(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Args = ({args}) and kwargs = ({kwargs})")
        return func(*args, **kwargs)
    return wrapper

# Decorator that times a function's execution
def timer(func):
    import time

    @wraps(func)
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = func(*args, **kwargs)
        t2 = time.time()

        print(f"Took {t2-t1} second(s)")
        return result
    return wrapper

'''
1. printInfo is first wrapped by timer. 
2. Then the resulting function is wrapped by the displayArgs decorator

'''

@displayArgs
@timer
def printInfo(name, age):
    print(f"Hi {name} who is {age} years old")

printInfo("John", 23)