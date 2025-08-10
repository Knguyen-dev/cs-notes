'''
To solve this issue use 
the wraps decorator from functools

'''
from functools import wraps



def do_nothing(f):
    @wraps(f) # apply wraps decorator so that f doesn't lose name or docstring
    
    # Then operate decorator like normal
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