const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-music-btn');
const splashScreen = document.getElementById('gta-splash');
const bgMusic = document.getElementById('gta-theme');

// When user clicks the Start button
startBtn.addEventListener('click', () => {
    // Play the music
    bgMusic.play().catch(error => {
        console.log("Autoplay was prevented, but user gesture will start it.");
    });

    // Fade out splash screen
    splashScreen.classList.add('hidden');

    // Remove splash screen from DOM entirely after fade out
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 500);
});

// When user clicks the stop music button
stopBtn.addEventListener('click', () => {
    bgMusic.pause();         // Pauses the track
    bgMusic.currentTime = 0; // Resets it to the beginning
});

