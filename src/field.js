function Field( ctx, game )
{
	this.xCoord;
	this.yCoord;

	this.game = game;

	this.cellsCount;

	this.cells = [];

	this.bombNumber;

	this.draw = function() {

		ctx.fillStyle = "#7b7b7b";
		ctx.fillRect( this.xCoord - 3, this.yCoord - 3, this.cells[ 0 ].length * 24 + 6, this.cells.length * 24 + 6 );

		let cells = this.cells;
		let bombNumber = this.bombNumber;
		let gameState = this.game.state;

		let field = this;

		for( let i = 0; i < cells.length; i++ ) {

			for( let j = 0; j < cells[ i ].length; j++ ) {

				cells[ i ][ j ].xCoord = this.xCoord + j * 24;
				cells[ i ][ j ].yCoord = this.yCoord + i * 24;

				ctx.drawImage( ctx.resources.getResource( CLOSED_CELL_IMAGE ).image, cells[ i ][ j ].xCoord, cells[ i ][ j ].yCoord );

			}

		}

		let COLORS = [
		    '#0000ff', // 1
		    '#017f01', // 2
		    '#ff0000', // 3
		    '#010080', // 4
		    '#810102', // 5
		    '#008081', // 6
		    '#000000', // 7
		    '#808080' // 8
		];

		ctx.canvas.addEventListener( 'click', function( event ) {

			if( 
				event.offsetX > field.game.resetButton().xCoord 
				&& event.offsetX < field.game.resetButton().xCoord + field.game.resetButton().width 
				&& event.offsetY > field.game.resetButton().yCoord 
				&& event.offsetY < field.game.resetButton().yCoord + field.game.resetButton().height 
			) {
				window.location.reload();
			}

			let clickRow = Math.ceil( ( event.offsetY - field.yCoord ) / 24 ) - 1;
			let clickColumn = Math.ceil( ( event.offsetX - field.xCoord ) / 24 ) - 1;

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

							}

						}

						gameState = GAME_ON;

					}

					// Calculating Indicators

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

						}

					}

					// Starting game timer

					field.game.countingInterval = setInterval( function() {

						if( field.game.time == 999 )
							field.game.time = 0;

						field.game.time++;

						field.game.timer().draw();

					}, 1000 );

				} 

				if( gameState == GAME_ON ) {

					if( cells[ clickRow ][ clickColumn ].state == CELL_CLOSED ) {

						cells[ clickRow ][ clickColumn ].open();

						if( cells[ clickRow ][ clickColumn ].isBomb ) {

							clearInterval( field.game.countingInterval );

							gameState = GAME_OVER;

							for( let i = 0; i < cells.length; i++ ) { // Row => y

								for( let j = 0; j < cells[ i ].length; j++ ) { // Column => x

									if( cells[ i ][ j ].isBomb ) {

										ctx.drawImage(
											ctx.resources.getResource( BOMB_IMAGE ).image,
											cells[ i ][ j ].xCoord,
											cells[ i ][ j ].yCoord
										);

									}

								}

							}

							ctx.drawImage( 
								ctx.resources.getResource( OPENED_BOMB_IMAGE ).image, 
								cells[ clickRow ][ clickColumn ].xCoord, 
								cells[ clickRow ][ clickColumn ].yCoord
							);

						} else {

							if( cells[ clickRow ][ clickColumn ].indicator > 0 ) {

								ctx.drawImage(
									ctx.resources.getResource( OPENED_CELL_IMAGE ).image,
									cells[ clickRow ][ clickColumn ].xCoord,
									cells[ clickRow ][ clickColumn ].yCoord
								);

								ctx.fillStyle = COLORS[ cells[ clickRow ][ clickColumn ].indicator - 1 ];

								ctx.font = '20px Consolas';

								ctx.fillText(
									cells[ clickRow ][ clickColumn ].indicator,
									cells[ clickRow ][ clickColumn ].xCoord + 6,
									cells[ clickRow ][ clickColumn ].yCoord + 19
								);

							} else {

								function openClosestCells( cellRow, cellColumn ) {

									for( let k = -1; k <= 1; k++ ) {

										for( let l = -1; l <= 1; l++ ) {

											if( cells[ cellRow + k ] && cells[ cellRow + k ][ cellColumn + l ] && !( k == 0 && l == 0 ) ) {

												if( cells[ cellRow + k ][ cellColumn + l ].state == CELL_CLOSED ) {

													cells[ cellRow + k ][ cellColumn + l ].open();

													if( cells[ cellRow + k ][ cellColumn + l ].indicator > 0 ) {

														ctx.drawImage( 
															ctx.resources.getResource( OPENED_CELL_IMAGE ).image, 
															cells[ cellRow + k ][ cellColumn + l ].xCoord, 
															cells[ cellRow + k ][ cellColumn + l ].yCoord
														);

														ctx.fillStyle = COLORS[ cells[ cellRow + k ][ cellColumn + l ].indicator - 1 ];

														ctx.font = '20px Consolas';

														ctx.fillText(
															cells[ cellRow + k ][ cellColumn + l ].indicator,
															cells[ cellRow + k ][ cellColumn + l ].xCoord + 6,
															cells[ cellRow + k ][ cellColumn + l ].yCoord + 19
														);

													} else {

														openClosestCells( cellRow + k, cellColumn + l );

													}

												}

											}

										}

									}

									ctx.drawImage(
										ctx.resources.getResource( OPENED_CELL_IMAGE ).image,
										cells[ cellRow ][ cellColumn ].xCoord,
										cells[ cellRow ][ cellColumn ].yCoord
									);

								};

								openClosestCells( clickRow, clickColumn );

							}

							if( field.cellsCount == 0 ) {

								gameState = GAME_OVER;

								clearInterval( field.game.countingInterval );

							}

						}

					}

				}

			}

		});

	};
}