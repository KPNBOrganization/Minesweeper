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

			if( cells[ i ] && cells[ i ][ j ] ) {

				if( gameState == GAME_PAUSED ) {

					if( bombNumber <= ( cells.length * cells[ 0 ].length - 1 ) ) {

						var bombs = 0;

						while( bombs < bombNumber ) {

							let bombRow = Math.floor( Math.random() * cells.length );
							let bombColumn = Math.floor( Math.random() * cells[ 0 ].length );

							if( cells[ bombRow ][ bombColumn ].isBomb == false && !( bombRow == i && bombColumn == j ) ) {

								cells[ bombRow ][ bombColumn ].isBomb = true;

								bombs++;

								var bombImage = new Image( 24, 24 );
									bombImage.src = 'images/bomb.jpg';

								bombImage.onload = function() {

									ctx.drawImage( this, bombColumn * 24, bombRow * 24 );

								};

							}

						}

						gameState = GAME_ON;

					}

				}

			}

			for( let i = 0; i < cells.length; i++ ) {

				for( let j = 0; j < cells[ i ].length; j++ ) {

					for( let k = -1; k <= 1; k++ ) {

						for( let l = -1; l <= 1; l++ ) {

							if( cells[ i + k ] && cells[ i + k ][ j + l ] && !( k == 0 && l == 0 ) ) {

								if( cells[ i + k ][ j + l ].isBomb )
									cells[ i ][ j ].indicator++;

							}

						}

					}

					if( cells[ i ][ j ].isBomb == false ) {

						ctx.font = '20px Consolas';

						var COLORS = [
						    '#0000ff', // 1
						    '#017f01', // 2
						    '#ff0000', // 3
						    '#010080', // 4
						    '#810102', // 5
						    '#008081', // 6
						    '#000000', // 7
						    '#808080' // 8
						];

						var openedCellImage = new Image( 24, 24 );
							openedCellImage.src = 'images/opened-cell.jpg';

						openedCellImage.onload = function() {

							// ctx.drawImage( this, i * 24, j * 24 );

							// ctx.fillStyle = COLORS[ cells[ i ][ j ].indicator ];
							// ctx.fillText( cells[ i ][ j ].indicator, 24 * i + 6, j * 24 - 5 );

						};

					}

				}

			}

			console.log( cells );

			/*ctx.font = '20px Consolas';

			var COLORS = [
			    '#0000ff', // 1
			    '#017f01', // 2
			    '#ff0000', // 3
			    '#010080', // 4
			    '#810102', // 5
			    '#008081', // 6
			    '#000000', // 7
			    '#808080' // 8
			];

			for(let i = 0; i < 8; i++) {

				var openedCellImage = new Image( 24, 24 );
					openedCellImage.src = 'images/opened-cell.jpg';

				openedCellImage.onload = function() {

					ctx.drawImage( this, i * 24, 0 * 24 );

					ctx.fillStyle = COLORS[ i ];
					ctx.fillText( i + 1, 24 * i + 6, 24 - 5 );

				};

			}*/

		});

	};
}