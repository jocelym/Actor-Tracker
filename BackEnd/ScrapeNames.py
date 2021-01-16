import requests
from bs4 import BeautifulSoup
"""import time
import urllib.request
import re"""

"""
Module to create database for movie
Database will include actor name, name id on IMBd and actor reference picture
"""


def getactors(moviename):
    """
    Search movie name on IMDb
    """
    webimbd = requests.get("https://www.imdb.com/find?q=" + moviename.replace(" ", "+") + "&ref_=nv_sr_sm")
    web = BeautifulSoup(webimbd.text, "html.parser")
    table = web.find('table')
    link = table.find('a')
    """
    Use title ID (link.get('href')) to find full credits page
    """
    webimbd = requests.get("https://www.imdb.com/" + link.get('href') + "fullcredits?ref_=tt_cl_sm#cast")
    web = BeautifulSoup(webimbd.text, "html.parser")
    actors = []
    """
    Find each instance of an actor find link, name and image link
    """
    for table in web.find_all('td', {'class': 'primary_photo'}):
        link = table.find('a')
        actorlink = "https://www.imdb.com/" + link.get('href') + "?ref_=tt_cl_i1"
        actor = table.find('img')
        actorname = actor["alt"]
        actorimage = actor["src"]
        actors[actorname] = (actorimage, actorlink)
    return actors


def main():
    moviename = "Iron Man"
    actors = getactors(moviename)
    print(actors)
