//Module Aliases
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Constraint = Matter.Constraint,
	Mouse = Matter.Mouse,
	MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
let RADIUS = 30; // Radius of Node
var mConstraint;
var graph = new Map();
function setup(){
	//Starting engine and world
	var sketchHolder = document.getElementById('sketch-holder');
	var canvas = createCanvas(sketchHolder.scrollWidth, window.innerHeight*0.9);
	canvas.parent('sketch-holder');
	engine = Engine.create();
	world  = engine.world;

	//Adding Mouse Constraints
	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = pixelDensity();
	var options = {
		mouse : canvasmouse
	}
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world, mConstraint);
	world.gravity.y = 0;

	addBoundaries();

}

function addBoundaries(){
	var left = Bodies.rectangle(-50, height/2, 100, height, {isStatic : true});
	World.add(world, left);

	var up = Bodies.rectangle(width/2, -50, width, 100, {isStatic : true});
	World.add(world, up);

	var right = Bodies.rectangle(width+50, height/2, 100, height, {isStatic : true});
	World.add(world, right);

	var bottom = Bodies.rectangle(width/2, height+50, width, 100, {isStatic : true});
	World.add(world, bottom);
}
function inputHandler(){
	//Conversion of input to suitable form 
	var val = document.getElementById("textArea").value;
    var temp = val;
    temp = temp.replace(/\n/g, ' ');
    var tempArr = temp.split(' ');   
    inputArr = [];
    for(var i = 0;tempArr.length > i;i++){
        if(tempArr[i] != ""){
            inputArr.push(tempArr[i]);
        }
    }
    return inputArr;
}
function clearGraph(){
	//Clear graph and remove existing bodies from World
	for(var [key, value] of graph){
		World.remove(world, value.body);
    }
    graph.clear();
}
function makeGraph(){ 
	//Triggered when plot button is clicked
	//Clear graph and remove existing bodies from World
	clearGraph();
    //INPUT
	var inputArr = inputHandler();

    //Make graph map by filling in adjacency list
    var n = parseInt(inputArr[0]);//nodes
    for(var i = 1;n >= i;i++){
        graph.set(i, new Particle(random() * width, random() * height, RADIUS, i, false));
    }
    var m = parseInt(inputArr[1]);//edges
    if((inputArr.length - 2) % 2 == 1 || (inputArr.length-2)/2 != m){
    	alert("Invalid Input !");
    }
    for(var i = 0,j = 0;m > j;i+=2, j++){
        var a = parseInt(inputArr[i+2]);
        var b = parseInt(inputArr[i+3]);
        graph.get(a).adj.push(graph.get(b));
        graph.get(b).adj.push(graph.get(a));
    }
}

function directedGraph(){ 
	//Triggered when plot button is clicked
	//Clear graph and remove existing bodies from World
	clearGraph();
    //INPUT
	var inputArr = inputHandler();

    //Make graph map by filling in adjacency list
    var n = parseInt(inputArr[0]);//nodes
    for(var i = 1;n >= i;i++){
        graph.set(i, new Particle(random() * width, random() * height, RADIUS, i, true));
    }
    var m = parseInt(inputArr[1]);//edges
    if((inputArr.length - 2) % 2 == 1 || (inputArr.length-2)/2 != m){
    	alert("Invalid Input !");
    }
    for(var i = 0,j = 0;m > j;i+=2, j++){
        var a = parseInt(inputArr[i+2]);
        var b = parseInt(inputArr[i+3]);
        graph.get(a).adj.push(graph.get(b));
    }
}

function draw(){
	background(25);
	Engine.update(engine);

	//Draw Links
    for(var [key, value] of graph){
		value.connect();
    }

    //Draw Nodes
	for(var [key, value] of graph){
		value.show();
    }
}