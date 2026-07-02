(function() {
      const root = document.documentElement;
      const body = document.body;
      const display = document.getElementById('zoom-level-display');
      let zoomLevel = 100;
      const zoomStep = 10;
      const minZoom = 60;
      const maxZoom = 180;

      function updateZoom() {
        zoomLevel = Math.min(maxZoom, Math.max(minZoom, zoomLevel));
        root.style.fontSize = `${zoomLevel}%`;
        body.style.zoom = `${zoomLevel / 100}`;
        if (display) display.textContent = `${zoomLevel}%`;
      }

      document.getElementById('zoom-in-btn').addEventListener('click', function() {
        zoomLevel += zoomStep;
        updateZoom();
      });

      document.getElementById('zoom-out-btn').addEventListener('click', function() {
        zoomLevel -= zoomStep;
        updateZoom();
      });

      document.getElementById('zoom-reset-btn').addEventListener('click', function() {
        zoomLevel = 100;
        updateZoom();
      });

      updateZoom();
    })();