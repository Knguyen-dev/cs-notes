'''
8. Updating and modifying objects with sqlalchemy




'''


from main import session
from models import User, Comment

# Queries for a command with primary key of 1. 
# Of course it's unique, but we use first() to only get the 
# Comment object and not an iterable
someComment = session.query(Comment).filter_by(id=1).first()

# Modify the object like normal python
someComment.text = "This is an updated comment"

# Save the changes that were made
session.commit()