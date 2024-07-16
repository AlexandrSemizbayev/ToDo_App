from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(default='', max_length = 60)
    task = models.CharField(max_length = 180)
    color = models.CharField(max_length = 15, default="#000000")
    bg_color = models.CharField(max_length = 15, default="#ffffff")
    user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)

    def __str__(self):
        return self.task