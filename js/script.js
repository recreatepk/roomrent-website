/* ===================================================
   ROOM RENT - JavaScript (Vanilla DOM)
   Multi-page website functionality
   ==================================================== */

// ===== Data Storage =====
const appData = {
    branches: [
        {
            id: 'gulshan-iqbal',
            name: 'Gulshan-e-Iqbal Branch',
            description: 'Spacious and comfortable rooms in the heart of Gulshan-e-Iqbal',
            emoji: '🏢',
            location: 'Gulshan-e-Iqbal, Karachi'
        },
        {
            id: 'gulshan-johar',
            name: 'Gulshan-e-Johar Branch',
            description: 'Modern facilities with premium amenities in Gulshan-e-Johar',
            emoji: '🏗️',
            location: 'Gulshan-e-Johar, Karachi'
        },
        {
            id: 'dha',
            name: 'DHA Branch',
            description: 'Luxury rooms in the exclusive and secure DHA area',
            emoji: '🏛️',
            location: 'DHA, Karachi'
        }
    ],
    rooms: [
        {
            id: 'single',
            name: 'Single Bedroom',
            description: 'Perfect for individuals and couples',
            capacity: '2-3 persons',
            price: 'PKR 3,500 - 4,500',
            emoji: '🛏️',
            images: [
                { src: 'images/rooms/single/room-img1.jpg', description: 'Single bed room view' },
                { src: 'images/rooms/single/room-img2.jpg', description: 'Attached bathroom' },
                { src: 'images/rooms/single/room-img3.jpg', description: 'Kitchenette' },
                { src: 'images/rooms/single/room-img4.jpg', description: 'TV area' }
            ],
            features: ['AC', 'WiFi', 'Attached Bathroom', 'Kitchen']
        },
        {
            id: 'double',
            name: 'Double Bedroom',
            description: 'Spacious rooms for families and groups',
            capacity: '4-5 persons',
            price: 'PKR 5,500 - 7,500',
            emoji: '🛏️🛏️',
            images: [
                { src: 'images/rooms/double/room-img5.jpg', description: 'Double bedroom view' },
                { src: 'images/rooms/double/room-img6.jpg', description: 'Modern bathroom' },
                { src: 'images/rooms/double/room-img7.jpg', description: 'Family room' },
                { src: 'images/rooms/double/room-img8.jpg', description: 'Balcony view' }
            ],
            features: ['AC', 'WiFi', 'Attached Bathroom', 'Kitchen', 'Balcony']
        },
        {
            id: 'three',
            name: '3 Bedroom',
            description: 'Largest accommodation for big groups and celebrations',
            capacity: '8-12 persons',
            price: 'PKR 12,000 - 15,000',
            emoji: '🏠',
            images: [
                { src: 'images/rooms/three/room-img9.jpg', description: '3-bedroom apartment' },
                { src: 'images/rooms/three/room-img10.jpg', description: 'Living room' },
                { src: 'images/rooms/three/room-img11.jpg', description: 'Full kitchen' },
                { src: 'images/rooms/three/room-img12.jpg', description: 'Parking facility' }
            ],
            features: ['AC', 'WiFi', '3 Bathrooms', 'Full Kitchen', 'Living Area', 'Parking']
        }
    ]
};

// ===== Utility Functions =====
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function on(element, event, handler) {
    if (element) element.addEventListener(event, handler);
}

function removeActive(selector) {
    $$(selector).forEach(el => el.classList.remove('active'));
}

function formatDateForInput() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function formatTimeForInput() {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
}

// ===== Page Detection =====
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('room-details')) return 'room-details';
    if (path.includes('branches')) return 'branches';
    if (path.includes('rooms')) return 'rooms';
    if (path.includes('booking')) return 'booking';
    if (path.includes('contact')) return 'contact';
    return 'home';
}

// ===== Navigation =====
function initNavigation() {
    const hamburger = $('#hamburger');
    const navMenu = $('#navMenu');
    const page = getCurrentPage();

    // Hamburger menu toggle
    if (hamburger) {
        on(hamburger, 'click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    $$('.nav-link').forEach(link => {
        on(link, 'click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Set active nav link
    removeActive('.nav-link');
    const activeLink = document.querySelector(`a[href*="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// ===== Branches Page =====
function initBranchesPage() {
    const grid = $('#branchesGridFull');
    if (!grid) return;

    grid.innerHTML = appData.branches.map(branch => `
        <div class="branch-card">
            <div class="branch-image">${branch.emoji}</div>
            <div class="branch-body">
                <h3>${branch.name}</h3>
                <p>${branch.description}</p>
                <p style="font-size: 0.9rem; color: #999; margin-top: 0.5rem;">📍 ${branch.location}</p>
                <button class="branch-btn" onclick="viewBranchRooms('${branch.id}')">View Rooms</button>
            </div>
        </div>
    `).join('');
}

function viewBranchRooms(branchId) {
    sessionStorage.setItem('selectedBranch', branchId);
    window.location.href = 'rooms.html';
}

// ===== Rooms Page =====
function initRoomsPage() {
    const grid = $('#roomsGrid');
    if (!grid) return;

    grid.innerHTML = appData.rooms.map(room => `
        <div class="room-card">
            <div class="room-image">${room.emoji}</div>
            <div class="room-body">
                <span class="room-badge">${room.capacity}</span>
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <p style="font-weight: 600; color: var(--primary); margin: 1rem 0;">${room.price}</p>
                <button class="room-btn" onclick="viewRoomDetails('${room.id}')">View Details</button>
            </div>
        </div>
    `).join('');
}

function viewRoomDetails(roomId) {
    sessionStorage.setItem('selectedRoom', roomId);
    window.location.href = 'room-details.html';
}

// ===== Room Details Page =====
function initRoomDetailsPage() {
    const wrapper = $('#roomDetailsWrapper');
    if (!wrapper) return;

    const selectedRoomId = sessionStorage.getItem('selectedRoom') || 'single';
    const room = appData.rooms.find(r => r.id === selectedRoomId);

    if (!room) {
        wrapper.innerHTML = '<p>Room not found</p>';
        return;
    }

    wrapper.innerHTML = `
        <div class="gallery-container">
            <div class="gallery-main" id="galleryMain" onclick="openLightbox(0)">
                <img src="${room.images[0].src}" alt="${room.images[0].description}" class="gallery-image">
            </div>
            <div class="gallery-thumbnails">
                ${room.images.map((img, idx) => `
                    <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="changeImage(${idx})">
                        <img src="${img.src}" alt="${img.description}" class="thumb-image">
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="room-info">
            <h1 class="room-details-title">${room.name}</h1>
            <p class="room-details-subtitle">${room.description}</p>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem;"> (Amenities)</h3>
                <div class="room-features-list">
                    ${room.features.map(feature => `
                        <div class="feature-item">${feature}</div>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--primary); margin-bottom: 1rem;">Details</h3>
                <p><strong>Capacity:</strong> ${room.capacity}</p>
                <p><strong>Price Range:</strong> ${room.price}</p>
            </div>

            <div class="room-details-cta">
                <a href="booking.html" class="btn btn-primary">Book Now</a>
                <a href="https://wa.me/923352838794?text=Hi%20Room%20Rent!%20I%27m%20interested%20in%20the%20${encodeURIComponent(room.name)}" 
                   target="_blank" class="btn btn-whatsapp">Contact via WhatsApp</a>
            </div>
        </div>
    `;

    // Initialize image gallery variables
    window.currentImageIndex = 0;
    window.currentRoom = room;

    // Update breadcrumb
    const breadcrumb = $('#roomBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = room.name;
}

function changeImage(index) {
    window.currentImageIndex = index;
    const gallery = $('#galleryMain');
    const room = window.currentRoom;
    
    if (gallery && room) {
        const img = gallery.querySelector('.gallery-image');
        img.src = room.images[index].src;
        img.alt = room.images[index].description;
    }

    // Update active thumbnail
    removeActive('.gallery-thumb');
    $$('.gallery-thumb')[index].classList.add('active');
}

function openLightbox(index) {
    const lightbox = $('#lightbox');
    const img = $('#lightboxImage');
    const room = window.currentRoom;
    
    if (lightbox && room) {
        window.currentImageIndex = index;
        img.src = room.images[index].src;
        img.alt = room.images[index].description;
        lightbox.classList.add('show');
    }
}

function closeLightbox() {
    const lightbox = $('#lightbox');
    if (lightbox) lightbox.classList.remove('show');
}

// ===== Booking Form =====
function initBookingForm() {
    const form = $('#bookingForm');
    if (!form) return;

    // Set default values
    const bookingDate = $('#bookingDate');
    const checkInTime = $('#checkInTime');
    const checkOutTime = $('#checkOutTime');

    if (bookingDate) bookingDate.value = formatDateForInput();
    if (checkInTime) checkInTime.value = formatTimeForInput();
    if (checkOutTime) checkOutTime.value = formatTimeForInput();

    // Form submission
    on(form, 'submit', handleBookingSubmit);

    // Real-time validation
    $$('#bookingForm input, #bookingForm select').forEach(field => {
        on(field, 'blur', validateBookingField);
        on(field, 'change', validateBookingField);
    });
}

function validateBookingField(e) {
    const field = e.target;
    const group = field.closest('.form-group');
    const error = group.querySelector('.error-message');
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } else if (field.name === 'phone' && field.value.trim()) {
        if (!/^(03\d{2}-?\d{7}|03\d{9})$/.test(field.value)) {
            isValid = false;
            message = 'Enter valid phone format (03XX-XXXXXXX)';
        }
    } else if (field.name === 'nic' && field.value.trim()) {
        if (!/^\d{5}-\d{7}-\d{1}$/.test(field.value) && field.value.length < 10) {
            isValid = false;
            message = 'Enter valid NIC format';
        }
    } else if (field.name === 'persons') {
        const val = parseInt(field.value);
        if (val < 1 || val > 20) {
            isValid = false;
            message = 'Enter persons between 1-20';
        }
    }

    if (isValid) {
        group.classList.remove('error');
        if (error) error.textContent = '';
    } else {
        group.classList.add('error');
        if (error) error.textContent = message;
    }

    return isValid;
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const fields = $$('#bookingForm input, #bookingForm select');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateBookingField({ target: field })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) return;

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

    // Save to localStorage
    try {
        let bookings = JSON.parse(localStorage.getItem('roomRentBookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('roomRentBookings', JSON.stringify(bookings));
    } catch (err) {
        console.log('LocalStorage not available');
    }

    // Show success message
    const successDiv = $('#formSuccess');
    if (successDiv) {
        successDiv.classList.add('show');
    }

    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Submitted';

    // Reset form
    setTimeout(() => {
        form.reset();
        if (successDiv) successDiv.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Booking';
    }, 3000);
}

// ===== Contact Form =====
function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    on(form, 'submit', handleContactSubmit);

    $$('#contactForm input, #contactForm textarea').forEach(field => {
        on(field, 'blur', validateContactField);
    });
}

function validateContactField(e) {
    const field = e.target;
    const group = field.closest('.form-group');
    const error = group.querySelector('.error-message');
    let isValid = true;
    let message = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } else if (field.name === 'contactEmail' && field.value.trim()) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            isValid = false;
            message = 'Enter valid email address';
        }
    } else if (field.name === 'contactPhone' && field.value.trim()) {
        if (!/^(03\d{2}-?\d{7}|03\d{9})$/.test(field.value)) {
            isValid = false;
            message = 'Enter valid phone format';
        }
    }

    if (isValid) {
        group.classList.remove('error');
        if (error) error.textContent = '';
    } else {
        group.classList.add('error');
        if (error) error.textContent = message;
    }

    return isValid;
}

function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const fields = $$('#contactForm input, #contactForm textarea');
    let isFormValid = true;

    fields.forEach(field => {
        if (!validateContactField({ target: field })) {
            isFormValid = false;
        }
    });

    if (!isFormValid) return;

    // Show success
    const successDiv = $('#contactSuccess');
    if (successDiv) successDiv.classList.add('show');

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Sent';

    setTimeout(() => {
        form.reset();
        if (successDiv) successDiv.classList.remove('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }, 3000);
}

// ===== Home Page Branches Preview =====
function initHomeBranches() {
    const grid = $('#branchesGrid');
    if (!grid) return;

    grid.innerHTML = appData.branches.map(branch => `
        <div class="branch-card">
            <div class="branch-image">${branch.emoji}</div>
            <div class="branch-body">
                <h3>${branch.name}</h3>
                <p>${branch.description}</p>
                <button class="branch-btn" onclick="viewBranchRooms('${branch.id}')">View Rooms</button>
            </div>
        </div>
    `).join('');
}

// ===== Scroll to Top Button =====
function initScrollToTop() {
    const btn = $('#scrollTop');
    if (!btn) return;

    on(window, 'scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    on(btn, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Lightbox Navigation =====
function initLightboxNav() {
    const prevBtn = $('#lightboxPrev');
    const nextBtn = $('#lightboxNext');
    const overlay = $('#lightbox');
    const closeBtn = $('.lightbox-close');

    if (prevBtn) {
        on(prevBtn, 'click', () => {
            if (window.currentRoom) {
                let idx = window.currentImageIndex - 1;
                if (idx < 0) idx = window.currentRoom.images.length - 1;
                const img = $('#lightboxImage');
                img.textContent = window.currentRoom.images[idx].emoji;
                window.currentImageIndex = idx;
            }
        });
    }

    if (nextBtn) {
        on(nextBtn, 'click', () => {
            if (window.currentRoom) {
                let idx = window.currentImageIndex + 1;
                if (idx >= window.currentRoom.images.length) idx = 0;
                const img = $('#lightboxImage');
                img.textContent = window.currentRoom.images[idx].emoji;
                window.currentImageIndex = idx;
            }
        });
    }

    if (closeBtn) {
        on(closeBtn, 'click', closeLightbox);
    }

    if (overlay) {
        on(overlay, 'click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
    }

    // Keyboard navigation
    on(document, 'keydown', (e) => {
        if (!overlay.classList.contains('show')) return;
        if (e.key === 'ArrowLeft') prevBtn?.click();
        if (e.key === 'ArrowRight') nextBtn?.click();
        if (e.key === 'Escape') closeLightbox();
    });
}

// ===== Initialize Page =====
function initPage() {
    const page = getCurrentPage();

    // Common initialization
    initNavigation();
    initScrollToTop();

    // Page-specific initialization
    switch (page) {
        case 'home':
            initHomeBranches();
            break;
        case 'branches':
            initBranchesPage();
            break;
        case 'rooms':
            initRoomsPage();
            break;
        case 'room-details':
            initRoomDetailsPage();
            initLightboxNav();
            break;
        case 'booking':
            initBookingForm();
            break;
        case 'contact':
            initContactForm();
            break;
    }
}

// ===== Visitor Counter =====
function initVisitorCounter() {
    // Get or initialize visitor count from localStorage
    const visitorCountElement = $('#visitorCount');
    if (!visitorCountElement) return;

    // Get current count from localStorage
    let visitorCount = localStorage.getItem('roomRentVisitorCount');
    
    // If no count exists, start at 0
    if (visitorCount === null) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }

    // Check if this is a new visit (new session)
    const sessionId = sessionStorage.getItem('roomRentSessionId');
    
    if (!sessionId) {
        // This is a new visitor/new session
        visitorCount++;
        localStorage.setItem('roomRentVisitorCount', visitorCount);
        
        // Mark this session as recorded
        const newSessionId = 'session_' + Date.now() + '_' + Math.random();
        sessionStorage.setItem('roomRentSessionId', newSessionId);
        
        // Log the visit
        console.log('🎉 New visitor detected! Total visitors: ' + visitorCount);
    }

    // Display the current visitor count
    visitorCountElement.textContent = visitorCount;
    
    // Trigger pulse animation
    visitorCountElement.classList.remove('pulse-animation');
    // Force reflow to restart animation
    void visitorCountElement.offsetWidth;
    visitorCountElement.classList.add('pulse-animation');
}

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', initPage);

// ===== Console Message =====
console.log('%cRoom Rent - Premium Room Rental Service', 'font-size: 18px; font-weight: bold; color: #2578bb;');
console.log('%cCall: 0335-2838-794 | WhatsApp: https://wa.me/923352838794', 'font-size: 12px; color: #666;');
