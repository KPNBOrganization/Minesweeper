function Game( ctx )
{
	this.field;
	this.time;

	this.reset = function() {

		this.field = new Field( ctx );
		this.time = 0;

	}
}