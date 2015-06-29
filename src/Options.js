// options.js

options = {
	"musicVolume": 0.1,
	"fxVolume": 0.1,
	"addition": true,
	"subtraction": true,
	"multiplication": true,
	"division": true,
	"debug": false,
	"showFPS": true
};

if (localStorage.getItem('options') != null) {
	log('Loading options from localStorage');
	options = JSON.parse(localStorage.getItem('options'));
}
function saveOptions() {
	log('Saving options to localStorage');
localStorage.setItem('options', JSON.stringify(options));
}