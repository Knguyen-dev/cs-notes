'''
- Importing all files from a python folder. You add an '__init__.py' file inside the folder ('othermodule') to tell python that the 
    'directory' is a module or package. Go to the init file and define __all__ array.

- Then to use the functions from the respective files, you do someFileName.someFunctionName format
    
'''
from othermodule import *


print(alphabet.alphabet())
print(hello.helloWorld())