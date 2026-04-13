document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('nav-active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Highlight Active Link
    const currentPath = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href');
        if (itemPath === currentPath || (currentPath === '' && itemPath === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 4. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 5. Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'light') {
            htmlEl.setAttribute('data-theme', 'light');
            if (themeToggleBtn) {
                themeToggleBtn.querySelector('i').className = 'fas fa-moon';
                themeToggleBtn.title = 'Switch to dark mode';
            }
        } else {
            htmlEl.removeAttribute('data-theme');
            if (themeToggleBtn) {
                themeToggleBtn.querySelector('i').className = 'fas fa-sun';
                themeToggleBtn.title = 'Switch to light mode';
            }
        }
    };

    // Load saved theme (defaults to dark)
    const savedTheme = localStorage.getItem('auralex-theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.hasAttribute('data-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('auralex-theme', newTheme);
            applyTheme(newTheme);
        });
    }
});
