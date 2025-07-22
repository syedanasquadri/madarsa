document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle ARIA expanded attribute for accessibility
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close nav menu when a link is clicked (for smooth scrolling on same page)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height to offset scroll position (for fixed header)
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple Form Validation (Client-Side)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission for this example

            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Basic validation checks
            if (name.value.trim() === '') {
                alert('Please enter your name.');
                name.focus();
                isValid = false;
            } else if (email.value.trim() === '' || !validateEmail(email.value)) {
                alert('Please enter a valid email address.');
                email.focus();
                isValid = false;
            } else if (message.value.trim() === '') {
                alert('Please enter your message.');
                message.focus();
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send this data to a server
                // using Fetch API or XMLHttpRequest.
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset(); // Clear the form
                console.log('Form Submitted (client-side only):', {
                    name: name.value,
                    email: email.value,
                    subject: document.getElementById('subject').value,
                    message: message.value
                });
            }
        });
    }

    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Optional: Basic Gallery Lightbox (Pure JS, no external libraries) ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const body = document.body;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Create overlay
            const lightboxOverlay = document.createElement('div');
            lightboxOverlay.classList.add('lightbox-overlay');

            // Create image element inside overlay
            const lightboxImage = document.createElement('img');
            lightboxImage.src = item.src;
            lightboxImage.alt = item.alt;
            lightboxImage.classList.add('lightbox-image');

            lightboxOverlay.appendChild(lightboxImage);
            body.appendChild(lightboxOverlay);

            // Close lightbox when clicking overlay
            lightboxOverlay.addEventListener('click', () => {
                body.removeChild(lightboxOverlay);
            });
        });
    });


});