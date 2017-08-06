mois-vegane.ch
==============

Project setup
-------------

Run `vagrant up` to install everything, then open two `vagrant ssh` instances and run `npm start` and `lektor server` in each, then visit http://mois-vegane.lo/.

To install the project without using Vagrant, you'll need NodeJS and Python 3. Then create a virtual Python environment
(`virtualenv -p python3 mois-vegane` and then activate it) and run `pip install -r requirements.txt` and install the
JavaScript packages with `npm install`. Then run `npm start` and `lektor server`.
