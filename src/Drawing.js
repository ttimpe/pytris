// draw methods
	function drawLine(x1, y1, x2, y2) {
		ctx.beginPath();
      	ctx.moveTo(x1, y1);
      	ctx.lineTo(x2, y2);
      	ctx.stroke();
	}
	function drawRect(x, y, width, height) {
		ctx.beginPath();
      	ctx.moveTo(x, y);
      	ctx.lineTo(x + width, y);
      	ctx.lineTo(x + width, y + height);
      	ctx.lineTo(x, y + height);
      	ctx.stroke();
	}
	function drawTriangle(x, y, block) {
		ctx.fillStyle = 'hsl(' + (block.color * 36) + ', 100%, 50%)';
		ctx.beginPath();
    	if (block.isFacingDown) {
    		ctx.moveTo(x, y);
    		ctx.lineTo(x + sizeX, y);
   			ctx.lineTo(x + sizeX / 2, y + sizeY);
    	} else {
    		ctx.moveTo(x, y + sizeY);
    		ctx.lineTo(x + sizeX, y + sizeY);
    		ctx.lineTo(x + sizeX / 2, y);
    	}
    	ctx.fill();
    	ctx.font = "bold "+(16*scaleFactor)+"px Courier New";
    	ctx.fillStyle = (block.color < 6) ? "#000" : "#fff";

    	if (block.isFacingDown) {
    		ctx.fillText(block.value, x + sizeX / 2 - ctx.measureText(block.value).width / 2, y + sizeY / 2);
    	} else {
    		ctx.fillText(block.value, x + sizeX / 2 - ctx.measureText(block.value).width / 2, y + parseInt(sizeY * 0.8));
    	}
	}
	function drawBoard() {
		ctx.strokeStyle = '#000';
		for (var x = 0; x < width; x++) {
			drawLine(x * sizeX, 0, x * sizeX, c.height);
		}
		for (var y = 0; y < height; y++) {
			drawLine(0, y * sizeY, c.width, y * sizeY);
		}
	}
	function drawGameOver() {
	if (goFrame < (c.width / 2 )) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
		ctx.fillStyle = "red";
		ctx.strokeStyle = "white";
    	ctx.font = "bold "+(48*scaleFactor)+"px munroregular";
		log('Drawing GameOver Frame ' + goFrame);
		ctx.fillText('GAME', goFrame-(ctx.measureText('GAME').width+20), (height*sizeY) / 2);
		var len = (c.width/1.3) + ctx.measureText('OVER').width+20;
		ctx.fillText('OVER', len - goFrame, (height*sizeY) / 2);
		goFrame=goFrame+5;
		}
	}

	function drawMenu() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,(sizeX*width), (sizeY*height));
		var theMenu = menus[menuActive];
		var menuY = c.width * 0.6;
		ctx.font = "bold "+(36*scaleFactor)+"px munroregular";
		for (var i=0; i<theMenu.items.length; i++) {
			var y =  menuY + (i*88);
			log('Drawing MenuItem ' + i + ' at y: ' + y);
			ctx.fillStyle = (i == selectedMenuItem) ? "#06a4ff" : "#0036ff";
			ctx.fillText(theMenu.items[i].title, (c.width - ctx.measureText(theMenu.items[i].title).width) / 2,y);
		}
	}

	function drawPlayAgainMessage() {
		ctx.fillStyle = "white";
		var message = "Press [ENTER] or tap to play again"
    	ctx.font = "bold "+(20*scaleFactor)+"px munroregular";
    	ctx.fillStyle = blinky ? "white" : "black";
		ctx.fillText(message, c.width / 2 - ctx.measureText(message).width / 2, (height*sizeY) * 0.8);
	}