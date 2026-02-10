document.addEventListener('DOMContentLoaded', function() {

    // --- PANTALLA DE CARGA ---
    const loaderWrapper = document.getElementById('loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderWrapper.classList.add('fade-out');
        }, 1500); // Mantiene la pantalla de carga por 1.5 segundos
    });

    // --- CONTROL DE MÚSICA ---
    const musicPlayer = document.getElementById('music-player');
    const backgroundMusic = document.getElementById('background-music');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    // La mayoría de los navegadores bloquean la reproducción automática.
    // Esta función intenta reproducir la música en la primera interacción del usuario.
    function initAudioOnFirstInteraction() {
        if (!isPlaying) {
            backgroundMusic.play().then(e => {
                isPlaying = true;
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                console.log("La reproducción automática fue bloqueada por el navegador. El usuario debe hacer clic para reproducir.");
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
            backgroundMusic.play().catch(error => console.log("Error al reproducir música:", error));
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    // --- CUENTA REGRESIVA ---
    // ¡IMPORTANTE! Cambia esta fecha a la de tu boda en formato Año-Mes-Día Hora:Minuto:Segundo
    const weddingDate = new Date("2024-12-31T18:00:00").getTime();

    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h2>¡El día ha llegado!</h2>";
        }
    }, 1000);

    // --- ANIMACIÓN AL HACER SCROLL (TIMELINE) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- LIGHTBOX PARA GALERÍA ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = item.href;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // --- FORMULARIO RSVP ---
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Aquí puedes añadir la lógica para enviar los datos a un servidor (usando fetch por ejemplo)
        // Por ahora, solo mostraremos una animación de confeti y un mensaje.
        
        // Animación de confeti simple
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Crea confeti desde dos lados
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // Mostrar mensaje de agradecimiento
        setTimeout(() => {
            alert("¡Gracias por confirmar! ¡Nos vemos en la boda!");
            rsvpForm.reset();
        }, 1000);
    });

    // --- EFECTO PARALLAX SUTIL EN EL HERO ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

});