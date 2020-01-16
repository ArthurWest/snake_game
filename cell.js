class Cell {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.snake = null;
		this.food = null;
	}
	render() {
		if (this.snake) {
			ctx.fillStyle = "black"
			ctx.fillRect(this.x*Table.cell.width, this.y*Table.cell.height, Table.cell.width, Table.cell.height)
		} else if (this.food) {
			ctx.fillStyle = "red"
			ctx.fillRect(this.x*Table.cell.width, this.y*Table.cell.height, Table.cell.width, Table.cell.height)
		} else {
			//Do nothing
		}
	}
}
//Main part
const Table = {
	canvasWidth:400,
	canvasHeight:400,
	cell:{width:20, height:20},
	grid: null,
	canvas: document.getElementById('CanvasElement'),
	createCanvas: function() {
		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;
	},

	createGrid: function() {
		const cols = this.canvasWidth/this.cell.width;
		const rows = this.canvasHeight/this.cell.height;
		const grid = make2Darray(cols, rows);
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = new Cell(i, j)
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
