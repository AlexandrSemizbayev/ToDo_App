# Generated by Django 4.2.14 on 2024-07-12 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todo_api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="todo",
            name="target_time",
            field=models.DateTimeField(auto_now=True),
        ),
    ]