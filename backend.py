from flask import Flask, request
from flask import session, jsonify, render_template
from werkzeug.contrib.cache import SimpleCache

#used for local dev
from flask.ext.cors import CORS, cross_origin

import os
import config
import random

app = Flask(__name__, static_url_path='/static')
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = os.environ.get('SECRET_KEY') or config.SECRET_KEY
cache = SimpleCache()

cors = CORS(app)

def get_session_key():
    return ''.join(random.choice('0123456789ABCDEF') for i in range(16))

@cross_origin(allow_headers=['Content-Type'])
@app.route('/board/save', methods=['POST'])
def save_board():
	#initialize
	if 'key' not in session:
		key = get_session_key()
		session['key'] = key
		cache.set(key, {})
	
	#update state	
	state = cache.get(session['key'])
	state['board'] = request.json
	cache.set(key, state)
	
	return jsonify(success='success')

@cross_origin(allow_headers=['Content-Type'])
@app.route('/board', methods=['GET'])
def get_board():
	if 'key' in session:
		state = cache.get(session['key'])
		board = state['board']

		return jsonify(board = board)

	return jsonify()

@cross_origin(allow_headers=['Content-Type'])
@app.route('/board', methods=['GET'])
def gallery():
	allKeys = cache.get('gallery')
	boards = []
	for key in allKeys:
		state = cache.get(key)
		boards.append(state['board'])
	
	return jsonify(boards=boards)


if __name__ == "__main__":
    app.run(debug=True)