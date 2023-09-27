
'''
5. Selecting certain objects from a database

- Old way of doing queries



# Create an sql statement where we select from User's table, and getting all records where 
# the username is 'Paul10' or 'Cathy'. The .in_() method is very helpful for this.
statement = select(User).where(User.username.in_(['Paul10', 'Cathy']))

# Execute that sql query statement we just set up; returns an iterable of scalars
result = session.scalars(statement)

for user in result:
    print(user)


- New way of querying shown below

'''

# If you use import a session from another file, all of the code is going to run, since you're importing something
# It's best to keep your session in one place like main.py
# from persisting import session

from models import User, Comment
from sqlalchemy import select
from main import session


# Querying for all objects from user table
users = session.query(User).all() 

for user in users:
    print(user)