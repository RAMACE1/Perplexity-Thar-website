// Thar Desert Village Experience - Single Location Focus

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormValidation();
    setupScrollAnimations();
    setupNavbarScroll();
    setupGalleryImageClicks();
    setupVideoInteractions();
    setupNavigationButtons();
    
    // Set minimum date for visit form
    const dateInput = document.querySelector('input[name="preferred_date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    console.log('Thar Desert Village website initialized successfully');
}

// Setup Navigation Buttons
function setupNavigationButtons() {
    // Hero action buttons
    const experienceBtn = document.querySelector('.hero-actions .btn--primary');
    const discoverBtn = document.querySelector('.hero-actions .btn--outline');
    
    if (experienceBtn) {
        experienceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
    
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('experiences');
        });
    }
    
    // Navigation header button
    const planVisitBtn = document.querySelector('.nav-actions .btn--primary');
    if (planVisitBtn) {
        planVisitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('contact');
        });
    }
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle mobile menu styles
            if (navLinks.classList.contains('active')) {
                navLinks.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: var(--color-surface);
                    flex-direction: column;
                    padding: var(--space-20);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    margin: var(--space-16);
                    box-shadow: var(--shadow-lg);
                    z-index: 999;
                    display: flex;
                `;
            } else {
                navLinks.style.cssText = '';
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinksElements = navLinks.querySelectorAll('.nav-link');
        navLinksElements.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                navLinks.style.cssText = '';
            });
        });
    }
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation Setup
function setupFormValidation() {
    // Visit planning form
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        visitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleVisitForm(this);
        });
    }
}

// Scroll Animations Setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.experience-card, .testimonial-card, .value-item, .gallery-item'
    );
    animateElements.forEach(el => observer.observe(el));
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
}

// Gallery Image Clicks Setup
function setupGalleryImageClicks() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4');
            if (img && title) {
                openImageViewer(img.src, title.textContent);
            }
        });
    });
}

// Video Interactions Setup
function setupVideoInteractions() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoType = this.classList.contains('mobile-video') ? '9:16 Mobile' : '16:9 Landscape';
            const videoTitle = this.querySelector('p').textContent.split('\n')[0];
            showNotification(`${videoTitle} - ${videoType} video would play here`, 'info');
        });
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log('Scrolling to section:', sectionId);
    } else {
        console.warn('Section not found:', sectionId);
    }
}

// Form Handlers
function handleVisitForm(form) {
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--color-error)';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            field.classList.add('error');
        } else {
            field.style.borderColor = 'var(--color-border)';
            field.style.boxShadow = 'none';
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields to plan your village experience.', 'error');
        return;
    }
    
    // Add loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Your Inquiry...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Create inquiry summary
    const inquiryData = Object.fromEntries(formData);
    const inquirySummary = `
        New Village Experience Inquiry:
        Name: ${inquiryData.name}
        Email: ${inquiryData.email}
        Country: ${inquiryData.country}
        Phone: ${inquiryData.phone || 'Not provided'}
        Preferred Date: ${inquiryData.preferred_date || 'Flexible'}
        Duration: ${inquiryData.duration}
        Group Size: ${inquiryData.group_size}
        Message: ${inquiryData.message}
    `;
    
    console.log('Village Visit Inquiry:', inquirySummary);
    
    // Simulate API call to send inquiry
    setTimeout(() => {
        // Show success notification
        showNotification(
            'Thank you for your interest in our village! We will contact you within 24 hours to discuss your authentic desert experience. Check your email for confirmation.',
            'success'
        );
        
        // Reset form
        form.reset();
        
        // Create WhatsApp message for quick contact
        const whatsappMessage = encodeURIComponent(
            `Hello! I'm interested in visiting your Thar Desert village. My name is ${inquiryData.name} from ${inquiryData.country}. I'd like to plan a ${inquiryData.duration} experience for ${inquiryData.group_size}. ${inquiryData.message ? 'Additional details: ' + inquiryData.message : ''}`
        );
        
        // Optional: Auto-open WhatsApp after a short delay
        setTimeout(() => {
            const shouldOpenWhatsApp = confirm('Would you like to also send a quick message via WhatsApp for faster response?');
            if (shouldOpenWhatsApp) {
                window.open(`https://wa.me/919876543210?text=${whatsappMessage}`, '_blank');
            }
        }, 3000);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
    }, 1500);
}

// Gallery Image Viewer
function openImageViewer(imageSrc, title) {
    // Remove existing viewer if any
    closeImageViewer();
    
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 4000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        cursor: pointer;
        animation: fadeIn 0.3s ease-out;
    `;
    
    viewer.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center;">
            <img src="${imageSrc}" alt="${title}" style="
                max-width: 100%; 
                max-height: 100%; 
                object-fit: contain; 
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            ">
            <div style="
                color: white; 
                margin-top: 16px; 
                font-size: 18px; 
                font-weight: 500;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
            ">${title}</div>
            <button onclick="closeImageViewer()" style="
                position: absolute; 
                top: -15px; 
                right: -15px; 
                background: rgba(0,0,0,0.8); 
                color: white; 
                border: none; 
                width: 35px; 
                height: 35px; 
                border-radius: 50%; 
                cursor: pointer; 
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='rgba(0,0,0,1)'" onmouseout="this.style.background='rgba(0,0,0,0.8)'">×</button>
        </div>
    `;
    
    // Close on background click
    viewer.onclick = function(e) {
        if (e.target === viewer) {
            closeImageViewer();
        }
    };
    
    // Add fade-in animation
    if (!document.querySelector('#image-viewer-styles')) {
        const style = document.createElement('style');
        style.id = 'image-viewer-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(viewer);
    document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
    const viewer = document.querySelector('.image-viewer');
    if (viewer) {
        viewer.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            if (viewer.parentNode) {
                viewer.remove();
                document.body.style.overflow = 'auto';
            }
        }, 300);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        'success': '#10B981',
        'error': '#EF4444', 
        'warning': '#F59E0B',
        'info': '#3B82F6'
    };
    
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    
    const notificationColor = colors[type] || colors.info;
    const notificationIcon = icons[type] || icons.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 5000;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-left: 4px solid ${notificationColor};
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-family: var(--font-family-base);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px;">
            <span style="font-size: 18px; color: ${notificationColor}; margin-top: 2px;">${notificationIcon}</span>
            <span style="flex: 1; color: var(--color-text); font-size: 14px; line-height: 1.5;">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none; 
                border: none; 
                font-size: 18px; 
                color: var(--color-text-secondary); 
                cursor: pointer; 
                padding: 0; 
                line-height: 1;
                margin-top: 2px;
            ">&times;</button>
        </div>
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 6000);
}

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageViewer();
    }
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px var(--color-focus-ring)';
        });
        
        control.addEventListener('blur', function() {
            if (!this.classList.contains('error')) {
                this.style.borderColor = 'var(--color-border)';
                this.style.boxShadow = 'none';
            }
        });
    });
});

// Enhance WhatsApp integration
function openWhatsAppChat() {
    const message = encodeURIComponent(
        "Hello! I'm interested in experiencing authentic village life in your Thar Desert village. Could you please share more details about the experience and availability?"
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
}

// Add click handler to WhatsApp button
document.addEventListener('DOMContentLoaded', function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsAppChat();
        });
    }
});

// Intersection Observer for stats animation
function setupStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out';
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', function() {
    setupStatsAnimation();
});

// Console welcome message
console.log('%c🐪 Welcome to Thar Desert Village Experience! 🏜️', 'color: #DAA520; font-size: 16px; font-weight: bold;');
console.log('%cDiscover authentic India in our traditional desert village', 'color: #666; font-size: 12px;');

// Export functions for global access
window.scrollToSection = scrollToSection;
window.closeImageViewer = closeImageViewer;