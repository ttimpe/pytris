// draw methods
function Drawing() {};

Drawing.drawLine = function (x1, y1, x2, y2) {
	ctx.beginPath();
  	ctx.moveTo(x1, y1);
  	ctx.lineTo(x2, y2);
  	ctx.stroke();
};
// Draws current FPS if enabled in options
Drawing.drawFPS = function () {
	if(!lastCalledTime) {
 		lastCalledTime = Date.now();
 		fps = 0;
		}
		delta = (new Date().getTime() - lastCalledTime)/1000;
		lastCalledTime = Date.now();
		fps = parseInt (1/delta);

		if (options.showFPS == true) {
			ctx.fillStyle = 'red';
			ctx.font = "bold "+(36*scaleFactor)+"px munroregular";
			ctx.fillText(fps, c.width - ctx.measureText(fps).width, 30*scaleFactor);
		}
};

Drawing.drawRect = function (x, y, width, height) {
	ctx.beginPath();
  	ctx.moveTo(x, y);
  	ctx.lineTo(x + width, y);
  	ctx.lineTo(x + width, y + height);
  	ctx.lineTo(x, y + height);
  	ctx.stroke();
};

Drawing.drawBlocks = function() {
		for (var x = 0; x < blocks.length; x++) {
				for (var y = 0; y < blocks[x].length; y++) {
					if (blocks[x][y] != null) {
						Drawing.drawTriangle(x * sizeX, y * sizeY, blocks[x][y]);
					}
				}
		}
	};
Drawing.drawOperandBlocks = function() {
		for (var x = 0; x < operands.length; x++) {
				for (var y = 0; y < operands[x].length; y++) {
					if (operands[x][y] != null) {
						Drawing.drawTriangle(x * sizeX, y * sizeY, operands[x][y]);
					}
				}
		}
	};
// Draws Triangle - either for block or operand
Drawing.drawTriangle = function (x, y, block) {
	ctx.fillStyle = 'hsl(' + (block.color * 36) + ', 100%, 50%)';
	ctx.beginPath();
	if (block.isFacingDown) {
		ctx.moveTo(x, y);
		ctx.lineTo(x + sizeX, y);
		ctx.lineTo(x + sizeX / 2, y + sizeY);
	} else {
		ctx.fillStyle = '#000';

		ctx.moveTo(x - (sizeX/2), y + sizeY);
		ctx.lineTo(x + (sizeX/2), y + sizeY);
		ctx.lineTo(x, y);
	}
	ctx.fill();
	ctx.font = "bold "+(16*scaleFactor)+"px Courier New";
	ctx.fillStyle = (block.color < 6) ? "#000" : "#fff";

	if (block.isFacingDown) {
		ctx.fillText(block.value, x + sizeX / 2 - ctx.measureText(block.value).width / 2, y + sizeY / 2);
	} else {
		if (block.value != null) {
		ctx.fillText(Object.keys(Operands)[block.value], x  - ctx.measureText(block.value).width / 2, y + parseInt(sizeY * 0.8));
		}
	}
};
// Draws Board Lines
Drawing.drawBoard = function () {
	ctx.strokeStyle = '#000';
	for (var x = 0; x < width; x++) {
		Drawing.drawLine(x * sizeX, 0, x * sizeX, c.height);
	}
	for (var y = 0; y < height; y++) {
		Drawing.drawLine(0, y * sizeY, c.width, y * sizeY);
	}
}
Drawing.drawBoolean = function (x,y,bool) {
	ctx.fillStyle = "white";
	var label = "OFF";
	if (bool) {
		label = "ON"
	}
	ctx.fillText(label,x,y);
};
// Draws slider for options
Drawing.drawSlider = function (x,y, width, height, number) {
	// first draw slider line
	log('drawing line from ' + x + ' to ' + (x+width));
	var sliderWidth = 8 * scaleFactor;
	ctx.strokeStyle = "white";
	ctx.lineWidth = 2.5*scaleFactor;
	ctx.beginPath();
  	ctx.moveTo(x, y);
  	ctx.lineTo(x+width, y);
  	ctx.stroke();

	// then draw block
	ctx.fillStyle = "white";
	var sliderX = x + (number * width);
	ctx.fillRect(sliderX,y - (height/2), sliderWidth,height);
	

};
// Draws one frame for "GAME OVER"  screen
Drawing.drawGameOver = function () {
if (goFrame < (c.width / 2 )) {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
	ctx.fillStyle = "red";
	ctx.strokeStyle = "white";
	ctx.font = "bold "+(48*scaleFactor)+"px munroregular";
	var words = translations['GAME_OVER'].split(' ');
	log('Drawing GameOver Frame ' + goFrame);
	ctx.fillText(words[0], goFrame-(ctx.measureText(words[0]).width+20), (height*sizeY) / 2);
	var len = (c.width/1.3) + ctx.measureText(words[1]).width+20;
	ctx.fillText(words[1], len - goFrame, (height*sizeY) / 2);

	goFrame=goFrame+5;
	}
	Drawing.drawMessage(translations.GAME_OVER_MESSAGE);

};
// Draws Main Menu
Drawing.drawMenu = function () {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
	var theMenu = menus[0];
	var menuY = c.width * 0.6;
	ctx.font = "bold "+(36*scaleFactor)+"px munroregular";
	for (var i=0; i<theMenu.items.length; i++) {
		var y =  menuY + (i*44*scaleFactor);
		log('Drawing MenuItem ' + i + ' at y: ' + y);
		ctx.fillStyle = (i == selectedMenuItem) ? "#06a4ff" : "#0036ff";
		ctx.fillText(translations[theMenu.items[i].title], (c.width - ctx.measureText(translations[theMenu.items[i].title]).width) / 2,y);
	}
	Drawing.drawMessage('build ' + VERSION);
};

// Draws blinking message in lower third of screen
Drawing.drawMessage = function (message)  {
	ctx.fillStyle = "white";
	ctx.font = "bold "+(20*scaleFactor)+"px munroregular";
	ctx.fillStyle = blinky ? "white" : "black";
	ctx.fillText(message, c.width / 2 - ctx.measureText(message).width / 2, (height*sizeY) * 0.8);
};
// Draws title for menu
Drawing.drawMenuTitle = function (str) {
	ctx.font = "bold "+(36*scaleFactor)+"px munroregular";
	ctx.fillStyle = 'yellow';
	ctx.fillText(str, (c.width - ctx.measureText(str).width)/2, 100*(scaleFactor));
};

// Draws frame for highscore list
Drawing.drawHighscore = function () {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
	Drawing.drawMenuTitle(translations.HIGHSCORE);
	ctx.fillStyle = 'white';

	ctx.font = "bold "+(36*scaleFactor)+"px munroregular";
	for (var i=0; i<highscores.length; i++) {
		ctx.fillText((i+1)+'.', c.width*0.15, (c.height*0.3) + (i*40*scaleFactor));
		ctx.fillText(highscores[i].name, c.width*0.25, (c.height*0.3) + (i*40*scaleFactor));
		ctx.fillText(highscores[i].score, c.width - (c.width*0.3), (c.height*0.3) + (i*40*scaleFactor));

	}
	Drawing.drawMessage(translations.ESC_BACK_MESSAGE);
};

// Draws frame for options list

Drawing.drawOptions = function () {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
	Drawing.drawMenuTitle(translations.OPTIONS);
	ctx.font = "bold "+(24*scaleFactor)+"px munroregular";
	var i = 0;
	ctx.fillStyle = 'white';
	for (var key in options) {
		if (selectedMenuItem == i) {
			ctx.fillStyle = "yellow";
		} else {
			ctx.fillStyle = "white"
		}
		ctx.fillText(translations[key.toUpperCase()], c.width*0.2, (c.height*0.3) + (i*40*scaleFactor));
		ctx.fillStyle = "white"
		// TODO (?): STRINGS
		switch (typeof options[key]){
			case 'string':
			break;
			case 'boolean':
			Drawing.drawBoolean(c.width - (c.width*0.3), (c.height*0.3) + (i*40*scaleFactor),options[key]);
			break;
			case 'number':
			Drawing.drawSlider(c.width - (c.width*0.3), (c.height*0.3) + (i*40*scaleFactor),100, 20*scaleFactor, options[key]);
			break;
		}
		i++;
	}
	Drawing.drawMessage(translations.ESC_BACK_MESSAGE);
};



	
	

	
	
	