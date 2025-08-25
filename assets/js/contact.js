document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();

        let errors = [];

        if (name === '') {
            errors.push('Name is required.');
        }
        if (email === '') {
            errors.push('Email is required.');
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.push('Email format is invalid.');
        }
        if (message === '') {
            errors.push('Message is required.');
        }

        if (errors.length > 0) {
            formStatus.innerHTML = `<p class="text-red-400">${errors.join('<br>')}</p>`;
            formStatus.classList.remove('fade-out'); // for re-submission attempts
        } else {
            formStatus.innerHTML = `<p class="text-neon-green">Success! Your message has been sent (demo).</p>`;
            contactForm.reset();
            // Optional: fade out the success message after a few seconds
            setTimeout(() => {
                formStatus.classList.add('fade-out');
            }, 4000);
        }
    });
});
