import requests
from bs4 import BeautifulSoup
"""import time
import urllib.request
import re"""


def getactors(moviename):
    url = "https://www.imdb.com/find?q=" + moviename.replace(" ", "+") + "&ref_=nv_sr_sm"
    webimbd = requests.get(url)
    web = BeautifulSoup(webimbd.text, "html.parser")
    tags = web.findAll("a")
    return tags


def main():
    moviename = "Iron Man"
    actors = getactors(moviename)
    print(actors)
