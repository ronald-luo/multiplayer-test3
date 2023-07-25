class World {
    constructor() {
        this.players = {};
        this.foods = [];
        for (let index = 0; index < 1000; index++) {
            this.foods.push(new Food());
        }
    }
}