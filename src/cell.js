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

		this.state = CELL_FLAGGED;

	};
}