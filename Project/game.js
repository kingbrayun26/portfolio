const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

// Game Settings & Variables
let score = 0;
const gravity = 0.6;

// Player Setup (Jak & Daxter)
const player = {
    x: 100,
    y: 300,
    width: 40,
    height: 60,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpForce: 17,
    grounded: false,
    color: "#3a7bd5" // Jak's blue tunic vibe
};

// Target Collectible (Precursor Orb)
let orb = {
    x: 400,
    y: 200,
    radius: 12,
    color: "#f5a623" // Iconic Precursor Gold
};

// Keyboard Input State
const keys = {};

window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

// Check Collision Between Player Box and Round Orb
function checkCollision(rect, circle) {
    let closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    let closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    
    let distanceX = circle.x - closestX;
    let distanceY = circle.y - closestY;
    
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (circle.radius * circle.radius);
}

// Relocate Orb when collected
function respawnOrb() {
    orb.x = Math.random() * (canvas.width - 60) + 30;
    orb.y = Math.random() * (canvas.height - 150) + 100;
}

// Core Game Loop
function update() {
    // Horizontal Input Handling
    if (keys["ArrowRight"] || keys["KeyD"]) player.velocityX = player.speed;
    else if (keys["ArrowLeft"] || keys["KeyA"]) player.velocityX = -player.speed;
    else player.velocityX = 0;

    // Jump Input Handling
    if ((keys["Space"] || keys["ArrowUp"] || keys["KeyW"]) && player.grounded) {
        player.velocityY = -player.jumpForce;
        player.grounded = false;
    }

    // Apply Physics
    player.velocityY += gravity;
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Canvas Boundaries & Ground Collision
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    
    if (player.y + player.height >= canvas.height - 20) {
        player.y = canvas.height - 20 - player.height;
        player.velocityY = 0;
        player.grounded = true;
    }

    // Check Collectible Collisions
    if (checkCollision(player, orb)) {
        score++;
        scoreEl.innerText = score;
        respawnOrb();
    }

    // Clear and Redraw Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Ground
    ctx.fillStyle = "#4a3728";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    // Draw Jak (Player)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Daxter (Orange patch on Jak's shoulder)
    ctx.fillStyle = "#ff6b4a";
    ctx.fillRect(player.x + 5, player.y - 12, 14, 14);

    // Draw Precursor Orb
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fillStyle = orb.color;
    ctx.shadowColor = orb.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0; // Reset shadow for next cycles

    requestAnimationFrame(update);
}

// Fire up the code
respawnOrb();
update();
