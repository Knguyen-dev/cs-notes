'''

6. Filtering and select specific stuff


    - Here we're looking at the difference between
        selecting many and selecting only one record
'''

from main import session
from models import User

# Cannot print 'results' on its own, it's an iterable so even if your query did get stuff, you'd need to loop over it
# results = session.query(User).filter_by(username = "John10")
# for user in results:
#     print(user)


# Right way to get one object, here we'll get john object; we are able to print 'user' here because we did a method 'first'
# which guarantees one record
user = session.query(User).filter_by(username="John10").first()
print(user)
