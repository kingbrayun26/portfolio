document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-btn');
    const backgroundMusic = document.getElementById('background-music');
    const mainContent = document.getElementById('main-content');

    enterBtn.addEventListener('click', () => {
        // 1. Play the music
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });

        // 2. Hide the splash screen
        splashScreen.style.opacity = 0;
        
        // 3. Remove from DOM after transition and show main content
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 500); // Matches the CSS transition time
    });
});
