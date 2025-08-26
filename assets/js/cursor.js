document.addEventListener('DOMContentLoaded', () => {
    // Check if the user prefers reduced motion or is on a touch device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
        document.body.style.cursor = 'auto';
        return;
    }

    const mainCursor = document.createElement('div');
    mainCursor.classList.add('custom-cursor');
    document.body.appendChild(mainCursor);

    const particlePool = [];
    const particleCount = 25;
    let particleIndex = 0;

    // Pre-create the particle elements
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        document.body.appendChild(particle);
        particlePool.push(particle);
    }

    let mouseX = 0;
    let mouseY = 0;
    let lastParticleTime = 0;
    const particleCreationDelay = 40; // ms, how often to create a particle
    let isInitialized = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isInitialized) {
            mainCursor.style.opacity = '1';
            isInitialized = true;
        }

        // Position the main cursor directly
        mainCursor.style.left = `${mouseX}px`;
        mainCursor.style.top = `${mouseY}px`;

        const now = Date.now();
        if (now - lastParticleTime > particleCreationDelay) {
            lastParticleTime = now;

            const particle = particlePool[particleIndex];
            particleIndex = (particleIndex + 1) % particleCount;

            particle.className = ''; // Remove previous animation class
            void particle.offsetWidth; // Trigger reflow
            particle.className = 'trail-particle';

            particle.style.left = `${mouseX}px`;
            particle.style.top = `${mouseY}px`;
            const size = Math.random() * 6 + 4; // size between 4px and 10px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
        }
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-pointer]');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => mainCursor.classList.add('pointer'));
        el.addEventListener('mouseleave', () => mainCursor.classList.remove('pointer'));
    });

    document.addEventListener('mouseleave', () => { mainCursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { if (isInitialized) mainCursor.style.opacity = '1'; });

    document.body.style.cursor = 'none';
});
