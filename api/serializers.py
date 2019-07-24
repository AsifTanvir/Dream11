from rest_framework import serializers
from user_registration.models import Players, Users
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers,Matches,UserTeamPoints
import datetime

class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'

    def create(self, validated_data):
        name = validated_data.get('name')
        role = validated_data.get('role')
        country = validated_data.get('country')
        image = validated_data.get('image')
        player = Players(name=name, role=role,country=country,image=image)
        #student.set_password(validated_data.get('password')
        return player


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
    def create(self, validated_data):
        series_name = validated_data.get('Series_name')
        print(series_name)
        match = validated_data.get('Match_no')
        date = datetime.datetime.now()
        print(date.strftime("%x"))
        #date = validated_data.get('27/7/19')
        user = validated_data.get('User_id')
        series = SeriesList.objects.get(Series_name=series_name)
        users = Users.objects.get(pk=user)
        ss = TeamCreated(Series_name=series, Match_no=match,Match_day=date,User_id=users)
        ss.save()
        #student.set_password(validated_data.get('password')
        return ss


class TeamPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamPlayers
        fields = '__all__'

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'


class UserTeamPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTeamPoints
        fields = '__all__'