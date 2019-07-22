import glob
import errno
import csv
from user_registration.models import Players
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist

def insert_all_players():
    path = 'user_registration/static/player_data/all_players.csv'

    try:
        with open(path, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                newplayer = Players(name=row[1], country=row[2], role=row[4], image=str(row[3]), credit=float(row[5]))
                newplayer.save()
            # pass # do what you want
    except IOError as exc:
        if exc.errno != errno.EISDIR:
            raise


def insert_player_info_db(player_info):
     newplayer = Players(name=player_info[1], country=player_info[0], role=player_info[2], image=str(player_info[3]))
     newplayer.save()

def insert_crawled_data():
    path = 'user_registration/static/player_data/*.csv'
    files = glob.glob(path)
    # print(files)
    for name in files:
        try:
            with open(name, 'r') as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                for row in csv_reader:
                    if len(row) == 4:
                        role = row[2].lower()
                        if 'allrounder' in role:
                            row[2] = 'Allrounder'
                        elif 'wicketkeeper' in role:
                            row[2] = 'Wicketkeeper'
                        elif 'batsman' in role:
                            row[2] = 'Batsman'
                        elif 'bowler' in role:
                            row[2] = 'Bowler'
                        insert_player_info_db(row)
                # pass # do what you want
        except IOError as exc:
            if exc.errno != errno.EISDIR:
                raise

def insert_credit_db(role, player_name, credit):
    try:
        if 'credit_ar' in role:
            player = Players.objects.get(name=player_name)
            if player.role == 'Allrounder':
                # print('Allrounder ' + player.name + ' ' + player.role + ' ' + str(player.credit)) 
                player.credit = credit
                player.save()
        elif 'credit_bat' in role:
            player = Players.objects.get(name=player_name)
            if player.role == 'Batsman' or player.role == 'Wicketkeeper':
                # print('Batsman ' + player.name + ' ' + player.role + ' ' + str(player.credit))
                player.credit = credit
                player.save()
        elif 'credit_bowl' in role:
            player = Players.objects.get(name=player_name)
            if player.role == 'Bowler':
                # print('Bowler ' + player.name + ' ' + player.role + ' ' + str(player.credit)) 
                player.credit = credit
                player.save()
    except ObjectDoesNotExist:
        print('Players.DoesNotExist -> ' + player_name)
    except MultipleObjectsReturned:
        print('MultipleObjectsReturned')


def insert_credit():
    path = 'user_registration/static/credit/*.csv'
    files = glob.glob(path)

    for name in files:
        try:
            with open(name, 'r') as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                for row in csv_reader:
                    if row:
                        # print(name + ' ' + row[1] + ' ' + row[2])
                        insert_credit_db(name,row[1], float(row[2]))    
                # pass # do what you want
        except IOError as exc:
            if exc.errno != errno.EISDIR:
                raise

def insert_non_ranked_credit():
    players = Players.objects.filter(credit=0)
    for player in players:
        if player.role == 'Allrounder':
            player.credit = 5
        elif player.role == 'Batsman' or player.role == 'Wicketkeeper':
            player.credit = 6
        elif player.role == 'Bowler':
            player.credit = 5
        player.save()
