// input handlers
	
document.addEventListener('keydown', handleKeyPress);

document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('mouseup', pressSpace);

document.addEventListener('gesturechange', handleGestureChange);
document.addEventListener('gestureend', handleGestureEnd);

var scale;
function handleGestureChange(ev) {
scale = ev.scale;
}
function handleGestureEnd(ev) {
if (scale < 1.0) {
    // zoom out, esc
    pressESC();
    ev.preventDefault();
}
}
function handleKeyPress(e) {
switch (e.keyCode) {
			// left
			case 37:
				pressLeft();
			break;
            case 38:
                pressUp();
                break;
			case 32:
				pressSpace();
			break;
			// right
			case 39:
				pressRight();
			break;
            case 40:
                pressDown();
            case 13:
                pressEnter();
            break;
            case 27:
                pressESC();
                break;
			default:

			break;

	}
	
}
function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY; 
    evt.preventDefault();                                     
};                                                
function handleTouchMove(evt) {
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
            pressLeft();
        } else {
            /* right swipe */
            pressRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            pressUp();
        } else { 
            /* down swipe */
            pressDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                          
};

function pressLeft() {
    switch (gameState) {
        case GameState.IS_PLAYING:
            moveLeft();
            break;
        case GameState.IN_OPTIONS:
            decreaseOption();
            break;
    }
}
function pressRight() {

 switch (gameState) {
        case GameState.IS_PLAYING:
            moveRight();
            break;
        case GameState.IN_OPTIONS:
            increaseOption();
            break;
    }
}
function pressUp() {
    switch (gameState) {
        case GameState.IN_MENU:
        menuUp();
        break;
        case GameState.IN_OPTIONS:
        menuUp();
        break;
    }
}
function pressDown() {
    switch (gameState) {
        case GameState.IN_MENU:
        menuDown();
        break;
        case GameState.IN_OPTIONS:
        menuDown();
        break;
    }
}
function pressSpace() {
    alert('space');
    switch (gameState) {
        case GameState.IN_MENU:
            menuAction();
            break;
        case GameState.IN_OPTIONS:
            toggleOption();
            break;
        case GameState.IN_HIGHSCORE:
            break;
        case GameState.IS_PLAYING:
            fullDropBlock();
            break;
        default:
            startGame();
    }
}
function pressEnter() {


}

function pressESC() {
    switch (gameState) {
        case GameState.IN_HIGHSCORE:
            gameState = GameState.IN_MENU;
        break;
        case GameState.IS_PLAYING:
            stopGame();
            gameState = GameState.IN_MENU;
            Music.playIntroMusic();
            break;
        case GameState.IS_GAME_OVER:
            gameState = GameState.IN_MENU;
            Music.playIntroMusic();
            selectedMenuItem = 0;
            break;
        case GameState.IN_OPTIONS:
            gameState = GameState.IN_MENU;
            saveOptions();
            selectedMenuItem = 0;
            break;
    }
    Music.playSoundEffect(5);
  
}

function moveDown() {
	
}
function moveUp() {
	
}
function moveLeft() {
if (currentBlock.x>0 && blocks[currentBlock.x-1][currentBlock.y] == null) {
blocks[currentBlock.x][currentBlock.y] = null;
blocks[currentBlock.x-1][currentBlock.y] = currentBlock;
currentBlock.x--;
}
}
function moveRight() {
if (currentBlock.x<width-1 && blocks[currentBlock.x+1][currentBlock.y] == null) {
blocks[currentBlock.x][currentBlock.y] = null;
blocks[currentBlock.x+1][currentBlock.y] = currentBlock;
currentBlock.x++;
}
}

function menuUp () {
    if (selectedMenuItem > 0) {
        selectedMenuItem--;
    }
    Music.playSoundEffect(3);

}
function menuDown() {
    if (gameState == GameState.IN_OPTIONS && selectedMenuItem < Object.keys(options).length-1) {
        selectedMenuItem++;
    }

    if (gameState == GameState.IN_MENU && selectedMenuItem < menus[menuActive].items.length-1) {
        selectedMenuItem++;
    }
    Music.playSoundEffect(2);

}

function menuAction() {
    Music.playSoundEffect(4);
    menus[menuActive].items[selectedMenuItem].listener();
    selectedMenuItem = 0;

}

function toggleOption() {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "boolean") {
                options[key] = !options[key];
                log('toggled ' + key);
                Music.playSoundEffect(4);
            }
        }
        i++;
    }

}

function increaseOption () {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "number") {
                if (options[key] < 1) {
                    options[key] = parseFloat((options[key] + 0.01).toFixed(2));
                } 
            log('increased ' + key);
            Music.playSoundEffect(3);
            if (key == "musicVolume") {
                Music.leadGain.gain.value = options.musicVolume;
            } else if (key ="fxVolume") {
                Music.fxGain.gain.value = options.fxVolume;

            }

        }

        }
        i++;
    }
}
function decreaseOption () {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "number") {
            if (options[key] >= 0.01) {
            options[key] = parseFloat((options[key] - 0.01).toFixed(2));
            log('decreased ' + key);
            if (key == "musicVolume") {
                Music.leadGain.gain.value = options.musicVolume;
            } else if (key ="fxVolume") {
                Music.fxGain.gain.value = options.fxVolume;

            }
          }  
            Music.playSoundEffect(2);

        }

        }
        i++;
    }
}


c.addEventListener('mousemove', handleMouse);

function handleMouse(e) {

    var relativeXPosition = (e.pageX - c.offsetLeft) * scaleFactor;
    var relativeYPosition = (e.pageY - c.offsetTop) * scaleFactor;
    log('X: ' + relativeXPosition + ' Y: ' + relativeYPosition);

}