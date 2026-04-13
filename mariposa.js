const openBtn = document.getElementById('openVideo');
    const overlay = document.getElementById('videoOverlay');
    const video = document.getElementById('myVideo');

    // Mostrar overlay con fadeIn
    openBtn.addEventListener('click', function(event) {
      event.preventDefault();
      overlay.style.display = 'flex';
      overlay.classList.remove('fadeOut');
      overlay.classList.add('fadeIn');
      video.currentTime = 0; // reinicia el video
      video.play();
    });

    // Detectar cuando falten 2.5 segundos para terminar
    video.addEventListener('timeupdate', function() {
      if (video.duration - video.currentTime <= 2.5) {
        if (!overlay.classList.contains('fadeOut')) {
          overlay.classList.remove('fadeIn');
          overlay.classList.add('fadeOut');
        }
      }
    });

    // Al terminar, ocultar el overlay
    video.addEventListener('ended', function() {
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 3000); // coincide con la duración del fadeOut
    });