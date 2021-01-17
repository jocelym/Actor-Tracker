import requests
from bs4 import BeautifulSoup


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
    """
    Find each instance of an actor find link, name and image link
    """
    for table in web.find_all('td', {'class': 'primary_photo'}):
        link = table.find('a')
        actor = table.find('img')
        actors.append({"Name": actor["alt"], "Image": actor["src"], "Link": "https://www.imdb.com/" + link.get('href') + "?ref_=tt_cl_i1"})
    return actors
