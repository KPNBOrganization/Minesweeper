/* Cell States */

const CELL_CLOSED = 0;
const CELL_OPENED = 1;
const CELL_FLAGGED = 2;

function Cell( ctx, field )
{
	this.field = field;

	this.state = CELL_CLOSED;
	this.isBomb = false;

	this.indicator = 0;

	this.xCoord;
	this.yCoord;

	this.open = function() {

		this.state = CELL_OPENED;

		this.field.cellsCount--;

		console.log( this.field.cellsCount );

	};

	this.flag = function() {
		if (this.state == CELL_CLOSED && this.field.game.flagNumber > 0 ) {
			this.state = CELL_FLAGGED;	
			return true;
		}
		return false;
	};

	this.unflag = function(){
		if(this.state == CELL_FLAGGED){
			this.state = CELL_CLOSED;
			return true;
		}
		return false;
	};
}