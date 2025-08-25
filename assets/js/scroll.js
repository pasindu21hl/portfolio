document.addEventListener('DOMContentLoaded', () => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElements = document.querySelectorAll('[data-scroll-reveal]');

    if (prefersReducedMotion || !revealElements.length) {
        // If user prefers reduced motion or there are no elements to reveal,
        // just make them all visible instantly and exit.
        revealElements.forEach(el => el.classList.add('revealed'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay based on an optional data attribute
                const delay = parseInt(entry.target.dataset.revealDelay) || 0;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                // Stop observing the element once it has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    revealElements.forEach(el => {
        // Add the appropriate initial transform class
        const animationType = el.dataset.scrollReveal;
        if (animationType) {
            el.classList.add(`reveal-${animationType}`);
        }
        revealObserver.observe(el);
    });
});
