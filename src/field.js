function Field( ctx )
{
	this.cells = [];

	this.bombNumber;

	this.draw = function() {

		ctx.fillStyle = "#bdbdbd";
		ctx.fillRect( 0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight );

		var cells = this.cells;

		var closedCellImage = new Image( 24, 24 );
			closedCellImage.src = 'images/closed-cell.jpg';
			// closedCellImage.cells = cells;

		closedCellImage.onload = function() {

			for( let i = 0; i < cells.length; i++ ) {

				for( let j = 0; j < cells[ i ].length; j++ ) {

					cells[ i ][ j ].xCoord = i * 24;
					cells[ i ][ j ].yCoord = j * 24;

					ctx.drawImage( this, i * 24, j * 24 );

				}

			}

		};

		ctx.canvas.addEventListener( 'click', function( event ) {

			let i = Math.ceil( event.clientY / 24 ) - 1;
			let j = Math.ceil( event.clientX / 24 ) - 1;

			console.log( cells[ i ][ j ] );

		});

	};
}