
from .blog.models import Post
'''
+ Here's how we can query data:

from blog.models import Post
from django.contrib.auth.models import User

+ Ex.1: Intro to querying 

# Get all items from a table, in an iterable
myUsers = User.objects.all() 

# Get the first object from table
x = User.objects.first()

# Filtering our query: Accepting only users with specific username, only get the first result
myUser = User.objects.filter(username="CoreyMS").first()

# Accessing the properties of a user
myUser.id or myUser.pk; accessing the primary key

# Searching for a user
myUser = User.objects.get(id=1)

# Create a post and set it's author to a user
post_1 = Post(title="Blog 1", content="First post content", author=myUser)

# Save that post to the database
post_1.save()

# NOTE: A lot of the times you'll get iterables 
    from your queries, such as Querysets. This is why
    a lot of the time you'll need to do .first() so that querying
    only returns a singular object.

+ Ex. 2: More practice creating a Post and saving it to the database 

# Query for the user
user = User.objects.filter(username="knguyen44").first()

# Create post and link it to said user; you can use this id method to do it
post_2 = Post(title="Blog 2", content="Content 2", author_id=user.id)

# Commit and save post to the database so that it will be tracked
post_2.save()

+ Ex. 3: Getting all posts linked to a user. Two methods:
    1. Fetch user, query on Posts, filtering based on username.

    2. Use .modelname_set, so myUser.post_set.all() will
        display all posts associated with myUser. 
    3. myUser.post_set.create(title="My Post Title", content="Good Post Content") will link that 
        post to the user and add it to the database, without needing to do save().

'''