const GAME_PAUSED = 0;
const GAME_ON = 1;
const GAME_OVER = 2;

function Game( ctx )
{
	this.field;
	this.time;
	this.state = GAME_PAUSED;

	this.reset = function() {

		this.field = new Field( ctx, this.state );
		this.time = 0;

	}
}