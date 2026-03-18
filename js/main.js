/* ===== COUNTER ANIMATION ===== */
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
const statEls = document.querySelectorAll('.stat-number[data-target]');
if (statEls.length) {
    const cObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); }
        });
    }, { threshold: 0.5 });
    statEls.forEach(el => cObs.observe(el));
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

/* ===== FORM HANDLING ===== */
const contactForm = document.querySelector('#contactForm');
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

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const rObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                rObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => rObs.observe(el));
}
