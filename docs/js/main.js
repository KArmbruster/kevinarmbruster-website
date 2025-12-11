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

    // Testimonials Carousel
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        const track = carousel.querySelector('.testimonials-track');
        const originalCards = Array.from(track.querySelectorAll('.testimonial-card'));
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');

        // Clone cards for infinite effect
        const cardsCount = originalCards.length;

        // Clone all cards and append them before and after
        // Insert clones BEFORE the original cards (in reverse order to maintain sequence)
        for (let i = originalCards.length - 1; i >= 0; i--) {
            const cloneBefore = originalCards[i].cloneNode(true);
            track.insertBefore(cloneBefore, track.firstChild);
        }

        // Append clones AFTER the original cards
        originalCards.forEach(card => {
            const cloneAfter = card.cloneNode(true);
            track.appendChild(cloneAfter);
        });

        const allCards = track.querySelectorAll('.testimonial-card');
        let currentIndex = cardsCount; // Start at first "real" card (after clones)
        let autoplayInterval;
        let isTransitioning = false;

        function updateCarousel(transition = true) {
            const cardWidth = 450;
            const gap = 32;
            const carouselWidth = carousel.offsetWidth;

            // Disable transition for instant repositioning
            if (!transition) {
                track.style.transition = 'none';
            } else {
                track.style.transition = 'transform 0.5s ease-in-out';
            }

            const centerOffset = (carouselWidth / 2) - (cardWidth / 2);
            const offset = (currentIndex * (cardWidth + gap)) - centerOffset;

            track.style.transform = `translateX(-${offset}px)`;

            // Update center class for styling
            allCards.forEach((card, idx) => {
                card.classList.toggle('center', idx === currentIndex);
            });

            // Update indicators (map to original cards)
            const realIndex = ((currentIndex - cardsCount) % cardsCount + cardsCount) % cardsCount;
            indicators.forEach((ind, idx) => {
                ind.classList.toggle('active', idx === realIndex);
            });

            // Force reflow if transition was disabled
            if (!transition) {
                track.offsetHeight;
                track.style.transition = 'transform 0.5s ease-in-out';
            }
        }

        function nextCard() {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex++;
            updateCarousel(true);

            setTimeout(() => {
                // If we've reached the cloned cards at the end, jump to the real cards
                if (currentIndex >= cardsCount * 2) {
                    // Jump to equivalent position in real cards
                    const newIndex = cardsCount;

                    // Disable transitions on track and all cards
                    track.style.transition = 'none';
                    allCards.forEach(card => {
                        card.style.transition = 'none';
                    });

                    currentIndex = newIndex;

                    const cardWidth = 450;
                    const gap = 32;
                    const carouselWidth = carousel.offsetWidth;
                    const centerOffset = (carouselWidth / 2) - (cardWidth / 2);
                    const offset = (currentIndex * (cardWidth + gap)) - centerOffset;

                    track.style.transform = `translateX(-${offset}px)`;

                    // Update center class
                    allCards.forEach((card, idx) => {
                        card.classList.toggle('center', idx === currentIndex);
                    });

                    // Force reflow and restore transitions
                    track.offsetHeight;
                    track.style.transition = 'transform 0.5s ease-in-out';
                    allCards.forEach(card => {
                        card.style.transition = 'all 0.5s ease-in-out';
                    });
                }
                isTransitioning = false;
            }, 500);
        }

        function prevCard() {
            if (isTransitioning) return;
            isTransitioning = true;

            currentIndex--;
            updateCarousel(true);

            setTimeout(() => {
                // If we've reached the cloned cards at the beginning, jump to the real cards
                if (currentIndex < cardsCount) {
                    // Jump to equivalent position in real cards
                    const newIndex = cardsCount * 2 - 1;

                    // Disable transitions on track and all cards
                    track.style.transition = 'none';
                    allCards.forEach(card => {
                        card.style.transition = 'none';
                    });

                    currentIndex = newIndex;

                    const cardWidth = 450;
                    const gap = 32;
                    const carouselWidth = carousel.offsetWidth;
                    const centerOffset = (carouselWidth / 2) - (cardWidth / 2);
                    const offset = (currentIndex * (cardWidth + gap)) - centerOffset;

                    track.style.transform = `translateX(-${offset}px)`;

                    // Update center class
                    allCards.forEach((card, idx) => {
                        card.classList.toggle('center', idx === currentIndex);
                    });

                    // Force reflow and restore transitions
                    track.offsetHeight;
                    track.style.transition = 'transform 0.5s ease-in-out';
                    allCards.forEach(card => {
                        card.style.transition = 'all 0.5s ease-in-out';
                    });
                }
                isTransitioning = false;
            }, 500);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextCard, 7000);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextCard();
                stopAutoplay();
                startAutoplay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevCard();
                stopAutoplay();
                startAutoplay();
            });
        }

        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = cardsCount + index;
                updateCarousel(true);
                stopAutoplay();
                startAutoplay();
            });
        });

        // Initial setup and start autoplay
        updateCarousel(false);
        startAutoplay();

        // Pause autoplay when hovering over carousel
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Update on window resize
        window.addEventListener('resize', () => updateCarousel(false));
    }

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
