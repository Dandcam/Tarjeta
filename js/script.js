document.addEventListener('DOMContentLoaded', function () {

    // --- PANTALLA DE CARGA (opcional, solo corre si existe en el HTML) ---
    const loaderWrapper = document.getElementById('loader-wrapper');
    if (loaderWrapper) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loaderWrapper.classList.add('fade-out');
            }, 1500);
        });
    }

    // --- CONTROL DE MÚSICA ---
    const musicPlayer = document.getElementById('music-player');
    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    function initAudioOnFirstInteraction() {
        if (!isPlaying) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-pause');
            }).catch(() => {
                console.log('La reproducción automática fue bloqueada por el navegador. El usuario debe hacer clic para reproducir.');
            });
            document.body.removeEventListener('click', initAudioOnFirstInteraction);
            document.body.removeEventListener('touchstart', initAudioOnFirstInteraction);
        }
    }
    document.body.addEventListener('click', initAudioOnFirstInteraction, { once: true });
    document.body.addEventListener('touchstart', initAudioOnFirstInteraction, { once: true });

    musicPlayer.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
        } else {
            backgroundMusic.play().catch(error => console.log('Error al reproducir música:', error));
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying; 
    });

    // --- CUENTA REGRESIVA ---
    const weddingDate = new Date('2026-12-05T18:30:00').getTime();

    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2>¡El día ha llegado!</h2>';
        }
    }, 1000);

    // --- ANIMACIÓN AL HACER SCROLL (TIMELINE) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));



    // Nota: la lógica del formulario RSVP vive en js/rsvp.js, no aquí,
    // para mantener separada la parte de "presentación" de la de "datos".

});
