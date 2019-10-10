class Particle{
	constructor(x, y, r, node, directed){
		var options = {
    		friction: 1,
    		restitution: 1,
    		frictionAir : 1
		  }
		this.hue = 150 +random()*50;
		this.directed = directed;
  		this.node = node;
		this.body = Bodies.circle(x, y, r, options);
		this.r = r;
		World.add(world, this.body);
		this.adj = [];
	}
	show(){
		var pos = this.body.position;
		var angle = this.body.angle;
		push();
		translate(pos.x, pos.y);
		rotate(angle);
		stroke(255);
		colorMode(HSB);
		fill(this.hue, 255, 255);
		circle(0, 0, 2*this.r);
		noStroke();
		fill('black');
		textSize(35);
		textAlign(CENTER, CENTER);
		text(this.node, 0, 0);
		pop();
	}
	
	connect(){
		var pos = this.body.position;
		for(var i = 0; this.adj.length > i; i++){
			stroke('white');
			strokeWeight(6);
			stroke('white');
			line(pos.x, pos.y, this.adj[i].body.position.x, this.adj[i].body.position.y);
			if(this.directed){
				//ARROW DRAWING
				var v1 = createVector(pos.x, pos.y);
				var v2 = createVector(this.adj[i].body.position.x, this.adj[i].body.position.y);
				var v3 = p5.Vector.sub(v2, v1);
				v3 = p5.Vector.mult(v3, 0.5);
				fill('white');
				var myColor = 'white';
				push();
				stroke('white');
				translate(pos.x, pos.y);
				line(0, 0, v3.x, v3.y);
				rotate(v3.heading());
				let arrowSize = 25;
				translate(v3.mag() - arrowSize, 0);
				triangle(0, arrowSize / 2.5, 0, -arrowSize / 2.5, arrowSize, 0);
				pop();
			}
			 
		}
	}
	
}