from sqlalchemy import create_engine, text


'''
# Creating a connection or new database right in the same directory as connect.py


echo: true; will print out sql statements
'''
engine = create_engine("sqlite:///sample.db", echo=True) 

# 'connection' object within this contex
with engine.connect() as connection:

    result = connection.execute(text("select 'Hello'"))
    # print(result.all())