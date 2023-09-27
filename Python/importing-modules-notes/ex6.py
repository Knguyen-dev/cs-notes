'''
- Importing 'as' can make it so you can use a different name for the module, turning 'hello' to 'sup'. It can sometimes help 
    when a module name is too long for your liking. 

- Remember you can import anything that's public, so any public first class citizen like a function, class, variable, etc.
'''
from othermodule import hello as sup
from othermodule.hello import isWin

print(sup.helloWorld())
print(isWin)