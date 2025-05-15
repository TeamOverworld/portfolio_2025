import Character from './Character.js';
import GameEnv from './GameEnv.js';
import GameControl from './GameControl.js';

export class Enemy extends Character {

    initEnvironmentState = {
        // Enemy
        animation: 'right',
        direction: 'right',
        isDying: false,
    };

    // constructors sets up Character object 
    constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition) {
        super(canvas, image, data, xPercentage, yPercentage, name, minPosition);
        this.playerData = data;
        //Unused but must be Defined
        this.name = name;
        this.y = yPercentage;

        this.isIdle = false;
        //Initial Position of Goomba
        this.x = xPercentage * GameEnv.innerWidth;

        this.state = {...this.initEnvironmentState}; // Enemy and environment states 

        //Access in which a Goomba can travel    
        this.minPosition = minPosition * GameEnv.innerWidth;
        this.maxPosition = this.x + xPercentage * GameEnv.innerWidth;

        this.immune = 0;
    }

    setAnimation(key) {
        // animation comes from playerData
        var animation = this.playerData[key]

        // set frame and idle frame
        this.setFrameY(animation.row);
        this.setMinFrame(animation.min ? animation.min : 0);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }

    enemySpeed(){ //if you want the enemy speed to change based on different 'difficulty', you can include this function to the update function
        //Define Speed of Enemy
        if (["easy", "normal"].includes(GameEnv.difficulty)) {
            this.speed = this.speed * Math.floor(Math.random() * 1.5 + 2);
        } else if (GameEnv.difficulty === "hard") {
            this.speed = this.speed * Math.floor(Math.random() * 3 + 3);
        } else {
            this.speed = this.speed * 5
        }
    }

    checkBoundaries(){
        // Check for boundaries
        if (this.x <= this.minPosition || (this.x + this.canvasWidth >= this.maxPosition)) {
            if (this.state.direction === "left") {
                this.state.animation = "right";
                this.state.direction = "right";
            }
            else if (this.state.direction === "right") {
                this.state.animation = "left";
                this.state.direction = "left";
            }
        };
    }

    updateMovement(){
        if (this.collisionData.touchPoints.other.id === "player") {
    if (this.collisionData.touchPoints.other.left && this.immune == 0) {  
        this.speed = -this.speed;  // Reverse speed
        this.x += 10;  // Move enemy back slightly
    }
}

        // Move the enemy\
        this.x += this.speed;

        this.playerBottomCollision = false;
    }

    update() {
        super.update();

        this.setAnimation(this.state.animation);
        
        this.checkBoundaries();

        this.updateMovement();

    }

    // Player action on collisions
    collisionAction() {
        if (this.collisionData.touchPoints.other.id === "player") {
            // Existing behavior: If the player hits the bottom of the enemy
            if (this.collisionData.touchPoints.other.bottom && this.immune == 0) {
                GameEnv.invincible = true;
                GameEnv.goombaBounce = true;
                this.canvas.style.transition = "transform 1.5s, opacity 1s";
                this.canvas.style.transformOrigin = "bottom";
                this.canvas.style.transform = "scaleY(0)";
                this.speed = 0; // Stop movement
                GameEnv.playSound("goombaDeath");
    
                setTimeout((function() {
                    GameEnv.invincible = false;
                    this.destroy();
                }).bind(this), 1500);
    
                setTimeout(function () {
                    this.destroy();
                    GameEnv.invincible = false;
                }, 2000);
            }
    
            // New Hack: Stop movement and restore speed after 3 seconds
            this.speed = 0;  // Stop movement
    
            setTimeout(() => {
                this.speed = 3;  // Restore original speed after 3 seconds
            }, 3000);  // Time in milliseconds
        }
    }
    
}

export default Enemy;