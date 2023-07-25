class Camera {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.endX = window.innerWidth;
        this.endY = window.innerHeight;
        // this.playerPosition = playerPosition;
    }

    updateCamera(change) {
        this.startX -= change.x
        this.startY -= change.y
        this.endX -= change.x
        this.endY -= change.y
        // this.playerPosition.x -= change.x;
        // this.playerPosition.y -= change.y;
    }
}