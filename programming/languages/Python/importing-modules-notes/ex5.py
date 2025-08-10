'''
- Importing from modules that are nested inside other modules

- NOTE: Could also do 'from othermodule.submodule.quickMath import doMath', and this way you don't have to add the 'quickMath.' prefix when
    calling the function
'''
from othermodule.submodule import quickMath


print(quickMath.doMath())