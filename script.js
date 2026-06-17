document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    initTabs();
    initScrollReveal();
    initNavHover();
});

function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * target;
                    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-num').forEach(s => observer.observe(s));
}

function initTabs() {
    const cards = document.querySelectorAll('.discover-brutal-card');
    const tabs = document.querySelectorAll('.tab-brutal');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const idx = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            cards.forEach(card => {
                card.classList.remove('active');
                if (card.dataset.tab === idx) {
                    card.classList.add('active');
                }
            });
        });
    });
}

function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.feature-brutal-card, .step-brutal, .testimonial-brutal, .download-brutal-box'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';
                }, i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) rotate(-1deg)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

function initNavHover() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translate(-2px, -2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}
