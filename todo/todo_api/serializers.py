from rest_framework import serializers
from .models import Todo
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = [
          "id",
          "title",
          "task",
          "color",
          "bg_color",
          "user",
        ]