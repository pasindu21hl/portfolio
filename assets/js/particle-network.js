document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.getElementById('particle-background');
    if (particleContainer && window.tsParticles) {

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        tsParticles.load("particle-background", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: {
                    value: "#22c55e" // neon-green
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 }
                },
                size: {
                    value: { min: 1, max: 3 }
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#22c55e",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    outModes: {
                        default: "out"
                    },
                    // Disable move if user prefers reduced motion
                    straight: prefersReducedMotion,
                    trail: {
                        enable: false
                    }
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: !prefersReducedMotion,
                        mode: "repulse"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            detectRetina: true,
            background: {
                color: "transparent"
            }
        });
    }
});
