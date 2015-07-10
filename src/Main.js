// Main.js
var lastCalledTime;
var fps;

	function gameTick() {
		// add switch on GameState
		switch (gameState) {
			case GameState.IS_PLAYING:
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, c.width, c.height);
			Drawing.drawBoard();
			Drawing.drawBlocks();
			Drawing.drawOperandBlocks();
			break;
			case GameState.IS_GAME_OVER:
				Drawing.drawGameOver(goFrame);
			break;
			case GameState.IN_MENU:
				Drawing.drawMenu();
			break;
			case GameState.IN_HIGHSCORE:
				Drawing.drawHighscore();
			break;
			case GameState.IN_OPTIONS:
				Drawing.drawOptions();
			break;
		}
		Drawing.drawFPS();

	}
	

	function startGame() {
		blocks = new Array();
		operands = new Array();

		for (var i = 0; i < width; i++) {
		blocks[i] = new Array();
		}
	for (var i = 0; i <= width; i++) {
		operands[i] = new Array();
		}

		// set GameState
		gameState = GameState.IS_PLAYING;
		goFrame = 0;
		currentBlock = null;
		dropBlockLoop = setInterval(BlockActions.dropBlock, 800);
		menuActive = 0;
		BlockActions.spawnRandomBlock();
		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);
		Music.startMusic();
	}
	function initGame() {
	c = document.getElementById('gameCanvas');
	sizeX = 50;
	sizeY = sizeX * 0.8;
	ctx = c.getContext('2d');
	width = 8;
	height = 15;
	borderWidth = 5;
	color = 0;
	gameState = GameState.IN_MENU;
	goFrame = 0;
	blinky = false;
	xDown = null;                                                        
	yDown = null;
	blocks = null;
	currentBlock = null;
	selectedMenuItem = 0;
	menuActive = 0;
	menus = Array();
 	scaleFactor = backingScale(ctx);
 	blinkTimer = setInterval(invertBlink, 600);
 	introMusicTimer = null;
 	highscores = new Array();
if (scaleFactor > 1) {
    c.width = c.width * scaleFactor;
    c.height = c.height * scaleFactor;
    sizeX=sizeX*scaleFactor;
    sizeY=sizeX*0.8;
    // update the context for the new canvas scale
    ctx = c.getContext("2d");

    				
}

	//loop = setInterval(gameTick, 16);
	loop = requestAnimationFrame(animation);

	}

	function stopGame() {
		Music.stopAllMusic();
		window.clearInterval(dropBlockLoop);
	}

	var animation = function() {
		animationFrame = requestAnimationFrame(animation);
		gameTick();
	}
	function doGameOver() {
		gameState = GameState.IS_GAME_OVER;
		stopGame();
		Music.playSoundEffect(1);
	}



initGame();
