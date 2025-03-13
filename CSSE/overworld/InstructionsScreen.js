class InstructionsScreen {
    constructor(onComplete) {
        this.onComplete = onComplete;
        this.currentIndex = 0;
        this.images = [
            "images/instructions1.png",
            "images/instructions2.png",
            "images/instructions3.png"
        ];
        this.createScreen();
    }

    createScreen() {
        const container = document.getElementById("gameContainer");
        container.innerHTML = `
            <div id="instructionsScreen" style="text-align: center;">
                <img id="instructionImage" src="${this.images[this.currentIndex]}" style="width: 80%;">
                <br>
                <button id="prevBtn">←</button>
                <button id="nextBtn">→</button>
                <button id="startGameBtn" style="display: none;">Choose Your Character</button>
            </div>
        `;

        document.getElementById("prevBtn").addEventListener("click", () => this.changeImage(-1));
        document.getElementById("nextBtn").addEventListener("click", () => this.changeImage(1));
        document.getElementById("startGameBtn").addEventListener("click", () => this.onComplete());
    }

    changeImage(direction) {
        this.currentIndex += direction;

        if (this.currentIndex < 0) this.currentIndex = 0;
        if (this.currentIndex >= this.images.length) this.currentIndex = this.images.length - 1;

        document.getElementById("instructionImage").src = this.images[this.currentIndex];

        // Show "Start Game" button on the last slide
        document.getElementById("startGameBtn").style.display = this.currentIndex === this.images.length - 1 ? "inline" : "none";
    }
}
export default InstructionsScreen;
