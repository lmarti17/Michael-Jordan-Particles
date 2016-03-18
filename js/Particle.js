//////////////////////////
// Class Particle
//////////////////////////

var Particle = function(canvas, destinationX, destinationY) {

	this.canvas = canvas;
	this.properties = {};
	this.init(destinationX, destinationY);
};


Particle.prototype.init = function(destinationX, destinationY) {

	this.properties.radius = this.getRandom(1,5);
	this.properties.colors = ["#CE1141", "#061922", "#EEEEEE", "#CE1141", "#000000"];
	this.properties.color = this.properties.colors[this.getRandom(0, 4)];
	this.properties.x = this.giveDestinationX();
	this.properties.y = this.giveDestinationY();
	this.properties.destinationX = destinationX;
	this.properties.destinationY = destinationY;

	// Draw the Particle when instanced
	this.draw();

	this.updatePosition(this.properties.destinationX, this.properties.destinationY);
}

// Method which draw a Particle
Particle.prototype.draw = function() {

	this.canvas.ctx.beginPath();
	this.canvas.ctx.arc(this.properties.x, this.properties.y, this.properties.radius, 0, 2 * Math.PI, false);
	this.canvas.ctx.fillStyle = this.properties.color;
	this.canvas.ctx.fill();
}

Particle.prototype.updatePosition = function(destinationX, destinationY) {
	var self = this;
	this.properties.tween = TweenLite.to(this.properties, this.getRandom(2, 7), {
		// bezier: {
		// 	curviness: 5,
		// 	values: [{
		// 		x: this.getRandom(0, this.canvas.Canvas.width),
		// 		y: this.getRandom(0, this.canvas.Canvas.height)
		// 	}, {
		// 		x: this.getRandom(0, this.canvas.Canvas.width),
		// 		y: this.getRandom(0, this.canvas.Canvas.height)
		// 	}]
		// },
		ease: Power1.easeInOut,
		x: destinationX,
		y: destinationY,
		onComplete: function() {
			self.updatePosition(self.properties.destinationX + self.getRandom(-10, 10), self.properties.destinationY + self.getRandom(-10, 10));
		}
	});
}

// Method wich return a new X position for the object
Particle.prototype.giveDestinationX = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.width);
}

// Method wich return a new Y position for the object
Particle.prototype.giveDestinationY = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.height);
}

Particle.prototype.getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

// End of the class Particle