const OPENED_CELL_IMAGE = 1;
const CLOSED_CELL_IMAGE = 2;
const BOMB_IMAGE = 3;
const OPENED_BOMB_IMAGE = 4;

const GAME_STATE_ON_IMAGE = 5;
const GAME_STATE_WIN_COND_IMAGE = 6;
const GAME_STATE_CLICK_IMAGE = 7;
const GAME_STATE_OVER_IMAGE = 8;

const FLAGGED_CELL_IMAGE = 9;

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
		},
		{
			id: OPENED_BOMB_IMAGE,
			src: 'images/opened-bomb.jpg',
			image: null
		},
		{
			id: GAME_STATE_ON_IMAGE,
			src: 'images/game-on.png'
		},
		{
			id: GAME_STATE_OVER_IMAGE,
			src: 'images/game-over.png'
		},
		{
			id: GAME_STATE_WIN_COND_IMAGE,
			src: 'images/game-won.png'
		},
		{
			id: GAME_STATE_CLICK_IMAGE,
			src: 'images/game-close.png'
		},
		{
			id: FLAGGED_CELL_IMAGE,
			src: 'images/flagged-cell.jpg',
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