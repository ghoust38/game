var pjs = new PointJS(1500,770, {backgroundColor: '#999999'})
var game = pjs.game;
var pr = pjs.presets; 
var random = pjs.math.random;
var tiles = pjs.tiles;
var key = pjs.keyControl;
var mouse = pjs.mouseControl;
mouse.initControl();
key.initKeyControl();
var vector = pjs.vector;
var p = pjs.vector.point;
pjs.system.initFullPage();
var WH =game.getWH();
var vol = 1;
var speed = 7;
var hp2 = 700;
var hp=100;
var playerY = 0;
var playerX = 0;
var hp1 =game.newTextObject({
     size : 30,
     text: "HP: 100",
     color : "red"
})
var score = game.newTextObject({
     size : 30,
     text: "Счёт : 0",
     color : "black"
})
var wood = [];{
      for(b=0;b<500;b++){
          wood.push(
     game.newImageObject(   { 
    file:('w.png'),
    x:random (7000,20000),
    y:random (0,10000),
    w : 150,
    h : 150,
       }
       ));
      }
}
var boss = game.newAnimationObject(   { 
    animation: tiles.newImage('boss.png').getAnimation(0,0,90.14,99,7),
    x:random (0,5000),
    y:random(0,10000),
    w : 150,
    h : 150,
    delay: 6
   });
var v =0;
var n = 2000, x,y,fon=[];{
     for(x=0;x<10;x++){
          for(y=0;y<10;y++){
               fon.push(
                    game.newImageObject({
                         file: 'image.png',x:x*n,y:y*n,w:n,h:n
                    }));

          }
     }
};

   var fireball = game.newAnimationObject(   { 
    animation : tiles.newImage('x.png').getAnimation(0,0,64,32,8),
    x:6500,
    y:6000,
    w : 64,
    h : 32,
    delay: 6
   })
var box=[];{
      for(b=0;b<300;b++){
          box.push(
     game.newAnimationObject(   { 
    animation: tiles.newImage('e.png').getAnimation(0,0,80,71,4),
    x:random (0,3000),
    y:random(0,10000),
    w : 100,
    h : 100,
    delay: 6,
       }
       ));
      }
}

var player = game.newAnimationObject(   { 
    animation: tiles.newImage('d.png').getAnimation(0,0,48,49,3),
    x:6500,
    y:6000,
    w : 70,
    h : 70,
    delay: 8
   });
var COLLLISION = function () {
     for(var c in wood){

if (wood[c].isStaticIntersect( player.getStaticBoxA(-speed,0,speed))){
if (-speed){

player.setPosition(p(wood[c].x+159,player.y))
     
     }
     }
if (wood[c].isStaticIntersect( player.getStaticBoxD(0,0,speed))){
if (speed){
player.setPosition(p(wood[c].x-79,player.y))
     
     }
     }
if (wood[c].isStaticIntersect( player.getStaticBoxW(0,-speed,0,speed))){
if (-speed){
player.setPosition(p(player.x,wood[c].y+160))
     
     }
     }
     if (wood[c].isStaticIntersect( player.getStaticBoxS(0,0,0,speed))){
if (speed){
player.setPosition(p(player.x,wood[c].y-79))
     
     }
     }
}
}
var MoevEnemies = function(){
     for(var b in box){
     if(box[b].x >= player.x){
     box[b].setFlip(1,0)
}
else
box[b].setFlip(0,0)
}
if(boss.x>= player.x){
     boss.setFlip(1,0)
}
else
boss.setFlip(0,0)
}
game.newLoop('myGame', function () {
COLLLISION();
MoevEnemies();
pr.mouseMoveInit(fireball,25,2,1);
pr.mouseMove();
pr.keyMoveInit(player, speed);
if(key.isDown("D")){
     player.setFlip(1,0);
}
if(key.isDown("A")){
     player.setFlip(0,0)
}
pr.keyMove();
for(let i = 0; i < box.length; i++){
     box[i].moveToC(player.getPositionC(),8,8);
}
pjs.camera.setPositionC(p(playerX,playerY,));

for(var i in fon){
if(fon[i].isInCamera())
fon[i].draw();
}
for(var b in box){
if(box[b].isInCamera())
box[b].draw();
}
for(var o in wood){
if(wood[o].isInCamera())
wood[o].draw();
pr.mouseMoveCollision(wood[o])
}
player.draw();
fireball.draw();

for(var b in box){
if(player.getDistanceC(box[b].getPosition(1))<=50 || player.getDistanceC(boss.getPosition(1))<=50){
hp--;
if(hp<=0){
pjs.brush.drawText({
     text: "Игра окончена!",
     x:player.x - 100,
     y:player.y - 100,
     color:"red",
     size:50

})
pjs.brush.drawText({
     text: "Ваш Счёт: " + v,
     x:player.x - 70,
     y:player.y - 50,
     color:"red",
     size:50
})     
game.stop();
}
}
score.reStyle({
text: "Счёт: " + v
});
score.setPositionS(p(10,20));
score.draw();
if(fireball.getDistanceC(box[b].getPosition(1))<=60){
box.splice(b,1)
     v++;
}
}
for(var g in wood){
     if(wood[g].isArrIntersect(wood)||(wood[g].isArrIntersect(box))){
     wood.splice(g,1)
     }
if (boss.getDistanceC(wood[g].getPosition(1))<=100){
    wood.splice(g,1) 
}

}
if(box.length<=100){
vol ++;
for(b=0;b<200;b++){

           
box.push(
    game.newAnimationObject(   { 
    animation: tiles.newImage('e.png').getAnimation(0,0,80,71,4),
    x:random (0,3000),
    y:random(0,10000),
    w : 150,
    h : 150,
    delay: 6,
       }
       ));
}

}
hp1.reStyle({
text: "HP: "+ hp
})
hp1.setPositionS(p(10,50))
hp1.draw();
if(boss.isDynamicIntersect(fireball.getDynamicBox())){
hp2 --
if(hp2 <=0){
     pjs.brush.drawText({
     text: "Вы победили!",
     x:player.x - 100,
     y:player.y - 100,
     color:"red",
     size:50

})
pjs.brush.drawText({
     text: "Ваш Счёт: " + v,
     x:player.x - 100,
     y:player.y - 50,
     color:"red",
     size:50
})
boss.clear();
}
}
if(vol >= 3){
boss.moveToC(player.getPositionC(),5,5);
boss.draw();
}
if(vector.getDistance(p(player.getPosition().x,0),p(0,0)) >6200){
     playerX = player.getPosition(1).x;
}
if(vector.getDistance(p(0,player.getPosition().y),p(0,0))>1000){
     playerY = player.getPosition(1).y;
}
})


game.setLoop('myGame');
game.start();