document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });
    }

    if (mobileMenuCloseButton && mobileMenu) {
        mobileMenuCloseButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // Typewriter effect
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const typewriter = new Typewriter(typewriterEl, {
            strings: ['Web Security', 'Malware Analysis', 'CTFs'],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
        });
    }
});
