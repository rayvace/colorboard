Colorboard
==========

Getting Started
---------------

This project uses Flask to recieve API request for persisting the colorboard to your local datastore. 

As a result, you'll need to run the following to add Flask and related depndencies to your repo:
```
sudo pip install virtualenv
. venv/bin/activate
virtualenv venv
pip install -r requirements.txt
python backend.py
```

To set up your local environment to run your webapp, you'll want to run the following:

```
npm install
bower install
grunt build
grunt server
```

Note
----
This project makes use of generated boilerplate code use Yeoman. Extend this project by follow the steps described in the Yeoman generator-backbone-amd github repo [https://github.com/abiee/generator-backbone-amd]
