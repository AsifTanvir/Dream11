from django.contrib import admin

# Register your models here.

from team.models import TeamPlayers,MyTeam

admin.site.register(MyTeam)
admin.site.register(TeamPlayers)
