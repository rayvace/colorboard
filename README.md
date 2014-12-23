Colorboard
==========

Getting Started
---------------

This project uses a python backend to receive API requests for persisting the colorboard to your local datastore (note, I use SimpleCache here for simplicity). 

As a result, you'll need to add Flask and related depndencies before running your app:
```
sudo pip install virtualenv
. venv/bin/activate
virtualenv venv
pip install -r requirements.txt
python backend.py
```

To set up your local environment to run your front-end client, you'll want to run the following:

```
npm install
bower install
grunt build
grunt server
```

![Colorboard](https://raw.githubusercontent.com/rayvace/colorboard/master/app/images/colorboard.png)

Note
----
Project scaffolding created using Yeoman [generator-backbone-amd](https://github.com/abiee/generator-backbone-amd). If you want to extend this project follow the steps described in the linked github repo.
