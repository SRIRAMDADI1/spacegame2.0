score = 0

function setup() {
  createCanvas(windowWidth,windowHeight)
  hreborn = createSprite(150,550,00,0)
  hreborn.addImage(highreb)
  hreborn.scale = 1.2
  hreborn.setCollider('rectangle',-10,10,90,90)

  restart = createSprite(windowWidth/2,windowHeight/2,10,10)
  restart.addImage(res)
  restart.visible = false;
  gameState = 'PLAY';

  bgsound.loop() 

  invisground = createSprite(0,650,5000,5)
  invisground.visible = false;

  gemGroup = new Group()
  obsGroup = new Group()
}

function preload(){
  aba = loadImage("ab1.png")
  abb = loadImage("ab2.png")
  abc = loadImage("ab3.png")
  bgsound = loadSound("loop.wav")
  res = loadImage("restart.png")
  amethy = loadImage("amethyst.png")
  ast = loadImage("asteroid.png")
  highreb = loadImage("high reborn.png")
  bg = loadImage("space2bg.png")
}

function draw() {
  background(bg);  

  
  hreborn.collide(invisground)

  if(gameState === 'PLAY'){
    if(keyDown(UP_ARROW)){
      hreborn.y = hreborn.y-12
    }

    if(keyDown(DOWN_ARROW)){
     hreborn.y = hreborn.y+12
    }

    spawnGem()
    spawnObs()

    for(var i = 0;i<gemGroup.length;i++){
      if(gemGroup.isTouching(hreborn)){
        score+=1
        gemGroup.get(i).destroy()
      }
    }

    if(score >=0){
      obsGroup.setVelocityXEach(random(-18,-25))
      gemGroup.setVelocityXEach(random(-18,-25))
    }
  }

  fill("white")
  textSize(24)
  text("Score:"+score,1270,50)

  if(obsGroup.isTouching(hreborn)){
    gameState = 'END'
  }

  if(gameState === 'END'){
    obsGroup.setVelocityXEach(0)
    gemGroup.setVelocityXEach(0)
    gemGroup.setLifetimeEach(-1)
    obsGroup.setLifetimeEach(-1) 
    restart.visible = true;

    if(mousePressedOver(restart)){
      reset()
    }
  }


  drawSprites();
}

function spawnGem(){
  if(frameCount % 40 === 0){
    amethyst = createSprite(1500,100,20,20)
    amethyst.y = random(50,500)
    amethyst.addImage(amethy)
    amethyst.scale = 0.5
    amethyst.velocityX = -16
    amethyst.lifetime = 100
    amethyst.setCollider('rectangle',0,0,120,150)
    gemGroup.add(amethyst)
  }
}

function spawnObs(){
  if(frameCount % 50 === 0){
    asteroid = createSprite(1500,100,20,20)
    asteroid.y = random(50,500)
    asteroid.addImage(ast)
    asteroid.scale = 0.5
    asteroid.velocityX = -16
    asteroid.setCollider('circle',0,0,100)
    asteroid.lifetime = 100
    asteroid.debug = false;
    obsGroup.add(asteroid)
  }
}

function reset(){
  gameState = 'PLAY'
  gemGroup.destroyEach()
  obsGroup.destroyEach()
  restart.visible = false;
  score = 0
  bgsound.loop
}