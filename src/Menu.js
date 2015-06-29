// Menu.js

function Menu() {
	this.items = [];
}
function MenuItem(title, listener) {
	this.title = title;
	this.listener = listener;
}

// dummy funcs

function showHighscore() {
	gameState = GameState.IN_HIGHSCORE;
}
function showOptions() {
	gameState = GameState.IN_OPTIONS;

}
function showCredits() {

}

var mainMenu = new Menu();

mainMenu.items.push(new MenuItem('START_GAME', startGame));
mainMenu.items.push(new MenuItem('HIGHSCORE', showHighscore));
mainMenu.items.push(new MenuItem('OPTIONS', showOptions));
mainMenu.items.push(new MenuItem('CREDITS', showCredits));

menus.push(mainMenu);