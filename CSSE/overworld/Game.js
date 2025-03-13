import GameControl from './GameControl.js';
import GameLevelWater from "./GameLevelWater.js";
import GameLevelDesert from "./GameLevelDesert.js";
import InstructionsScreen from "./InstructionsScreen.js";
import CharacterSelectionScreen from "./CharacterSelectionScreen.js";

class Game {
    static main(environment) {
        this.path = environment.path;
        this.gameContainer = environment.gameContainer;
        this.gameCanvas = environment.gameCanvas;
        this.pythonURI = environment.pythonURI;
        this.javaURI = environment.javaURI;
        this.fetchOptions = environment.fetchOptions;
        this.uid = null;
        this.id = null;

        this.initUser();
        this.initStatsUI();

        // Start with the instructions screen
        this.showInstructionsScreen();
    }

    static showInstructionsScreen() {
        const instructionsScreen = new InstructionsScreen(() => {
            this.showCharacterSelectionScreen();
        });
        instructionsScreen.display();
    }

    static showCharacterSelectionScreen() {
        const characterSelectionScreen = new CharacterSelectionScreen((selectedCharacter) => {
            localStorage.setItem('selectedCharacter', selectedCharacter);
            this.startGame();
        });
        characterSelectionScreen.display();
    }

    static startGame() {
        const gameLevelClasses = [GameLevelDesert, GameLevelWater];
        new GameControl(this, gameLevelClasses).start();
    }

    static initUser() {
        const pythonURL = this.pythonURI + '/api/id';
        fetch(pythonURL, this.fetchOptions)
            .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch user ID"))
            .then(data => {
                this.uid = data.uid;
                console.log("User ID:", this.uid);
                return fetch(`${this.javaURI}/rpg_answer/person/${this.uid}`, this.fetchOptions);
            })
            .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch person ID"))
            .then(data => {
                this.id = data.id;
                this.fetchStats(this.id);
            })
            .catch(error => console.error("Error:", error));
    }

    static fetchStats(personId) {
        const endpoints = {
            balance: `${this.javaURI}/rpg_answer/getBalance/${personId}`,
            chatScore: `${this.javaURI}/rpg_answer/getChatScore/${personId}`,
            questionsAnswered: `${this.javaURI}/rpg_answer/getQuestionsAnswered/${personId}`
        };

        for (let [key, url] of Object.entries(endpoints)) {
            fetch(url, this.fetchOptions)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(key).innerHTML = data ?? 0;
                    localStorage.setItem(key, data ?? 0);
                })
                .catch(err => console.error(`Error fetching ${key}:`, err));
        }
    }

    static updateStats(content, questionId, personId) {
        return fetch(`${this.javaURI}/rpg_answer/submitAnswer`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, questionId, personId })
        })
            .then(response => response.ok ? response.json() : Promise.reject("Failed to update stats"))
            .then(data => data.score || "Error scoring answer")
            .catch(error => {
                console.error("Error submitting answer:", error);
                return "Error submitting answer";
            });
    }

    static initStatsUI() {
        const statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        statsContainer.style.position = 'fixed';
        statsContainer.style.top = '75px';
        statsContainer.style.right = '10px';
        statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        statsContainer.style.color = 'white';
        statsContainer.style.padding = '10px';
        statsContainer.style.borderRadius = '5px';
        statsContainer.innerHTML = `
            <div>Balance: <span id="balance">0</span></div>
            <div>Chat Score: <span id="chatScore">0</span></div>
            <div>Questions Answered: <span id="questionsAnswered">0</span></div>
        `;
        document.body.appendChild(statsContainer);
    }
}

export default Game;