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
}
}
function pressRight() {
if (gameInProgress) {
    moveRight();
}
}
function pressUp() {
if (menuActive != -1) {
    menuUp();
}
}
function pressDown() {
if (menuActive != -1) {
    menuDown();
}
}
function pressSpace() {
    if (gameInProgress == false && menuActive == -1) {
        startGame();
    } else if (menuActive != -1) {
        menuAction();
    } else {
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
    if (selectedMenuItem < menus[menuActive].items.length-1) {
        selectedMenuItem++;
    }
    playSoundEffect(2);

}

function menuAction() {
        playSoundEffect(4);
    menus[menuActive].items[selectedMenuItem].listener();
}