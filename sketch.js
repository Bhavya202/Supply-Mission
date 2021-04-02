var helicopterIMG, helicopterSprite;
var packageSprite, packageIMG, packageBody;
var inGround1, inGround, inGround2;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload(){
	//preload things
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	//create the canvas
	createCanvas(800, 655);

	//changes the rectangle mode to center
	rectMode(CENTER);
	
	//creates package sprite
	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2;

	//creates helicopter sprite
	helicopterSprite = createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6;

	//creates middle invisible ground
	inGround = createSprite(width/2,645,180,10);
	inGround.visible = false;

	//creates engine
	engine = Engine.create();
	world = engine.world;
	World.add(world,helicopterSprite);

	//creates bodies
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);

 	boxPosition = width/2-100;
 	boxY = 610;

 	boxleftSprite = createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor = color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase = createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor = color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite = createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor = color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	//makes the engine run
	Engine.run(engine);
}

function draw() {
  //makes rectangle made to center
  rectMode(CENTER);

  //creates background
  background(0);
 
  packageSprite.x = packageBody.position.x;
  packageSprite.y = packageBody.position.y;
  
  //parcel is dropped wrongside
  if (packageSprite.isTouching(inGround)) {
	  packageSprite.collide(inGround);
	  fill("white");
	  textSize(20);
	  text("Your Package arrived here succesfully", 250, 315);
	  text("Good work Commander!!!", 310, 345)
  }

  //makes the sprite visible
  drawSprites();
}

function keyPressed(){
	if(keyCode === LEFT_ARROW){
		helicopterSprite.x = helicopterSprite.x-30;
		packageSprite.x = packageSprite.x-30;
		Matter.Body.translate(packageBody, {x:-30,y:0});
	}

	if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x = helicopterSprite.x+30;
		packageSprite.x = packageSprite.x+30;
		Matter.Body.translate(packageBody, {x:+30,y:0});
	}

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(packageBody,false);
	}
}