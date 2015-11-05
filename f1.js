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
var pud = new Image();

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
    y: 600,
    h: 40,
    l: 100,
    draw: function(){
        wallImg.src = "img/wall.jpg";
        c.drawImage(wallImg, this.x, this.y);
    },
    level: 1
};

var puddle = {
    l: 100,
    h: 100,
    x: 0,
    y: 551,
    draw: function(){
        pud.src = "img/puddle.gif";
        c.drawImage(pud, this.x, this.y);
    },
    level: 0
};

var puddleConst = function(){
    this.l = 100;
    this.h = 100;
    this.x = 0;
    this.y = 551;
    this.draw = function(){
        pud.src = "img/puddle.gif";
        c.drawImage(pud, this.x, this.y);
    };
}

var puddleObj = [];
puddleObj[0] = new puddleConst();
puddleObj[1] = new puddleConst();


var destroyed_wall = {
    x: 51,
    y: 600,
    exp: function(image){
        funnel.src = image;
        c.drawImage(funnel, this.x, this.y);
    }
};

var game = {
    level: 2,
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

var twoObjPos = function(obj1, obj2){
    var num = Math.floor((Math.random() * 3) + 1);
    if(num === 1){
        obj1.x = 51;
        obj2.x = 249;
    }
    else if(num === 2){
        obj1.x = 150;
        obj2.x = 249;
    }
    else{
        obj1.x = 51;
        obj2.x = 150;
    }
}

var collisionFunction = function(obj){
    if(((obj.y + (obj.h - 30)) >= car.y1) && 
       (obj.y <= (car.y1 + car.h - 30)) &&
       car.x1 > (obj.x - car.l + 20) &&
       car.x1 < (obj.x + obj.l - 20)){
        rl.speed = 0;
        game.lives--;
        lives.innerHTML = game.lives;
        over = true;
    }
}

var repeatme = function(){
    
    //***************************************************************
    // Clears the canvas every time when repeat()   *****************
    // function is called   *****************************************
    //***************************************************************
    c.clearRect(0, 0, can.width, can.height);
    
    //***************************************************************
    // road factory code:   *****************************************
    // Fills the road and edges with different colors   *************
    // Marks the road edges with lines   ****************************
    //***************************************************************
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
    //***************************************************************
    
    
    //***************************************************************
    // This code moves the road *************************************
    //***************************************************************
    if((rl.gap - rl.a) > rl.speed){
        rl.a += rl.speed;
    }
    else{
        rl.a += rl.speed - rl.gap - rl.length;
        game.distance += 10;
        if(game.distance === 500){
            game.level = game.level + 1;
            level.innerHTML = game.level;
        }
        else if(game.distance === 1000){
            game.level ++;
            level.innerHTML = game.level;
        }
    }
    //***************************************************************
    
    
    //***************************************************************
    // generate the enimies objects  ********************************
    //***************************************************************
    if(game.distance >= 40){
        if(game.level >= 0 && game.level < 2 && game.distance % 80 === 0){
            puddle.y = -101;
            pos(game.level, puddle);
        }
        if(game.level >= 1){
            if((game.distance - 200) % 80 === 0){
                wall.y = -41;
                pos(game.level, wall);
            }
        }
        if(game.level >= 2 && game.distance % 80 === 0){
            puddleObj[0].y = -101;
            puddleObj[1].y = -101;
            twoObjPos(puddleObj[0], puddleObj[1]);
        }
    }
//    if(game.distance >= 100 && game.distance % 100 === 0){
//        wall.y = -41;
//        pos(game.level, wall);
//    }
    if(puddle.y < can.height){
        puddle.y += rl.speed;
        puddle.draw();
    }
    if(wall.y < can.height){
        wall.y += rl.speed;
        // wall.draw();
    }
    if(destroyed_wall.y < can.height){
        destroyed_wall.y += rl.speed;
    }
    if(puddleObj[0].y < can.height){
        puddleObj[0].y += rl.speed;
        puddleObj[1].y += rl.speed;
        puddleObj[0].draw();
        puddleObj[1].draw();
    }
    //***************************************************************
    
    
    
    //***************************************************************
    // character movement in canvas game using keyboard controls   **
    //***************************************************************
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
    //***************************************************************
    
    
    
    
    //***************************************************************
    // character shooting control   *********************************
    //***************************************************************
    if(bullet.y > -1){
        if(bullet.y <= bullet.speed){
            bullet.x = -1;
            bullet.y = -1;
        }
        else 
            bullet.shot();
        bullet.draw();
    }
    //***************************************************************
    
    
    
    //***************************************************************
    // if bullet get into wall   ************************************
    //***************************************************************
    if(((wall.y + wall.h) >= bullet.y) && bullet.x > wall.x && (bullet.x + bullet.w) < (wall.x + wall.l)){
        bullet.x = -1;
        bullet.y = -1;
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
    //***************************************************************
    
    
    
    
    //***************************************************************
    // stats panel populating   *************************************
    //***************************************************************
    if(game.distance % 100 === 0)
        dist.innerHTML = game.distance / 1000 + " km";
    if(wall.y === car.y1 + car.h + 1){
        game.points += 100;
        points.innerHTML = game.points;
    }
    if(puddle.y === car.y1 + car.h + 1){
        game.points += 200;
        points.innerHTML = game.points;
    }
    if(puddleObj[0].y === car.y1 + car.h + 1){
        game.points += 400;
        points.innerHTML = game.points;
    }
    //***************************************************************
    
    
    
    //***************************************************************
    // collisions   *************************************************
    //***************************************************************
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
    if(((puddle.y + (puddle.h - 30)) >= car.y1) && 
       (puddle.y <= (car.y1 + car.h - 30)) &&
       car.x1 > (puddle.x - car.l + 20) &&
       car.x1 < (puddle.x + puddle.l - 20)){
        rl.speed = 0;
        game.lives--;
        lives.innerHTML = game.lives;
        over = true;
    }
    collisionFunction(puddleObj[0]);
    collisionFunction(puddleObj[1]);
    //***************************************************************
    
    
    
    //***************************************************************
    // This line recursevely calls this function   ******************
    //***************************************************************
    if(!over && game.lives > 0){
        window.requestAnimationFrame(repeatme);
        if(game.distance >= 500 && game.distance < 550)
            comment.innerHTML = "LEVEL " + game.level;
        else{
            comment.innerHTML = "";
        }
    }
    else if(over && game.lives > 0){
        comment.innerHTML = "To continue the game press S";
    }
    if(game.lives === 0){
        game.game_over();
        comment.innerHTML = "No lives left!</br>To Play again press A";
    }
    //***************************************************************
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
        car.x1 = 160;
        car.y1 = 400;
        wall.x = 51;
        wall.y = 600;
        puddle.x = 51;
        puddle.y = 600;
        puddleObj[0].x = 51;
        puddleObj[0].y = 600;
        puddleObj[1].x = 51;
        puddleObj[1].y = 600;
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