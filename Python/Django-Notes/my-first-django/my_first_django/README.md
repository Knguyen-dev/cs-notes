-   Credits:
    1. Corey Schafer (old): https://www.youtube.com/watch?v=UmljXZIypDc&list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p
    2. Mdn (new django): https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/skeleton_website

# Setting up

1. python -m venv myvenv
2. create requirements.txt and put django version
3. pip install -r requirements.txt
4. django-admin startproject my_first_django
5. Manually select the python interpreter (python.exe) in your virtual environment to fix path errors
6. python manage.py runserver; Runs django app, like liveserver

# Migrations:

-   Database migrations commands allow us to commits or changes to the database our project is using.
    On running our first migration command, the Django app will create a database for us
    1. python manage.py makemigrations; detect changes to database models and creates .py files
       that have code to apply those changes you made to them to the actual database.
    2. python manage.py migrate; Applies changes to the database, so reads those migration.py files and runs them.

# Databases:

-   Django has its own ORM. So we can interact with the database using object oriented programming, and
    to do this, we represent the objects in our tables as classes or 'models'. Besides this django allows us to use
    different databases without changing our code, so you could have an sqlite database for testing, and a postgres
    database for production, and the code to query both of those could be the same.

1.  Define your models in blog/models.py.
2.  After making changes to your models. Do 'python manage.py makemigrations' to create the files that can change your database
    accordingly. Then do 'python manage.py migrate' to run those files and apply those changes to your database.

# Admin Page:

-   Place where you can keep track and manage data on your site. It allows us to do a lot of backend work
    very easily.
-   Create an admin user so you can login:
    1. python manage.py createsuperuser (remember you need to have a database or run 'python manage.py migrate' which makes one)
    2. You'll be prompted an email and password, so here I put "knguyen44", "knguyensky@gmail.com", and "password".
       Go to admin route on your site, and you'll be able to login now.

# Project Structure

1. manage.py: Allows us to run console commands
2. settings.py: Where we change different settings and configurations of the site.
3. urls.py: Sets up mapping of certain urls for our user
4. wsgi.py: How our py web app and server communication.
5. asgi.py: For asynchronous web apps and servers to communicate with each toher.

# Apps:

-   Functionality in django projects are separated into apps/components. An app for blogging which deals with all of the blogging functionality/logic of the application for example.

1. python manage.py startapp blog; creates a secondary 'blog' app to your 'main' django app
2. In blog/view.py: Create functions that will render what user sees on screen.
3. In blog/urls.py: Create this file so that you can map url routes to the view functions, so that you can control what the app outputs when user goes to certain routes.
4. Add blog's urls in our main project's routes, so that users can navigate to the blog app.
   Now the views and url pathing we set up should work for 'blog'

# Templates

-   Use templates to return and render html files and markup for our routes. Django by default
    looks for 'templates' directories in all apps, so we have to nest it. Then create our
    html files for the pages you want to have

1. Create a templates directory for 'blog' app: Do blog -> templates -> blog -> somePage.html
2. Add 'blog' app to list of installed apps so django knows to look there for template html files.
    - find 'BlogConfig' in blog/app.py
    - go to settings.py and add 'blog.apps.BlogConfig' at the top of the 'INSTALLED_APPS' list.
3. Now make views use the templates with 'render'
4. You can also pass in data to templates

5. Template Inheritance: Django html files can inherit from one html 'base' file that has foundational
   markup. This prevents code repetition and is more efficient. Create 'base.html'. With template
   inheritance, it makes it easier to have things across multiple files and change things across  
   multiple files, as everything can be done in the base html file.

# CSS In Django

1. To create folder to hold css files: static -> blog -> someCSSFile.css
2. Now include css files in your template html files.
    - load static at top of your html file
    - create link stylesheet corresponding to the css file. So for base.html we're going to include 'main.css'
