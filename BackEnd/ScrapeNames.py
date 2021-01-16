import requests
from bs4 import BeautifulSoup
"""import time
import urllib.request
import re"""


def getactors(moviename):
    url = "https://www.imdb.com/find?q=" + moviename.replace(" ", "+") + "&ref_=nv_sr_sm"
    webimbd = requests.get(url)
    web = BeautifulSoup(webimbd.text, "html.parser")
    table = web.find('table')
    link = table.find('a')
    movielink = "https://www.imdb.com/" + link.get('href') + "fullcredits?ref_=tt_cl_sm#cast"
    webimbd = requests.get(movielink)
    web = BeautifulSoup(webimbd.text, "html.parser")
    actors = []
    for table in web.find_all('td', {'class': 'primary_photo'}):
        link = table.find('a')
        actorlink = "https://www.imdb.com/" + link.get('href') + "?ref_=tt_cl_i1"
        webimbd = requests.get(actorlink)
        web = BeautifulSoup(webimbd.text, "html.parser")
        table = web.find('span', {'class': 'itemprop'})
        actors.append(table)
    return actors


def main():
    moviename = "Iron Man"
    actors = getactors(moviename)
    print(actors)
