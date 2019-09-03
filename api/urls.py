from django.conf.urls import url
from . import views

app_name = "api"

urlpatterns = [
    url(r'^PlayerData/$', views.getPlayers, name="players"),
    url(r'^TeamCreatedData/$', views.getTeamCreated, name="team_created"),
    url(r'^TeamPlayersData/$', views.getTeamPlayers, name="team_players"),
    url(r'^SeriesListData/$', views.getSeriesList, name="series_list"),
    url(r'^SeriesSquadsData/$', views.getSeriesSquads, name="series_squads"),
    url(r'^MatchData/$', views.getMatches, name="matches"),
    url(r'^LeaderBoard/$', views.UserPointsByMatch, name="userPoints"),
    url(r'^FantasyStats/$', views.playerPointByMatch, name="fantasystats"),
    url(r'^playerHistory/$', views.getPointsOfCertainPlayer, name="pointOfAPlayer"),
    url(r'^leagues/$', views.saveLeague, name="saveLeague"),
    url(r'^joinLeague/$', views.joinLeague, name="joinLeague"),
    url(r'^leagueInfo/$', views.LeagueInfo, name="leagueInfo"),
    url(r'^userLeagues/$', views.userLeagues, name="userLeagues"),
    url(r'^userSignupOld/$', views.getUser, name="usersignupold"),
]