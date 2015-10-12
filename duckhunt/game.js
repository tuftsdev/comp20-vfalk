// game.js to draw background and two ducks on the canvas


var background = new Image();
background.src = 'duckhunt-background.gif';

var birds = new Image();
birds.src = 'duckhunt_various_sheet.png';

function init() {

	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');

	
	ctx.drawImage(background,0,0,256,240);

	ctx.drawImage(birds,0,120,40,30, 90,40,40,30);

	ctx.drawImage(birds,165,120,40,30, 150,70,40,30);

}