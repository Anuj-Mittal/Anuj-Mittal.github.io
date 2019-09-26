class Node{
    constructor(node, adj){
        this.node = node;
        this.x = randx();
        this.y = randy();
        this.adj = adj;
        this. clr = randclr();
    }
}
let canvas = document.getElementById("gameScreen");
let textArea = document.getElementById("textArea");
canvas.width = screen.width*10/12;//RATIO OF SCREEN COVERED
canvas.height = screen.height*0.8;
let ctx = canvas.getContext("2d");
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
let RADIUS = 20;
let MAX_DARKNESS = 100;//COLOR OF NODES - HIGH VALUE => LIGHT
let FONT = "30px";
var gph = new Map();
var inputArr = [];
$("#button").click(function(){
    gph.clear();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plot();
});
function plot(){
    var val = document.getElementById("textArea").value;
    console.log(val);
    var temp = val;
    temp = temp.replace(/\n/g, ' ');
    var tempArr = temp.split(' ');   
    inputArr = [];
    for(var i = 0;tempArr.length > i;i++){
        if(tempArr[i] != ""){
            inputArr.push(tempArr[i]);
        }
    }
    console.log(inputArr);
    build();
    drawNodes();
    connect();
}
function build(){
    var n = parseInt(inputArr[0]);//nodes
    for(var i = 1;n >= i;i++){
        gph.set(i, new Node(i, []));
    }
    var m = parseInt(inputArr[1]);//edges
    for(var i = 0,j = 0;m > j;i+=2, j++){
        var a = parseInt(inputArr[i+2]);
        var b = parseInt(inputArr[i+3]);
        gph.get(a).adj.push(b);
        gph.get(b).adj.push(a);
    }
}
function drawNodes(){
    for(var [key, value] of gph){
        ctx.beginPath();
        ctx.font = FONT + " Arial";
        ctx.fillStyle = value.clr;
        ctx.arc(value.x, value.y, RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(key, value.x, value.y + RADIUS/2);
    }
}
function connect(){
    for(var [key, value] of gph){
        for(var j=0;value.adj.length>j;j++){
            ctx.beginPath();
            ctx.moveTo(value.x, value.y);
            ctx.lineWidth = 2;
            ctx.lineTo(gph.get(value.adj[j]).x, gph.get(value.adj[j]).y);
            ctx.stroke();
        }
    }
}
function randx(){
    return RADIUS + Math.random() * (WIDTH - 2*RADIUS);
}
function randy(){
    return RADIUS + Math.random() * (HEIGHT - 2*RADIUS);
}
function randclr(){
    //return "yellow";
    return 'rgb(' + (Math.floor(MAX_DARKNESS + Math.random() * (256 - MAX_DARKNESS))) + ',' + (Math.floor(MAX_DARKNESS + Math.random() * (256 - MAX_DARKNESS))) + ',' + (Math.floor(MAX_DARKNESS + Math.random() * (256 - MAX_DARKNESS))) + ')';
}