# Null Object Pattern
Imagine a website where you can login a user, or you can continue as a guest. If the user continued as a 
guest, we'll loggedInUser = null, or something like that. Now when doing operations such as displaying 
the greeting with something like loggedInUser.displayGreeting(), you'd need to check that the logged in user 
isn't null. This is to prevent us from getting an error due to accessing a property on a null. This 
can lead to annoying conditionals 

## Solution:
Instead of having the loggedInUser = null, how about make it equal to a custom class called
NullUser. This class would just represent the 'nulled' version of the User object. It would have 
the same methods as the User class, so if you used this instead of null, you won't have to worry
about doing null conditional checks. As well as this, you can leave some default data there. For example, 
if for some reason for logged in users the greeting is 'Hello <username>', you can assign the 
username to 'Guest' to have it as 'Hello Guest'. It's all in one place so if you want to change 
it later, you can