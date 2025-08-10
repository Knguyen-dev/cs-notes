'''
- Loggers will only print out messages that are greater than or equal to the set level. Basically if a message has a lower 
    level then the logger, then it's implying "that message wasn't important enough so we won't log it".

- Basic configure sets the level of the root logger to 30 ("warning") by default. By setting level to DEBUG, the lowest one,
    we ensure that we'll be seeing all log messages

filemode = "w": would overwrite old log messages with new ones, everytime the python
    file is executed
    
myLogger.level: prints the current level, which will be a numerical value, that the logger 
'''

import logging
import math

# Create a format to how your log messages should show up
LOG_FORMAT = "%(levelname)s %(asctime)s - %(message)s"

# Configure a logger to the file that it's going to send the logs to. If not exists, then it creates one
logging.basicConfig(
    filename="myLogs.Log", 
    level=logging.DEBUG,
    filemode = "w"
    )

# Create a logger
logger = logging.getLogger()

# logger.debug("Just a debug message")
# logger.info("Info message just gives you some info")
# logger.warning("Warning message that warns you")
# logger.error("Error message that will say something went wrong")
# logger.critical("Critical message that says something crazy")

def quadraticFormula(a, b, c):
    '''
    Return the solutions to the quadratic equation. With logging file 
    we'll see the first two debug messages and not the third one. So we know something's 
    wrong with computing the square root.
    '''

    logger.debug("# Computing discriminant")
    disc = b**2 - 4*a*c

    logger.debug("# Compute the two roots")
    root1 = (-b - math.sqrt(disc)) / (2*a)
    root2 = (-b + math.sqrt(disc)) / (2*a)

    logger.debug("# Return the roots")
    return (root1, root2)    

quadraticFormula(1, 0, 4)