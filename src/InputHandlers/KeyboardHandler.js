// KeyboardHandler.js
function KeyboardHandler() {
	document.addEventListener('keydown', KeyboardHandler.handleKeyPress);
};
KeyboardHandler.handleKeyPress = function(e) {
switch (e.keyCode) {
			// left
			case 37:
				InputEvents.pressLeft();
			break;
            case 38:
                InputEvents.pressUp();
                break;
			case 32:
				InputEvents.pressSpace();
			break;
			// right
			case 39:
				InputEvents.pressRight();
			break;
            case 40:
                InputEvents.pressDown();
            case 13:
                InputEvents.pressEnter();
            break;
            case 27:
                InputEvents.pressESC();
                break;
			default:

			break;

	}
	
};
