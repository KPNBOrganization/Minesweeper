const GAME_PAUSED = 0;
const GAME_ON = 1;
const GAME_OVER = 2;

function Game( ctx )
{
	this.field;

	this.time = 0;
	this.countingInterval;
	this.flagNumber;
	this.state = GAME_PAUSED;

	var game = this;

	this.resetButton = function() {

		this.height = 32;
		this.width = 32;

		this.xCoord = game.field.xCoord + game.field.cells[ 0 ].length * 24 / 2 - 16,
		this.yCoord = game.field.yCoord - 40,

		this.draw = function() {

			ctx.fillStyle = '#7b7b7b';
			ctx.fillRect( this.xCoord, this.yCoord, this.width, this.height );

			ctx.fillStyle = '#c0c0c0';
			ctx.fillRect( this.xCoord + 2, this.yCoord + 2, this.width - 4, this.height - 4 );

			ctx.drawImage(
				ctx.resources.getResource( RESET_BUTTON_IMAGE ).image, 
				this.xCoord + 4, 
				this.yCoord + 4
			);

		};

		return this;

	};

	this.timer = function() {

		this.height = 36;
		this.width = 69;

		this.xCoord = game.field.xCoord + game.field.cells[ 0 ].length * 24 - this.width - 3;
		this.yCoord = game.field.yCoord - this.height - 6;

		this.numberPad = function( str, max ) {
			str = str.toString();
			return str.length < max ? this.numberPad( '0' + str, max ) : str;
		};

		this.draw = function() {

			ctx.fillStyle = '#000000';
			ctx.fillRect( this.xCoord, this.yCoord, this.width, this.height );

			ctx.font = '38px Consolas';

			ctx.fillStyle = 'red';
			ctx.fillText( this.numberPad( this.time, 3 ), this.xCoord + 3, this.yCoord + this.height - 6 );

		};

		return this;

	};

	this.flagCounter = function() {

		this.height = 36;
		this.width = 69;

		this.xCoord = game.field.xCoord + 3;
		this.yCoord = game.field.yCoord - this.height - 6;

		this.numberPad = function( str, max ) {
			str = str.toString();
			return str.length < max ? this.numberPad( '0' + str, max ) : str;
		};

		this.draw = function() {

			ctx.fillStyle = '#000000';
			ctx.fillRect( this.xCoord, this.yCoord, this.width, this.height );

			ctx.font = '38px Consolas';

			ctx.fillStyle = 'red';
			ctx.fillText( this.numberPad( this.flagNumber, 3 ), this.xCoord + 3, this.yCoord + this.height - 6 );

		};

		return this;

	};

	this.drawDashboard = function() {

		ctx.fillStyle = "#7b7b7b";
		ctx.fillRect( this.field.xCoord - 3, this.field.yCoord - 48, this.field.cells[ 0 ].length * 24 + 6, 51 );

		ctx.fillStyle = "#c0c0c0";
		ctx.fillRect( this.field.xCoord, this.field.yCoord - 45, this.field.cells[ 0 ].length * 24, 45 );

		this.resetButton().draw();

		this.flagCounter().draw();
		
		this.timer().draw();

	}

	this.reset = function() {

		this.field = new Field( ctx, this );
		this.time = 0;

	}
}