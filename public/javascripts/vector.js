class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(newVector) {
        const newX = this.x + newVector.x;
        const newY = this.y + newVector.y;
        return new Vector(newX, newY);
    }

    subtract(newVector) {
        const newX = newVector.x - this.x;
        const newY = newVector.x - this.y;
        return new Vector(newX, newY);
    }

    mult(scalar) {
        const newX = this.x * scalar;
        const newY = this.y * scalar;
        return new Vector(newX, newY);
    }

    div(scalar) {
        const newX = this.x / scalar;
        const newY = this.y / scalar;
        return new Vector(newX, newY);
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    unitVector () {
        let magnitude = this.magnitude();
        return this.div(magnitude).mult(1);
    }

    limit(scalar) {
        let magnitude = this.magnitude();
        if (magnitude > scalar) {
            return this.div(magnitude).mult(scalar);
        }
        return this;
    }
}