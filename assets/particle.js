class Particle{
	constructor(x, y, r, node){
		var options = {
    		friction: 1,
    		restitution: 1,
    		frictionAir : 1
  		}
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
		fill('orange');
		circle(0, 0, 2*this.r);
		noStroke();
		fill(0, 102, 153);
		textSize(30);
		textAlign(CENTER, CENTER);
		text(this.node, 0, 0);
		pop();
	}
	connect(){
		var pos = this.body.position;
		for(var i = 0; this.adj.length > i; i++){
			stroke('white');
			strokeWeight(8);
			line(pos.x, pos.y, this.adj[i].body.position.x, this.adj[i].body.position.y);
		}
	}
}