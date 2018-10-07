window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// Resources load
	var resources = new Resources();

	Promise.all( resources.loadAll() ).then( function() {

		ctx.resources = resources;

		var game = new Game( ctx );
		game.reset();

		var height = 10;
		var width = 10;

		for( let i = 0; i < height; i++ ) {

			game.field.cells[ i ] = [];

			for( let j = 0; j < width; j++ ) {

				game.field.cells[ i ][ j ] = new Cell( ctx, game.field );

			}

		}

		game.field.bombNumber = 10;

		game.field.cellsCount = height * width - game.field.bombNumber;

		game.field.draw();

	} );

};