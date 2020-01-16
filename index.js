const ctx = Table.canvas.getContext("2d");
Table.createCanvas();
Table.createGrid(ctx);
Snake.getStarted();
//Snake.tail.push(Table.grid[Snake.x][Snake.y])
// Snake.pickNewLocationForFood()//Create the first food
function draw() {
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,Table.canvasWidth, Table.canvasHeight)
	Snake.update()
}

setInterval(function() {draw()}, 164)
draw()
