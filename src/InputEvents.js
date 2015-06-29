// input handlers
	
document.addEventListener('keydown', handleKeyPress);



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
if (gameInProgress) {
    moveLeft();
} else if (optionsActive) {
    decreaseOption();
}
}
function pressRight() {
if (gameInProgress) {
    moveRight();
} else if (optionsActive) {
    increaseOption();
}
}
function pressUp() {
if (menuActive != -1 | optionsActive) {
    menuUp();
}
}
function pressDown() {
if (menuActive != -1 | optionsActive) {
    menuDown();
}
}
function pressSpace() {
    if (gameInProgress == false && menuActive == -1 && highscoreActive == false && optionsActive == false) {
        startGame();
    } else if (menuActive != -1) {
        menuAction();
    } else if (optionsActive) {
        toggleOption();
    } else if (highscoreActive) {

    }
        else {
        fullDropBlock();
    }
}
function pressEnter() {


}

function pressESC() {
    if (highscoreActive) {
        highscoreActive = false;
        menuActive = 0;
        playSoundEffect(5);
    } else if (gameInProgress || gameOver) {
        stopGame();
        gameOver = false;
        playIntroMusic();
        menuActive = 0;
        playSoundEffect(5);

    } else if (optionsActive) {
        optionsActive = false;
        selectedMenuItem = 0;
        menuActive = 0;
        saveOptions();
        playSoundEffect(5);
    }
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
    playSoundEffect(3);

}
function menuDown() {
    if (optionsActive && selectedMenuItem < Object.keys(options).length-1) {
        selectedMenuItem++;
    }

    if (menuActive > -1 && selectedMenuItem < menus[menuActive].items.length-1) {
        selectedMenuItem++;
    }
    playSoundEffect(2);

}

function menuAction() {
        playSoundEffect(4);
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
            playSoundEffect(4);

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
                if (options[key] < 0.3) {
                    options[key] = options[key] + 0.05;
                } 
            log('increased ' + key);
            playSoundEffect(3);
            if (key == "musicVolume") {
                leadGain.gain.value = options.musicVolume;
            } else if (key ="fxVolume") {
                fxGain.gain.value = options.fxVolume;

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
            if (options[key] > 0.05) {

            options[key] = options[key] - 0.05;
            log('decreased ' + key);
            if (key == "musicVolume") {
                leadGain.gain.value = options.musicVolume ;
            } else if (key ="fxVolume") {
                fxGain.gain.value = options.fxVolume;

            }
          }  
            playSoundEffect(2);

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