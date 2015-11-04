/***********************************************************************************
* This is JavaScript file that sets the canvas element.
***********************************************************************************/

// Creates variable that is pointing on canvas element
var can = document.getElementById("canvas");
var c = can.getContext("2d");
can.width = 400;
can.height = 550;

var dist = document.getElementById("distance");
var points = document.getElementById("points");
var level = document.getElementById("level");
var lives = document.getElementById("lives");
var walls = document.getElementById("walls");
var comment = document.getElementById("com");

var img = new Image();
var wallImg = new Image();
var funnel = new Image();
var puddle = new Image();

var over = false;

// Road object
var rl = {
    x1: 50,
    x2: 350,
    a: 0,
    b: function(){ return this.lines(1, 0);},
    c: function(){ return this.lines(1, 1);},
    d: function(){ return this.lines(2, 1);},
    e: function(){ return this.lines(2, 2);},
    f: function(){ return this.lines(3, 2);},
    g: function(){ return this.lines(3, 3);},
    h: function(){ return this.lines(4, 3);},
    i: function(){ return this.lines(4, 4);},
    j: function(){ return this.lines(5, 4);},
    k: function(){ return this.lines(5, 5);},
    l: function(){ return this.lines(6, 5);},
    m: function(){ return this.lines(6, 6);},
    length: 100,
    gap: 10,
    speed: 0,
    vialence: 2,
    lines: function(l, g){return this.a + l * this.length + g * this.gap;}
};

var bullet = {
    x: -1,
    y: -1,
    w: 2,
    l: 5,
    speed: 4,
    shot: function(){
        this.y -= this.speed;
    },
    draw: function(){
        c.fillStyle = "rgb(255, 0, 0)";
        c.fillRect(this.x, this.y, this.w, this.l);
    }
}

// this object draws the car on the canvas road
var car = {
    x1: 160,
    l: 80,
    y1: 400,
    h: 100,
    move: 2,
    draw: function(image){
        img.src = image;
        c.drawImage(img, this.x1, this.y1);
    },
    keys: []
};

// this object builds the wall on the canvas
// road.
var wall = {
    x: 51,
    y: -40,
    h: 40,
    l: 100,
    draw: function(){
        wallImg.src = "img/wall.jpg";
        c.drawImage(wallImg, this.x, this.y);
    },
    level: 0
};

var puddle = {
    l: 100,
    h: 100,
    x: 0,
    y: 551,
    draw: function(){
        puddle.src = "img/puddle.gif";
        c.drawImage(puddle, this.x, this.y);
    },
    level: 1
};

var destroyed_wall = {
    x: 51,
    y: 600,
    exp: function(image){
        funnel.src = image;
        c.drawImage(funnel, this.x, this.y);
    }
};

var game = {
    level: 0,
    distance: 0,
    points: 0,
    lives: 2,
    walls: 0,
    game_over: function(){
        if(this.lives === 0){
            c.font = "40px Verdana";
            c.fillStyle = "brown";
            c.fillText("Game Over", 80, 300);
        }
    }
};

points.innerHTML = game.points;
level.innerHTML = game.level;
lives.innerHTML = game.lives;
walls.innerHTML = game.walls + " x1000";


// this function places the wall randomly on the
// canvas road.
var pos = function(level, obj){
    var num = Math.floor((Math.random() * 3) + 1);
    if(num === 1){
        obj.x = 51;
    }
    else if(num === 2){
        obj.x = 150;
    }
    else{
        obj.x = 249;
    }
};

var repeatme = function(){
    
    c.clearRect(0, 0, can.width, can.height);
    
    
    c.beginPath();
    c.fillStyle = "rgb(0, 255, 0)";
    c.fillRect(0, 0, 49, 550);
    c.fillStyle = "lightgrey";
    c.fillRect(51, 0, 298, 550);
    c.fillStyle = "rgb(0, 255, 0)";
    c.fillRect(351, 0, 50, 550);
    
    c.moveTo(rl.x1, rl.a);
    c.lineTo(rl.x1, rl.b());
    c.moveTo(rl.x1, rl.c());
    c.lineTo(rl.x1, rl.d());
    c.moveTo(rl.x1, rl.e());
    c.lineTo(rl.x1, rl.f());
    c.moveTo(rl.x1, rl.g());
    c.lineTo(rl.x1, rl.h());
    c.moveTo(rl.x1, rl.i());
    c.lineTo(rl.x1, rl.j());
    c.moveTo(rl.x1, rl.k());
    c.lineTo(rl.x1, rl.l());
    
    c.moveTo(rl.x2, rl.a);
    c.lineTo(rl.x2, rl.b());
    c.moveTo(rl.x2, rl.c());
    c.lineTo(rl.x2, rl.d());
    c.moveTo(rl.x2, rl.e());
    c.lineTo(rl.x2, rl.f());
    c.moveTo(rl.x2, rl.g());
    c.lineTo(rl.x2, rl.h());
    c.moveTo(rl.x2, rl.i());
    c.lineTo(rl.x2, rl.j());
    c.moveTo(rl.x2, rl.k());
    c.lineTo(rl.x2, rl.l());
    
    c.stroke();
    
    if((rl.gap - rl.a) > rl.speed){
        rl.a += rl.speed;
    }
    else{
        rl.a += rl.speed - rl.gap - rl.length;
        game.distance += 10;
    }
    
    
    // generate the wall
    if(game.distance >= 100 && game.distance % 100 === 0){
        wall.y = -41;
        pos(game.level, wall);
    }
    if(wall.y < can.height){
        wall.y += rl.speed;
        // wall.draw();
    }
    if(destroyed_wall.y < can.height){
        destroyed_wall.y += rl.speed;
    }
    
    // character movement in canvas game using keyboard controls
    if(car.keys[39]){
        if((car.x1 + car.l) < rl.x2){
            if((car.x1 + car.l) >= (rl.x2 - car.move)){
                car.x1 = rl.x2 - car.l - 1;
            }
            else{
                car.x1 += car.move;
            }
        }
    }
    else if(car.keys[37]){
        if(car.x1 > rl.x1){
            if(car.x1 < (rl.x1 + car.move)){
                car.x1 = rl.x1 + 1;
            }
            else{
                car.x1 -= car.move;
            }
        }
    }
    
    // character shooting control
    if(bullet.y > -1){
        if(bullet.y <= bullet.speed){
            bullet.y = -1;
        }
        else 
            bullet.shot();
        bullet.draw();
    }
    // if bullet get into wall
    if(((wall.y + wall.h) >= bullet.y) && bullet.x > wall.x && (bullet.x + bullet.w) < (wall.x + wall.l)){
        bullet.x = -1;
        bullet.x = -1;
        destroyed_wall.x = wall.x;
        destroyed_wall.y = wall.y;
        wall.y = can.height + 1;
        destroyed_wall.exp("img/exp.png");
        game.points += 1000;
        game.walls++;
        points.innerHTML = game.points;
        walls.innerHTML = game.walls + " x1000"
    }
    else{
        wall.draw();
        destroyed_wall.exp("img/destroyed_wall.gif");
    }
    
    //console.log(car.destroyed);
    // stats panel populating
    if(game.distance % 100 === 0)
        dist.innerHTML = game.distance / 1000 + " km";
    
    // collision with wall
    if(((wall.y + wall.h) >= car.y1) && (wall.y <= (car.y1 + car.h)) && car.x1 > (wall.x - car.l) && car.x1 < (wall.x + wall.l)){
        rl.speed = 0;
        car.draw("img/exp.png");
        game.lives--;
        lives.innerHTML = game.lives;
        over = true;
    }
    else{
        car.draw("img/sau.gif");
    }
    
    // This line recursevely calls this function
    if(!over && game.lives > 0){
        window.requestAnimationFrame(repeatme);
        comment.innerHTML = "";
    }
    else if(over && game.lives > 0){
        comment.innerHTML = "To continue the game press S";
    }
    if(game.lives === 0){
        game.game_over();
        comment.innerHTML = "No lives left!</br>To Play again press A";
    }
};

// Add an event listener to the keypress event.
window.addEventListener("keydown", function(event) {
    if(event.keyCode === 37 || event.keyCode === 39)
        car.keys[event.keyCode] = true;
    else if(event.keyCode === 38){
        if(rl.speed === 0){
            rl.speed += rl.vialence;
        }
        else if(rl.speed > 0 && bullet.y === -1){
            bullet.x = (car.x1 + (car.l / 2));
            bullet.y = car.y1 + 10;
        }
    }
    else if(event.keyCode === 40){
        if(rl.speed > 0){
            rl.speed -= rl.vialence;
        }
    }
    else if(event.keyCode === 83 && game.lives > 0){
        car.x = 160;
        car.y = 400;
        wall.x = 51;
        wall.y = -40;
        over = false;
        //window.location.href = "index.html";
        repeatme();
    }
    else if(event.keyCode === 65){
        window.location.href = "index.html";
    }
    //console.log(event);
});
window.addEventListener("keyup", function(event) {
    if(event.keyCode === 37 || event.keyCode === 39)
        car.keys[event.keyCode] = false;
});


repeatme();