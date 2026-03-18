/* ===== LOADER ===== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1800);

    // Reveal elements already in viewport on load
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) el.classList.add('visible');
    });
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navbar) {
    const isInnerPage = !document.querySelector('.hero');
    if (isInnerPage) navbar.classList.add('scrolled');

    window.addEventListener('scroll', () => {
        if (isInnerPage) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        }
    });
}

/* ===== MOBILE NAV TOGGLE ===== */
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
        navbar && navbar.classList.toggle('nav-open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            navbar && navbar.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
            navbar && navbar.classList.remove('nav-open');
            document.body.style.overflow = '';
        }
    });
}

/* ===== TYPED TEXT (home only) ===== */
const typedEl = document.getElementById('typedText');
if (typedEl) {
    const phrases = ['Computing & Informatics'];
    let pi = 0, ci = 0, del = false;
    function type() {
        const cur = phrases[pi];
        typedEl.textContent = del ? cur.substring(0, ci - 1) : cur.substring(0, ci + 1);
        del ? ci-- : ci++;
        let spd = del ? 40 : 80;
        if (!del && ci === cur.length) { spd = 2200; del = true; }
        else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; spd = 400; }
        setTimeout(type, spd);
    }
    type();
}

/* ===== COUNTER ANIMATION (home only) ===== */
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const step = target / (2000 / 16);
    let cur = 0;
    const t = setInterval(() => {
        cur += step;
        if (cur >= target) { el.textContent = target; clearInterval(t); }
        else el.textContent = Math.floor(cur);
    }, 16);
}
const statEls = document.querySelectorAll('.stat-number');
if (statEls.length) {
    const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });
    statEls.forEach(el => cObs.observe(el));
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const fallback = setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 1500);

    const rObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                rObs.unobserve(e.target);
            }
        });
        if (document.querySelectorAll('.reveal:not(.visible)').length === 0) clearTimeout(fallback);
    }, { threshold: 0, rootMargin: '0px' });

    revealEls.forEach(el => rObs.observe(el));
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        }
    });
});

/* ===== CAROUSEL ===== */
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let autoPlayInterval;

    function createIndicators() {
        slides.forEach((_, i) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        });
    }

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        indicatorsContainer.children[currentIndex].classList.remove('active');
        currentIndex = index;
        if (currentIndex >= slides.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        slides[currentIndex].classList.add('active');
        indicatorsContainer.children[currentIndex].classList.add('active');
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    createIndicators();
    startAutoPlay();

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });

    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);
}

/* ===== FORM HANDLING ===== */
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your application! Our admissions team will contact you within 24-48 hours.');
        this.reset();
    });
}
