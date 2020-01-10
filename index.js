const canvas = document.getElementById('CanvasElement');
const ctx = canvas.getContext("2d");
Table.createGrid(ctx);
Snake.food = Table.grid[20][20];
Table.grid[20][20].food = true;//Create the first food
function draw() {
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,600,600)
	Snake.update()
}
Table.grid[20][20].render()

setInterval(function() {draw()}, 164)
draw()
