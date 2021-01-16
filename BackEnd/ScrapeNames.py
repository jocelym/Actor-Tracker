import requests
from bs4 import BeautifulSoup
"""import time
import urllib.request
import re"""


def getactors(moviename):
    webimbd = requests.get("https://www.imdb.com/list/ls058011111/")
    web = BeautifulSoup(webimbd.text, "html.parser")
    """tags = web.findAll("a")
    print(tags)"""
    