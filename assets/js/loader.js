document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const decodingTextEl = document.getElementById('decoding-text');
    const progressBar = document.getElementById('progress-bar');
    const skipIntroButton = document.getElementById('skip-intro');

    if (!loader || !decodingTextEl || !progressBar || !skipIntroButton) {
        console.error('Loader elements not found!');
        if(loader) loader.style.display = 'none';
        return;
    }

    const targetText = "Pasindu Heshan";
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const animationDuration = 2500; // ms
    const charRevealTime = animationDuration / targetText.length;
    let animationFrameId;
    let animationTimer;

    const hideLoader = () => {
        // Cancel any ongoing animations
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (animationTimer) clearTimeout(animationTimer);

        loader.classList.add('loader-hidden');
        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    };

    const runDecodingAnimation = () => {
        let revealedText = '';
        let currentIndex = 0;

        const updateText = () => {
            if (currentIndex >= targetText.length) {
                decodingTextEl.textContent = targetText;
                return;
            }

            let scramble = '';
            // Show revealed text + scrambling current char + unscrambled remaining chars
            const currentText = revealedText + targetText[currentIndex];

            for (let i = 0; i < targetText.length - currentText.length; i++) {
                scramble += chars[Math.floor(Math.random() * chars.length)];
            }

            decodingTextEl.textContent = currentText + scramble;

            animationFrameId = requestAnimationFrame(updateText);
        };

        const revealNextChar = () => {
            if (currentIndex < targetText.length) {
                revealedText += targetText[currentIndex];
                currentIndex++;
                animationTimer = setTimeout(revealNextChar, charRevealTime);
            } else {
                decodingTextEl.textContent = targetText;
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            }
        };

        updateText();
        revealNextChar();
    };

    const runProgressBar = () => {
        let startTime = Date.now();
        const update = () => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            progressBar.style.width = `${progress * 100}%`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        requestAnimationFrame(update);
    };

    // Start animations
    runDecodingAnimation();
    runProgressBar();

    // Set timeout to hide loader after animation completes
    const mainTimeout = setTimeout(hideLoader, animationDuration + 500); // 500ms buffer

    // Skip intro logic
    skipIntroButton.addEventListener('click', () => {
        clearTimeout(mainTimeout);
        hideLoader();
    });

    // As a fallback, ensure the loader is hidden if the window doesn't load for some reason
    window.addEventListener('load', () => {
        // The animation might still be running, so we let the main timeout handle it.
        // This is just a fallback.
    });
});
