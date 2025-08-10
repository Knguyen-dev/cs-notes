'''
3. 
    - Import our base class and then the models
    - Typically we define a metadata object to use with an engine and create a database. However, sqlalchemy's base class 
        does this for us, which is a lot simpler

    - Now we just have to run this file to create the tables
    

'''

from models import Base, User, Comment
from connect import engine

# Creates the tables
Base.metadata.create_all(bind=engine)