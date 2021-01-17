import requests
from bs4 import BeautifulSoup
import calendar


def getactorinfo(actor):
    webimbd = requests.get(actor["Link"])
    web = BeautifulSoup(webimbd.text, "html.parser")
    tbody = web.find('time')
    born = tbody['datetime'].split("-")
    born[1] = calendar.month_name[int(born[1])]
    actor["Born"] = born[1] + " " + born[2] + ", " + born[0]
    top3 = []
    for film in web.find_all('div', {'class': 'knownfor-title-role'}):
        film = film.find('a')
        top3.append(film['title'])
    actor["Known For"] = top3
    return actor
