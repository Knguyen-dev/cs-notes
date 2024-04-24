# Singleton Pattern
The idea that multiple of your objects contain or reference a single 'master' or important object that has resources
or is needed for some functionality. This master object, or singleton, is only created once in your application, and when it's being 
shared by these other objects, we're sharing the reference rather than making a new copy. The end result is multiple objects referencing this
single object (singleton) for information. For example, take a look at this [Python Tkinter Shopping App](https://github.com/Knguyen-dev/SDEV_220_Final_Project_TeamBlue_Nguyen). This is 
a single as the app instance is only created once, and referenced and passed to many other objects (page classes). 

We use the stored state, such as the loggedInUser, shopping cart, etc. in our page classes. The properties and states within this
app (aka 'master' or singleton), are just global variables essentially because you can use and access this data anywhere.
This is one of the reasons that make the singleton design pattern controversial is because this is difficult to test
since it requires you to create a singleton. As well as this, it may lead to tightly coupled code, as your other classes, may heavily rely on the singleton. 
It can get hard to refactor or change the singleton since so many other things rely on it being a certain way.
As well as this we could cause a race condition, where multiple places are accessing or updating your data, which 
can lead to inaccurate reads and data being overwritten weirdly. For example a bank account of zero balance
operations to add $50 or take away $30, and they're executed at the same time. Depending on which operation
happens first, things can be different. Is it add 50, then subtract 30 to get a total balance of 20 dollars. Or is it 
subtract 30 first, and get an error, then after we add $50.

So yeah, some even say that we should never use singleton pattern in our applications ever. However within this tutorial
we will show that sometimes a singleton could be a good or even the perfect solution to a problem.