from django.db import models


class Users(models.Model):
    name = models.CharField(default="", max_length=250)
    email = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    contests = models.TextField(default="[]")

    def __str__(self):
        return self.email+' - '+self.password

class Players(models.Model):
    name = models.CharField(default="", max_length=250)
    country = models.CharField(max_length=250)
    image = models.CharField(max_length=500)
    role = models.CharField(max_length=30)
    credit = models.FloatField(default=None)

    def __str__(self):
        return self.name + ' - ' + self.role + ' - ' + self.country