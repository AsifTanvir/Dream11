from django.contrib import admin
from .models import TeamPlayers,TeamCreated,SeriesSquads,SeriesList
# Register your models here.
admin.site.register(TeamCreated)
admin.site.register(TeamPlayers)
admin.site.register(SeriesSquads)
admin.site.register(SeriesList)