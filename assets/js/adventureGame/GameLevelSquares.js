// To build GameLevels, each contains GameObjects from below imports
import GameEnvBackground from './GameEnvBackground.js';
import Background from './Background.js';
import BackgroundParallax from './BackgroundParallax.js';
import Player from './Player.js';

// Minimal Definition
class GameLevelSquares {
  constructor(gameEnv) {
    let path = gameEnv.path;
    this.classes = [      
      { class: GameEnvBackground, data: {} },
      { class: Background, data: {src:  path + "/images/platformer/backgrounds/hills.png"} },
      { class: BackgroundParallax, data: {src:  path + "/images/platformer/backgrounds/snowfall.png"} },
      { class: Player, data: {} }, 
    ];
  }
}

export default GameLevelSquares;