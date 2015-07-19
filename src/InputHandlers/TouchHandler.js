// TouchHandler.js
function TouchHandler() {
    document.addEventListener('gesturechange', TouchHandler.handleGestureChange);
    document.addEventListener('gestureend', TouchHandler.handleGestureEnd);
    document.addEventListener('touchstart', TouchHandler.handleTouchStart);
    document.addEventListener('touchmove', TouchHandler.handleTouchMove);
};

TouchHandler.handleGestureChange = function(ev) {
    scale = ev.scale;
}
TouchHandler.handleGestureEnd = function(ev) {
    if (scale < 1.0) {
        // zoom out, esc
        InputEvents.pressESC();
        ev.preventDefault();
    }
}

TouchHandler.handleTouchStart = function(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY; 
};                                                
TouchHandler.handleTouchMove = function(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            InputEvents.pressLeft();
        } else {
            /* right swipe */
            InputEvents.pressRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            InputEvents.pressUp();
        } else { 
            /* down swipe */
            InputEvents.pressDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                          
};


