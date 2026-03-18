// ============================================
// Bugema University - Department of Computing
// Main JavaScript File
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.textContent = menuToggle.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Carousel Functionality
    initCarousel();

    // Application Form Submission
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application! Our admissions team will contact you within 24-48 hours.');
            this.reset();
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// ============================================
// Carousel Functionality
// ============================================
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function animateTyping(element) {
        if (!element) return;
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'typing 2.5s steps(40) forwards, cursorFade 0.5s 3s forwards';
    }

    function showSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        const typingEl = slides[currentSlide].querySelector('.typing-text');
        animateTyping(typingEl);
    }

    // Make functions global for onclick handlers
    window.changeSlide = function(n) {
        showSlide(currentSlide + n);
    };

    window.goToSlide = function(n) {
        showSlide(n);
    };

    // Auto-advance slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Initialize first slide typing animation
    const firstTypingEl = slides[0].querySelector('.typing-text');
    setTimeout(() => {
        animateTyping(firstTypingEl);
    }, 100);

    // Touch/Swipe Support for Mobile
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showSlide(currentSlide + 1);
                } else {
                    showSlide(currentSlide - 1);
                }
            }
        }
    }
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Header Background Image Loader
// ============================================
function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
        }
    });
}

// ============================================
// Mobile Navigation Close on Link Click
// ============================================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});
