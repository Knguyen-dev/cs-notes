'''
- How about we create a decorator that accepts arguments, not only just accepting a function. Let's say we wanted to customize the 
    execution message that's added by the decorator.

1. If you want your decorator to accept arguments, you nest it again. Usually a decorator has 'decorator' and then the 'wrapper', but now 
    it should have one more outside function. Here we made that 


'''


def prefix_decorator(prefix):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"{prefix} Executed before {func.__name__}")
            result = func(*args, **kwargs)
            print(f"{prefix} Executed after {func.__name__}")
            return result
        return wrapper
    return decorator

@prefix_decorator("Log: ")
def displayInfo(name, age):
    print(f"Hi {name} who is {age} years old")

print(displayInfo("John", 25))