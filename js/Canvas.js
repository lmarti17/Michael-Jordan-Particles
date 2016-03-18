//////////////////////////
// Canvas Class
//////////////////////////

var Canvas = function() {

	this.canvas = {};

	this.init();

}

Canvas.prototype.init = function() {

	this.canvas.Canvas = document.getElementById('canvas');
	this.canvas.ctx = this.canvas.Canvas.getContext('2d');
	this.canvas.Canvas.width = $(window).width();
	this.canvas.Canvas.height = $(window).height();
	this.canvas.particleArray = [];
	this.canvas.positionArray = [];
	this.canvas.img = new Picture(this.canvas, this.callback.bind(this));
	this.mouse = new Mouse();

}

Canvas.prototype.generateArray = function(numberParticle) {
	var tab = [];
	for (var i = 0; i < numberParticle; i++) {
		tab[i] = new Particle(this.canvas);
	};
	return tab;
};

Canvas.prototype.callback = function(positions) {

	this.canvas.positionArray = positions;
	this.canvas.ctx.clearRect(0, 0, this.canvas.Canvas.width, this.canvas.Canvas.height);
	var self = this;

	this.canvas.positionArray.forEach(function(e) {
		self.canvas.particleArray.push(
			new Particle(self.canvas, e.x, e.y)
		);
	})
	this.loopArray();

};

Canvas.prototype.drawArray = function() {
	this.canvas.ctx.clearRect(0, 0, this.canvas.Canvas.width, this.canvas.Canvas.height);
	this.canvas.particleArray.forEach(function(e) {
		e.draw();
	});
};

Canvas.prototype.updateArray = function() {

	var self = this;
	var compteur = 0;

	this.canvas.particleArray.forEach(function(e) {
		// console.log(self.canvas.compteur);
		// console.log(self.positionArray);
		// compteur += 1;
		// if (self.canvas.positionArray) {
		// console.log(e);

		// 	// console.log(self.canvas.positionArray[self.canvas.compteur]);
		// 	// console.log(self.canvas.positionArray[self.canvas.compteur]);
		// 	this.destinationX = self.canvas.positionArray[compteur];
		// 	this.destinationY = self.canvas.positionArray[compteur];
		// };

		if (e.properties.tween.progress() >= 0.95) {
		// e.updatePosition(this.destinationX, this.destinationY);
		}
	})
};

Canvas.prototype.loopArray = function() {
	this.drawArray();
	// this.updateArray();
	window.requestAnimationFrame(this.loopArray.bind(this));
}

// Method which return a random number between a min and a max
Canvas.prototype.getRandom = function(min, max) {
	return Math.random() * (max - min) + min;
}

// Method which return a new X position for the object
Canvas.prototype.giveDestinationX = function() {
	return Math.floor(Math.random() * this.canvas.Canvas.width);
}

// Method which return a new Y position for the object
Canvas.prototype.giveDestinationY = function() {
		return Math.floor(Math.random() * this.canvas.Canvas.height);
	}
	// End of the class Canvas