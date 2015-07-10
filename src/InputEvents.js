// input handlers
function InputEvents() {};

var scale;

InputEvents.pressLeft = function() {
    switch (gameState) {
        case GameState.IS_PLAYING:
            InputEvents.moveLeft();
            break;
        case GameState.IN_OPTIONS:
            InputEvents.decreaseOption();
            break;
    }
}
InputEvents.pressRight = function() {
 switch (gameState) {
        case GameState.IS_PLAYING:
            InputEvents.moveRight();
            break;
        case GameState.IN_OPTIONS:
            InputEvents.increaseOption();
            break;
    }
}
InputEvents.pressUp = function() {
    switch (gameState) {
        case GameState.IN_MENU:
            InputEvents.menuUp();
        break;
        case GameState.IN_OPTIONS:
            InputEvents.menuUp();
        break;
    }
}
InputEvents.pressDown = function() {
    switch (gameState) {
        case GameState.IN_MENU:
            InputEvents.menuDown();
        break;
        case GameState.IN_OPTIONS:
            InputEvents.menuDown();
        break;
    }
}
InputEvents.pressSpace = function() {
    switch (gameState) {
        case GameState.IN_MENU:
            InputEvents.menuAction();
            break;
        case GameState.IN_OPTIONS:
            InputEvents.toggleOption();
            break;
        case GameState.IN_HIGHSCORE:
            break;
        case GameState.IS_PLAYING:
            BlockActions.fullDropBlock();
            break;
        default:
            startGame();
    }
}
InputEvents.pressEnter = function() {


}

InputEvents.pressESC = function() {
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

InputEvents.moveDown = function() {
	
}
InputEvents.moveUp = function() {
	
}
InputEvents.moveLeft = function() {
if (currentBlock.x>0 && blocks[currentBlock.x-1][currentBlock.y] == null) {
blocks[currentBlock.x][currentBlock.y] = null;
blocks[currentBlock.x-1][currentBlock.y] = currentBlock;
currentBlock.x--;
}
}
InputEvents.moveRight = function() {
    if (currentBlock.x<width-1 && blocks[currentBlock.x+1][currentBlock.y] == null) {
        blocks[currentBlock.x][currentBlock.y] = null;
        blocks[currentBlock.x+1][currentBlock.y] = currentBlock;
        currentBlock.x++;
    }
}

InputEvents.menuUp = function() {
    if (selectedMenuItem > 0) {
        selectedMenuItem--;
    }
    Music.playSoundEffect(3);

}
InputEvents.menuDown = function() {
    if (gameState == GameState.IN_OPTIONS && selectedMenuItem < Object.keys(options).length-1) {
        selectedMenuItem++;
    }

    if (gameState == GameState.IN_MENU && selectedMenuItem < menus[menuActive].items.length-1) {
        selectedMenuItem++;
    }
    Music.playSoundEffect(2);
}

InputEvents.menuAction = function() {
    Music.playSoundEffect(4);
    menus[menuActive].items[selectedMenuItem].listener();
    selectedMenuItem = 0;

}

InputEvents.toggleOption = function() {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "boolean") {
                options[key] = !options[key];
                Helpers.log('toggled ' + key);
                Music.playSoundEffect(4);
            }
        }
        i++;
    }

}

InputEvents.increaseOption = function () {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "number") {
                if (options[key] < 1) {
                    options[key] = parseFloat((options[key] + 0.01).toFixed(2));
                } 
            Helpers.log('increased ' + key);
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
InputEvents.decreaseOption = function() {
    var i=0;
    for (var key in options) {
        if (i == selectedMenuItem) {
            if (typeof options[key] == "number") {
            if (options[key] >= 0.01) {
            options[key] = parseFloat((options[key] - 0.01).toFixed(2));
            Helpers.log('decreased ' + key);
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
// Init all handlers
KeyboardHandler();
TouchHandler();
MouseHandler();

