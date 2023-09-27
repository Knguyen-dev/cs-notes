
'''
5. Selecting certain objects from a database

Old way of doing queries

# Create an sql statement where we select from User's table, and getting all records where 
# the username is 'Paul10' or 'Cathy'. The .in_() method is very helpful for this.
statement = select(User).where(User.username.in_(['Paul10', 'Cathy']))

# Execute that sql query statement we just set up; returns an iterable of scalars
result = session.scalars(statement)

for user in result:
    print(user)

'''
from sqlalchemy.orm import sessionmaker
from connect import engine
from models import User, Comment
from sqlalchemy import select

Session = sessionmaker(bind=engine)
session = Session()


