const OPENED_CELL_IMAGE = 1;
const CLOSED_CELL_IMAGE = 2;
const BOMB_IMAGE = 3;

function Resources()
{
	this.list = [
		{
			id: OPENED_CELL_IMAGE,
			src: 'images/opened-cell.jpg',
			image: null
		},
		{
			id: CLOSED_CELL_IMAGE,
			src: 'images/closed-cell.jpg',
			image: null
		},
		{
			id: BOMB_IMAGE,
			src: 'images/bomb.jpg',
			image: null
		}
	];

	this.load = function( resource ) {

		return new Promise( function( resolve, reject ) {

			var image = new Image( 24, 24 );
				image.src = resource.src;

			image.onload = function() {

				resource.image = this;

				resolve( this );

			};

			image.onerror = function() {
				reject( this );
			};

		} );

	};

	this.loadAll = function() {

		var promises = [];

		for( let i = 0; i < this.list.length; i++ ) {
			promises.push( this.load( this.list[ i ] ) );
		}

		return promises;

	};

	this.getResource = function( resourceId ) {

		let resource = this.list.find(function( value, index, array ) {
			return value.id == resourceId;
		});

		return resource;

	}
}