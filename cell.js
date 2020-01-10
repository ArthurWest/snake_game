class Cell {
	constructor(ctx, x, y) {
		this.x = x
		this.y = y
		this.snake = null;
		this.food = null;
		this.ctx = ctx;//For rendering
		this.squareSize = Table.cellSize;
	}
	render() {
		if (this.snake) {
			ctx.fillStyle = "black"
			ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize)
		} else if (this.food) {
			ctx.fillStyle = "red"
			ctx.fillRect(this.x, this.y, this.squareSize, this.squareSize)
		} else {
			//Do nothing
		}
	}
}
//Main part
const Table = {
	cellSize: 20,
	grid: null,
	createGrid: function(ctx) {
		const canvasSize = 600;
		const squareSize = canvasSize/this.cellSize;
		const grid = make2Darray(squareSize, squareSize)
		for (let i = 0; i < squareSize; i++) {
			for (let j = 0; j < squareSize; j++) {
				grid[i][j] = new Cell(ctx, i*this.cellSize, j*this.cellSize)
			}
		}
		this.grid = grid
	}
}
//Helper function
function make2Darray(x, y) {
	let ar = new Array(x);
	for (let i = 0; i < x; i++) {
		ar[i] = new Array(y);
	}
	return ar;
}