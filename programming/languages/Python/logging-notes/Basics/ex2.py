import logging


logging.basicConfig(filename="myLogs.Log", level=logging.INFO, format="%(levelname)s %(message)s", filemode="w")

class Employee:
    def __init__(self, first, last):
        self.first = first
        self.last = last

        # Instead of printing out that an employee was created, we log it 
        logging.info(f"Created Employee: {self.fullName} - {self.email}")

    @property
    def email(self):
        return f"{self.first}.{self.last}@gmail.com"
    
    @property
    def fullName(self):
        return f"{self.first} {self.last}"
    

e1 = Employee("James", "Dean")
e2 = Employee("Ryan", "Goto")
