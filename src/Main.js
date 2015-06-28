// Main.js
var lastCalledTime;
var fps;

	function gameTick() {
		if (gameInProgress) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, c.width, c.height);
		drawBoard();
		for (var x = 0; x < blocks.length; x++) {
			for (var y = 0; y < blocks[x].length; y++) {
				if (blocks[x][y] != null) {
				blocks[x][y].isFacingDown = true;
				drawTriangle(x * sizeX, y * sizeY, blocks[x][y]);
			}
			}
		}
		
		} else if (gameOver) {
			drawGameOver(goFrame);
		} else if (menuActive != -1) {
			drawMenu();
		} else if (highscoreActive) {
			drawHighscore();
		} else if (optionsActive) {
			drawOptions();
		}
		drawFPS();

	}
	
	function startGame() {
		blocks = new Array();
		for (var i = 0; i < width; i++) {
		blocks[i] = new Array();
		}

		gameInProgress = true;
		gameOver = false;
		goFrame = 0;
		currentBlock = null;
		dropBlockLoop = setInterval(dropBlock, 800);
		menuActive = -1;
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
	gameInProgress = false;
	gameOver = false;
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
 	highscoreActive = false;
 	highscores = new Array();
 	optionsActive = false;
 
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
		gameInProgress = false;
	}

	var animation = function() {
		animationFrame = requestAnimationFrame(animation);
		gameTick();
	}
	function doGameOver() {
		stopGame();
		gameOver = true;
		playSoundEffect(1);
	}



initGame();
