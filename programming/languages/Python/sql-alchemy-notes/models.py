'''
Declarative Base: All of our models or classes will inherit from it and make orm work.

1. We need to map our attributes onto our class. Our map class will help us define the types for each of our columns.
    Things such as primary or foreign key columns, columns for attributes such as username, email, etc.

2. We need to create relationships between models. So that we can access users associated with comments and vice versa.
    For User and Comment, that's a one to many relationship as 1 user can create as many comments as possible. 

    - back_populates: Creates a reverse relationship and synchronizes the two classes in the relationship.

3. Now let's start writing these models to a database. Continuing to "create_tables.py"

'''
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, Text
from typing import List

# Creates our Base class that we need
class Base(DeclarativeBase):
    pass




class User(Base):
    
    # Define the name of our table
    __tablename__ = "users"

    # 'id' is a column, integer type, and it's going to be our primary key
    id:Mapped[int] = mapped_column(primary_key=True)

    # useranme and email_address are strings and they can't be null
    username:Mapped[str] = mapped_column(nullable=False)
    email_address:Mapped[str] = mapped_column(nullable=False)

    # Define a comments attribute so that we can access the comments created by a certain User. 
    # We want this to be a list of comment objects. Now we can say comment.user to get the user that created a certain comment
    # Basically allows for the 'user' attribute to work on Comment class. 
    comments:Mapped[List["Comment"]] = relationship(back_populates="user") 


    def __repr__(self) -> str:
        return f"<User username={self.username}>"


class Comment(Base):
    __tablename__ = "comments"

    # 'id' is a column, integer type, and it's going to be our primary key
    id:Mapped[int] = mapped_column(primary_key=True)

    # user_id is a foreign key, we make it refer to the 'id' column of the 'users' table 
    # we also put nullable, so that there has to user_id associated with a comment
    user_id:Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)

    # 'text' column is the text of a comment, "Text" means it is variably long amount of text
    text:Mapped[str] = mapped_column(Text, nullable=False)

    # Define a single user object that the comment is linked to the comment
    # back_populates: Creates a reverse relationship, which means from Users we can say user.comments to get the comments written by a user. It 
    # basically allows for the 'comments' attribute to work. 
    user:Mapped["User"] = relationship(back_populates="comments")


    def __repr__(self):
        return f"<Comment text{self.text} by {self.user.username}"
