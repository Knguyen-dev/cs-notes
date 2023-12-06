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

# Project Structure

1. manage.py: Allows us to run console commands
2. settings.py: Where we change different settings and configurations of the site.
3. urls.py: Sets up mapping of certain urls for our user
4. wsgi.py: How our py web app and server communication.

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
