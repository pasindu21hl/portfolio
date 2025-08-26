document.addEventListener('DOMContentLoaded', () => {
    // Check if the user prefers reduced motion or is on a touch device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (prefersReducedMotion || isTouchDevice) {
        // Don't run the custom cursor script
        // and ensure the default cursor is visible.
        document.body.style.cursor = 'auto';
        return;
    }

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let isInitialized = false;

    // Use a single, reliable animation loop for positioning
    const updateCursor = () => {
        if (isInitialized) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }
        requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // On the first mouse move, make the cursor visible and start the animation loop
        if (!isInitialized) {
            cursor.style.opacity = '1';
            isInitialized = true;
        }
    });

    // Handle hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-pointer]'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('pointer'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('pointer'));
    });

    // Hide the cursor when the mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        // Only show if it has been initialized
        if (isInitialized) {
            cursor.style.opacity = '1';
        }
    });

    // Hide the default system cursor
    document.body.style.cursor = 'none';

    // Start the animation loop immediately
    requestAnimationFrame(updateCursor);
});
