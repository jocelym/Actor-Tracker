from face_recognition import compare_faces
from face_recognition import face_encodings
from face_recognition import load_image_file

"""
Module to compare actors in frame with actors in dictionary
"""


def compare(actor, frame):
    """
    determine whether actor is in frame

    actor: reference to jpg with just actor's face
    frame: reference to jpg of frame from movie
    """
    frame_encoding = face_encodings(load_image_file(frame))
    for encoding in frame_encoding:
        if compare_faces([face_encodings(load_image_file(actor))[0]], encoding):
            return True
    return False

