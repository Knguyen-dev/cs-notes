'''
- Since we've created a separate logger for employee.py, importing stuff from employee.py shouldn't cause any conflicts with the logs.

'''

import logging
import employee

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s:%(name)s:%(message)s")
file_handler = logging.FileHandler("app.log")


# This means that some log statements will be sent to the console
stream_handler = logging.StreamHandler()

# If you wanted to keep logger level at debug, but at the moment you 
# only want to log things that are errors or above
file_handler.setLevel(logging.ERROR)

'''
- stream_handler: Since logger is set on Debug, stream handler will output
    logs with debug and above, however Errors are the exception.

- file_handler: Logger will see that error logs are already handled by a file, so errors
    and above will be outputted to a file

'''
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
logger.addHandler(stream_handler)

def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y
    
def divide(x, y):
    try:
        result = x/y
    except ZeroDivisionError:
        # By doing logger.exception it gives us the trace back for the error
        logger.exception("Tried to divide by zero")
    else:
        return result
    
divide(5, 0)

