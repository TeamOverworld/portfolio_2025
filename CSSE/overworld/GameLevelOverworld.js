// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelMeteorBlaster from './GameLevelMeteorBlaster.js';

class GameLevelOverworld {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_sky = path + "/images/gamify/desert.png"; // be sure to include the path
    const image_data_sky = {
        name: 'sky',
        greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
        src: image_src_sky,
        pixels: {height: 580, width: 1038}
    };


    // Player data for Player
    const sprite_src_player = path + "/images/gamify/chillguy.png"; // be sure to include the path
    const PLAYER_SCALE_FACTOR = 5;
    const sprite_data_player = {
        id: 'Player',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_player,
        SCALE_FACTOR: PLAYER_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/PLAYER_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };


    // NPC data for Villager
    const sprite_src_villager = path + "/gamify/images/villager.png"; // be sure to include the path
    const sprite_greet_villager = "skibisi villaegr hahaha gimve me emerals plz";
    const sprite_data_villager = {
        id: 'Villager',
        greeting: sprite_greet_villager,
        src: sprite_src_villager,
        SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 11 },
        down: {row: 5, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        // Linux command quiz
        quiz: { 
          title: "Linux Command Quiz",
          questions: [
            "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
            "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
            "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
            "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
            "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
            "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
            "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
            "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
            "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
            "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
          ] 
        },
        reaction: function() {
          alert(sprite_greet_villager);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_villager.quiz);
          }
    
      };


    // NPC Data for creeper
    const sprite_src_creeper = path + "/images/gamify/r2_idle.png"; // be sure to include the path
    const sprite_greet_creeper = "Hi I am R2D2.  Leave this planet and help defent the rebel base on Hoth!";
    const sprite_data_creeper = {
      id: 'Creeper',
      greeting: sprite_greet_creeper,
      src: sprite_src_creeper,
      SCALE_FACTOR: 8,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 100,
      pixels: {width: 505, height: 223},
      INIT_POSITION: { x: (width * 1 / 4), y: (height * 3 / 4)}, // Adjusted position
      orientation: {rows: 1, columns: 3 },
      down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      /* Reaction function
      *  This function is called when the player collides with the NPC
      *  It displays an alert with the greeting message
      */
      reaction: function() {
        alert(sprite_greet_creeper);
      },
      /* Interact function
      *  This function is called when the player interacts with the NPC
      *  It pauses the main game, creates a new GameControl instance with the StarWars level,
      */
      interact: function() {
        // Set a primary game reference from the game environment
        let primaryGame = gameEnv.gameControl;
        // Define the game in game level
        let levelArray = [GameLevelStarWars];
        // Define a new GameControl instance with the StarWars level
        let gameInGame = new GameControl(gameEnv.game,levelArray);
        // Pause the primary game 
        primaryGame.pause();
        // Start the game in game
        gameInGame.start();
        // Setup "callback" function to allow transition from game in gaame to the underlying game
        gameInGame.gameOver = function() {
          // Call .resume on primary game
          primaryGame.resume();
        }
      },
      moveHorizontally: function () {
        let direction = -1; // 1 for right, -1 for left
        const step = 4; // Distance to move per interval (speed)
        const maxDistance = 100; // Maximum distance to move left or right
        let initialX = this.INIT_POSITION.x;
    
        setInterval(() => {
            this.INIT_POSITION.x += direction * step;
    
            // Reverse direction if the guard reaches the max distance
            if (this.INIT_POSITION.x > initialX + maxDistance || this.INIT_POSITION.x < initialX - maxDistance) {
                direction *= -1;
    
                // Flip the sprite horizontally based on direction
                const spriteElement = document.getElementById(this.id); // Ensure the sprite has an ID matching its `id` property
                if (spriteElement) {
                    spriteElement.style.transform = direction === -1 ? 'scaleX(1)' : 'scaleX(-1)';
                }
            }
        }, this.ANIMATION_RATE);
      }

    };

    // List of objects defnitions for this level
    this.classes = [
      { class: Background, data: image_data_sky },
      { class: Player, data: sprite_data_player },
      { class: Npc, data: sprite_data_villager },
      { class: Npc, data: sprite_data_creeper },
    ];
    
  }

}

export default GameLevelOverworld;