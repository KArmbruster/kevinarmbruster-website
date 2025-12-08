// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Active page highlighting (excluding Kontakt button)
    const currentPath = window.location.pathname;
    const navLinkElements = navLinks.querySelectorAll('a:not(.btn-primary)');

    navLinkElements.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        // Exact match for most pages, or check if current path starts with link path for subpages
        if (currentPath === linkPath ||
            (linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
        }
    });

    // Contact Form Submission (only if form exists on page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.btn-submit');
            const formMessage = document.getElementById('formMessage');

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'none';

            try {
                // Send to n8n webhook
                const response = await fetch('https://kevin-n8n.up.railway.app/webhook/71ab5365-95c8-43e7-afa0-735126cccefc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Success
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Ich melde mich in Kürze bei Ihnen.';

                    // Reset form
                    this.reset();
                } else {
                    // Error
                    formMessage.className = 'form-message error';
                    formMessage.textContent = 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.';
                }
            } catch (error) {
                // Network error
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Nachricht senden';
            }
        });
    }
});
