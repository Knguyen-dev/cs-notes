"""
URL configuration for my_first_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include


'''
1.  blog: When users navigate to 'blog/' route.
    It'll now use the urls set up in blog/urls.py to handle further routing in the blog app.
    NOTE: After 'blog' it cuts off and sends an empty string "" to blog/urls.py, so 
    a url pattern with "" will activate.


NOTE: "GET / HTTP/1.1" 404 telling you that in your most root route "http://127.0.0.1:8000/"
    doesn't have anything linked to it, which makes sense if you don't have a path with an
    empty string defined in your main project urls.py. To fix it just add a path for it.
'''
urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls'))
]
