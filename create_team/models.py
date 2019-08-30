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
    Series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    Match_no = models.IntegerField()
    User_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    Match_day = models.DateField()


class TeamPlayers(models.Model):
    Team_created = models.ForeignKey(TeamCreated,on_delete=models.CASCADE)
    Players = models.ForeignKey(Players, on_delete=models.CASCADE)

class Matches(models.Model):
    Series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    home_team = models.CharField(max_length=250)
    away_team = models.CharField(max_length=250)
    match_date = models.DateTimeField()

    def __str__(self):
        return self.home_team + ' VS ' + self.away_team + ' ' + str(self.match_date)

class PlayerPoints(models.Model):
    player_id = models.ForeignKey(Players, on_delete=models.CASCADE)
    match_id = models.ForeignKey(Matches, on_delete=models.CASCADE)
    series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    starting_eleven = models.IntegerField()
    runs = models.FloatField()
    fours = models.FloatField()
    sixes = models.IntegerField()
    strike_rate = models.IntegerField()
    fifty = models.IntegerField()
    hundred = models.IntegerField()
    duck = models.IntegerField()
    wickets = models.IntegerField()
    maiden = models.IntegerField()
    economy = models.IntegerField()
    bonus = models.IntegerField()
    catch = models.IntegerField()
    runout_stumping = models.IntegerField()
    total_points = models.FloatField()

class UserTeamPoints(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    series_name = models.ForeignKey(SeriesList, on_delete=models.CASCADE)
    match_id = models.ForeignKey(Matches, on_delete=models.CASCADE)
    points = models.FloatField()
    team = models.TextField()

class PrivateContest(models.Model):
    contest_code =  models.CharField(max_length=10, unique=True)
    contest_creator = models.ForeignKey(Users, on_delete=models.CASCADE)
    participants = models.TextField()

class Leagues(models.Model):
    owner = models.ForeignKey(Users, on_delete=models.CASCADE)
    league_name = models.CharField(default="", max_length=250)
    password = models.CharField(max_length=250)
    
class LeagueMembers(models.Model):
    league = models.ForeignKey(Leagues, on_delete=models.CASCADE)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

