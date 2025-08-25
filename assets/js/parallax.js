document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return;
    }

    // Create a container for the parallax layers
    const parallaxContainer = document.createElement('div');
    parallaxContainer.id = 'parallax-container';
    parallaxContainer.className = 'fixed top-0 left-0 w-full h-full -z-10 overflow-hidden';

    const createStarLayer = (count, size, speed) => {
        const layer = document.createElement('div');
        layer.className = 'absolute inset-0 rellax';
        layer.dataset.rellaxSpeed = speed;

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'absolute bg-neon-green rounded-full';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.opacity = Math.random() * 0.4 + 0.1; // Random opacity for twinkling effect
            star.style.animation = `twinkle ${Math.random() * 5 + 3}s linear infinite`;
            layer.appendChild(star);
        }
        return layer;
    };

    // Create multiple layers for a better depth effect
    const layer1 = createStarLayer(200, 1, -2); // Slowest, smallest, appears furthest
    const layer2 = createStarLayer(100, 2, -4);
    const layer3 = createStarLayer(30, 3, -6);  // Fastest, largest, appears closest

    parallaxContainer.appendChild(layer1);
    parallaxContainer.appendChild(layer2);
    parallaxContainer.appendChild(layer3);

    // Prepend to the body so it's behind everything
    body.prepend(parallaxContainer);

    // Initialize Rellax after creating the elements
    // Ensure Rellax is loaded before this script
    if (window.Rellax) {
        new Rellax('.rellax', {
            center: true
        });
    }
});
