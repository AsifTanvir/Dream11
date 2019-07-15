import glob
import errno
import csv
from user_registration.models import Players

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