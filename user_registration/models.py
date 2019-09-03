from django.db import models
from django.core.validators import MaxLengthValidator

# class Users(models.Model):
#     name = models.CharField(default="", max_length=250)
#     email = models.CharField(max_length=250)
#     password = models.CharField(max_length=250)
#     contests = models.TextField(default="[]")

#     def __str__(self):
#         return self.email+' - '+self.password

class Players(models.Model):
    name = models.CharField(default="", max_length=250)
    country = models.CharField(max_length=250)
    image = models.CharField(max_length=500)
    role = models.CharField(max_length=30)
    credit = models.FloatField(default=None)

    def __str__(self):
        return self.name + ' - ' + self.role + ' - ' + self.country

class Users(models.Model):
    name = models.CharField(default="noName", max_length=250)
    email = models.EmailField(max_length=250, primary_key=True)
    password = models.CharField(max_length=250,validators=[MaxLengthValidator(limit_value=8, message="password must be at least 8 characters long")])

    def __str__(self):
        return self.name+' - '+self.email
