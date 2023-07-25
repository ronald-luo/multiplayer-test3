class Food {
    constructor() {
        this.x = 10*Math.random() * window.innerWidth;
        this.y = 10*Math.random() * window.innerHeight;
    }

    clear() {
        this.x = NaN
        this.y = NaN
    }

    draw(ctx, player) {
        ctx.fillStyle='red';
        ctx.fillRect(this.x-player.camera.startX, this.y-player.camera.startY, 10, 10)
    }

}