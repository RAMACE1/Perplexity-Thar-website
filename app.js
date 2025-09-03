// Thar Desert Village Tourism Website JavaScript

// Global variables
let currentCurrency = 'INR';
let currentBooking = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupCurrencyConverter();
    setupGalleryFilters();
    setupFormValidation();
    setupScrollAnimations();
    setupNavbarScroll();
    setupGalleryImageClicks();
    
    // Set minimum date for booking forms
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });
    
    console.log('Website initialized successfully');
}

// Mobile Menu Setup
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinksElements = navLinks.querySelectorAll('.nav-link');
        navLinksElements.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
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

// Currency Converter Setup
function setupCurrencyConverter() {
    const currencySelector = document.getElementById('currencySelector');
    
    if (currencySelector) {
        currencySelector.addEventListener('change', function() {
            currentCurrency = this.value;
            updateAllPrices();
        });
    } else {
        console.warn('Currency selector not found');
    }
}

// Update all prices based on selected currency
function updateAllPrices() {
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(element => {
        const inrPrice = parseInt(element.dataset.inr);
        const usdPrice = parseInt(element.dataset.usd);
        
        if (inrPrice && usdPrice) {
            if (currentCurrency === 'INR') {
                element.textContent = `₹${inrPrice.toLocaleString()}${element.textContent.includes('/night') ? '/night' : ''}`;
            } else {
                element.textContent = `$${usdPrice}${element.textContent.includes('/night') ? '/night' : ''}`;
            }
        }
    });
    
    // Update total amount in booking modal
    const totalAmount = document.getElementById('totalAmount');
    if (totalAmount && currentBooking) {
        const price = currentCurrency === 'INR' 
            ? `₹${currentBooking.priceINR.toLocaleString()}` 
            : `$${currentBooking.priceUSD}`;
        totalAmount.textContent = price + (currentBooking.type === 'accommodation' ? '/night' : '');
    }
}

// Gallery Filters Setup
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items with immediate effect
            galleryItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
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
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
    });
    
    // Video placeholder interactions
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoType = this.classList.contains('mobile-video') ? '9:16 Mobile' : '16:9 Landscape';
            showNotification(`Video player would open here for ${videoType} format video`, 'info');
        });
        
        // Add cursor pointer style
        placeholder.style.cursor = 'pointer';
    });
}

// Form Validation Setup
function setupFormValidation() {
    // Quick booking form
    const quickBookingForm = document.getElementById('quickBookingForm');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuickBooking(this);
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingForm(this);
        });
    }
    
    // Payment form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePaymentForm(this);
        });
    }
    
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    });
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
    const animateElements = document.querySelectorAll('.experience-card, .accommodation-card, .testimonial-card');
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
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });
    }
}

// Booking Functions
function showBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Booking modal not found');
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function bookExperience(name, priceINR, priceUSD) {
    console.log('Booking experience:', name, priceINR, priceUSD);
    
    currentBooking = {
        type: 'experience',
        name: name,
        priceINR: priceINR,
        priceUSD: priceUSD
    };
    
    const selectedServiceInput = document.getElementById('selectedService');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (selectedServiceInput) {
        selectedServiceInput.value = name;
    }
    
    if (totalAmountElement) {
        const price = currentCurrency === 'INR' ? `₹${priceINR.toLocaleString()}` : `$${priceUSD}`;
        totalAmountElement.textContent = price;
    }
    
    showBookingModal();
    return false; // Prevent default button behavior
}

function bookAccommodation(name, priceINR, priceUSD) {
    console.log('Booking accommodation:', name, priceINR, priceUSD);
    
    currentBooking = {
        type: 'accommodation',
        name: name,
        priceINR: priceINR,
        priceUSD: priceUSD
    };
    
    const selectedServiceInput = document.getElementById('selectedService');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (selectedServiceInput) {
        selectedServiceInput.value = name;
    }
    
    if (totalAmountElement) {
        const price = currentCurrency === 'INR' ? `₹${priceINR.toLocaleString()}/night` : `$${priceUSD}/night`;
        totalAmountElement.textContent = price;
    }
    
    showBookingModal();
    return false; // Prevent default button behavior
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.warn('Section not found:', sectionId);
    }
}

// Form Handlers
function handleQuickBooking(form) {
    const formData = new FormData(form);
    
    // Add loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! We will contact you within 24 hours to confirm your booking.', 'success');
        form.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleContactForm(form) {
    const formData = new FormData(form);
    
    // Add loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

function handleBookingForm(form) {
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--color-error)';
        } else {
            field.style.borderColor = 'var(--color-border)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Store booking data and proceed to payment
    const bookingData = Object.fromEntries(formData);
    bookingData.service = currentBooking;
    
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    closeBookingModal();
    showPaymentPage();
}

function handlePaymentForm(form) {
    const formData = new FormData(form);
    
    // Add loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing Payment...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        showNotification('Payment successful! Booking confirmation sent to your email.', 'success');
        
        // Reset form and hide payment page
        form.reset();
        hidePaymentPage();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Clear booking data
        localStorage.removeItem('bookingData');
        currentBooking = null;
    }, 2000);
}

function handleNewsletterForm(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';
    
    if (!email) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        form.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Payment Page Functions
function showPaymentPage() {
    const paymentPage = document.getElementById('paymentPage');
    const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
    
    if (paymentPage && bookingData && bookingData.service) {
        updatePaymentSummary(bookingData);
        paymentPage.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    } else {
        console.error('Payment page or booking data not found');
        showNotification('Error loading payment page. Please try again.', 'error');
    }
}

function hidePaymentPage() {
    const paymentPage = document.getElementById('paymentPage');
    if (paymentPage) {
        paymentPage.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function updatePaymentSummary(bookingData) {
    const summaryElement = document.getElementById('paymentSummary');
    if (!summaryElement || !bookingData.service) return;
    
    const service = bookingData.service;
    const price = currentCurrency === 'INR' 
        ? `₹${service.priceINR.toLocaleString()}` 
        : `$${service.priceUSD}`;
    
    const priceLabel = service.type === 'accommodation' ? `${price}/night` : price;
    
    summaryElement.innerHTML = `
        <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>Service:</strong> <span>${service.name}</span>
        </div>
        <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>Guest Name:</strong> <span>${bookingData.name}</span>
        </div>
        <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>Email:</strong> <span>${bookingData.email}</span>
        </div>
        <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>Date:</strong> <span>${new Date(bookingData.date).toLocaleDateString()}</span>
        </div>
        <div class="summary-item" style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <strong>Guests:</strong> <span>${bookingData.guests}</span>
        </div>
        <div class="summary-item total" style="display: flex; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: 16px;">
            <strong>Total Amount:</strong> <span class="total-price" style="color: var(--desert-gold); font-weight: bold;">${priceLabel}</span>
        </div>
    `;
}

function proceedToPayment() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const formEvent = new Event('submit');
        bookingForm.dispatchEvent(formEvent);
    }
}

function backToBooking() {
    hidePaymentPage();
    showBookingModal();
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Create notification styles
    const notificationStyles = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 5000;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-left: 4px solid ${getNotificationColor(type)};
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-family: var(--font-family-base);
    `;
    
    notification.style.cssText = notificationStyles;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
            <span style="font-size: 18px; color: ${getNotificationColor(type)};">${getNotificationIcon(type)}</span>
            <span style="flex: 1; color: var(--color-text); font-size: 14px;">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 18px; color: var(--color-text-secondary); cursor: pointer; padding: 0; line-height: 1;">&times;</button>
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
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10B981',
        'error': '#EF4444', 
        'warning': '#F59E0B',
        'info': '#3B82F6'
    };
    return colors[type] || colors.info;
}

// Gallery Image Viewer
function openImageViewer(imageSrc, title) {
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
    `;
    
    viewer.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%; text-align: center;">
            <img src="${imageSrc}" alt="${title}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">
            <div style="color: white; margin-top: 16px; font-size: 18px; font-weight: 500;">${title}</div>
            <button onclick="closeImageViewer()" style="position: absolute; top: -10px; right: -10px; background: rgba(0,0,0,0.7); color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 16px;">×</button>
        </div>
    `;
    
    viewer.onclick = function(e) {
        if (e.target === viewer) {
            closeImageViewer();
        }
    };
    
    document.body.appendChild(viewer);
    document.body.style.overflow = 'hidden';
}

function closeImageViewer() {
    const viewer = document.querySelector('.image-viewer');
    if (viewer) {
        viewer.remove();
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('bookingModal');
    if (e.target === modal) {
        closeBookingModal();
    }
});

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBookingModal();
        closeImageViewer();
        hidePaymentPage();
    }
});

// Form field focus effects
document.addEventListener('DOMContentLoaded', function() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px rgba(33, 128, 141, 0.1)';
        });
        
        control.addEventListener('blur', function() {
            this.style.borderColor = 'var(--color-border)';
            this.style.boxShadow = 'none';
        });
    });
});

// Console welcome message
console.log('%c🐪 Welcome to Thar Desert Village Retreat! 🏜️', 'color: #DAA520; font-size: 16px; font-weight: bold;');
console.log('%cExperience authentic Marwar culture in the heart of the Thar Desert', 'color: #666; font-size: 12px;');