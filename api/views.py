from user_registration.models import Players, Users
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import PlayersSerializer, UsersSerializer, TeamCreatedSerializer, TeamPlayersSerializer, SeriesSquadsSerializer, SeriesListSerializer
from create_team.models import SeriesList,SeriesSquads,TeamCreated,TeamPlayers

@api_view(["GET"])
def getPlayers(request):
    playerlist = Players.objects.all()
    serializers = PlayersSerializer(playerlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getUsers(request):
    userlist = Users.objects.all()
    serializers = UsersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getTeamCreated(request):
    userlist = TeamCreated.objects.all()
    serializers = UsersSerializer(TeamCreatedSerializer, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getTeamPlayers(request):
    userlist = TeamPlayers.objects.all()
    serializers = UsersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getSeriesList(request):
    userlist = SeriesList.objects.all()
    serializers = UsersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["GET"])
def getSeriesSquads(request):
    userlist = SeriesSquads.objects.all()
    serializers = UsersSerializer(userlist, many=True)
    return Response(status=status.HTTP_200_OK, data={"data": serializers.data})


@api_view(["POST"])
def postPlayers(request):
    playerlist = request.data
    new = Players(name=playerlist.name, role=playerlist.role, country=playerlist.country, image=playerlist.image)
    new.save();
    return Response(status=status.HTTP_200_OK, data={"data": request.data})


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


