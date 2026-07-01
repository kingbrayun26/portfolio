// Game Initialization & Screen Controls
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const healthUi = document.getElementById('health-ui');
const objectiveUi = document.getElementById('objective-ui');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');

// Game State Values
let gameActive = false;
let keys = {};
let player, crystal, portal, enemies;
let animationFrameId;

// Game Object Properties
const PLAYER_SPEED = 4;
const ENEMY_SPEED = 1.8;

// Event Listeners for Input & Transitions
startBtn.addEventListener('click', startMission);
restartBtn.addEventListener('click', startMission);
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// START PHASE: Transition from main menu to layout canvas
function startMission() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    initGameObjects();
    gameActive = true;
    gameLoop();
}

// Initialization Configuration
function initGameObjects() {
    player = { x: 50, y: 250, size: 20, health: 100, hasCrystal: false };
    crystal = { x: 700, y: 100, size: 15, active: true };
    portal = { x: 700, y: 400, size: 30, active: false };
    
    enemies = [
        { x: 300, y: 100, size: 22, dir: 1 },
        { x: 500, y: 400, size: 22, dir: -1 },
        { x: 600, y: 250, size: 22, dir: 1 }
    ];

    objectiveUi.innerText = "FIND THE CRYSTAL!";
    objectiveUi.style.color = "#66fcf1";
    healthUi.innerText = player.health;
}

// MIDDLE PHASE: Dynamic Gameplay Loop
function gameLoop() {
    if (!gameActive) return;

    updateLogic();
    renderGraphics();

    animationFrameId = requestAnimationFrame(gameLoop);
}

// Logic & Collision Processing
function updateLogic() {
    // Player Keyboard Movement
    if (keys['ArrowUp'] && player.y > player.size) player.y -= PLAYER_SPEED;
    if (keys['ArrowDown'] && player.y < canvas.height - player.size) player.y += PLAYER_SPEED;
    if (keys['ArrowLeft'] && player.x > player.size) player.x -= PLAYER_SPEED;
    if (keys['ArrowRight'] && player.x < canvas.width - player.size) player.x += PLAYER_SPEED;

    // Enemy Patrol Loop
    enemies.forEach(enemy => {
        enemy.y += ENEMY_SPEED * enemy.dir;
        // Bounce off walls
        if (enemy.y <= enemy.size || enemy.y >= canvas.height - enemy.size) {
            enemy.dir *= -1;
        }

        // Damage Collision Matrix
        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist < player.size + enemy.size) {
            player.health -= 0.5; // Constant contact penalty
            healthUi.innerText = Math.max(0, Math.floor(player.health));
            if (player.health <= 0) {
                endMission(false);
            }
        }
    });

    // Objective Item Collision: Time Crystal
    if (crystal.active) {
        let distToCrystal = Math.hypot(player.x - crystal.x, player.y - crystal.y);
        if (distToCrystal < player.size + crystal.size) {
            crystal.active = false;
            player.hasCrystal = true;
            portal.active = true;
            objectiveUi.innerText = "REACH THE TIME PORTAL!";
            objectiveUi.style.color = "#c5a3ff";
        }
    }

    // Win-Condition Verification: Time Portal Escape
    if (portal.active) {
        let distToPortal = Math.hypot(player.x - portal.x, player.y - portal.y);
        if (distToPortal < player.size + portal.size) {
            endMission(true);
        }
    }
}

// Screen Painting Function
function renderGraphics() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Time Crystal
    if (crystal.active) {
        ctx.fillStyle = '#00f5ff';
        ctx.beginPath();
        ctx.arc(crystal.x, crystal.y, crystal.size, 0, Math.PI * 2);
        ctx.fill();
        // Glow effect
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }

    // Draw Exit Time Portal
    if (portal.active) {
        ctx.fillStyle = '#aa00ff';
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // Draw Automated Patrol Enemies (Mobsters)
    enemies.forEach(enemy => {
        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
        // Enemy visual gun indicator line
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw Player Agent
    ctx.fillStyle = player.hasCrystal ? '#00ffcc' : '#ffff00';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

// END PHASE: Game Termination Handler
function endMission(isVictory) {
    gameActive = false;
    cancelAnimationFrame(animationFrameId);

    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');

    if (isVictory) {
        endTitle.innerText = "MISSION ACCOMPLISHED";
        endTitle.style.color = "#00ffcc";
        endMessage.innerHTML = "Great job, Agent! The space-time continuum is safe once again.<br><br><strong>Time Paradox Status: Cleaned.</strong>";
    } else {
        endTitle.innerText = "MISSION FAILED";
        endTitle.style.color = "#ff0055";
        endMessage.innerHTML = "You were lost in the timeline by the TimeSplitters forces.<br><br><strong>Status: Missing In Action.</strong>";
    }
}
// Game Initialization & Screen Controls
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const healthUi = document.getElementById('health-ui');
const objectiveUi = document.getElementById('objective-ui');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');

// Game State Values
let gameActive = false;
let keys = {};
let player, crystal, portal, enemies;
let animationFrameId;

// Game Object Properties
const PLAYER_SPEED = 4;
const ENEMY_SPEED = 1.8;

// Event Listeners for Input & Transitions
startBtn.addEventListener('click', startMission);
restartBtn.addEventListener('click', startMission);
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// START PHASE: Transition from main menu to layout canvas
function startMission() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    initGameObjects();
    gameActive = true;
    gameLoop();
}

// Initialization Configuration
function initGameObjects() {
    player = { x: 50, y: 250, size: 20, health: 100, hasCrystal: false };
    crystal = { x: 700, y: 100, size: 15, active: true };
    portal = { x: 700, y: 400, size: 30, active: false };
    
    enemies = [
        { x: 300, y: 100, size: 22, dir: 1 },
        { x: 500, y: 400, size: 22, dir: -1 },
        { x: 600, y: 250, size: 22, dir: 1 }
    ];

    objectiveUi.innerText = "FIND THE CRYSTAL!";
    objectiveUi.style.color = "#66fcf1";
    healthUi.innerText = player.health;
}

// MIDDLE PHASE: Dynamic Gameplay Loop
function gameLoop() {
    if (!gameActive) return;

    updateLogic();
    renderGraphics();

    animationFrameId = requestAnimationFrame(gameLoop);
}

// Logic & Collision Processing
function updateLogic() {
    // Player Keyboard Movement
    if (keys['ArrowUp'] && player.y > player.size) player.y -= PLAYER_SPEED;
    if (keys['ArrowDown'] && player.y < canvas.height - player.size) player.y += PLAYER_SPEED;
    if (keys['ArrowLeft'] && player.x > player.size) player.x -= PLAYER_SPEED;
    if (keys['ArrowRight'] && player.x < canvas.width - player.size) player.x += PLAYER_SPEED;

    // Enemy Patrol Loop
    enemies.forEach(enemy => {
        enemy.y += ENEMY_SPEED * enemy.dir;
        // Bounce off walls
        if (enemy.y <= enemy.size || enemy.y >= canvas.height - enemy.size) {
            enemy.dir *= -1;
        }

        // Damage Collision Matrix
        let dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist < player.size + enemy.size) {
            player.health -= 0.5; // Constant contact penalty
            healthUi.innerText = Math.max(0, Math.floor(player.health));
            if (player.health <= 0) {
                endMission(false);
            }
        }
    });

    // Objective Item Collision: Time Crystal
    if (crystal.active) {
        let distToCrystal = Math.hypot(player.x - crystal.x, player.y - crystal.y);
        if (distToCrystal < player.size + crystal.size) {
            crystal.active = false;
            player.hasCrystal = true;
            portal.active = true;
            objectiveUi.innerText = "REACH THE TIME PORTAL!";
            objectiveUi.style.color = "#c5a3ff";
        }
    }

    // Win-Condition Verification: Time Portal Escape
    if (portal.active) {
        let distToPortal = Math.hypot(player.x - portal.x, player.y - portal.y);
        if (distToPortal < player.size + portal.size) {
            endMission(true);
        }
    }
}

// Screen Painting Function
function renderGraphics() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Time Crystal
    if (crystal.active) {
        ctx.fillStyle = '#00f5ff';
        ctx.beginPath();
        ctx.arc(crystal.x, crystal.y, crystal.size, 0, Math.PI * 2);
        ctx.fill();
        // Glow effect
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }

    // Draw Exit Time Portal
    if (portal.active) {
        ctx.fillStyle = '#aa00ff';
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // Draw Automated Patrol Enemies (Mobsters)
    enemies.forEach(enemy => {
        ctx.fillStyle = '#ff3333';
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
        // Enemy visual gun indicator line
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw Player Agent
    ctx.fillStyle = player.hasCrystal ? '#00ffcc' : '#ffff00';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
}

// END PHASE: Game Termination Handler
function endMission(isVictory) {
    gameActive = false;
    cancelAnimationFrame(animationFrameId);

    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');

    if (isVictory) {
        endTitle.innerText = "MISSION ACCOMPLISHED";
        endTitle.style.color = "#00ffcc";
        endMessage.innerHTML = "Great job, Agent! The space-time continuum is safe once again.<br><br><strong>Time Paradox Status: Cleaned.</strong>";
    } else {
        endTitle.innerText = "MISSION FAILED";
        endTitle.style.color = "#ff0055";
        endMessage.innerHTML = "You were lost in the timeline by the TimeSplitters forces.<br><br><strong>Status: Missing In Action.</strong>";
    }
}
