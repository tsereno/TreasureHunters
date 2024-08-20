// js/player.js

export class Player {
    constructor(name, avatar) {
        this.name = name;
        this.avatar = avatar;
        this.score = 0;
        this.backpack = [];
    }

    addToBackpack(item) {
        if (this.backpack.length < 5) {  // Limit backpack to 5 items
            this.backpack.push(item);
            return true;
        }
        return false;
    }

    removeFromBackpack(item) {
        const index = this.backpack.indexOf(item);
        if (index > -1) {
            this.backpack.splice(index, 1);
            return true;
        }
        return false;
    }

    updateScore(points) {
        this.score += points;
    }
}