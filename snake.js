const Snake = {
	x: 0,
	y: 0,
	tail: [],
	parts: 1,
	directionX: 0,
	directionY: 0,
	food: null,
	update: function() {
		this.move();
		this.render();
	},
	setDirection: function(x, y) {
		if (this.parts>1 && this.x+x==this.tail[this.parts-2].x && this.y+y==this.tail[this.parts-2].y) {
			//Don't move
			//TODO Make this work when you cross boundaries!
		} else {
			console.log("changed")
			this.directionX = x;
			this.directionY = y;
		}
	},
	move: function() {
		const cols = Table.grid.length-1;//Index of the last col
		const rows = Table.grid[0].length-1;//Index of the last row
		//Checking for boundaries
		if (this.x == 0 && this.directionX == -1) {//Going left
			this.x = cols
		} else if (this.x == cols && this.directionX == 1) {//Going right
			this.x=0
		} else if (this.y == 0 && this.directionY == -1) {//Going top
			this.y = rows
		} else if (this.y == rows && this.directionY == 1) {//Going bottom
			this.y = 0
		} else {//Normal way
			this.x += this.directionX
			this.y += this.directionY
		}
		//Cheking for collision
		if (Table.grid[this.x][this.y].snake == true) { //If in the cell we are moving is a part of snake, then length = 1
			this.parts=1
		}
		//Moving, we are all set
		Table.grid[this.x][this.y].snake = true //Add snake to the cell
		this.tail.push(Table.grid[this.x][this.y])//Add this cell to the body
		this.moved = true; // Has the snake moved since the last change of direction. It's for bug fixing

		if (Table.grid[this.x][this.y].food == true) { //If in the cell we are moving is food, then length += 1
			this.parts += 1
			Table.grid[this.x][this.y].food = false
			this.pickNewLocationForFood();
		}

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
	},
	pickNewLocationForFood: function() {
		/** This function picks a new location for food where there is no snake
		Returns nothing, just ends if there is no more space to choose from

		*/
		const options = []
		for (let i = 0; i < Table.grid.length; i++) {
			for (let j = 0; j < Table.grid[0].length;j++) {
				if (Table.grid[i][j].snake == null) {
					options.push(Table.grid[i][j])	
				}
			}
		}
		if (options.length < 1) {
			console.log("There is no more space. Game has ended")
			return;
		}

		const randomIndex = Math.floor(Math.random() * options.length);
		let foodCell = options[randomIndex];

		foodCell.food=true;
		Snake.food = foodCell;
	},
	getStarted: function() {
		this.tail[0] = Table.grid[this.x][this.y];
		this.pickNewLocationForFood();
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
