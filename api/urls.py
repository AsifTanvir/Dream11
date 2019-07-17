from django.conf.urls import url
from . import views

app_name = "api"

urlpatterns = [
    url(r'^PlayerData/$', views.getPlayers, name="players"),
    url(r'^TeamCreatedData/$', views.getTeamCreated, name="team_created"),
    url(r'^TeamPlayersData/$', views.getTeamPlayers, name="team_players"),
    url(r'^SeriesListData/$', views.getSeriesList, name="series_list"),
    url(r'^SeriesSquadsData/$', views.getSeriesSquads, name="series_squads"),
]