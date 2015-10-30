/***********************************************************************************
* This is JavaScript file that sets the canvas element.
***********************************************************************************/

// Creates variable that is pointing on canvas element
var can = document.getElementById("canvas");
var c = can.getContext("2d");
can.width = 400;
can.height = 550;

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
    distance: 0,
    lines: function(l, g){return this.a + l * this.length + g * this.gap;}
};

var car = {
    x1: 160,
    x2: 80,
    y1: 400,
    y2: 100,
    move: 27,
    draw: function(){
        if(this.y1 < can.height){
            c.rect(this.x1, this.y1, this.x2, this.y2);
            c.stroke();
        }
    }
};

var wall = {
    x1: 51,
    y1: -40,
    h: 40,
    l: 100,
    draw: function(){
        c.fillStyle = "rgb(0, 0, 200)";
        c.fillRect(this.x1, this.y1, this.l, this.h);
    }
};

var pos = function(){
    var num = Math.floor((Math.random() * 3) + 1);
    if(num === 1){
        wall.x1 = 51;
    }
    else if(num === 2){
        wall.x1 = 150;
    }
    else{
        wall.x1 = 249;
    }
};

var dist = document.getElementById("distance");

var repeatme = function (flag) {
    
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
        rl.distance += 10;
    }
    
    car.draw();
    
    if(rl.distance >= 100 && rl.distance % 100 === 0){
        wall.y1 = -41;
        pos();
    }
    if(wall.y1 < can.height){
        wall.draw();
        wall.y1 += rl.speed;
    }
    //console.log("d: " + rl.distance + " m: " + wall.move + " y1: " + wall.y1);
    if(rl.distance % 100 === 0)
        dist.innerHTML = rl.distance / 1000 + " km";
    window.requestAnimationFrame(repeatme);
};

while(wall.distance ){
    
}


// Add an event listener to the keypress event.
window.addEventListener("keydown", function(event) { 
    // Just log the event to the console.
    console.log(event);
    if(event.keyCode === 38){
        rl.speed += rl.vialence;
    }
    else if(event.keyCode === 40){rl.speed -= rl.vialence}
    if(event.keyCode === 39){
        if((car.x1 + car.x2) < rl.x2){
            if((car.x1 + car.x2) >= (rl.x2 - car.move)){
                car.x1 = rl.x2 - car.x2 - 1;
            }
            else{
                car.x1 += car.move;
            }
            //console.log((car.x1 + car.x2) + " " + rl.x2);
        }
    }
    else if(event.keyCode === 37){
        if(car.x1 > rl.x1){
            if(car.x1 < (rl.x1 + car.move)){
                car.x1 = rl.x1 + 1;
            }
            else{
                car.x1 -= car.move;
            }
        }
    }
});

repeatme();

