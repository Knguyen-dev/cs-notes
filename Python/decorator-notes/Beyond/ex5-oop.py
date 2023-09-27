'''
Property decorators let python mimic getter, setters that's seen in other languages. Where 
    we can define a method and access it like an attribute. 


- In this example we dfeine methods that return the email and fullname of the employee. We do this over having an email or fullname attribute because 
    we want it to change dynamically when the employee changes their name.

    someEmployee.email() to get the email, we can use someEmployee.email like it's some attribute. By doing this 
    in python, we 


'''


class Employee:

    def __init__(self, first, last):
        self.first = first
        self.last = last

    # Now email can be accessed like an attribute; this is by default a 'getter'
    @property
    def email(self):
        return f"{self.first}.{self.last}@email.com"
    
    @property
    def fullname(self):
        return f"{self.first} {self.last}"
    

    '''
    - Here we're creating a setter to set the full name, this will affect the first and last name attributes
    
    - Purpose: 
        1. For simple attributes such as 'self.first' and 'self.last' you don't have to do this as you can 
        change them easily like 'self.first = 'some new value' etc. However for more complex situations like this, where 
        you're trying to return values that aren't defined in the class, you'd normally do getFullName and setFullName.
        Now developers will have to call those two different functions.

        2. Here you'd literally have to do someEmployee.fullname to activate the getter and then someEmployee.fullname = "some value" to 
        activate the getter. It's a little thing, but it may help sometimes
    '''
    @fullname.setter
    def fullname(self, newFullName):
        self.first, self.last = newFullName.split(" ")

someEmployee = Employee("John", "Mikans")
someEmployee.fullname = "James Runio"
