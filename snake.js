const Snake = {
	x: 25,
	y: 2,
	tail: [],
	parts: 1,
	directionX: 0,
	directionY: 0,
	food: null,
	squareSize: Table.cellSize,
	canvasSquareSize: 600,
	update: function() {
		this.move();
		this.render()
	},
	setDirection: function(x, y) {
		console.log("direction")
		this.directionX = x;
		this.directionY = y;
	},
	move: function() {
		const numberOfCellsMinusOne = this.canvasSquareSize/this.squareSize-1;
		//Checking for boundaries
		if (this.x == 0 && this.directionX == -1) {//Going left
			this.x = numberOfCellsMinusOne
		} else if (this.x == numberOfCellsMinusOne && this.directionX == 1) {//Going right
			this.x=0
		} else if (this.y == 0 && this.directionY == -1) {//Going top
			this.y = numberOfCellsMinusOne
		} else if (this.y == numberOfCellsMinusOne && this.directionY == 1) {//Going bottom
			this.y = 0
		} else {//Normal way
			this.x += this.directionX
			this.y += this.directionY
		}
		//Chekinf for collision
		if (Table.grid[this.x][this.y].snake == true) { //If in the cell we are moving is a part of snake, then length = 1
			this.parts=1
		}
		if (Table.grid[this.x][this.y].food == true) { //If in the cell we are moving is food, then length += 1
			this.parts += 1
			Table.grid[this.x][this.y].food = false
			this.pickNewLocationForFood();
		}
		//Moving, we are all set
		Table.grid[this.x][this.y].snake = true //Add snake to the cell
		this.tail.push(Table.grid[this.x][this.y])//Add this cell to the body
	},
	render() {
		let counter = 0;
		//Look from the end, while the number of times we've run this is smaller than the number of parts
		//we render the cell, and for all other cases we remove the snake from the cell and remove the cell
		//from the tail array 
		for (let i = this.tail.length-1; i >= 0; i--, counter++) {
			if (counter < this.parts) {
				this.tail[i].render();
			} else {
				this.tail[i].snake = null;
				this.tail.splice(i, 1)
			}
		}
		this.food.render();
		// Table.grid[snakeObj.x][snakeObj.y].snake = true;
		// Table.grid[snakeObj.x][snakeObj.y].render()
	},
	pickNewLocationForFood: function() {
		const numberOfCellsMinusOne = this.canvasSquareSize/this.squareSize-1;
		let x = Math.floor(Math.random() * numberOfCellsMinusOne)
		let y = Math.floor(Math.random() * numberOfCellsMinusOne)
		for (let i = 0; i < this.tail.length;i++) {
			while (x == this.tail[i].x) {x = Math.floor(Math.random() * numberOfCellsMinusOne)}
			while (y == this.tail[i].y) {y = Math.floor(Math.random() * numberOfCellsMinusOne)}
		}
		this.food = Table.grid[x][y]
		this.food.food = true;
	}
}
document.addEventListener("keydown", keyHandler);
function keyHandler(event) {
	const key = event.key.toLowerCase()
	if (key == "w") {
		Snake.setDirection(0, -1);
	} else if  (key == "d") {
		Snake.setDirection(1, 0);
	} else if  (key == "s") {
		Snake.setDirection(0, 1);
	} else if  (key == "a") {
		Snake.setDirection(-1, 0);
	} else if (key == "f") {
		draw()
	} else {
		// Do nothing
		console.log(key)
	}


}