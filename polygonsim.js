window.onload = function() { run(); }

function run() {
	var rotating = true, clockwise = true;
	var sides = 6;
	var delay = 5;
	var radius, t, xpos, ypos;
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	radius = 200.0;
	t = 0.0;
	xpos = canvas.width / 2;
	ypos = canvas.height / 2;
	
	function redraw() {
		if (rotating) {
			// clear canvas
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			// increment t depending on direction
			if (clockwise) {
				t += (0.8 * (Math.PI / 180));
			}
			else {
				t -= (0.8 * (Math.PI / 180));
			}
			xpos = canvas.width / 2 + parseInt(radius * Math.cos(t));
			ypos = canvas.height / 2 + parseInt(radius * Math.sin(t));
			// set color
			if (radius > 0.0) {
				ctx.strokeStyle = "#00FF00";
			}
			else {
				ctx.strokeStyle = "red";
			}
			// draw line (for 2 sides)
			if (sides <= 2) {
				ctx.beginPath();
				ctx.moveTo(parseInt(xpos), parseInt(ypos));
				ctx.lineTo(canvas.width / 2 + parseInt(radius * Math.cos(t + Math.PI)), canvas.height / 2 + parseInt(radius * Math.sin(t + Math.PI)));
				ctx.stroke();
			}
			// draw n lines for a n-sided polygon
			else {
				for (i = 1; i <= sides + 1; i++) {
					var add = 2 * Math.PI / sides;
					ctx.beginPath();
					if (i == 1) {
						ctx.moveTo(parseInt(xpos), parseInt(ypos));
						ctx.lineTo(canvas.width / 2 + parseInt(radius * Math.cos(t + add * i)), canvas.height / 2 + parseInt(radius * Math.sin(t + add * i)));
					}
					else {
						ctx.moveTo(canvas.width / 2 + parseInt(radius * Math.cos(t + add * i)), canvas.height / 2 + parseInt(radius * Math.sin(t + add * i)));
						ctx.lineTo(canvas.width / 2 + parseInt(radius * Math.cos(t + add * (i + 1))), canvas.height / 2 + parseInt(radius * Math.sin(t + add * (i+1))));
					}
					ctx.stroke();
				}
			}
		}
		setTimeout(redraw, delay);
	}
	setTimeout(redraw, delay);
	// key listeners
	window.onkeydown = function(e) {
		var key = e.keyCode;
		// up: increase radius
		if (key == 38) {
			radius += 5.0;
		}
		// down: decrease radius
		else if (key == 40) {
			radius -= 5.0;
		}
		// right: increase number of sides
		else if (key == 39) {
			sides += 1;
			xpos = canvas.width / 2;
			ypos = canvas.height / 2;
		}
		// left: decrease number of sides
		else if (key == 37) {
			if (sides > 2) {
				sides -= 1;
				xpos = canvas.width / 2;
				ypos = canvas.height / 2;
			}
		}
		// W: decrease delay (faster)
		else if (key == 87) {
			if (delay > 5) {
				delay -= 1;
			}
		}
		// S: increase delay (slower)
		else if (key == 83) {
			delay += 1;
		}
		// A: rotate left (counter-clockwise)
		else if (key == 65) {
			clockwise = false;
		}
		// D: rotate right (clockwise)
		else if (key == 68) {
			clockwise = true;
		}
		// space: pause rotation
		else if (key == 32) {
			rotating = !rotating;
		}
		// esc: reset
		else if (key == 27) {
			radius = 200.0;
			delay = 5;
			rotating = true;
		}
	}
}
