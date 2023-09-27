import requests

class Employee:
    '''Simple class representing an employee'''
    raise_amt = 1.05

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    @property
    def email(self):
        return f"{self.first}.{self.last}@gmail.com"
    
    @property
    def fullName(self):
        return f"{self.first} {self.last}"
    
    @fullName.setter
    def fullName(self, newFullName):
        self.first, self.last = newFullName.split(" ")
    
    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amt)

    # Mock method where we simulate doing a GET request for getting an employee's schedule 
    '''
    NOTE: Mocking often used in scenarios like these where we're doing a network request, we don't want to 
    fail the test because something on the server side was failing. We want to make sure our tests have no outside dependencies, and
    if anything goes wrong, it's due to our code.
    '''
    def monthly_schedule(self, month):
        response = requests.get(f"http://company.com/{self.last}/{month}")
        if response.ok:
            return response.text
        else:
            return "Bad Response!"