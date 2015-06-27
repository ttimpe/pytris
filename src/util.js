// util.js
function invertBlink() {
		blinky = !blinky;
}
function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}
function random(min, max) {
		return parseInt(Math.random() * (max - min) + min);
}