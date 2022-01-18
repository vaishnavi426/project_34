
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var crane, craneImg, brick, brickImg;
var rope, ground, bgImg, brickCon;
var cut_btn;

function preload() {
  craneImg = loadImage("assets/crane.png");
  bgImg = loadImage("assets/bg.png");
}


function setup() {
  createCanvas(800,500);

  engine = Engine.create();
  world = engine.world;

  crane  = createSprite(600,263,10,10);
  crane.scale = 0.5;
  crane.addImage('craneImg',craneImg);

  rope = new Rope(3,{x:460,y:185});
  ground = new Ground(500,495,150,10);

  brick = Bodies.rectangle(400,150,20,20);
  World.add(world, brick);
  brick.debug = true;


  Matter.Composite.add(rope.body,brick);

  brickCon = new Link(rope,brick);

  cut_btn = createImg('assets/cut.png');
  cut_btn.position(410,200);
  cut_btn.size(120,20);
  cut_btn.mouseClicked(drop);
}


function draw() 
{
  background(51);
  imageMode(CENTER);
  image(bgImg,400, 250, width, height);

  push();
  translate(brick.position.x, brick.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, 50, 20);
  pop();


  rope.show();
  ground.show();

  
  if(Matter.SAT.collides(brick, ground.body)) {
    brick.visible = false;
  }
  else {
    airBlown();
  }

  Engine.update(engine);
  
  drawSprites();
}

function airBlown() {
  setTimeout(() => {
    Matter.Body.applyForce(brick,{x:0,y:0},{x:0,y:0.001});
  }, 4000);
}

function drop() {
  rope.break();
  brickCon.detach();
  brickCon = null; 
}