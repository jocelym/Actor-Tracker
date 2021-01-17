import json
from ScrapeNames import getactors
from ScrapeInfo import getactorinfo
from Compare import compare

def main(moviename, frame):
    actors = getactors(moviename)
    actorsinfo = []
    for actor in actors:
        if compare(actor["Image"], frame):
            actorsinfo.append(getactorinfo(actor))
    finalinfo = {"Actors": actorsinfo}
    return json.dumps(finalinfo)
