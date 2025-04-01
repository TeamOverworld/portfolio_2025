import Character from './Character.js';
import Player from './Player.js';

class Enemy extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.playerDestroyed = false; // Tracks if the player has been "killed"
    }

    /**
     * Override the update method to handle collision detection.
     */
    update() {
        // Update begins by drawing the object
        this.draw();

        // Check for collision with the player
        if (!this.playerDestroyed && this.collisionChecks()) {
            this.handleCollisionEvent();
        }
    }


    /**
     * Check if the Enemy collides with the Player.
     * @returns {boolean} True if the Enemy collides with the Player, False otherwise.
     */
    collisionChecks() {
        for (const gameObj of this.gameEnv.gameObjects) {
            if (gameObj instanceof Player) {
                this.isCollision(gameObj);
                if (this.collisionData.hit) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Handle collision with the Player.
     */
    handleCollisionEvent() {
        console.log("Player collided with the Enemy. Player is dead.");
        this.playerDestroyed = true; // Mark the player as "dead"
        this.gameEnv.gameControl.restartLevel(); // Restart the level
    }
}

export default Enemy;
