'''
4. Creating and persisting (storing) objects/data-structures/classes in the database

    - Import our classes/models that are represented in the database
    - Now let's create dummy data or objects to put in our database
'''

from models import User, Comment
from main import session
user1 = User(
    username = "John10",
    email_address="Jonathan@gmail.com",
    comments = [
        Comment(text="Nice Video!"),
        Comment(text="Sure I'll subscribe"),
    ]
)

user2 = User(
    username = "Paul10",
    email_address="Paulie@gmail.com",
    comments = [
        Comment(text="Cool Video!"),
        Comment(text="Whatever I'll subscribe"),
    ]
)

user3 = User(
    username = "Cathy",
    email_address="Cathy10@gmail.com",
)

session.add_all([user1, user2, user3])
session.commit()
 
print("Ran file to add stuff")
