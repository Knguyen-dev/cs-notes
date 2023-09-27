'''
- You can do this by manually extending the syspath works, but it's kind of bad

'''

import sys
sys.path.append("../new_module") 

from some_package.classes import User #type: ignore

myUser = User("John10")
print(myUser)