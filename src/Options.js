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
	Helpers.log('Loading options from localStorage');
	options = JSON.parse(localStorage.getItem('options'));
}
function saveOptions() {
	Helpers.log('Saving options to localStorage');
	localStorage.setItem('options', JSON.stringify(options));
}