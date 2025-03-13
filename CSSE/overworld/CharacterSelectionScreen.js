class CharacterSelectionScreen {
    constructor(onComplete) {
        this.onComplete = onComplete; // Callback to start the game
        this.selectedCharacter = null;
        this.createScreen();
    }

    createScreen() {
        const container = document.getElementById("gameContainer");
        container.innerHTML = `
            <div id="characterSelection" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background: linear-gradient(45deg, #1a1a2e, #16213e);
                color: white;
                font-family: Arial, sans-serif;
            ">
                <h2 style="font-size: 2rem; margin-bottom: 20px;">Choose Your Character</h2>
                <div style="display: flex; gap: 50px;">
                    ${this.createCharacterOption("Alex", "images/alex.png")}
                    ${this.createCharacterOption("Steve", "images/steve.png")}
                </div>
                <button id="startGameBtn" style="
                    display: none;
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 1.2rem;
                    color: white;
                    background: #ff7b00;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: 0.3s;
                ">Start Game</button>
            </div>
        `;

        document.getElementById("alexChoice").addEventListener("click", () => this.selectCharacter("Alex"));
        document.getElementById("steveChoice").addEventListener("click", () => this.selectCharacter("Steve"));
        document.getElementById("startGameBtn").addEventListener("click", () => this.startGame());
    }

    createCharacterOption(name, imagePath) {
        return `
            <div id="${name.toLowerCase()}Choice" style="
                cursor: pointer;
                transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                text-align: center;
            ">
                <img src="${imagePath}" alt="${name}" style="
                    width: 200px; 
                    border-radius: 15px;
                    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
                ">
                <p style="margin-top: 10px; font-size: 1.5rem;">${name}</p>
            </div>
        `;
    }

    selectCharacter(character) {
        this.selectedCharacter = character;
        localStorage.setItem("selectedCharacter", character);

        document.getElementById("alexChoice").style.opacity = character === "Alex" ? "1" : "0.5";
        document.getElementById("steveChoice").style.opacity = character === "Steve" ? "1" : "0.5";

        document.getElementById("startGameBtn").style.display = "block";
    }

    startGame() {
        if (this.selectedCharacter) {
            this.onComplete(this.selectedCharacter); // Call Game.startGame()
        }
    }
}

export default CharacterSelectionScreen;
