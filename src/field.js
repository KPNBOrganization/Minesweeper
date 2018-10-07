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

		for( let i = 0; i < cells.length; i++ ) {

			for( let j = 0; j < cells[ i ].length; j++ ) {

				cells[ i ][ j ].xCoord = i * 24;
				cells[ i ][ j ].yCoord = j * 24;

				ctx.drawImage( ctx.resources.getResource( CLOSED_CELL_IMAGE ).image, i * 24, j * 24 );

			}

		}

		ctx.canvas.addEventListener( 'click', function( event ) {

			let clickRow = Math.ceil( event.clientY / 24 ) - 1;
			let clickColumn = Math.ceil( event.clientX / 24 ) - 1;

			if( cells[ clickRow ] && cells[ clickRow ][ clickColumn ] ) {

				if( gameState == GAME_PAUSED ) {

					// Calculating Bombs

					if( bombNumber <= ( cells.length * cells[ 0 ].length - 1 ) ) {

						var bombs = 0;

						while( bombs < bombNumber ) {

							let bombRow = Math.floor( Math.random() * cells.length );
							let bombColumn = Math.floor( Math.random() * cells[ 0 ].length );

							if( cells[ bombRow ][ bombColumn ].isBomb == false && !( bombRow == clickRow && bombColumn == clickColumn ) ) {

								cells[ bombRow ][ bombColumn ].isBomb = true;

								bombs++;

								// var bombImage = new Image( 24, 24 );
									// bombImage.src = 'images/bomb.jpg';

								// bombImage.onload = function() {

									// ctx.drawImage( ctx.resources.getResource( BOMB_IMAGE ).image, bombColumn * 24, bombRow * 24 );

								// };

							}

						}

						gameState = GAME_ON;

					}

					// Calculating Indicators

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

					for( let i = 0; i < cells.length; i++ ) { // Row => y

						for( let j = 0; j < cells[ i ].length; j++ ) { // Column => x

							for( let k = -1; k <= 1; k++ ) {

								for( let l = -1; l <= 1; l++ ) {

									if( cells[ i + k ] && cells[ i + k ][ j + l ] && !( k == 0 && l == 0 ) ) {

										if( cells[ i + k ][ j + l ].isBomb )
											cells[ i ][ j ].indicator++;

									}

								}

							}

							// if( cells[ i ][ j ].isBomb == false ) {
									
							// 	ctx.drawImage( ctx.resources.getResource( OPENED_CELL_IMAGE ).image, j * 24, i * 24 );

							// 	if( cells[ i ][ j ].indicator > 0 ) {

							// 		ctx.fillStyle = COLORS[ cells[ i ][ j ].indicator - 1 ];
							// 		ctx.fillText( cells[ i ][ j ].indicator, j * 24 + 6, i * 24 + 19 );

							// 	}

							// }

						}

					}

					console.log( 'Finished Bombs generation' );

				} else if( gameState == GAME_ON ) {

					console.log( 'Click Registred' );

					console.log( clickRow, clickColumn );

					cells[ clickRow ][ clickColumn ].open();

					if( cells[ clickRow ][ clickColumn ].isBomb ) {

						console.log( 'ITS A FUCKING BOMB!' );

						gameState = GAME_OVER;

						for( let i = 0; i < cells.length; i++ ) { // Row => y

							for( let j = 0; j < cells[ i ].length; j++ ) { // Column => x

								if( cells[ i ][ j ].isBomb ) {

									ctx.drawImage( ctx.resources.getResource( BOMB_IMAGE ).image, j * 24, i * 24 );

								}

							}

						}

						ctx.drawImage( ctx.resources.getResource( OPENED_BOMB_IMAGE ).image, clickColumn * 24, clickRow * 24 );

					}

				}

			}

		});

	};
}