from django.db import models
from user_registration.models import Players, Users

# Create your models here.

class MyTeam(models.Model):
    Match_no = models.IntegerField(),
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE),
    Match_day = models.DateField(),


class TeamPlayers(models.Model):
    Team_created = models.ForeignKey(MyTeam,on_delete=models.CASCADE),
    Players = models.ForeignKey(MyTeam, on_delete=models.CASCADE),
