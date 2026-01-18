// THE PLAYGROUND - Tab Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Adjust side-nav position on mobile dynamically
    function adjustSideNavPosition() {
        if (window.innerWidth <= 768) {
            const mainNav = document.querySelector('.main-nav');
            const playgroundTabs = document.querySelector('.playground-tabs');
            const sideNavs = document.querySelectorAll('.side-nav');
            
            if (mainNav && playgroundTabs && sideNavs.length > 0) {
                const mainNavHeight = mainNav.offsetHeight;
                const tabsHeight = playgroundTabs.offsetHeight;
                const totalOffset = mainNavHeight + tabsHeight;
                
                sideNavs.forEach(nav => {
                    nav.style.top = totalOffset + 'px';
                });
            }
        } else {
            // Reset for larger screens
            const sideNavs = document.querySelectorAll('.side-nav');
            sideNavs.forEach(nav => {
                nav.style.top = '';
            });
        }
    }
    
    // Call on load and resize
    adjustSideNavPosition();
    window.addEventListener('resize', adjustSideNavPosition);
    
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
            
            // Scroll to top of content smoothly
            const playgroundTabs = document.querySelector('.playground-tabs');
            const scrollPosition = playgroundTabs.offsetTop - 73;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, '#' + targetTab);
            
            // Reset side nav active states
            resetSideNavActive();
            
            // Re-adjust side nav position after tab switch
            setTimeout(adjustSideNavPosition, 100);
        });
    });
    
    // Side navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Remove active class from all nav items in current tab
                const currentTab = this.closest('.tab-content');
                const currentNavItems = currentTab.querySelectorAll('.nav-item');
                currentNavItems.forEach(navItem => navItem.classList.remove('active-item'));
                
                // Add active class to clicked item
                this.classList.add('active-item');
                
                // Calculate scroll position with proper offsets
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const tabsHeight = document.querySelector('.playground-tabs').offsetHeight;
                const sideNavHeight = currentTab.querySelector('.side-nav') ? currentTab.querySelector('.side-nav').offsetHeight : 0;
                
                // For mobile, account for side nav height
                const extraOffset = window.innerWidth <= 768 ? sideNavHeight + 10 : 0;
                const targetPosition = targetElement.offsetTop - navHeight - tabsHeight - extraOffset - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, '#' + targetId);
            }
        });
    });
    
    // Highlight active nav item on scroll
    function updateActiveNavOnScroll() {
        const currentTab = document.querySelector('.tab-content.active');
        if (!currentTab) return;
        
        const playgroundItems = currentTab.querySelectorAll('.playground-item[id]');
        const navItems = currentTab.querySelectorAll('.nav-item');
        
        let currentActive = null;
        
        playgroundItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top <= 300 && rect.bottom >= 300) {
                currentActive = item.getAttribute('id');
            }
        });
        
        if (currentActive) {
            navItems.forEach(navItem => {
                navItem.classList.remove('active-item');
                if (navItem.getAttribute('data-target') === currentActive) {
                    navItem.classList.add('active-item');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);
    
    function resetSideNavActive() {
        setTimeout(() => {
            const currentTab = document.querySelector('.tab-content.active');
            if (currentTab) {
                const firstNavItem = currentTab.querySelector('.nav-item');
                if (firstNavItem) {
                    currentTab.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active-item');
                    });
                    firstNavItem.classList.add('active-item');
                }
            }
        }, 100);
    }
    
    // Check URL hash on load and activate corresponding tab
    function activateTabFromHash() {
        const hash = window.location.hash.substring(1); // Remove #
        
        if (hash) {
            const targetButton = document.querySelector(`[data-tab="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            } else {
                // Check if it's a section anchor (e.g., #nomad-live)
                const targetElement = document.getElementById(hash);
                if (targetElement) {
                    // Find which tab it belongs to
                    const parentTab = targetElement.closest('.tab-content');
                    if (parentTab) {
                        const tabId = parentTab.getAttribute('id').replace('-tab', '');
                        const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
                        if (tabButton) {
                            // First activate the tab without scrolling
                            tabButtons.forEach(btn => btn.classList.remove('active'));
                            tabContents.forEach(content => content.classList.remove('active'));
                            tabButton.classList.add('active');
                            parentTab.classList.add('active');
                            
                            // Update URL hash
                            history.replaceState(null, null, '#' + hash);
                            
                            // Reset side nav active states
                            resetSideNavActive();
                            
                            // Re-adjust side nav position after tab switch
                            adjustSideNavPosition();
                            
                            // Then scroll to the target element
                            setTimeout(() => {
                                const navHeight = document.querySelector('.main-nav').offsetHeight;
                                const tabsHeight = document.querySelector('.playground-tabs').offsetHeight;
                                const sideNavHeight = parentTab.querySelector('.side-nav') ? parentTab.querySelector('.side-nav').offsetHeight : 0;
                                
                                // Calculate offset from top of the page
                                const targetPosition = targetElement.offsetTop - navHeight - tabsHeight - 20;
                                
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                                
                                // Highlight the correct nav item
                                const navItem = parentTab.querySelector(`[data-target="${hash}"]`);
                                if (navItem) {
                                    parentTab.querySelectorAll('.nav-item').forEach(item => {
                                        item.classList.remove('active-item');
                                    });
                                    navItem.classList.add('active-item');
                                }
                            }, 300);
                        }
                    }
                }
            }
        }
    }
    
    // Activate tab from hash on page load
    activateTabFromHash();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', activateTabFromHash);
    
    // Smooth scroll for external links that open in new tab
    const externalLinks = document.querySelectorAll('.external-link');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a visual feedback
            this.style.transform = 'translateX(10px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Keyboard navigation for tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                newIndex = (index + 1) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].focus();
                tabButtons[newIndex].click();
            }
        });
    });
    
    // Add animation observer for playground items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const itemObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all playground items for fade-in animation
    const playgroundItems = document.querySelectorAll('.playground-item');
    playgroundItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        itemObserver.observe(item);
    });
    
    // Track active tab in analytics (placeholder for future implementation)
    function trackTabView(tabName) {
        console.log('Tab viewed:', tabName);
        // Future: Send to analytics service
        // gtag('event', 'tab_view', { 'tab_name': tabName });
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            trackTabView(tabName);
        });
    });
    
});
