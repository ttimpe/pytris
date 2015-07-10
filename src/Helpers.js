// Helpers.js
function Helpers() {};
// Simply inverts boolean
Helpers.invertBlink = function() {
		blinky = !blinky;
}
// Support for retina screens
Helpers.backingScale = function(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}
Helpers.random = function(min, max) {
		return parseInt(Math.random() * (max - min) + min);
}
// Logs to console if enabled in options using format "[CLASS] Error Message"
Helpers.log = function(str) {
	if (options.debug) {
		 var stack = new Error().stack;
         var lineAccessingLogger = stack.split("\n")[2];
         var fileName = lineAccessingLogger.substring(lineAccessingLogger.lastIndexOf("/") + 1, lineAccessingLogger.lastIndexOf('.'));
		  console.log('['+ fileName+ '] ' + str);

	}
}