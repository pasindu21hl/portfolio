document.addEventListener('DOMContentLoaded', () => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        return; // Don't run the cursor script if motion is reduced
    }

    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;

    // Position the cursor instantly on first move
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }, { once: true });


    // Use a more optimized positioning loop
    const updateCursor = () => {
        cursor.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;
        requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [data-cursor-pointer]'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('pointer');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('pointer');
        });
    });

    // Hide the cursor when the mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Start the animation
    requestAnimationFrame(updateCursor);
});
