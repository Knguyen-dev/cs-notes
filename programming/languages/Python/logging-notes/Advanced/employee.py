'''
- A good idea is to create separate loggers for separate things. This is so that I can customize the logging for the employee class, AND when 
    I import the employee class with its code, we don't mess up any loggers in other classes


'''


import logging


# Create and configure an exclusive logger for the Employee class, give it a name, so when you run employee.py, it'll be 'main', but 
# if you import the employee file, the logs for it will show 'employee'
logger = logging.getLogger(__name__)

# Set the level of the logger
logger.setLevel(logging.INFO)

# Create the format you want log messages to be in
formatter = logging.Formatter("%(levelname)s:%(name)s:%(message)s")

# Set the log file where all output goes into
file_handler = logging.FileHandler("employee.log")

# Set the formatter
file_handler.setFormatter(formatter)

# Finish adding the file handler to the logger  
logger.addHandler(file_handler)


class Employee:
    def __init__(self, first, last):
        self.first = first
        self.last = last

        logger.info(f"Created Employee: {self.fullName} - {self.email}")

    @property
    def email(self):
        return f"{self.first}.{self.last}@gmail.com"
    
    @property
    def fullName(self):
        return f"{self.first} {self.last}"
    

e1 = Employee("James", "Dean")
e2 = Employee("Ryan", "Goto")
