from django.db import models
from user_registration.models import Players, Users


class SeriesList(models.Model):
    Series_name = models.CharField(max_length=250, unique=True, primary_key=True)
    No_of_matches = models.IntegerField()
    Home_team = models.CharField(max_length=250)
    Away_team = models.CharField(max_length=250)


class SeriesSquads(models.Model):
    Series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    Squad_player = models.ForeignKey(Players, on_delete=models.CASCADE)


class TeamCreated(models.Model):
<<<<<<< HEAD
    Series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    Match_no = models.IntegerField()
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    Match_day = models.DateField()
=======
    Match_no = models.IntegerField(),
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE),
    Match_day = models.DateField(),
>>>>>>> 9ec2b4f2dab9cfeffc0dea4525e221b81890b850


class TeamPlayers(models.Model):
    Team_created = models.ForeignKey(TeamCreated,on_delete=models.CASCADE)
    Players = models.ForeignKey(Players, on_delete=models.CASCADE)




