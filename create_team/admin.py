from django.contrib import admin
from .models import TeamPlayers, TeamCreated, SeriesSquads, SeriesList, PlayerPoints, UserTeamPoints, Matches
# Register your models here.
admin.site.register(TeamCreated)
admin.site.register(TeamPlayers)
admin.site.register(SeriesSquads)
admin.site.register(SeriesList)
admin.site.register(PlayerPoints)
admin.site.register(UserTeamPoints)
admin.site.register(Matches)