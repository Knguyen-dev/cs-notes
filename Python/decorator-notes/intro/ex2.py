'''
- Normally we'd be able to access the 
docstring and name of the function, but once 
we added a decorator, the docstring got erased and 
the function named as changed to 'inner'. This is bad, but 
a solution exists.
'''

def do_nothing(f):
    def inner(*args, **kwargs):
        return f(*args, **kwargs)
    return inner

@do_nothing
def alpha(*args, **kwargs):
    '''A function for viewing arguments'''
    print(f"args: ({args})")
    print(f"kwargs: {kwargs}")


print(alpha.__name__)
print(alpha.__doc__)