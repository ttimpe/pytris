// MouseHandler.js
function MouseHandler() {
	document.addEventListener('mouseup', InputEvents.pressSpace);
	c.addEventListener('mousemove', MouseHandler.handleMouse);
};

MouseHandler.handleMouse = function(e) {

    var relativeXPosition = (e.pageX - c.offsetLeft) * scaleFactor;
    var relativeYPosition = (e.pageY - c.offsetTop) * scaleFactor;
    Helpers.log('X: ' + relativeXPosition + ' Y: ' + relativeYPosition);
};
