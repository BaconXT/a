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
var rope, rope2, rope3, rope4, rope5
var fruit, fruit2, fruit3, fruit4, fruit5, ground; //var corda, fruta, chão
var fruit_con, fruit_con2, fruit_con3, fruit_con4, fruit_con5;

var bg_img;
var food;
var rabbit;

var button, button2, button3, button4, button5
var blower;
var bunny;
var blink,eat,sad;
var mute_btn;
var Blowbtn;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(1100,620);
 
  frameRate(80); //Contagem de frames por segundo

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  
  button = createImg('cut_btn.png');
  button.position(675,150);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(500,20);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(335,30);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  button4 = createImg('cut_btn.png');
  button4.position(225,30);
  button4.size(50,50);
  button4.mouseClicked(drop4);

  button5 = createImg('cut_btn.png');
  button5.position(588,60);
  button5.size(50,50);
  button5.mouseClicked(drop5);

  Blowbtn = createButton('clique para soprar a melancia 1');
  Blowbtn.position(10,250);
  Blowbtn.class('blowButton');
  Blowbtn.mousePressed(airblow);

  mute_btn = createImg('mute.png');
  mute_btn.position(1000,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(3,{x:700,y:180}); //Criar nova corda (comprimento, posições x e y na tela)
  rope2 = new Rope(3,{x:500,y:10});
  rope3 = new Rope(3,{x:360,y:90});
  rope4 = new Rope(3,{x:250,y:100});
  rope5 = new Rope(3,{x:613,y:100});

  ground = new Ground(550,618,1100,4); //Criar objeto da classe Ground

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(515,536,100,100);
  bunny.scale = 0.23;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,100,20); //Corpo da fruta criado
  fruit2 = Bodies.circle(300,100,20)
  fruit3 = Bodies.circle(300,100,20)
  fruit4 = Bodies.circle(300,100,20)
  fruit5 = Bodies.circle(300,100,20)


  Matter.Composite.add(rope.body,fruit); //A fruta faz parte do "composto" com a corda
  Matter.Composite.add(rope2.body,fruit2)
  Matter.Composite.add(rope3.body,fruit3)
  Matter.Composite.add(rope4.body,fruit4)
  Matter.Composite.add(rope5.body,fruit5)

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit2);
  fruit_con3 = new Link(rope3,fruit3);
  fruit_con4 = new Link(rope4,fruit4);
  fruit_con5 = new Link(rope5,fruit5);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,1100,620);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);    //imagem da fruta
  }

  if(fruit2!=null){
    image(food,fruit2.position.x,fruit2.position.y,70,70);
  }

  if(fruit3!=null){
    image(food,fruit3.position.x,fruit3.position.y,70,70);
  }

  if(fruit4!=null){
    image(food,fruit4.position.x,fruit4.position.y,70,70);
  }

  if(fruit5!=null){
    image(food,fruit5.position.x,fruit5.position.y,70,70);
  }

  pop();

  rope.show();
  rope2.show();
  rope3.show();
  rope4.show();
  rope5.show();

  Engine.update(engine);
  ground.show(); //Mostrar objeto da classe Ground na tela

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit2,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit3,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit4,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit5,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=550)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }

   if(fruit2!=null && fruit2.position.y>=550)
   {
     bunny.changeAnimation('crying');
     bk_song.stop();
     sad_sound.play();
     fruit2=null;
      
    }

    if(fruit3!=null && fruit3.position.y>=550)
    {
      bunny.changeAnimation('crying');
      bk_song.stop();
      sad_sound.play();
      fruit3=null;
       
     }

     if(fruit4!=null && fruit4.position.y>=550)
     {
       bunny.changeAnimation('crying');
       bk_song.stop();
       sad_sound.play();
       fruit4=null;
        
      }


      if(fruit5!=null && fruit5.position.y>=550)
      {
        bunny.changeAnimation('crying');
        bk_song.stop();
        sad_sound.play();
        fruit5=null;
         
       }

   


}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}

function drop4()
{
  cut_sound.play();
  rope4.break();
  fruit_con4.detach();
  fruit_con4 = null; 
}

function drop5()
{
  cut_sound.play();
  rope5.break();
  fruit_con5.detach();
  fruit_con5 = null; 
}





function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=27)
            {
              World.remove(engine.world,fruit, fruit2, fruit3, fruit4, fruit5);
               fruit, fruit2, fruit3, fruit4, fruit5 = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
    }
     else{
      bk_song.play();
     }
}


