from face_recognition import compare_faces
from face_recognition import face_encodings
from face_recognition import load_image_file
from urllib.request import urlretrieve
import os
import base64

"""
Module to compare actors in frame with actors in dictionary
"""


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

