import json
from joined import getactors

def main(request):
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'name' in request_json:
        moviename = request_json['movieTitle']
        frame = request_json['frame']
    elif request_args and 'name' in request_args:
        moviename = request_args['movieTitle']
        frame = request_args['frame']

    return getactors(moviename, frame)
