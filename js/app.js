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
    //this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 400;
};


Player.prototype.update = function (dt) {

    var self = this;

    if (this.pressedKey === 'left' && this.x >= 0) {
        this.x = this.x - 100;
    }


    if (this.pressedKey === 'right' && this.x <= 400) {
        this.x = this.x + 100;
    }


    if (this.pressedKey === 'up' && this.y >= 0) {
        this.y = this.y - 100;
    }


    if (this.pressedKey === 'down' && this.y <= 400) {
        this.y = this.y + 90;
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

//this function will DISPLAY Enemies:
/*(function displayEnemies() {

    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());*/


var player = new Player();

player.sprite = 'images/char-pink-girl.png';

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
    if (playerScore == 5) {
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

    }


});
