from urllib.request import Request,urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
import re
from user_registration.models import Players


base_url = 'http://www.espncricinfo.com/'
all_teams_url = 'https://www.espncricinfo.com/story/_/id/18791072/all-cricket-teams-index'


def insert_player_info_db(player_info):

     newplayer = Players(name=player_info[1], country=player_info[0], role=player_info[2], image=str(player_info[3]))
     newplayer.save()


def get_bsObj(url):
    try:
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urlopen(req).read()
    except HTTPError as e:
        print("Http Error")
        return None
    return BeautifulSoup(html, "lxml")


def get_country_pages(url):
    bsObj = get_bsObj(url)

    country_pages = []
    country = ''
    common_part = '/content/player/country.html?country='
    country_id = ''

    team_links = bsObj.find_all('a', href=re.compile("/team/_/id/[1-9]+/[a-z]*/"))

    for team_link in team_links:
        split_link = team_link['href'].split('/')
        country = split_link[5]
        country_id = split_link[4]
        country_pages.append(base_url + country + common_part + country_id)

    return country_pages


# country_pages = get_country_pages(all_teams_url)
# print(country_pages)

def get_player_info(url):
    bsObj = get_bsObj(url)

    info = bsObj.find_all(class_='ciPlayerinformationtxt')
    country = bsObj.find(class_='PlayersSearchLink')
    image_link = bsObj.find('img', src=re.compile("/inline/content/image/[0-9]+\.html"))

    # [country, name, player_role, batting_style, bowling_style]

    player_info = []
    player_info.append(country.get_text())

    for i in info:
        field = i.b.get_text()
        if field == 'Full name' or field == 'Playing role':
            if i.span.get_text() == None:
                player_info.append('')
            else:
                player_info.append(i.span.get_text())
    profile_pic = base_url + image_link['src']
    if profile_pic != None:
        player_info.append(profile_pic)
    else:
        player_info.append('')
    return player_info


# player_info = get_player_info('http://www.espncricinfo.com/bangladesh/content/player/550137.html')
# print(player_info)


def crawling():
    country_pages = get_country_pages(all_teams_url)
    for country in country_pages:
        bsObj = get_bsObj(country)
        recentPlayers = bsObj.find('div', id='rectPlyr_Playerlistall')
        #if recentPlayers == None:
           # continue
        links = recentPlayers.find_all('a', href=re.compile("/.*/content/player/[0-9]+\.html"))
        for link in links:
            player_profile = base_url + link['href']
            player_info = get_player_info(player_profile)
            #print(player_info)
            #try:
               # player = Players.objects.get(name=player_info[1], country=player_info[0], role=player_info[2], image=str(player_info[5]))
            insert_player_info_db(player_info)
        break




