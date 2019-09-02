from user_registration.models import Players, Users
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from .serializers import PlayersSerializer, UsersSerializer, TeamCreatedSerializer, TeamPlayersSerializer, SeriesSquadsSerializer, SeriesListSerializer,MatchesSerializer,UserTeamPointsSerializer, userPointsBymatch, getPointsOfPlayers, getCertainLeagueMembersSerializer, getPointsByWeek, getLeaguesOfUser
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers,Matches,UserTeamPoints, PlayerPoints, Leagues, LeagueMembers
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404, get_list_or_404
import json

@api_view(["GET","POST"])
@authentication_classes([])
@permission_classes([])
@parser_classes((JSONParser,))
def getPlayers(request):
    if request.method == 'GET':
        playerlist = Players.objects.all()
        serializers = PlayersSerializer(playerlist, many=True)
        return Response(serializers.data)

    elif request.method == 'POST':
        serializer = PlayersSerializer(data=request.data)
        xx = serializer.create(validated_data=request.data)
        print(xx.name)
        print(xx.role)
        pp = TeamCreated.objects.get(pk=2)
        #TeamPlayers.objects.filter(Team_created=pp).delete()
        player = Players.objects.get(name=xx.name, role=xx.role, country=xx.country, image=xx.image)
        player = TeamPlayers(Team_created=pp, Players=player)
        player.save()
        return Response(status=status.HTTP_200_OK)


@api_view(["GET","POST"])
@authentication_classes([])
@permission_classes([])
@parser_classes((JSONParser,))
def getTeamCreated(request):
    if request.method == 'GET':
        userlist = TeamCreated.objects.all()
        serializers = TeamCreatedSerializer(userlist, many=True)
        return Response(status=status.HTTP_200_OK, data={"data": serializers.data})

    elif request.method == 'POST':
        serializer = TeamCreatedSerializer(data=request.data)
        xx = serializer.create(validated_data=request.data)
        return Response(status=status.HTTP_200_OK)
    

@api_view(["GET"])
def getTeamPlayers(request):
    userlist = TeamPlayers.objects.all()
    serializers = TeamPlayersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getSeriesList(request):
    userlist = SeriesList.objects.all()
    serializers = SeriesListSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getSeriesSquads(request):
    userlist = SeriesSquads.objects.all()
    serializers = UsersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})

@api_view(["GET"])
def getMatches(request):
    userlist = Matches.objects.all()
    serializers = MatchesSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})



''''@api_view(["POST"])
def postTeamPlayers(request):
    playerlist = request.data
    new = Players(name=playerlist.name, role=playerlist.role, country=playerlist.country, image=playerlist.image)
    new.save();
    return Response(status=status.HTTP_200_OK, data={"data": request.data})
@api_view(["POST"])
def postTeamCreated(request):
    playerlist = request.data
    new = Players(name=playerlist.name, role=playerlist.role, country=playerlist.country, image=playerlist.image)
    new.save();
    return Response(status=status.HTTP_200_OK, data={"data": request.data})'''

@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def UserPointsByMatch(request):
    if request.method == 'POST':
        print(request.data)
        hometeam = request.data['hometeam']
        awayteam = request.data['awayteam']

        match = get_object_or_404(Matches, home_team=hometeam,away_team=awayteam)
        print(match)
        listi = get_list_or_404(UserTeamPoints,match_id=match)
        print(listi)
        serializer = userPointsBymatch(listi, many=True)
        print(serializer)
        return Response(data={"data": serializer.data},status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def playerPointByMatch(request):
    if request.method == 'POST':
        print(request.data)
        hometeam = request.data['hometeam']
        awayteam = request.data['awayteam']
        match = get_object_or_404(Matches, home_team=hometeam,away_team=awayteam)
        batsmen = get_list_or_404(Players, role='batsman')
        bowlers = get_list_or_404(Players, role='bowler')
        wicketkeepers = get_list_or_404(Players,role="wicketkeeper")
        allrounders = get_list_or_404(Players,role="allrounder")
        listi = PlayerPoints.objects.filter(player_id__in=batsmen,match_id=match).order_by('-total_points')
        bat = getPointsOfPlayers(listi, many=True)
        listi = PlayerPoints.objects.filter(player_id__in=bowlers,match_id=match).order_by('-total_points')
        bowl = getPointsOfPlayers(listi, many=True)
        listi = PlayerPoints.objects.filter(player_id__in=wicketkeepers,match_id=match).order_by('-total_points')
        wkt = getPointsOfPlayers(listi, many=True)
        listi = PlayerPoints.objects.filter(player_id__in=allrounders,match_id=match).order_by('-total_points')
        allr = getPointsOfPlayers(listi, many=True)
        return Response(data={"batsmen": bat.data,"bowlers": bowl.data,"wicketkeepers":wkt.data,"allrounder":allr.data},status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

#  from asif

@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def getPointsOfCertainPlayer(request):
    if request.method == 'POST':
        print(request.data)
        name = request.data['name']
        player = Players.objects.get(name=name)
        listi = get_list_or_404(PlayerPoints,player_id=player.id)
        serializer = getPointsByWeek(listi, many=True)
        print(serializer)
        return Response(data={"data": serializer.data},status=status.HTTP_200_OK)
        
        
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def saveLeague(request):
    if request.method == 'POST':
        print(request.data)
        name = request.data['name']
        league_name = request.data['league_name']
        password = request.data['password']
        user = get_object_or_404(Users, name=name)
        newLeague = Leagues(owner=user, league_name=league_name,password=password)
        newLeague.save()
        return Response(status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
# @api_view(["GET","POST"])
# @authentication_classes([ ])
# @permission_classes([ ])
# @parser_classes((JSONParser, ))
# def joinLeague(request):
#     if request.method == 'POST':
#         print(request.data)
#         name = request.data['name']
#         league_name = request.data['league_name']
#         password = request.data['password']
#         user = get_object_or_404(Users, name=name)
#         league = get_object_or_404(Leagues, league_name=league_name,password=password)
#         leagueJoin = LeagueMembers(league=league, user=user)
#         leagueJoin.save()
#         return Response(status=status.HTTP_200_OK)  
#     elif request.method == 'GET':
#         return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def joinLeague(request):
    if request.method == 'POST':
        print(request.data)
        name = request.data['name']
        league_name = request.data['league_name']
        password = request.data['password']
        user = get_object_or_404(Users, name=name)
        league = get_object_or_404(Leagues, league_name=league_name,password=password)
        obj = LeagueMembers.objects.filter(league=league, user=user)
        if obj.exists():
            return Response(status=status.HTTP_302_FOUND) 
        else:
            leagueJoin = LeagueMembers(league=league, user=user)
            leagueJoin.save()
            return Response(status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def LeagueInfo(request):
    if request.method == 'POST':
        print(request.data)
        league_name = request.data['league_name']
        league = get_object_or_404(Leagues, league_name=league_name)
        listi = get_list_or_404(LeagueMembers, league=league)
        serializer = getCertainLeagueMembersSerializer(listi, many=True)
        return Response(data={"data": serializer.data},status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
@api_view(["GET","POST"])
@authentication_classes([ ])
@permission_classes([ ])
@parser_classes((JSONParser, ))
def userLeagues(request):
    if request.method == 'POST':
        print(request.data)
        name = request.data['name']
        user = get_object_or_404(Users, id=name)
        listi = get_list_or_404(LeagueMembers, user=user)
        serializer = getLeaguesOfUser(listi, many=True)
        return Response(data={"data": serializer.data},status=status.HTTP_200_OK)  
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)