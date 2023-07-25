// create page variables
let canvas = createHiPPICanvas(window.innerWidth, window.innerHeight);
let ctx = canvas.getContext("2d");
let keysPressed = {};
let world = new World();
let playerId = 'ABCD';



// event listeners
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    handlePlayerMovement();
});

document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
    handlePlayerMovement();
});

window.addEventListener('load', () => {
    const socket = io();
    const roomId = document.querySelector('.roomId').id
    socket.emit('join room', {roomId: roomId, world: world});
});


// IFFE for on load
(function onLoad() {
    world.players[playerId] = new Player();
    world.players[playerId].draw(ctx)
    world.players[playerId].edges()
    world.players[playerId].cameraFollow(ctx)
    world.players[playerId].update()

    for (let food of world.foods) {
        let x = food.x
        let y = food.y
        if (x > world.players[playerId].camera.startX && 
            x < world.players[playerId].camera.endX && 
            y > world.players[playerId].camera.startY && 
            y < world.players[playerId].camera.endY) {
                food.draw(ctx, world.players[playerId]);
        }
    }

    for (let food of world.foods) {
        world.players[playerId].eat(food);
    }

    // console.log(world)

    // ctx.fillRect(
    //     window.innerWidth*0.5 - 0.25*window.innerWidth, 
    //     window.innerHeight*0.5 - 0.25*window.innerHeight, 
    //     0.5*window.innerWidth, 
    //     0.5*window.innerHeight
    // );

})();

// IFFE for animation
(function animation() {
    window.requestAnimationFrame(animation)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    world.players[playerId].draw(ctx)
    world.players[playerId].edges()
    world.players[playerId].cameraFollow(ctx)
    world.players[playerId].update()

    for (let food of world.foods) {
        let x = food.x
        let y = food.y
        if (x > world.players[playerId].camera.startX && 
            x < world.players[playerId].camera.endX && 
            y > world.players[playerId].camera.startY && 
            y < world.players[playerId].camera.endY) {
                food.draw(ctx, world.players[playerId]);
        }
    }

    for (let food of world.foods) {
        world.players[playerId].eat(food);
    }

    // ctx.fillRect(
    //     window.innerWidth*0.5 - 0.25*window.innerWidth, 
    //     window.innerHeight*0.5 - 0.25*window.innerHeight, 
    //     0.5*window.innerWidth, 
    //     0.5*window.innerHeight
    // );

})();


// page functions

// handle player movement
function handlePlayerMovement() {
    const playerSpeed = 5;
    let xDirection = 0;
    let yDirection = 0;

    if (keysPressed['w']) {
        yDirection -= 1;
    }

    if (keysPressed['a']) {
        xDirection -= 1;
    }

    if (keysPressed['s']) {
        yDirection += 1;
    }

    if (keysPressed['d']) {
        xDirection += 1;
    }

    // Normalize diagonal movement
    if (xDirection !== 0 && yDirection !== 0) {
        const diagonalFactor = 0.7071; // 1 / sqrt(2)
        xDirection *= diagonalFactor;
        yDirection *= diagonalFactor;
    }

    world.players[playerId].velocity.x = xDirection*playerSpeed + world.players[playerId].velocity.x / playerSpeed;
    world.players[playerId].velocity.y = yDirection*playerSpeed + world.players[playerId].velocity.y / playerSpeed; 
    // player1.velocity.x = xDirection*playerSpeed
    // player1.velocity.y = yDirection*playerSpeed
};

// create canvas with the device resolution.
function createHiPPICanvas(width, height) {
    const ratio = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    canvas.setAttribute('id', 'canvas')
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.getContext("2d").scale(ratio, ratio);
    document.body.appendChild(canvas)
    return canvas;
};