'''
9. Deleting objects with sqlalchemy



'''

from main import session 
from models import User, Comment

# Get the comment you want to delete
someComment = session.query(Comment).filter_by(id=1).first()
session.delete(someComment)
session.commit()