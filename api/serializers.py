from rest_framework import serializers
from user_registration.models import Players, Users
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers,Matches,UserTeamPoints, PlayerPoints, LeagueMembers, Leagues
import datetime
from django.shortcuts import get_object_or_404
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
        match = validated_data.get('Match_id')
        date = datetime.datetime.now()
        print(date.strftime("%x"))
        user = validated_data.get('User_Name')
        users = Users.objects.get(name=user)
        match1 = Matches.objects.get(pk=match)
        try:
            ss = TeamCreated.objects.get(match=match1,User_id=users)
            return False
        except TeamCreated.DoesNotExist:
            ss1 = TeamCreated(match=match1,User_id=users)
            ss1.save()
            return True
        


class TeamPlayersSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()
    class Meta:
        model = TeamPlayers
        fields = ['name','image','role','country']
        
    def get_name(self, obj):
        return obj.Players.name

    def get_image(self, obj):
        return obj.Players.image

    def get_role(self, obj):
        return obj.Players.role

    def get_country(self, obj):
        return obj.Players.country

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'


class UserTeamPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTeamPoints
        fields = '__all__'

class userPointsBymatch(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = UserTeamPoints
        fields = ['name','points']
        
    def get_name(self, obj):
        return obj.user_id.name

class getPointsOfPlayers(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = PlayerPoints
        fields = ['name','total_points']
        
    def get_name(self, obj):
        return obj.player_id.name

class getPointsByWeek(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    homeTeam = serializers.SerializerMethodField()
    awayTeam = serializers.SerializerMethodField()
    class Meta:
        model = PlayerPoints
        fields = ['date','total_points','homeTeam','awayTeam']
        
    def get_date(self, obj):
        return obj.match_id.match_date

    def get_homeTeam(self, obj):
        return obj.match_id.home_team

    def get_awayTeam(self, obj):
        return obj.match_id.away_team

class getCertainLeagueMembersSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = LeagueMembers
        fields = ['name']
        
    def get_name(self, obj):
        return obj.user.name
    
    
class getLeaguesOfUser(serializers.ModelSerializer):
    league_name =serializers.SerializerMethodField()
    class Meta:
        model = LeagueMembers
        fields = ['league_name']
        
    def get_league_name(self, obj):
        return obj.league.league_name

class UserSerializerPost(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200)
    name = serializers.CharField(max_length=250)
    
    def save(self):
        email = self.validated_data['email']
        password = self.validated_data['password']
        name = self.validated_data['name']
        print(email)
        print(password)
        print(name)
        #signer = Signer()
        #hash_pass = signer.sign(password).split(":", 1)
        #get_object_or_404(Users, email=email, password=hash_pass[1])
        newUser = Users(name=name, password=password, email=email)
        print(newUser.email, newUser.password)
        newUser.save()
        return newUser
        
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("password is less than 8 characters long")
        return value

class UserSerializerGet(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200)
    
    def save(self):
        email = self.validated_data['email']
        password = self.validated_data['password']
        print(email)
        print(password)
        #signer = Signer()
        #hash_pass = signer.sign(password).split(":", 1)
        #print(hash_pass[1])
        get_object_or_404(Users, email=email, password=password)
        return True
        
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("password is less than 8 characters long")
        return value