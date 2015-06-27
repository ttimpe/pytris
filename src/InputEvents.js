// input handlers
	
document.addEventListener('keydown', handleKeyPress);



function handleKeyPress(e) {
	if (gameInProgress) { 
switch (e.keyCode) {
			// left
			case 37:
				moveLeft();
			break;
			case 32:
				fullDropBlock();
			break;
			// right
			case 39:
				moveRight();
			break;
			default:

			break;

		}
	}
	else if (gameOver) {
		if (e.keyCode == 32) {
			startGame();
		}
	} else if (menuActive != -1) {
        switch (e.keyCode) {
            case 32:
            menuAction();
            break;
            case 13:
            menuAction();
            break;
            case 38:
            menuUp();
            break;
            case 40:
            menuDown();
            break;
        }
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
            moveLeft();
        } else {
            /* right swipe */
            moveRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            moveUp();
        } else { 
            /* down swipe */
            moveDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                          
};
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
}
function menuDown() {
    if (selectedMenuItem < menus[menuActive].items.length-1) {
        selectedMenuItem++;
    }
}

function menuAction() {
    menus[menuActive].items[selectedMenuItem].listener();
}