from django.urls import path
from . import views

'''
# How to make a route in django (blog app):
1. Create a view function in views.py which will be a function that runs 
    when user goes to a route on our site. So when the user's url
    for 'blog' is empty such as "blog/". The function binded to 
    that path will run. However, for path 'blog/about' another function
    will run, that's the idea.

2. Create a URL pattern that runs that view function. For example, 
    for the 'home()' function, it will render markup
    for the home page,  
3. Then we give it a name, which is used to identify it and use the name as an href for anchor tags. So
    when user clicks on that anchor, it'll change the url/route, 
    and so the associated view function will be triggered


# Pages
1. home: So for "blog/" page, run home() in views. Since it has no path
    this will be run when users are our blog app's 'root' path.
2. 



NOTE: for naming paths in views, do appName-functionName. This 
    avoids the problem of having a 'home' in the blog section and a 
    'home' in the social media or community section.
'''
urlpatterns = [
    path('', views.home, name="blog-home"),
    path('about/', views.about, name="blog-about")
]
