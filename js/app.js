var Enemy = function (x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 0;


};




//
Enemy.prototype.update = function (dt) {
    if (this.x <= 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {

    this.x = 200;
    this.y = 400;
};


Player.prototype.update = function (dt) {

    var self = this;
    //below made changes as it was required by reviewer to prevern player to fall of the screen

    if (this.pressedKey === 'left' && this.x >= 100) {
        self.x = self.x - 100;
    }


    if (this.pressedKey === 'right' && this.x <= 300) {
        self.x = self.x + 100;
    }


    if (this.pressedKey === 'up' && this.y >= 0) {
        self.y = self.y - 100;
    }


    if (this.pressedKey === 'down' && this.y <= 300) {
        self.y = self.y + 100;
    }


    this.pressedKey = null;


    if (this.y < 0) {
        this.reset();
        scoreUp();

    }

    allEnemies.forEach(function (enemy) {
        if (self.x >= enemy.x - 35 && self.x <= enemy.x + 35) {
            if (self.y >= enemy.y - 40 && self.y <= enemy.y + 40) {
                self.reset();
                scoreDown();
            }
        }
    });
};

Player.prototype.render = function () {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method for player:
Player.prototype.handleInput = function (e) {

    this.pressedKey = e;
};

//Reset player to beginning position
Player.prototype.reset = function () {

    this.x = 200;
    this.y = 400;
};


// Instantiation of enemies and player objects:
var allEnemies = [new Enemy(30, 60), new Enemy(0, 145), new Enemy(90, 225)]; //creates an array of Enemies


var player = new Player();
player.sprite = "images/char-boy.png";
document.querySelector(".boy").addEventListener("click",
    function () {

        player.sprite = "images/char-boy.png";
    });

document.querySelector(".cat-girl").addEventListener("click",
    function () {

        player.sprite = "images/char-cat-girl.png";
    });


document.querySelector(".horn-girl").addEventListener("click",
    function () {
        player.sprite = "images/char-horn-girl.png";

    });

document.querySelector(".pink-girl").addEventListener("click",
    function () {

        player.sprite = "images/char-pink-girl.png";
    });
document.querySelector(".princess-girl").addEventListener("click",
    function () {
        player.sprite = "images/char-princess-girl.png";

    });




// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
var playerScore = 0;
var scoreUp = function () {

    playerScore += 1;
    document.querySelector(".upDown").innerHTML = "Your score is -- " + playerScore;
    if (playerScore == 50) {
        document.querySelector(".upDown").innerHTML = "Congratulations! You are WINNER!!!!";
        document.querySelector(".win").style.display = "block";
        document.querySelector(".upDown").style.fontSize = "60px";
        playerScore = 0;
        //Here game stops
        allEnemies[0].speed = 0;
        allEnemies[1].speed = 0;
        allEnemies[2].speed = 0;
    }
}
var scoreDown = function () {
    playerScore -= 2;
    if (playerScore < 0) {
        playerScore = 0;
    }
    document.querySelector(".upDown").innerHTML = "Your score is -- " + playerScore;

}


var switching = true;
document.querySelector(".start").addEventListener("click", function () {


    if (switching) {
        allEnemies[0].speed = Math.floor((Math.random() * 180) + 100);
        allEnemies[1].speed = Math.floor((Math.random() * 180) + 100);
        allEnemies[2].speed = Math.floor((Math.random() * 180) + 100);
        document.querySelector(".win").style.display = "none";
        switching = false;
        document.querySelector(".start").innerHTML = "RESET Game";


    } else {

        allEnemies[0].speed = 0;
        allEnemies[1].speed = 0;
        allEnemies[2].speed = 0;
        allEnemies[0].x = 0;
        allEnemies[1].x = 0;
        allEnemies[2].x = 0;
        playerScore = 0;
        document.querySelector(".win").style.display = "none";
        document.querySelector(".upDown").innerHTML = "Your score is -- 0";
        switching = true;
        document.querySelector(".start").innerHTML = "START Game";
        player.x = 200;
        player.y = 400;

    }


});
