/**
 * nav functionality voor header etc.
 */

document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initSectionHighlight();
});

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');

            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');

                setTimeout(() => {
                    document.body.classList.remove('overflow-hidden');
                }, 300);
            } else {
                const navHeight = nav.offsetHeight;
                mobileMenu.style.top = `${navHeight}px`;
                mobileMenu.style.maxHeight = `calc(100vh - ${navHeight}px)`;
                mobileMenu.classList.add('open');

                document.body.classList.add('overflow-hidden');
            }
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                mobileMenu.classList.remove('open');
                document.body.classList.remove('overflow-hidden');
            });
        });

        const setMobileMenuPosition = () => {
            const navHeight = nav.offsetHeight;
            mobileMenu.style.top = `${navHeight}px`;
            mobileMenu.style.maxHeight = `calc(100vh - ${navHeight}px)`;
        };

        setMobileMenuPosition();
        window.addEventListener('resize', setMobileMenuPosition);
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                const mobileMenu = document.getElementById('mobile-menu');
                const hamburger = document.getElementById('hamburger');
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    if (hamburger) hamburger.classList.remove('is-active');
                    document.body.classList.remove('overflow-hidden');
                }
            }
        });
    });
}

function initNavbarScroll() {
    const nav = document.querySelector('nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');

                const navBg = document.querySelector('.nav-background');
                if (navBg) {
                    navBg.style.opacity = '0.95';
                }
            } else {
                nav.classList.remove('scrolled');

                const navBg = document.querySelector('.nav-background');
                if (navBg) {
                    navBg.style.opacity = '1';
                }
            }
        });
    }
}

function initSectionHighlight() {
    if (!document.querySelector('#event-info')) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link.section-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });

        if (current === '' && window.scrollY < 100) {
            const homeLink = document.querySelector('.nav-link[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });
}