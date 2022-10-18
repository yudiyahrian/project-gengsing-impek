var player;
var enemy;


class Sprite {
    constructor({position,velocity}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }
}


function startGame() {
    myGameArea.start();
    player = new component(50, 150, "red", 40, 0);
    enemy = new component(50, 150, "red", 1500, 0);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1590;
        this.canvas.height = 790;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.gravity = 0.7;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        
        this.hitBottom();
        this.hitRight();
        this.hitTop();
        this.hitLef();
    }
    this.hitBottom = function() {
        var bottom = myGameArea.canvas.height - this.height;
        if (this.y > bottom){
            this.gravitySpeed = 0 ;
            this.y = bottom;
        } else {
            player.speedY = 0 ;
        }
    }
    this.hitRight = function() {
        var right = myGameArea.canvas.width - this.width;
        if(this.x > right){
            this.x = right;
        }
    }
    this.hitTop = function() {
        if(this.y < 0){
            this.y = 0;
        }
    } 
    this.hitLef = function() {
        if(this.x < 0){
            this.x = 0;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    player.speedX = 0;
    player.speedY = 0;    

    if (myGameArea.keys && myGameArea.keys[37]) {player.speedX = -10; myGameArea.clear() }
    if (myGameArea.keys && myGameArea.keys[39]) {player.speedX = 10; myGameArea.clear() }
   
    
    
    if (myGameArea.keys && myGameArea.keys[68])  {player.speedX = 80; } else if(myGameArea.key == false ) { myGameArea.clear()}
    if (myGameArea.keys && myGameArea.keys[65]) {player.speedX = -80; } else if(myGameArea.key == false ) { myGameArea.clear()}
    if (myGameArea.keys && myGameArea.keys[87]) {player.speedY = -20; } else if(myGameArea.key == false ) { myGameArea.clear()}
    if (myGameArea.keys && myGameArea.keys[16]) {player = new component(50,150,"red",40,0); } else if(myGameArea.key == false ) { myGameArea.clear()}
    player.newPos();    
    player.update();
    enemy.newPos();
    enemy.update();
}



// function updateGameArea() {
//     myGamePiece.speedX = 0;
//     myGamePiece.speedY = 0;    
    
//     player.newPos();    
//     player.update();
//     enemy.newPos();
//     enemy.update();
//     myGamePiece.newPos();    
//     myGamePiece.update();
// }

// function enemy(){
//     enemyX = Math.floor(Math.random() * cols) * block;
//     enemyY = Math.floor(Math.random() * rows) * block;
// }
