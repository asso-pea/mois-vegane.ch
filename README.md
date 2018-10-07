# mois-vegane.ch

## Project setup

Run `vagrant up` to install everything, then open two `vagrant ssh` instances and run `npm start` and `lektor server` in each, then visit http://mois-vegane.lo:3000/.

To install the project without using Vagrant, you'll need NodeJS and Python 3. Then create a virtual Python environment
(`virtualenv -p python3 mois-vegane` and then activate it) and run `pip install -r requirements.txt` and install the
JavaScript packages with `npm install`. Then run `npm start` and `lektor server`.

## How to

### Add icons

* Put the SVG file in the `assets/icons` directory
* Import it in the `assets/scripts/icons.js` file
* Use the `icon('name_of_your_icon')` in the template code
* Run `npm start` or `npm run build`

