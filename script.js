/* Main script */

const LEFT = 1;
const RIGHT = 2;

var COLORS = [
	'#0000ff', // 1
	'#017f01', // 2
	'#ff0000', // 3
	'#010080', // 4
	'#810102', // 5
	'#008081', // 6
	'#000000', // 7
	'#808080' // 8
]

function Draw()
{
	var canvas = document.getElementById('canvas');

	if (canvas.getContext) {

	    var ctx = canvas.getContext('2d');

	    // fillRect(x, y, widht, height) - заполненный прямоугольник
	    // strokeRect(x, y, width, height) - треугольный с обводкой
	    // clearRect(x, y, width, height) - очистка прямоугольного (делает область обсолютно прозрачной)

	    // Init

	    const SQUARE_SIZE = 15;
	    var x = 1;
	    var y = 1;
	    var a = 0;

	    // Background

	    ctx.rect(0, 0, canvas.width, canvas.height);
	    ctx.fillStyle = "#808080";
	    ctx.fill();

	    // Cells

	    for(var i = 0; i < 18; i++)
	    {
	    	for(var j = 0; j < 18; j++)
	    	{
	    		ctx.beginPath();
				ctx.rect(x + 1, y + 1, SQUARE_SIZE + 1, SQUARE_SIZE + 1);
				ctx.fillStyle = "#ffffff";
				ctx.fill();

	    		ctx.beginPath();
				ctx.rect(x + 2, y + 2, SQUARE_SIZE + 1, SQUARE_SIZE + 1);
				ctx.fillStyle = "#808080";
				ctx.fill();

	    		ctx.beginPath();
				ctx.rect(x + 2, y + 2, SQUARE_SIZE, SQUARE_SIZE);
				ctx.fillStyle = "#c0c0c0";
				ctx.fill();

				ctx.addHitRegion( {id: a} );

				x = x + SQUARE_SIZE + 2;

				a++;
	    	}

	    	y = y + SQUARE_SIZE + 2;
	    	x = 1;
	    }

	    // CELL OPENING

	    canvas.addEventListener('click', function(event) {
			if(event.region) {

				 var ctx = canvas.getContext('2d');
				 var rect = canvas.getBoundingClientRect();

				// 18 x 18 - размер поля
				// размер хода по х: SQUARE_SIZE + 2
				// размер хода по y: SQUARE_SIZE + 2
				// мат расчётами получим начало отрисовки открытой ячейки 
 
				var ClickX = event.clientX - rect.left;
				var ClickY = event.clientY - rect.top;

				// console.log(ClickY);

				var x = ClickX / (SQUARE_SIZE + 2);
				var y = ClickY / (SQUARE_SIZE + 2);

				x = Math.floor(x) * (SQUARE_SIZE + 2) + 1;
				y = Math.floor(y) * (SQUARE_SIZE + 2) + 1;

				ctx.beginPath();
				ctx.rect(x, y, SQUARE_SIZE + 3, SQUARE_SIZE + 3);
				ctx.fillStyle = "#808080";
				ctx.fill();

				ctx.beginPath();
				ctx.rect(x + 1, y + 1, SQUARE_SIZE + 1, SQUARE_SIZE + 1);
				ctx.fillStyle = "#c0c0c0";
				ctx.fill();

				console.log(event.region);

				// ctx.removeHitRegion(event.region);

				var Number = Math.floor(Math.random() * 10);

				// If cell with bomb

				if(Number == 9)
				{
					console.log(Number);

					ctx.beginPath();
					ctx.rect(x + 1, y + 1, SQUARE_SIZE + 1, SQUARE_SIZE + 1);
					ctx.fillStyle = "#ff0000";
					ctx.fill();

					var BombPic     = new Image();
						BombPic.src = "bomb.png";

					// бывает проскакивает момент, когда пикча не успевает прогрузиться
					BombPic.onload = function() {
						ctx.drawImage(BombPic, x + 2, y + 2, SQUARE_SIZE - 1, SQUARE_SIZE - 1);
				    }
					
				}
				else
				{
					ctx.font = "bold 13px Lucida Console";
					ctx.fillStyle = COLORS[Number - 1];
					ctx.fillText(Number, x + SQUARE_SIZE / 3, y + SQUARE_SIZE - 1);
				}

				// console.log(event);
			}
		});

	    // FLAG PLACEMENT

		canvas.addEventListener('contextmenu', function(event) {

			event.preventDefault();

			var ctx = canvas.getContext('2d');
			var rect = canvas.getBoundingClientRect();

			// 18 x 18 - размер поля
			// размер хода по х: SQUARE_SIZE + 2
			// размер хода по y: SQUARE_SIZE + 2
			// мат расчётами получим начало отрисовки открытой ячейки 

			var ClickX = event.clientX - rect.left;
			var ClickY = event.clientY - rect.top;

			// console.log(ClickY);

			var x = ClickX / (SQUARE_SIZE + 2);
			var y = ClickY / (SQUARE_SIZE + 2);

			x = Math.floor(x) * (SQUARE_SIZE + 2) + 1;
			y = Math.floor(y) * (SQUARE_SIZE + 2) + 1;

			var FlagPic     = new Image();
				FlagPic.src = "flag.png";

			// бывает проскакивает момент, когда пикча не успевает прогрузиться
			FlagPic.onload = function() {
				ctx.drawImage(FlagPic, x + 4, y + 4, SQUARE_SIZE - 4, SQUARE_SIZE - 4);
		    }

			/*ctx.beginPath();
			ctx.rect(x + 2, y + 2, SQUARE_SIZE, SQUARE_SIZE);
			ctx.fillStyle = "red";
			ctx.fill();*/

    	});

	}
}

window.onload = function() {

	Draw();

	// Draw();
};