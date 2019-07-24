import glob
import errno
import csv
import json
from user_registration.models import Players
from create_team.models import SeriesSquads, UserTeamPoints, PlayerPoints, SeriesList, Matches
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist

batting_path = 'user_registration/static/points_data/batting.csv'
bowling_path = 'user_registration/static/points_data/bowling.csv'

def insert_match_scorecard(player_id, match_id, series_name):
    config = open('config.json', 'r')
    rules = json.load(config)
    batting = open(batting_path, 'r')
    bowling = open(bowling_path, 'r')
    
    rows_bat = csv.reader(batting, delimiter=',')
    rows_bowl = csv.reader(bowling, delimiter=',')

    match = Matches.objects.get(id=match_id)
    series = SeriesList.objects.get(Series_name=series_name)

    for row in rows_bat:
        if row:
            points = dict()
            try:
                player = Players.objects.get(name=row[0])
            except ObjectDoesNotExist:
                print(row)
                continue
            runs = int(row[1])
            fours = int(row[2])
            sixes = int(row[3])
            strike_rate = float(row[4])
            points['run'] = runs * rules['points']['batting']['run']
            points['4s'] = fours * rules['points']['batting']['boundary']
            points['6s'] = sixes * rules['points']['batting']['six']
            if runs >= 100:
                points['century'] = rules['points']['batting']['century']
                points['fifty'] = 0
            elif runs >= 50:
                points['fifty'] = rules['points']['batting']['half_century']
                points['century'] = 0
            else:
                points['century'] = 0
                points['fifty'] = 0
            if runs == 0:
                points['duck'] = rules['points']['batting']['duck']
            else:
                points['duck'] = 0
            if runs >= rules['points']['strike_rate']['min_runs'] and strike_rate >= 150:
                points['sr'] = rules['points']['strike_rate']['above_150']
            elif runs >= rules['points']['strike_rate']['min_runs'] and strike_rate <= 50:
                points['sr'] = rules['points']['strike_rate']['below_50']
            else:
                points['sr'] = 0
            total = 0
            for point in points.values():
                total = total + point
            try:
                previous = PlayerPoints.objects.get(player_id=player, match_id=match, series_name=series)
                previous.runs = points['run']
                previous.fours = points['4s']
                previous.sixes = points['6s']
                previous.strike_rate = points['sr']
                previous.fifty = points['fifty']
                previous.hundred = points['century'] 
                previous.duck=points['duck']
                previous.total_points = previous.total_points + total
                previous.save()
            except ObjectDoesNotExist:
                new_points = PlayerPoints(player_id=player, match_id=match, series_name=series, starting_eleven=0, runs=points['run'], fours=points['4s'], sixes=points['6s'], strike_rate=points['sr'], fifty=points['fifty'], hundred=points['century'], duck=points['duck'], wickets=0, maiden=0, economy=0, bonus=0, catch=0, runout_stumping=0, total_points=total)
                new_points.save()

    for row in rows_bowl:
        if row:
            points = dict()
            try:
                player = Players.objects.get(name=row[0])
            except ObjectDoesNotExist:
                print(row)
                continue
            maiden = int(row[1])
            wickets = int(row[2])
            economy = float(row[3])
            points['wicket'] = wickets * rules['points']['bowling']['wicket']
            if wickets >= 5:
                points['wicket'] = points['wicket'] + rules['points']['bowling']['5_wicket']
            elif wickets == 4 :
                points['wicket'] = points['wicket'] + rules['points']['bowling']['4_wicket']
            points['maiden'] = maiden * rules['points']['bowling']['maiden']
            points['eco'] = 0
            if economy <= 2.5:
                points['eco'] = rules['points']['economy']['below_2.5']
            elif economy > 2.5 and economy <= 4:
                points['eco'] = rules['points']['economy']['between_2.5_4']
            elif economy > 4 and economy <= 5:
                points['eco'] = rules['points']['economy']['between_4_5']
            elif economy > 7 and economy <= 8:
                points['eco'] = rules['points']['economy']['between_7_8']
            elif economy > 8 and economy <= 9:
                points['eco'] = rules['points']['economy']['between_8_9']
            elif economy > 9:
                points['eco'] = rules['points']['economy']['above_9']
            total = 0
            for point in points.values():
                total = total + point
            try:
                previous = PlayerPoints.objects.get(player_id=player, match_id=match, series_name=series)
                previous.wickets = points['wicket']
                previous.maiden = points['maiden']
                previous.economy = points['eco']
                previous.total_points = previous.total_points + total
                previous.save()
            except ObjectDoesNotExist:
                new_points = PlayerPoints(player_id=player, match_id=match, series_name=series, starting_eleven=0, runs=0, fours=0, sixes=0, strike_rate=0, fifty=0, hundred=0, duck=0, wickets=points['wicket'], maiden=points['maiden'], economy=points['eco'], bonus=0, catch=0, runout_stumping=0, total_points=total)
                new_points.save()


    config.close()
    batting.close()
    bowling.close()

def insert_user_points(user_id, match, series):
    user = UserTeamPoints.objects.get(user_id=user_id, match_id=match, series_name=series)
    team = json.loads(user.team)
    total_points = 0
    for player in team:
        try:
            player_points = PlayerPoints.objects.get(player_id=player, match_id=match, series_name=series)
            total_points = total_points + player_points.total_points
        except ObjectDoesNotExist:
            continue
    user.points = total_points
    user.save()


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

def user_team_insert():
    a = UserTeamPoints.objects.get(user_id=1)
    li = json.loads(a.team)
    print(li[0])
    player = Players.objects.get(id=li[2])
    print(player.name)