from django.contrib import admin
from .models import Post
# Register your models here.

# Registers post to the admin dashboard, so now Post database is now visible and interactable.
admin.site.register(Post)