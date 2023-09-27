'''
1. Go to 'Run and Debug' on the vscode tab and create a launch.json file

2. Choose 'module' and type in the module name of the current python file you want the imports in

3. Add this into your launch.json: 

# This means from the file or directory, you want to go up one directory and look into new_module
"env": {
    "PYTHONPATH": "${workspaceFolder}/../new_module"
}

5. Create a 'settings.json' and add this:

# the extra path should match
{
    "python.analysis.extraPaths": [
        "${workspaceFolder}/../new_module"
    ]
}

'''

from some_package.classes import User

myUser = User("SomeGuy15")

print(myUser)
