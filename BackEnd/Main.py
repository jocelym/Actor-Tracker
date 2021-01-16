def main(moviename, frame):
    actors = getactors(moviename)
    actorsinfo = []
    for actor in actors:
        """ need to send just actorimage? or whole actor: (img,link)... need to break up actor into groups"""
        actorlink = actors[actor]
        actorpic = actors[actor["Image"]]
        if compare(actorpic, frame):
            actorsinfo[actor] = getactorinfo(actors[actor])

    return actorsinfo
