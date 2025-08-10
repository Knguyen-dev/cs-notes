'''
Here's a class decorator where 
we add additional methods to the class.

- A use case of this could be when you
want to add common functions to your 
classes. 
'''

def add_methods(myClass):
    def someMethod(self):
        print("Hi class")

    myClass.someMethod = someMethod
    return myClass

@add_methods
class MyClass:
    def __init__(self, x):
        self.x = x

# Create an instance of the modified class
obj = MyClass(5)
obj.someMethod()