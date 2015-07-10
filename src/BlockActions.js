// BlockActions.js
function BlockActions() {};
BlockActions.spawnRandomBlock = function() {
	var x = random(0, width);
	currentBlock = new Block();
	currentBlock.color = random(1, 10);
	currentBlock.value = random(1, 10);
	currentBlock.x = x;
	currentBlock.y = 0;
	currentBlock.isFacingDown = true;
	blocks[x][0] = currentBlock;
}
BlockActions.dropBlock = function () {
	if (currentBlock) {
		if (blocks[currentBlock.x][currentBlock.y+1] == undefined && currentBlock.y+1 < height) {
			blocks[currentBlock.x][currentBlock.y] = null;
			blocks[currentBlock.x][currentBlock.y+1] = currentBlock;
			currentBlock.y++;
			return true;
		} else {
			if (currentBlock.y == 0) {
				doGameOver();
			} else {
			Music.playSoundEffect(0);
			log('Invalidating currentBlock');
			currentBlock == null;
			log('Spawning new block');
			BlockActions.spawnRandomBlock();

			return false;
			}
		}
	}
}
BlockActions.fullDropBlock = function() {
	while(BlockActions.dropBlock() == true) {
		log('Dropping');
	}
		
}
BlockActions.spawnOperandBlock = function(x,y, operand) {
	var operandBlock = new Block();
	operandBlock.isFacingDown = false;
	operandBlock.color = 7;
	operandBlock.value = operand;
	operands[x][y] = operandBlock;
}
BlockActions.spawnOperandRow = function(row) {
	BlockActions.spawnOperandBlock(0, row, null);
	for (var i =1; i<width-1; i++) {
		BlockActions.spawnOperandBlock(i, row, random(1,5));
	}
	BlockActions.spawnOperandBlock(width-1, row, 0);
	BlockActions.spawnOperandBlock(width, row, null);
}
BlockActions.evalRow = function(row) {
	// should return true when row is true
	var resultString = '';
	for (var l=0; l<width-1; l++) {
		if (operands[l][row].value != null) {
			resultString += Object.keys(Operands)[operands[l][row].value]; 
		}
		resultString += blocks[l][row].value;
	}
	log('RESULT STRING: ' + resultString);
	log('SHOULD BE ' + parseInt(eval(resultString)));
	if (parseInt(eval(resultString)) == blocks[width-1][row]) {
		return true;
	}
	return false;
}