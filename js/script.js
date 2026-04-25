// ============================================
// ROOM RENT - JAVASCRIPT APPLICATION
// Modern DOM-based Interactive Features
// ============================================

// State Management
const AppState = {
    selectedBranch: null,
    selectedRoom: null,
    branches: [
        {
            id: 1,
            name: 'Gulshan-e-Iqbal Branch',
            description: 'Spacious rooms in the heart of Gulshan-e-Iqbal, perfect for families and celebrations.',
            emoji: '🏢',
            roomTypes: [
                {
                    id: 101,
                    name: 'Single Bedroom',
                    capacity: '2-3 persons',
                    price: 'PKR 3,500 - 4,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Cooking Facility'],
                    emoji: '🛏️'
                },
                {
                    id: 102,
                    name: 'Double Bedroom',
                    capacity: '4-5 persons',
                    price: 'PKR 5,500 - 7,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Kitchen', 'Balcony'],
                    emoji: '🛏️🛏️'
                },
                {
                    id: 103,
                    name: '3 Bedroom',
                    capacity: '8-12 persons',
                    price: 'PKR 12,000 - 15,000',
                    features: ['AC', 'WiFi', '3 Bathrooms', 'Full Kitchen', 'Living Area', 'Parking'],
                    emoji: '🏠'
                }
            ]
        },
        {
            id: 2,
            name: 'Gulshan-e-Johar Branch',
            description: 'Modern facilities with premium amenities in the peaceful Gulshan-e-Johar area.',
            emoji: '🏗️',
            roomTypes: [
                {
                    id: 201,
                    name: 'Single Bedroom',
                    capacity: '2-3 persons',
                    price: 'PKR 3,500 - 4,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Cooking Facility'],
                    emoji: '🛏️'
                },
                {
                    id: 202,
                    name: 'Double Bedroom',
                    capacity: '4-5 persons',
                    price: 'PKR 5,500 - 7,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Kitchen', 'Balcony'],
                    emoji: '🛏️🛏️'
                },
                {
                    id: 203,
                    name: '3 Bedroom',
                    capacity: '8-12 persons',
                    price: 'PKR 12,000 - 15,000',
                    features: ['AC', 'WiFi', '3 Bathrooms', 'Full Kitchen', 'Living Area', 'Parking'],
                    emoji: '🏠'
                }
            ]
        },
        {
            id: 3,
            name: 'DHA Branch',
            description: 'Luxury rooms in the exclusive DHA area, offering premium comfort and security.',
            emoji: '🏛️',
            roomTypes: [
                {
                    id: 301,
                    name: 'Single Bedroom',
                    capacity: '2-3 persons',
                    price: 'PKR 4,000 - 5,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Cooking Facility'],
                    emoji: '🛏️'
                },
                {
                    id: 302,
                    name: 'Double Bedroom',
                    capacity: '4-5 persons',
                    price: 'PKR 6,500 - 8,500',
                    features: ['AC', 'WiFi', 'Attached Bathroom', 'Kitchen', 'Balcony', 'Premium Furniture'],
                    emoji: '🛏️🛏️'
                },
                {
                    id: 303,
                    name: '3 Bedroom',
                    capacity: '8-12 persons',
                    price: 'PKR 13,000 - 16,000',
                    features: ['AC', 'WiFi', '3 Bathrooms', 'Full Kitchen', 'Living Area', 'Premium Parking', 'Security 24/7'],
                    emoji: '🏠'
                }
            ]
        }
    ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get element by ID
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * Add event listener
 */
function on(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

/**
 * Query selector all
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Format phone number for WhatsApp
 */
function formatPhoneForWhatsApp(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Add country code if not present
    if (cleaned.length === 10) {
        return '92' + cleaned;
    }
    return cleaned;
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Validate email
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Pakistani phone number
 */
function isValidPhone(phone) {
    return /^(03\d{2}-?\d{7}|03\d{9})$/.test(phone.replace(/\s/g, ''));
}

/**
 * Get current datetime
 */
function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 16);
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize branches
    renderBranches();
    
    // Initialize rooms
    renderRooms();
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup navigation
    setupNavigation();
    
    // Setup modals
    setupModals();
    
    // Setup scroll effects
    setupScrollEffects();
}

// ============================================
// BRANCHES SECTION
// ============================================

function renderBranches() {
    const grid = $('branchesGrid');
    if (!grid) return;
    
    grid.innerHTML = AppState.branches.map(branch => `
        <div class="branch-card">
            <div class="branch-image">${branch.emoji}</div>
            <div class="branch-body">
                <h3>${branch.name}</h3>
                <p>${branch.description}</p>
                <button class="branch-btn" data-branch-id="${branch.id}">View Rooms</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to branch buttons
    $$('.branch-btn').forEach(btn => {
        on(btn, 'click', function() {
            const branchId = parseInt(this.dataset.branchId);
            AppState.selectedBranch = branchId;
            scrollToSection('rooms');
            highlightBranchRooms(branchId);
        });
    });
}

function highlightBranchRooms(branchId) {
    const branch = AppState.branches.find(b => b.id === branchId);
    const roomsGrid = $('roomsGrid');
    
    // Fade out all rooms
    $$('.room-card').forEach(card => {
        card.style.animation = 'fadeOut 0.3s ease-out';
    });
    
    setTimeout(() => {
        renderRooms(branchId);
    }, 300);
}

// ============================================
// ROOMS SECTION
// ============================================

function renderRooms(branchId = null) {
    const grid = $('roomsGrid');
    if (!grid) return;
    
    let rooms = [];
    
    if (branchId) {
        const branch = AppState.branches.find(b => b.id === branchId);
        rooms = branch ? branch.roomTypes : [];
    } else {
        // Show all rooms
        AppState.branches.forEach(branch => {
            rooms.push(...branch.roomTypes);
        });
    }
    
    grid.innerHTML = rooms.map((room, index) => `
        <div class="room-card" style="animation-delay: ${index * 0.1}s">
            <div class="room-image">${room.emoji}</div>
            <div class="room-body">
                <span class="room-badge">${room.capacity}</span>
                <h3>${room.name}</h3>
                <p>${room.price}</p>
                <div class="room-features">
                    ${room.features.slice(0, 3).map(feature => `
                        <span class="feature-tag">📌 ${feature}</span>
                    `).join('')}
                </div>
                <button class="room-btn" data-room-id="${room.id}">View Details</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to room buttons
    $$('.room-btn').forEach(btn => {
        on(btn, 'click', function() {
            const roomId = parseInt(this.dataset.roomId);
            showRoomModal(roomId);
        });
    });
}

function findRoomById(roomId) {
    for (let branch of AppState.branches) {
        const room = branch.roomTypes.find(r => r.id === roomId);
        if (room) {
            return { ...room, branchId: branch.id, branchName: branch.name };
        }
    }
    return null;
}

// ============================================
// MODALS
// ============================================

function setupModals() {
    const roomModal = $('roomModal');
    const bookingModal = $('bookingModal');
    
    // Close on overlay click
    on($('modalOverlay'), 'click', () => closeModal(roomModal));
    on($('bookingOverlay'), 'click', () => closeModal(bookingModal));
    
    // Close on button click
    $$('.modal-close').forEach(btn => {
        on(btn, 'click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close on Escape key
    on(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(roomModal);
            closeModal(bookingModal);
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showRoomModal(roomId) {
    const room = findRoomById(roomId);
    if (!room) return;
    
    const modalBody = $('modalBody');
    modalBody.innerHTML = `
        <div class="room-details-header">
            <h2>${room.name}</h2>
            <p style="color: var(--text-light); margin-top: 0.5rem;">
                ${room.branchName}
            </p>
        </div>
        
        <div class="room-details-gallery">${room.emoji}</div>
        
        <div class="room-details-info">
            <h3>Room Details</h3>
            <div class="details-grid">
                <div class="detail-item">
                    <strong>👥 Capacity</strong>
                    <span>${room.capacity}</span>
                </div>
                <div class="detail-item">
                    <strong>💰 Price Range</strong>
                    <span>${room.price}</span>
                </div>
            </div>
        </div>
        
        <div class="room-details-info">
            <h3>Amenities & Features</h3>
            <div class="room-features-modal">
                ${room.features.map(feature => `
                    <div class="feature-item">${feature}</div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-direction: column;">
            <button class="btn btn-primary" style="width: 100%;" data-action="book-room" data-room-id="${room.id}">
                Book Now
            </button>
            <a href="https://wa.me/923352838794?text=Hi%20Room%20Rent!%20I%27m%20interested%20in%20booking%20the%20${encodeURIComponent(room.name)}%20in%20${encodeURIComponent(room.branchName)}." 
               style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.75rem; 
                       background-color: #25D366; color: white; padding: 12px; border-radius: 8px; 
                       font-weight: 600; transition: all 0.3s ease;"
               onmouseover="this.style.backgroundColor='#1eae50'"
               onmouseout="this.style.backgroundColor='#25D366'">
                💬 WhatsApp Us
            </a>
        </div>
    `;
    
    // Setup book now button in modal
    const bookBtn = modalBody.querySelector('[data-action="book-room"]');
    on(bookBtn, 'click', function() {
        const roomId = parseInt(this.dataset.roomId);
        closeModal($('roomModal'));
        showBookingModal(roomId);
    });
    
    openModal($('roomModal'));
}

function showBookingModal(roomId) {
    const room = findRoomById(roomId);
    if (!room) return;
    
    const bookingForm = $('bookingForm');
    const now = new Date();
    const todayDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    bookingForm.innerHTML = `
        <div class="booking-form-title">
            <h2>Book Your Room</h2>
            <p style="color: var(--text-light);">${room.name} in ${room.branchName}</p>
        </div>
        
        <form id="roomBookingForm" class="booking-form">
            <div class="form-success" id="formSuccess">
                ✓ Booking submitted successfully! Our team will contact you shortly.
            </div>
            
            <div class="form-group">
                <label for="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                <div class="form-error"></div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" placeholder="03XX-XXXXXXX" required>
                    <div class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="nic">NIC / CNIC *</label>
                    <input type="text" id="nic" name="nic" placeholder="XXXXX-XXXXXXX-X" required>
                    <div class="form-error"></div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="persons">Number of Persons *</label>
                    <input type="number" id="persons" name="persons" min="1" max="20" value="1" placeholder="1" required>
                    <div class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="bookingDate">Booking Date *</label>
                    <input type="date" id="bookingDate" name="bookingDate" value="${todayDate}" required>
                    <div class="form-error"></div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="checkInTime">Check-in Time *</label>
                    <input type="time" id="checkInTime" name="checkInTime" value="${currentTime}" required>
                    <div class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="checkOutTime">Check-out Time *</label>
                    <input type="time" id="checkOutTime" name="checkOutTime" value="${currentTime}" required>
                    <div class="form-error"></div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="roomType">Room Type *</label>
                    <select id="roomType" name="roomType" required>
                        <option value="">Select Room Type</option>
                        <option value="${room.id}" selected>${room.name}</option>
                    </select>
                    <div class="form-error"></div>
                </div>
                <div class="form-group">
                    <label for="branch">Branch *</label>
                    <select id="branch" name="branch" required>
                        <option value="">Select Branch</option>
                        <option value="${room.branchId}" selected>${room.branchName}</option>
                    </select>
                    <div class="form-error"></div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="reference">Reference (Optional)</label>
                <input type="text" id="reference" name="reference" placeholder="How did you hear about us?">
            </div>
            
            <div class="form-actions">
                <button type="submit" class="form-btn form-btn-submit">Submit Booking</button>
                <a href="https://wa.me/923352838794?text=Hi%20Room%20Rent!%20I%27m%20interested%20in%20booking%20the%20${encodeURIComponent(room.name)}." 
                   class="form-btn form-btn-whatsapp">
                    💬 WhatsApp
                </a>
            </div>
        </form>
    `;
    
    setupBookingForm();
    openModal($('bookingModal'));
}

function setupBookingForm() {
    const form = $('roomBookingForm');
    if (!form) return;
    
    on(form, 'submit', handleBookingSubmit);
    
    // Real-time validation
    $$('#roomBookingForm input, #roomBookingForm select').forEach(field => {
        on(field, 'blur', validateField);
        on(field, 'change', validateField);
    });
}

function validateField(event) {
    const field = event.target;
    const parent = field.closest('.form-group');
    const errorDiv = parent.querySelector('.form-error');
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear error state
    parent.classList.remove('error');
    errorDiv.textContent = '';
    
    // Validation rules
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (fieldName === 'fullName') {
        if (field.value.trim().length < 3) {
            isValid = false;
            errorMessage = 'Name must be at least 3 characters';
        }
    } else if (fieldName === 'phone') {
        if (!isValidPhone(field.value)) {
            isValid = false;
            errorMessage = 'Enter valid phone number (03XX-XXXXXXX)';
        }
    } else if (fieldName === 'nic') {
        if (!/^\d{5}-\d{7}-\d{1}$/.test(field.value) && field.value.trim()) {
            // Allow flexible format but give guidance
            if (field.value.trim().length < 10) {
                isValid = false;
                errorMessage = 'Enter valid CNIC (XXXXX-XXXXXXX-X)';
            }
        }
    } else if (fieldName === 'persons') {
        if (parseInt(field.value) < 1 || parseInt(field.value) > 20) {
            isValid = false;
            errorMessage = 'Please enter valid number of persons (1-20)';
        }
    }
    
    if (!isValid) {
        parent.classList.add('error');
        errorDiv.textContent = errorMessage;
    }
    
    return isValid;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const form = $('roomBookingForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    let isFormValid = true;
    inputs.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showToast('Please fill all required fields correctly', 'error');
        return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const bookingData = {
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        nic: formData.get('nic'),
        persons: formData.get('persons'),
        bookingDate: formData.get('bookingDate'),
        checkInTime: formData.get('checkInTime'),
        checkOutTime: formData.get('checkOutTime'),
        roomType: formData.get('roomType'),
        branch: formData.get('branch'),
        reference: formData.get('reference'),
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage (demo)
    try {
        let bookings = JSON.parse(localStorage.getItem('roomRentBookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('roomRentBookings', JSON.stringify(bookings));
    } catch (err) {
        console.log('LocalStorage not available');
    }
    
    // Show success message
    const successDiv = form.querySelector('#formSuccess');
    successDiv.classList.add('show');
    
    // Disable submit button
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Submitted';
    
    showToast('Booking submitted successfully! We will contact you shortly.', 'success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        successDiv.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking';
        closeModal($('bookingModal'));
    }, 3000);
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Hero buttons
    const viewRoomsBtn = document.querySelector('[data-action="view-rooms"]');
    const bookNowBtn = document.querySelector('[data-action="book-now"]');
    
    on(viewRoomsBtn, 'click', () => scrollToSection('rooms'));
    on(bookNowBtn, 'click', () => showBookingModal(101)); // Default room
    
    // Scroll to top button
    const scrollTopBtn = $('scrollTopBtn');
    on(window, 'scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    on(scrollTopBtn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    on(hamburger, 'click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    $$('.nav-link').forEach(link => {
        on(link, 'click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    $$('.nav-link').forEach(link => {
        on(link, 'click', function(e) {
            const section = this.dataset.section;
            updateActiveNavLink(this);
        });
    });
    
    // Update active nav on scroll
    on(window, 'scroll', updateActiveNavOnScroll);
}

function updateActiveNavLink(element) {
    $$('.nav-link').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = $$('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    $$('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function setupScrollEffects() {
    // Intersection Observer for fade-in on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe room and branch cards
    $$('.branch-card, .room-card, .contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

function scrollToSection(sectionId) {
    const section = $(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Update active nav
        const navLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (navLink) updateActiveNavLink(navLink);
    }
}

// ============================================
// ADD CSS ANIMATIONS TO DOM
// ============================================

// Add fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #27AE60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .toast-error {
        background-color: #E74C3C;
    }
    
    .toast-success {
        background-color: #27AE60;
    }
    
    @media (max-width: 480px) {
        .toast {
            bottom: 1rem;
            right: 1rem;
            left: 1rem;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SERVICE WORKER (Optional - for PWA)
// ============================================

if ('serviceWorker' in navigator) {
    // Service worker can be registered here for PWA functionality
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cRoom Rent - Premium Room Rental Service', 'font-size: 20px; font-weight: bold; color: #2578bb;');
console.log('%c📞 Call: 0335-2838-794 | 💬 WhatsApp: https://wa.me/923352838794', 'font-size: 14px; color: #6ea5db;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #999;');
