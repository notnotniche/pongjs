

export class Game {
    constructor() {
        this.scoreleft = 0
        this.scoreright = 0;
    }

    increaseScoreleft() {
        this.scoreleft++;
    }
    increaseScoreright() { 

        this.scoreright++;
    }

    getScore() {
        return this.scoreleft + " - " + this.scoreright;
    }
    updateScore(newScore) {
        const hud = document.getElementById('hud');
        hud.textContent = `Score: ${newScore}`;
    }
    checkWin() {
        let i = 0;
        if (this.scoreleft === 3) {
            this.updateScore("Left player wins!")
            i = 1
        } else if (this.scoreright === 3) {
            this.updateScore("Right player wins!")
            i = 1
        }
        return i;
    }
}
