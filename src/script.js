window.onload = function() {

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// Resources load
	var resources = new Resources();

	Promise.all( resources.loadAll() ).then( function() {

		ctx.resources = resources;

		var game = new Game( ctx );
		game.reset();

		var height = 16;
		var width = 30;

		for( let i = 0; i < height; i++ ) {

			game.field.cells[ i ] = [];

			for( let j = 0; j < width; j++ ) {

				game.field.cells[ i ][ j ] = new Cell( ctx, game.field );

			}

		}

		game.field.bombNumber = 99;
		game.flagNumber = game.field.bombNumber;

		game.field.cellsCount = height * width - game.field.bombNumber;

		game.field.xCoord = canvas.width / 2 - width * 24 / 2;
		game.field.yCoord = 60;

		game.drawDashboard();
		
		game.field.draw();

	} );

};