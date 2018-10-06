function Field( ctx, gameState )
{
	this.gameState = gameState;

	this.cells = [];

	this.bombNumber;

	this.draw = function() {

		ctx.fillStyle = "#bdbdbd";
		ctx.fillRect( 0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight );

		let cells = this.cells;
		let bombNumber = this.bombNumber;
		let gameState = this.gameState;

		var closedCellImage = new Image( 24, 24 );
			closedCellImage.src = 'images/closed-cell.jpg';

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

			let i = Math.ceil( event.clientX / 24 ) - 1;
			let j = Math.ceil( event.clientY / 24 ) - 1;

			if( gameState == GAME_PAUSED ) {

				var bombs = 0;

				while( bombs < bombNumber ) {

					let bombRow = Math.floor( Math.random() * cells.length );
					let bombColumn = Math.floor( Math.random() * cells[ 0 ].length );

					if( cells[ bombRow ][ bombColumn ].isBomb == false && bombRow != i && bombColumn != j ) {

						cells[ bombRow ][ bombColumn ].isBomb = true;

						bombs++;

						ctx.fillStyle = '#000000';
						ctx.fillRect( cells[ bombRow ][ bombColumn ].xCoord, cells[ bombRow ][ bombColumn ].yCoord, 24, 24 );

					}

				}

				gameState = GAME_ON;

			}

		});

	};
}