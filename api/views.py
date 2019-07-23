from user_registration.models import Players, Users
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from .serializers import PlayersSerializer, UsersSerializer, TeamCreatedSerializer, TeamPlayersSerializer, SeriesSquadsSerializer, SeriesListSerializer,MatchesSerializer,UserTeamPointsSerializer
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers,Matches,UserTeamPoints
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
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
        pp = TeamCreated.objects.get(pk=1)
        player = Players.objects.get(name=xx.name, role=xx.role, country=xx.country, image=xx.image)
        player = TeamPlayers(Team_created=pp, Players=player)
        player.save()
        return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def getTeamCreated(request):
    userlist = TeamCreated.objects.all()
    serializers = UsersSerializer(TeamCreatedSerializer, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


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