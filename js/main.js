// Main JavaScript functionality

// Citation copy functionality
function copyCitation() {
    const citationText = document.querySelector('.citation-text').textContent;
    const copyButton = document.querySelector('.copy-button');
    navigator.clipboard.writeText(citationText).then(() => {
        // Show success feedback
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '✅ Copied!';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyButton.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback copy method
        const textArea = document.createElement('textarea');
        textArea.value = citationText;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '✅ Copied!';
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error('Copy failed', err);
        }
        document.body.removeChild(textArea);
    });
}

// Smooth scrolling for navigation links
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Number animation effect for statistics
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent.replace(/,/g, ''));
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                number.textContent = Math.floor(current).toLocaleString();
            } else {
                number.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Initialize statistics animation when visible
function initializeStatsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });

    // Wait for stats section to load, then observe
    setTimeout(() => {
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }, 500);
}

// Nav scroll behavior
function initializeNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Initial check
    if (window.scrollY <= 50) {
        nav.classList.add('nav-hidden');
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY <= 50) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
    });
}

// Scroll-reveal: fade sections in as they enter the viewport
function initializeScrollReveal() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    sections.forEach((section, i) => {
        // Stagger delay for multiple sections visible at once
        section.style.transitionDelay = `${i * 0.05}s`;
        observer.observe(section);
    });
}

// Initialize all functionality after page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeStatsAnimation();
    initializeNavScroll();
    initializeScrollReveal();
});

// Make functions globally available
window.copyCitation = copyCitation;