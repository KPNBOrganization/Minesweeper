window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var game = new Game( ctx );
		game.reset();


	var height = 10;
	var width = 10;

	var bombs = 10;

	for( let i = 0; i < height; i++ ) {

		game.field.cells[ i ] = [];

		for( let j = 0; j < width; j++ ) {

			game.field.cells[ i ][ j ] = new Cell( ctx );

		}

	}

	game.field.draw();

};