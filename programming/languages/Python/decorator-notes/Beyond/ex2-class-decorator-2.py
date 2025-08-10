'''
- Sometimes you can see people using classes as decorators. This is also an option that can happen, and sometimes they can have 
extra functionality and can b ehelpful
'''

class decorator_class(object):
    def __init__(self, func):
        self.func = func
    
    def __call__(self, *args, **kwargs):
        print(f"Call method executed before {self.func.__name__}")
        return self.func(*args, **kwargs)

@decorator_class
def printWorld():
    print("Hello world was printed")


printWorld()