/* Main script */

function Draw()
{
	var canvas = document.getElementById('canvas');

	if (canvas.getContext) {
	    var ctx = canvas.getContext('2d');

	    // fillRect(x, y, widht, height) - заполненный прямоугольник
	    // strokeRect(x, y, width, height) - треугольный с обводкой
	    // clearRect(x, y, width, height) - очистка прямоугольного (делает область обсолютно прозрачной)

	    const SQUARE_SIZE = 15;
	    var x = 0;
	    var y = 0;
	    var a = 0;

	    for(var i = 0; i < 18; i++)
	    {
	    	for(var j = 0; j < 18; j++)
	    	{
	    		ctx.beginPath();
				ctx.rect(x + 2, y + 2, SQUARE_SIZE + 1, SQUARE_SIZE + 1);
				ctx.fillStyle = "#808080";
				ctx.fill();

	    		ctx.beginPath();
				ctx.rect(x + 2, y + 2, SQUARE_SIZE, SQUARE_SIZE);
				ctx.fillStyle = "#c0c0c0";
				ctx.fill();

				// отрисовка открытых клеток

				if(i == 5 && j == 6 || i == 5 && j == 7)
				{
					/*ctx.beginPath();
					ctx.rect(x, y, SQUARE_SIZE + 3, SQUARE_SIZE + 3);
					ctx.fillStyle = "#808080";
					ctx.fill();*/

					ctx.beginPath();
					ctx.rect(x + 1, y + 1, SQUARE_SIZE + 2, SQUARE_SIZE + 2);
					ctx.fillStyle = "#c0c0c0";
					ctx.fill();

					ctx.font = "bold 13px Lucida Console";
					ctx.fillStyle = "#0000ff";
					ctx.fillText("3", x + SQUARE_SIZE / 4, y + SQUARE_SIZE - 1);
				}

				ctx.addHitRegion( {id: a} );

				x = x + SQUARE_SIZE + 2;

				a++;
	    	}

	    	y = y + SQUARE_SIZE + 2;
	    	x = 0;
	    }

	    canvas.addEventListener('click', function(event){
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

				x = Math.floor(x) * (SQUARE_SIZE + 2);
				y = Math.floor(y) * (SQUARE_SIZE + 2);

				// Убрал нахуй, почему убрал? когда рядом ставишь 2 слева на права не отрисовывается нихуя

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

				/*ctx.font = "bold 13px Lucida Console";
				ctx.fillStyle = "#0000ff";
				ctx.fillText("0", x + SQUARE_SIZE / 4, y + SQUARE_SIZE - 1);*/

				// console.log(event);
			}
		});

	    // ctx.beginPath();
		// ctx.rect(15, 15, 15, 15);
		// ctx.fill();
		// ctx.addHitRegion( {id: 'square'} );

		/*ctx.beginPath();
		ctx.arc(70, 80, 10, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.addHitRegion( {id: 'circle'} );

		canvas.addEventListener('click', function(event){
			if(event.region) {
				console.log("hit region: " + event.region);
			}
		});*/
	}
}

window.onload = function() {

	Draw();

	// Draw();
};