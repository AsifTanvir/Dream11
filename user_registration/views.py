from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .crawler import crawling,insert_player_info_db
from .data_insert  import insert_crawled_data, insert_credit, insert_non_ranked_credit, insert_all_players, user_team_insert, insert_match_scorecard, insert_user_points
from django.shortcuts import render
from .models import Users,Players
import csv
from django.core.signing import Signer



def index(request):
    return render(request, 'home/index.html',{})


def registration(request):
    name = request.POST['namei']
    email = request.POST['email']
    password = request.POST['password']
    signer = Signer()
    Hashed_pass = signer.sign(password).split(':',1)
    newuser = Users(name=name, email=email, password=Hashed_pass[1])
    newuser.save()
    return render(request, 'login.html', {})


def login(request):
    return render(request, 'login.html', {})


def loggedin(request):
    email = request.POST['email']
    password = request.POST['password']
    signer = Signer()
    original = signer.sign(password).split(':',1)
    user = get_object_or_404(Users,email=email,password=original[1])
    playerlist = Players.objects.all()
    return render(request, 'playerList.html',{'playerlist' : playerlist})

def upload_csv(request):
    if request.POST:
        file = request.FILES['csv_file']
        decoded_file = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded_file)
        for row in reader:
            if len(row) == 4:
                insert_player_info_db(row)
    return render(request, 'home/admin.html', {})


def player_search(request):
    search_keyword = request.GET['keyword']
    playerlist = Players.objects.all()
    search_result = []
    for player in playerlist:
        name = player.name.lower()
        search_keyword = search_keyword.lower()
        if search_keyword in name:
            print(player.name)
            search_result.append(player)
    return render(request, 'playerList.html',{'playerlist' : search_result})

def profileView(request,name):
    player_profile = Players.objects.get(name=name)
    return render(request,'profile.html',{'profile' : player_profile})



def register(request):
    return render(request, 'registration.html' )


def Admin(request):
    # crawling()
    # Players.objects.all().delete()
    # insert_crawled_data()
    # insert_credit()
    # insert_non_ranked_credit()
    # insert_all_players()
    # user_team_insert()
    insert_match_scorecard(908, 1, 'ICC Cricket World Cup 2019')
    return render(request, 'home/admin.html',{})

def update_user_points(request):
    insert_match_scorecard(1, 1, 'ICC Cricket World Cup 2019')
    return render(request, 'home/admin.html')

# Create your views here.