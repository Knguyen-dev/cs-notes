from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


'''
+ Models: Here we create different classes that represent different tables and column fields in 
    our database. Each field determines the column that's going to store said data, the default
    html widget to use when rendering a form field, and the minimal validation requirements 
    and rules for that form.
    
+ Fields:
1. CharField(max_length): Used for storing small to large strings. Argument is optional, and
    it'll render out an <input type="text" ...> (TextInput).
2. TextField(): A large text field for storing larger text data. Renders out a textarea tag. 
    NOTE: It seems you can specify a max_length, but it'll only be enforced at the form level, which means you'll be able 
    to bypass it if working at the model or database level. 
3. DateTimeField(auto_now=False): Field for representing the date and time. 

    - auto_now: if true, then the value will update everytime the object is saved or updated to the database. This is 
        good for a 'last_updated' variable.
    - auto_now_add: If true, it sets the field's value to the current date and time when object 
        was created, so this is good for a 'created_at' variable. Again it records the time only when
        you saved it to the database, however this is immutable.

    - default: Pass in a default value
    - author: Imported django user class

4. models.ForeignKey(table, on_delete): Allows us to create a relationship between objects.
    We track the key of an item from another database to keep track of objects. With the Django ORM,
    it handles the relationship behind the scenes and stores the actual item object it refers to. Then 
    in the database, it just creates an integer field that can store the foriegn key associated with that item.

NOTE: User model is special as django as it's already been created so we don't have to make one 
    from scratch. Though, we're still able to inherit from it and customize it a little bit.
'''

class Post(models.Model):
    '''
    + Represents a blog post
    1. title: Title of the post
    2. content: Text content of the post
    3. date_posted: Represents date it was posted. We use timezone.now because it takes into the consideration of the timezone settings
        that we set for our project. We pass in the function itself, which will work for recording the current time a post was saved into 
        the database.
    4. author: The User has a 1 to many relationship with Post, as 1 user can have many posts linked to them. However, a post can only be linked to one user.
        Create the relationship by tracking the corresponding user of that Post with a foreign key that links User from "User" table. So 'on delete' of 
        that user, all posts related to that user are deleted as well.


    '''
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)