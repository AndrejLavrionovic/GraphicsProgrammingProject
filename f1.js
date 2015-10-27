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
    speed: 2,
    vialence: 2,
    lines: function(l, g){return this.a + l * this.length + g * this.gap;}
};

var car = {
    x1: 160,
    x2: 80,
    y1: 400,
    y2: 100,
    move: 10,
    draw: function(){
        c.rect(car.x1, car.y1, car.x2, car.y2);
        c.stroke();
    }
}

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
    
    if((rl.gap - rl.a) > rl.speed){rl.a += rl.speed}
    else{rl.a += rl.speed - rl.gap - rl.length}
    
    car.draw();
    
    window.requestAnimationFrame(repeatme);
};

// repeatme(0);

//c.beginPath();
//c.rect(car.x1, car.y1, car.x2, car.y2);
//c.stroke();

// Add an event listener to the keypress event.
window.addEventListener("keydown", function(event) { 
    // Just log the event to the console.
    console.log(event);
    if(event.keyCode === 38){
        rl.speed += rl.vialence;
    }
    else if(event.keyCode === 40){rl.speed -= rl.vialence}
    if(event.keyCode === 39){
        car.x1 += car.move;
    }
    else if(event.keyCode === 37){
        car.x1 -= car.move;
    }
    
});

repeatme();