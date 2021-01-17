import json
import requests
import base64
from bs4 import BeautifulSoup
import calendar
from face_recognition import compare_faces
from face_recognition import face_encodings
from face_recognition import load_image_file
from urllib.request import urlretrieve
import os


def compare(actor, frame):
    """
    determine whether actor is in frame

    actor: url to jpg
    frame: 64bit jpg encoding string (ignoring first 22 characters)
    """
    urlretrieve(actor, 'actor.jpg')

    with open("frame_image.jpg", 'wb') as frame_image:
        frame_image.write(base64.b64decode(frame[23:]))

    actor_encoding = face_encodings(load_image_file('actor.jpg'))[0]
    frame_encoding = face_encodings(load_image_file('frame_image.jpg'))

    os.remove('actor.jpg')
    os.remove('frame_image.jpg')
    for encoding in frame_encoding:
        if compare_faces([actor_encoding], encoding):
            return True
    return False


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


def getactors(moviename, frame):
    actorsinfo = []
    url = "https://www.imdb.com/find?q=" + moviename.replace(" ", "+") + "&ref_=nv_sr_sm"
    webimbd = requests.get(url)
    web = BeautifulSoup(webimbd.text, "html.parser")
    table = web.find('table')
    link = table.find('a')
    movielink = "https://www.imdb.com/" + link.get('href') + "fullcredits?ref_=tt_cl_sm#cast"
    webimbd = requests.get(movielink)
    web = BeautifulSoup(webimbd.text, "html.parser")
    """
    Find each instance of an actor find link, name and image link
    """
    num = 1
    for table in web.find_all('td', {'class': 'primary_photo'}):
        if num == 4:
            break
        link = table.find('a')
        actor = table.find('img')
        if actor["class"] != []:
            image = actor["loadlate"].replace("32", "214")
            if compare(image.replace("44", "317"), frame):
                actorlink = "https://www.imdb.com/" + link.get('href') + "?ref_=tt_cl_i1"
                actor = {"Name": actor["alt"], "Image": image.replace("44", "317"), "Link": actorlink}
                actorsinfo.append(getactorinfo(actor))
                num += 1
    finalinfo = {"Actors": actorsinfo}
    return json.dumps(finalinfo)
