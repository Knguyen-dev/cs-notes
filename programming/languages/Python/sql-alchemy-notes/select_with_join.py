'''


7. Selecting from multiple tables simultaneously

    - Selecting from the Comment's table. So we're getting Comment objects, but we do .join() to relate it 
        with the user table. We can do this since they're related, we made them related 

    - Join: Selects another table that we are looking at or targeting. So
        whatever table Comment.user attribute is, we target it.
        We are goign to look at the "User" table when querying for comments 
        as well as looking at comment table
'''

from main import session
from models import User, Comment
from sqlalchemy import select


# Create sql statement 
statement = select(Comment).join(Comment.user).where(
    User.username == "John10"
).where(
    Comment.text == "Nice Video!"
)

# result; since we know it's going to be only one comment
# we can easily just use one() method so we are returned one object than the iterable
result = session.scalars(statement).one()

# Print the comment we want 
print(result) 