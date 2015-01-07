from flask import Flask, request
from flask import session, jsonify
from werkzeug.contrib.cache import SimpleCache

# used for local dev
from flask.ext.cors import CORS, cross_origin

import os
import config
import random
import json

app = Flask(__name__, static_url_path='/static')
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = os.environ.get('SECRET_KEY') or config.SECRET_KEY
cache = SimpleCache()

cors = CORS(app)


def get_key():
    return ''.join(random.choice('0123456789ABCDEF') for i in range(16))


@cross_origin(allow_headers=['Content-Type'])
@app.route('/board/save', methods=['POST'])
def save_board():
    payload = request.json
    tiles = payload['tiles']
    key = payload['key']
    
    # initialize
    if len(key) == 0:
        key = get_key()
    cache.set(key, tiles, timeout=864000)

    return jsonify(success='success', key=key)

@cross_origin(allow_headers=['Content-Type'])
@app.route('/board', methods=['GET'])
def get_board():
    key = request.args['key']
    if key:
        jsonBoard = cache.get(key)
        return jsonify(board = jsonBoard)

    return jsonify()

if __name__ == "__main__":
    app.run(debug=True)
