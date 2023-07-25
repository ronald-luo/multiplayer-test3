class Player {
    constructor() {
        this.position = new Vector(
            Math.random()*window.innerWidth,
            Math.random()*window.innerHeight,
        );
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxVelocity = 20;
        this.camera = new Camera(this.position);
        this.size = 20;
    }

    edges() {
        let minX = 0;
        let minY = 0;
        let maxX = window.innerWidth;
        let maxY = window.innerHeight;

        if (this.position.x <= minX) {
            this.position.x = minX;
        } else if (this.position.x >= maxX - this.size) {
            this.position.x = maxX - this.size;
        }
    
        if (this.position.y <= minY) {
            this.position.y = minY;
        } else if (this.position.y >= maxY - this.size) {
            this.position.y = maxY - this.size;
        }
    } 

    cameraFollow() {
        let minX = window.innerWidth*0.5 - 0.25*window.innerWidth;
        let minY = window.innerHeight*0.5 - 0.25*window.innerHeight;
        let maxX = 0.5*window.innerWidth + 0.25*window.innerWidth;
        let maxY = 0.5*window.innerHeight + 0.25*window.innerHeight;

        if (this.position.x <= minX + 50) {
            this.camera.updateCamera(new Vector(5, 0));
        } else if (this.position.x >= maxX - 50) {
            this.camera.updateCamera(new Vector(-5, 0));
        }
    
        if (this.position.y <= minY + 50) {
            this.camera.updateCamera(new Vector(0, 5));
        } else if (this.position.y >= maxY - 50) {
            this.camera.updateCamera(new Vector(0, -5));
        }
    }

    update() {
        this.velocity = this.velocity.add(this.acceleration);
        this.position = this.position.add(this.velocity);
    }

    eat(food) {
        let minX = this.position.x;
        let minY = this.position.y;
        let maxX = this.position.x + this.size;
        let maxY = this.position.y + this.size;

        let foodMinX = food.x - this.camera.startX;
        let foodMinY = food.y - this.camera.startY;
        let foodMaxX = food.x + 10 - this.camera.startX;
        let foodMaxY = food.y + 10 - this.camera.startY;

        if (minX <= foodMinX &&
            maxX >= foodMaxX &&
            minY <= foodMinY &&
            maxY >= foodMaxY) {
                food.clear();
                this.size += 5;
        }
    }

    draw(ctx) {
        ctx.fillStyle='white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

}
