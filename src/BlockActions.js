// Block actions
function spawnRandomBlock() {
		var x = random(0, width);
		currentBlock = new Block();
		currentBlock.color = random(1, 10);
		currentBlock.value = random(1, 10);
		currentBlock.x = x;
		currentBlock.y = 0;
		blocks[x][0] = currentBlock;

	}


	function dropBlock() {
		
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
				playSoundEffect(0);
				log('Invalidating currentBlock');
				currentBlock == null;
				log('Spawning new block');
				spawnRandomBlock();

				return false;
				}
			}
		}

	}

	function fullDropBlock() {
		while(dropBlock() == true) {
			log('Dropping');
		}
		
	}