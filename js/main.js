// NOMADX - Main JavaScript
// Handles navigation, smooth scrolling, and form interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or just "#"
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Navbar Background on Scroll
    // ===================================
    const mainNav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            mainNav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            mainNav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===================================
    // Scroll Animations (Fade In on Scroll)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section, .content-block');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe section numbers with separate animation
    const sectionNumbers = document.querySelectorAll('.section-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0.03';
            }
        });
    }, observerOptions);
    
    sectionNumbers.forEach(number => {
        number.style.opacity = '0';
        number.style.transition = 'opacity 1s ease-out';
        numberObserver.observe(number);
    });
    
    // ===================================
    // Form Handling
    // ===================================
    
    // Partner Form
    const partnerForm = document.getElementById('partnerForm');
    if (partnerForm) {
        partnerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formContainer = this.parentElement;
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="margin-bottom: 1.5rem;">
                        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                        <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Thank You!</h3>
                    <p style="font-size: 1.1rem; opacity: 0.8;">
                        We've received your partnership inquiry and will get back to you within 2-3 business days.
                    </p>
                    <a href="index.html" class="btn-learn-more" style="margin-top: 2rem; display: inline-flex;">
                        <span>BACK TO HOME</span>
                    </a>
                </div>
            `;
            
            // Scroll to message
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // Invest Form
    const investForm = document.getElementById('investForm');
    if (investForm) {
        investForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formContainer = this.parentElement;
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style="margin-bottom: 1.5rem;">
                        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                        <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h3 style="font-size: 1.8rem; margin-bottom: 1rem;">Thank You for Your Interest!</h3>
                    <p style="font-size: 1.1rem; opacity: 0.8;">
                        We've received your investment inquiry. Our team will review your information and 
                        reach out with detailed materials and next steps within 2-3 business days.
                    </p>
                    <a href="index.html" class="btn-learn-more" style="margin-top: 2rem; display: inline-flex;">
                        <span>BACK TO HOME</span>
                    </a>
                </div>
            `;
            
            // Scroll to message
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    // ===================================
    // Parallax Effect on Hero
    // ===================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / 600);
            }
        });
    }
    
    // ===================================
    // Dynamic Year in Footer
    // ===================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        if (currentYear > 2026) {
            footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
        }
    }
    
    // ===================================
    // Keyboard Accessibility
    // ===================================
    
    // Trap focus in mobile menu when open
    if (mobileMenuToggle) {
        document.addEventListener('keydown', function(e) {
            if (navLinks.classList.contains('active')) {
                const focusableElements = navLinks.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.key === 'Escape') {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.focus();
                }
                
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    // ===================================
    // Image Lazy Loading
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src], iframe[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                if (element.dataset.srcset) {
                    element.srcset = element.dataset.srcset;
                    element.removeAttribute('data-srcset');
                }
                
                element.classList.add('loaded');
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%cWelcome to NOMADX', 'font-size: 24px; font-weight: bold; color: #fff; background: #000; padding: 10px 20px;');
    console.log('%cBuilding a Lightweight Civilization', 'font-size: 14px; color: #999;');
    console.log('%cInterested in joining the team? Email us at hello@nomadx.life', 'font-size: 12px; color: #666;');
    
});
