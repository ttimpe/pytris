// Main.js
var lastCalledTime;
var fps;

	function gameTick() {
		// add switch on GameState
		switch (gameState) {
			case GameState.IS_PLAYING:
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, c.width, c.height);
			drawBoard();
			drawBlocks();
			break;
			case GameState.IS_GAME_OVER:
				drawGameOver(goFrame);
			break;
			case GameState.IN_MENU:
				drawMenu();
			break;
			case GameState.IN_HIGHSCORE:
				drawHighscore();
			break;
			case GameState.IN_OPTIONS:
				drawOptions();
			break;
		}
		drawFPS();

	}
	
	function drawBlocks() {
		for (var x = 0; x < blocks.length; x++) {
				for (var y = 0; y < blocks[x].length; y++) {
					if (blocks[x][y] != null) {
						blocks[x][y].isFacingDown = true;
						drawTriangle(x * sizeX, y * sizeY, blocks[x][y]);
					}
				}
		}
	}

	function startGame() {
		blocks = new Array();
		for (var i = 0; i < width; i++) {
		blocks[i] = new Array();
		}
		// set GameState
		gameState = GameState.IS_PLAYING;
		goFrame = 0;
		currentBlock = null;
		dropBlockLoop = setInterval(dropBlock, 800);
		menuActive = 0;
		spawnRandomBlock();
		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);
		startMusic();
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
		stopAllMusic();
		window.clearInterval(dropBlockLoop);
	}

	var animation = function() {
		animationFrame = requestAnimationFrame(animation);
		gameTick();
	}
	function doGameOver() {
		gameState = GameState.IS_GAME_OVER;
		stopGame();
		playSoundEffect(1);
	}



initGame();
