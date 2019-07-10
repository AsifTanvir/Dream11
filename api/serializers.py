from rest_framework import serializers
from user_registration.models import Players, Users
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers


class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class SeriesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeriesList
        fields = '__all__'


class SeriesSquadsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeriesSquads
        fields = '__all__'


class TeamCreatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamCreated
        fields = '__all__'


class TeamPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamPlayers
        fields = '__all__'
