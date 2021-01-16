from face_recognition import compare_faces
from face_recognition import face_encodings
from face_recognition import load_image_file
from urllib.request import urlretrieve
import os

"""
Module to compare actors in frame with actors in dictionary
"""


def compare(actor, frame):
    """
    determine whether actor is in frame

    actor: reference to jpg with just actor's face
    frame: reference to jpg of frame from movie
    """
    urlretrieve(actor, 'actor.jpg')
    urlretrieve(frame, 'frame.jpg')
    frame_encoding = face_encodings(load_image_file('frame.jpg'))
    actor_encoding = face_encodings(load_image_file('actor.jpg'))[0]
    os.remove('actor.jpg')
    os.remove('frame.jpg')
    for encoding in frame_encoding:
        if compare_faces([actor_encoding], encoding):
            return True
    return False
