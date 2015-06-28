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
	highscoreActive = true;
	menuActive = -1;
}
function showOptions() {

}
function showCredits() {

}

var mainMenu = new Menu();

mainMenu.items.push(new MenuItem('START', startGame));
mainMenu.items.push(new MenuItem('HIGHSCORE', showHighscore));
mainMenu.items.push(new MenuItem('OPTIONS', showOptions));
mainMenu.items.push(new MenuItem('CREDITS', showCredits));

menus.push(mainMenu);