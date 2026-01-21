// Основний JavaScript файл

document.addEventListener('DOMContentLoaded', function () {
    console.log('Веб-сайт завантажений!');

    // Splash screen removal after animation
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.remove();
        }, 4000); // Remove after 4 seconds (3.2s animation + 0.8s fade)
    }

    // Hamburger menu toggle logic
    // Hamburger menu toggle logic
    // Hamburger menu toggle logic
    // Global function for direct onclick access
    window.toggleMobileMenu = function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        console.log('Mobile menu toggled via global function');

        const navLinksList = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.mobile-menu-toggle');

        if (navLinksList && menuToggle) {
            navLinksList.classList.toggle('active');

            // Icon toggle
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinksList.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    };

    // Close menu logic (still event listener based as it needs to run on load)
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle && navLinksList) {
        // Close menu when a link is clicked
        const links = navLinksList.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksList.classList.contains('active')) {
                // Check if click is outside nav AND not on the button (although button has e.stopPropagation)
                if (!menuToggle.contains(e.target) && !navLinksList.contains(e.target)) {
                    navLinksList.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    // Приклад: додавання активного класу до посилання навігації
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Modal contacts logic
    const contactsBtn = document.getElementById('contactsBtn');
    const contactsModal = document.getElementById('contactsModal');
    const modalClose = contactsModal ? contactsModal.querySelector('.modal-close') : null;
    const modalOverlay = contactsModal ? contactsModal.querySelector('.modal-overlay') : null;

    function openModal() {
        if (!contactsModal) return;
        contactsModal.classList.add('open');
        contactsModal.setAttribute('aria-hidden', 'false');
        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        if (!contactsModal) return;
        contactsModal.classList.remove('open');
        contactsModal.setAttribute('aria-hidden', 'true');
    }

    function closeModalAndRestoreFocus() {
        closeModal();
        try {
            if (contactsBtn) contactsBtn.focus(); else document.body.focus();
        } catch (e) { }
    }

    if (contactsBtn) {
        contactsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });

        // Open modal on hover
        contactsBtn.addEventListener('mouseenter', function () {
            openModal();
        });
    }

    // Close modal when clicking X button
    if (modalClose) {
        modalClose.addEventListener('click', function (e) {
            e.preventDefault();
            closeModalAndRestoreFocus();
        });
    }

    // Close modal when clicking on overlay (outside modal content)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModalAndRestoreFocus();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && contactsModal && contactsModal.classList.contains('open')) {
            closeModalAndRestoreFocus();
        }
    });


    // Services modal logic
    const servicesBtn = document.getElementById('servicesBtn');
    const servicesModal = document.getElementById('servicesModal');
    const servicesClose = servicesModal ? servicesModal.querySelector('.modal-close') : null;

    console.log('servicesBtn present:', !!servicesBtn, 'servicesModal present:', !!servicesModal);

    function openServices() {
        if (!servicesModal) return;
        servicesModal.classList.add('open');
        servicesModal.setAttribute('aria-hidden', 'false');
        if (servicesClose) servicesClose.focus();
    }

    function closeServices() {
        if (!servicesModal) return;
        servicesModal.classList.remove('open');
        servicesModal.setAttribute('aria-hidden', 'true');
    }

    function closeServicesAndRestoreFocus() {
        closeServices();
        try {
            if (servicesBtn) servicesBtn.focus(); else document.body.focus();
        } catch (e) { }
    }

});

// Universal gallery system for all portfolio items
(function () {
    // Mapping portfolio items to their gallery modals
    const galleryMappings = [
        { itemId: 'kukhnia-item', modalId: 'kukhniaGalleryModal', gridId: null },
        { itemId: 'shafy-item', modalId: 'shafyGalleryModal', gridId: null },
        { itemId: 'spalni-item', modalId: 'spalniGalleryModal', gridId: null },
        { itemId: 'dytyachi-item', modalId: 'dytyachiGalleryModal', gridId: null },
        { itemId: 'kabinety-item', modalId: 'kabinetyGalleryModal', gridId: null },
        { itemId: 'sanvuzly-item', modalId: 'sanvuzlyGalleryModal', gridId: null },
        { itemId: 'tv-zony-item', modalId: 'tvzonyGalleryModal', gridId: null },
        { itemId: 'peredpokoi-item', modalId: 'peredpokoiGalleryModal', gridId: null }
    ];

    // About Me modal logic
    const aboutMeLink = document.getElementById('aboutMeLink');
    const aboutMeModal = document.getElementById('aboutMeModal');
    const aboutMeClose = aboutMeModal ? aboutMeModal.querySelector('.modal-close') : null;

    function openAboutMeModal() {
        if (!aboutMeModal) return;
        aboutMeModal.classList.add('open');
        aboutMeModal.setAttribute('aria-hidden', 'false');
        if (aboutMeClose) aboutMeClose.focus();
    }

    function closeAboutMeModal() {
        if (!aboutMeModal) return;
        aboutMeModal.classList.remove('open');
        aboutMeModal.setAttribute('aria-hidden', 'true');
    }

    // aboutMeLink now opens about.html in a new tab naturally (no JS override)

    if (aboutMeClose) {
        aboutMeClose.addEventListener('click', function () {
            closeAboutMeModal();
        });
    }

    // close when clicking on overlay for About Me modal
    aboutMeModal && aboutMeModal.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.modal-overlay')) {
            closeAboutMeModal();
        }
    });

    // close About Me modal on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (aboutMeModal && aboutMeModal.classList.contains('open')) closeAboutMeModal();
        }
    });

    // Ensure manufacturer links open in new tabs (not windows)
    if (aboutMeModal) {
        aboutMeModal.addEventListener('click', function (e) {
            const link = e.target.closest('a[target="_blank"]');
            if (link && link.href && !link.classList.contains('disabled-link')) {
                e.preventDefault();
                // Using noopener,noreferrer for security
                window.open(link.href, '_blank', 'noopener,noreferrer');
            }
        });
    }

    // Setup each portfolio item with its gallery
    galleryMappings.forEach(mapping => {
        const portfolioItem = document.getElementById(mapping.itemId);
        const galleryModal = document.getElementById(mapping.modalId);

        if (!portfolioItem || !galleryModal) return;

        portfolioItem.style.cursor = 'pointer';

        // Open gallery on click
        portfolioItem.addEventListener('click', function (e) {
            if (e.target.closest('a') || e.target.closest('button')) return;
            galleryModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            history.pushState({ galleryOpen: true }, '', '#gallery');
        });

        // Close gallery function
        function closeGallery() {
            galleryModal.classList.remove('open');
            document.body.style.overflow = '';
            if (window.location.hash === '#gallery') {
                history.back();
            }
        }

        // Close button
        const closeBtn = galleryModal.querySelector('.gallery-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeGallery);
        }

        // Close on overlay click
        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                closeGallery();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && galleryModal.classList.contains('open')) {
                const lightbox = document.getElementById('lightbox');
                if (lightbox && lightbox.classList.contains('open')) return;
                closeGallery();
            }
        });

        // Handle browser back button
        window.addEventListener('popstate', function (e) {
            if (galleryModal.classList.contains('open')) {
                galleryModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });



    // Lightbox logic for ALL galleries with arrow navigation
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    const closeLight = document.getElementById('closeLight');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (lightbox && lightboxContent) {
        let currentIndex = 0;
        let mediaItems = [];
        let activeGrid = null;

        // Build array of all media items from a specific grid
        function buildMediaArray(grid) {
            activeGrid = grid;
            mediaItems = Array.from(grid.querySelectorAll('.thumb')).map(thumb => {
                const media = thumb.querySelector('img, video');
                if (!media) return null;
                const rawFull = (media.dataset && media.dataset.full) ? media.dataset.full : media.src;
                return {
                    type: media.tagName.toLowerCase(),
                    src: rawFull
                };
            }).filter(Boolean);
        }

        // Show media at specific index
        function showMedia(index) {
            if (index < 0 || index >= mediaItems.length) return;
            currentIndex = index;
            const item = mediaItems[index];

            lightboxContent.innerHTML = '';

            let mediaElement;
            if (item.type === 'img') {
                mediaElement = document.createElement('img');
                mediaElement.src = item.src;
            } else {
                mediaElement = document.createElement('video');
                mediaElement.src = item.src;
                mediaElement.controls = true;
                mediaElement.autoplay = true;
            }

            // Add fade-in animation
            mediaElement.style.animation = 'lightboxFadeIn 0.5s ease-out';
            lightboxContent.appendChild(mediaElement);

            // Update button states
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === mediaItems.length - 1;
        }

        // Navigate to previous
        function showPrev() {
            if (currentIndex > 0) {
                showMedia(currentIndex - 1);
            }
        }

        // Navigate to next
        function showNext() {
            if (currentIndex < mediaItems.length - 1) {
                showMedia(currentIndex + 1);
            }
        }

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('open');
            lightboxContent.innerHTML = '';
        }

        // Attach click handlers to ALL gallery grids
        document.querySelectorAll('.gallery-grid').forEach(grid => {
            grid.addEventListener('click', (ev) => {
                const thumb = ev.target.closest('.thumb');
                if (!thumb) return;

                buildMediaArray(grid);

                // Find index of clicked thumb
                const thumbs = Array.from(grid.querySelectorAll('.thumb'));
                const clickedIndex = thumbs.indexOf(thumb);

                if (clickedIndex >= 0) {
                    showMedia(clickedIndex);
                    lightbox.classList.add('open');
                }
            });
        });

        // Arrow button clicks
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showPrev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showNext();
            });
        }

        if (closeLight) {
            closeLight.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (ev) => {
            if (ev.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (ev) => {
            if (!lightbox.classList.contains('open')) return;

            if (ev.key === 'Escape') {
                closeLightbox();
            } else if (ev.key === 'ArrowLeft') {
                showPrev();
            } else if (ev.key === 'ArrowRight') {
                showNext();
            }
        });
    }
})();
// Contact Form Handling - Standard HTML Submission (AJAX removed for reliability/activation)
// The form in index.html will handle the POST request directly.

// Service Order Form handling
const serviceOrderForm = document.getElementById('serviceOrderForm');
if (serviceOrderForm) {
    serviceOrderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(serviceOrderForm);
        const order = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message'),
            date: new Date().toISOString()
        };

        // Save to localStorage (simple queue) — replace with server POST when available
        try {
            const existing = JSON.parse(localStorage.getItem('serviceOrders') || '[]');
            existing.push(order);
            localStorage.setItem('serviceOrders', JSON.stringify(existing));
        } catch (err) {
            console.error('Service order save error', err);
        }

        const status = document.getElementById('orderStatus');
        if (status) {
            status.style.display = 'inline';
        }

        // small visual feedback and reset form
        setTimeout(() => {
            serviceOrderForm.reset();
            if (status) status.style.display = 'none';
            closeServices();
        }, 1800);
    });
}


// Review Modal Logic
const addReviewBtn = document.getElementById('addReviewBtn');
const reviewModal = document.getElementById('reviewModal');
const reviewForm = document.getElementById('reviewForm');
const reviewsGrid = document.getElementById('reviewsGrid');
const reviewRatingInput = document.getElementById('reviewRatingInput');
const starRatingSpans = document.querySelectorAll('.star-rating span');

if (addReviewBtn && reviewModal) {
    addReviewBtn.addEventListener('click', function () {
        reviewModal.classList.add('open');
    });

    const closeReviewBtn = reviewModal.querySelector('.modal-close');
    if (closeReviewBtn) {
        closeReviewBtn.addEventListener('click', function () {
            reviewModal.classList.remove('open');
        });
    }

    // Close on overlay click
    reviewModal.addEventListener('click', function (e) {
        if (e.target.matches('.modal-overlay')) {
            reviewModal.classList.remove('open');
        }
    });
}

// Star Rating Logic
if (starRatingSpans.length > 0) {
    starRatingSpans.forEach(span => {
        span.addEventListener('click', function () {
            const rating = this.dataset.value;
            reviewRatingInput.value = rating;

            // Update visual state
            starRatingSpans.forEach(s => {
                if (s.dataset.value <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Initialize with default (5 stars)
    starRatingSpans.forEach(s => s.classList.add('active'));
}


// --- Reviews Logic (LocalStorage) ---

// 1. Load Reviews on Startup
loadReviews();

function loadReviews() {
    const storedReviews = localStorage.getItem('siteReviews');
    let reviews = [];

    if (storedReviews) {
        try {
            reviews = JSON.parse(storedReviews);
        } catch (e) {
            console.error("Error parsing reviews", e);
        }
    }

    // If no stored reviews, we might want to show default ones logic,
    // but for now, we rely on the static ones in HTML for the Reviews Page (if any)
    // OR we can default verify and populate.
    // For the Carousel (Index page), it starts empty if no local storage.
    // Let's add some default reviews if empty so the carousel isn't blank on first visit.
    if (reviews.length === 0) {
        reviews = [
            { name: "Олена К.", service: "Кухня на замовлення", rating: 5, text: "Дуже задоволені кухнею! Все зроблено вчасно і якісно." },
            { name: "Андрій М.", service: "Шафа-купе", rating: 5, text: "Замовляли шафу-купе в коридор. Монтаж пройшов швидко." },
            { name: "ТОВ \"Вектор\"", service: "Офісні меблі", rating: 5, text: "Меблювали весь офіс. Меблі міцні, сучасні." },
            { name: "Марія І.", service: "Дитяча", rating: 5, text: "Чудова дитяча кімната, дитина в захваті!" },
            { name: "Ігор П.", service: "Спальня", rating: 4, text: "Якісні матеріали, гарний дизайн. Рекомендую." }
        ];
        // Don't save defaults to localStorage to avoid persisting them as "user reviews" permanently if we want to distinguish,
        // but for a simple site without backend, saving them is fine or just rendering them.
        // Let's render them without saving to LS so if user clears LS they come back.
    }

    reviews.forEach(review => {
        addReviewToDOM(review);
    });
}

function saveReview(review) {
    let reviews = [];
    const storedReviews = localStorage.getItem('siteReviews');
    if (storedReviews) {
        try {
            reviews = JSON.parse(storedReviews);
        } catch (e) {
            reviews = [];
        }
    }
    reviews.push(review);
    localStorage.setItem('siteReviews', JSON.stringify(reviews));
}

function addReviewToDOM(review) {
    // Target BOTH the grid (for reviews.html) and the track (for index.html)
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reviewsTrack = document.getElementById('reviewsTrack');

    const card = document.createElement('div');
    card.className = 'review-card';
    // Optional: Animation class if defined in CSS. card.classList.add('fade-in');

    const starsStr = '★'.repeat(review.rating);

    // Handle Photo
    let photoHtml = '';
    if (review.photo) {
        photoHtml = `<div style="margin-top: 10px;"><img src="${review.photo}" alt="Фото відгуку" style="max-width: 100px; border-radius: 4px;"></div>`;
    }

    card.innerHTML = `
            <div class="stars" style="color: #FFD700;">${starsStr}</div>
            <p class="review-text">"${review.text}"</p>
            ${photoHtml}
            <div class="reviewer-info">
                <span class="reviewer-name">${review.name}</span>
                <span class="reviewer-type">${review.service}</span>
            </div>
        `;

    if (reviewsGrid) {
        reviewsGrid.appendChild(card.cloneNode(true));
    }

    if (reviewsTrack) {
        reviewsTrack.appendChild(card.cloneNode(true));
    }
}

// 2. Handle Review Form Submit
if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(reviewForm);
        const name = formData.get('reviewName');
        const service = formData.get('reviewService');
        const rating = parseInt(formData.get('reviewRating') || '5');
        const text = formData.get('reviewText');
        const photoFile = document.getElementById('reviewPhoto').files[0];

        const newReview = {
            name,
            service,
            rating,
            text,
            date: new Date().toISOString()
        };

        // Handle Photo (Base64)
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                newReview.photo = event.target.result; // Base64 string
                saveReview(newReview);
                addReviewToDOM(newReview);

                // Close modal manual code since closeReviewModal isn't separate
                if (reviewModal) {
                    reviewModal.classList.remove('open');
                    reviewForm.reset();
                    // Reset stars to 5
                    starRatingSpans.forEach(s => s.classList.add('active'));
                    if (reviewRatingInput) reviewRatingInput.value = 5;
                }
            };
            reader.readAsDataURL(photoFile);
        } else {
            saveReview(newReview);
            addReviewToDOM(newReview);

            // Close modal
            if (reviewModal) {
                reviewModal.classList.remove('open');
                reviewForm.reset();
                // Reset stars to 5
                starRatingSpans.forEach(s => s.classList.add('active'));
                if (reviewRatingInput) reviewRatingInput.value = 5;
            }
        }
    });
}

// --- Carousel Logic for Index Page ---
// Global function to initialize reviews carousel (called by router after page load)
window.initializeReviewsCarousel = function () {
    const reviewsTrack = document.getElementById('reviewsTrack');
    if (!reviewsTrack) {
        console.log('Reviews track not found, skipping carousel initialization');
        return;
    }

    const prevBtn = document.getElementById('reviewsPrev');
    const nextBtn = document.getElementById('reviewsNext');

    if (prevBtn && nextBtn) {
        // Remove old listeners if any (prevent duplicate listeners)
        const newPrevBtn = prevBtn.cloneNode(true);
        const newNextBtn = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

        newPrevBtn.addEventListener('click', () => {
            const cardWidth = reviewsTrack.firstElementChild ? reviewsTrack.firstElementChild.offsetWidth + 20 : 320;
            reviewsTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        newNextBtn.addEventListener('click', () => {
            const cardWidth = reviewsTrack.firstElementChild ? reviewsTrack.firstElementChild.offsetWidth + 20 : 320;
            reviewsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        console.log('Reviews carousel initialized successfully');
    }
};

// Initialize on first load
window.initializeReviewsCarousel();

// Карусель виробників
function setupManufacturerCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const cards = carousel.querySelectorAll('.manufacturer-card');
    let activeIndex = 0;
    function setActive(idx) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === idx);
        });
    }
    setActive(activeIndex);
    // Автоматична зміна кожні 3 секунди
    setInterval(() => {
        activeIndex = (activeIndex + 1) % cards.length;
        setActive(activeIndex);
    }, 3000);
    // Зміна при скролі
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function () {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY + 40) {
            activeIndex = (activeIndex + 1) % cards.length;
            setActive(activeIndex);
            lastScrollY = scrollY;
        } else if (scrollY < lastScrollY - 40) {
            activeIndex = (activeIndex - 1 + cards.length) % cards.length;
            setActive(activeIndex);
            lastScrollY = scrollY;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setupManufacturerCarousel('furniture-carousel');
    setupManufacturerCarousel('hardware-carousel');
});

// Приклад API запиту
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка при отриманні даних:', error);
    }
}

// --- Calculator Logic for SPA ---

// Global variables for calculator state
let currentKitchenShape = 'straight';

// SVG Constants
const svgDefs = `
    <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF3B3B" />
        </marker>
    </defs>`;

const shapeVisuals = {
    'straight': `<svg viewBox="-20 -25 140 150" class="preview-svg" style="background: white;">
        ${svgDefs}
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="#000" stroke-width="3"/>
        <rect x="0" y="0" width="100" height="30" fill="#5865F2"/>
        <line x1="0" y1="-5" x2="0" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="100" y1="-5" x2="100" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="0" y1="-10" x2="100" y2="-10" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="50" y="-12" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B">a</text>
        {island}
    </svg>`,
    'l-left': `<svg viewBox="-20 -25 140 150" class="preview-svg" style="background: white;">
        ${svgDefs}
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="#000" stroke-width="3"/>
        <rect x="0" y="0" width="100" height="20" fill="#5865F2"/>
        <rect x="0" y="20" width="20" height="30" fill="#5865F2"/>
        <line x1="0" y1="-5" x2="0" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="100" y1="-5" x2="100" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="0" y1="-10" x2="100" y2="-10" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="50" y="-12" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B">a</text>
        <line x1="105" y1="0" x2="115" y2="0" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="105" y1="50" x2="115" y2="50" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="110" y1="0" x2="110" y2="50" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="115" y="25" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B" transform="rotate(90, 115, 25)">b</text>
        {island}
    </svg>`,
    'l-right': `<svg viewBox="-20 -25 140 150" class="preview-svg" style="background: white;">
        ${svgDefs}
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="#000" stroke-width="3"/>
        <rect x="0" y="0" width="100" height="20" fill="#5865F2"/>
        <rect x="80" y="20" width="20" height="30" fill="#5865F2"/>
        <line x1="0" y1="-5" x2="0" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="100" y1="-5" x2="100" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="0" y1="-10" x2="100" y2="-10" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="50" y="-12" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B">a</text>
        <line x1="-5" y1="0" x2="-15" y2="0" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="-5" y1="50" x2="-15" y2="50" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="-10" y1="0" x2="-10" y2="50" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="-15" y="25" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B" transform="rotate(-90, -15, 25)">b</text>
        {island}
    </svg>`,
    'u-shape': `<svg viewBox="-20 -25 140 150" class="preview-svg" style="background: white;">
        ${svgDefs}
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="#000" stroke-width="3"/>
        <rect x="0" y="0" width="100" height="20" fill="#5865F2"/>
        <rect x="0" y="20" width="20" height="30" fill="#5865F2"/>
        <rect x="80" y="20" width="20" height="30" fill="#5865F2"/>
        <line x1="0" y1="-5" x2="0" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="100" y1="-5" x2="100" y2="-15" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="0" y1="-10" x2="100" y2="-10" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="50" y="-12" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B">a</text>
        <line x1="-5" y1="0" x2="-15" y2="0" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="-5" y1="50" x2="-15" y2="50" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="-10" y1="0" x2="-10" y2="50" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="-15" y="25" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B" transform="rotate(-90, -15, 25)">b</text>
        <line x1="105" y1="0" x2="115" y2="0" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="105" y1="50" x2="115" y2="50" stroke="#FF3B3B" stroke-width="1.5"/>
        <line x1="110" y1="0" x2="110" y2="50" stroke="#FF3B3B" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
        <text x="115" y="25" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle" fill="#FF3B3B" transform="rotate(90, 115, 25)">c</text>
        {island}
    </svg>`
};

const islandSVG = `
    <rect x="30" y="70" width="40" height="15" fill="#5865F2"/>
    <line x1="30" y1="85" x2="30" y2="95" stroke="#FF3B3B" stroke-width="1.2"/>
    <line x1="70" y1="85" x2="70" y2="95" stroke="#FF3B3B" stroke-width="1.2"/>
    <line x1="30" y1="90" x2="70" y2="90" stroke="#FF3B3B" stroke-width="1.2" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
    <text x="50" y="88" font-family="Arial" font-size="8" font-weight="bold" text-anchor="middle" fill="#FF3B3B">o</text>`;

// Global functions for calculator interactivity
window.switchTab = function (tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.calc-section').forEach(sec => sec.classList.remove('active'));
    // Find the button that called this
    const btn = document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`);
    if (btn) btn.classList.add('active');

    const section = document.getElementById(tab + '-calc');
    if (section) section.classList.add('active');
};

window.updateVisualization = function () {
    const islandToggle = document.getElementById('island-toggle');
    const visualPreview = document.getElementById('visual-preview');
    if (!islandToggle || !visualPreview) return;

    const hasIsland = islandToggle.checked;
    let svgHtml = shapeVisuals[currentKitchenShape];
    svgHtml = svgHtml.replace('{island}', hasIsland ? islandSVG : '');
    visualPreview.innerHTML = svgHtml;
};

window.selectShape = function (shape) {
    currentKitchenShape = shape;
    const dimB = document.getElementById('dim-b-group');
    const dimC = document.getElementById('dim-c-group');

    if (dimB) dimB.style.display = (shape !== 'straight') ? 'flex' : 'none';
    if (dimC) dimC.style.display = (shape === 'u-shape') ? 'flex' : 'none';

    updateVisualization();
    calculateKitchen();
};

window.toggleIsland = function () {
    const islandToggle = document.getElementById('island-toggle');
    const dimO = document.getElementById('dim-o-group');
    if (!islandToggle || !dimO) return;

    const isActive = islandToggle.checked;
    dimO.style.display = isActive ? 'flex' : 'none';
    updateVisualization();
    calculateKitchen();
};

window.toggleCustomHeight = function (type) {
    const customInput = document.getElementById(type + '-custom');
    const customRadio = document.querySelector(`input[name="${type}-height"][value="custom"]`);
    if (!customInput || !customRadio) return;

    if (customRadio.checked) {
        customInput.disabled = false;
        customInput.focus();
    } else {
        customInput.disabled = true;
    }
    calculateKitchen();
};

window.calculateKitchen = function () {
    const a = (parseFloat(document.getElementById('k-dim-a')?.value) || 0) * 1000;
    const b = (parseFloat(document.getElementById('k-dim-b')?.value) || 0) * 1000;
    const c = (parseFloat(document.getElementById('k-dim-c')?.value) || 0) * 1000;
    const o = (parseFloat(document.getElementById('k-dim-o')?.value) || 0) * 1000;

    const islandToggle = document.getElementById('island-toggle');
    const hasIsland = islandToggle ? islandToggle.checked : false;

    // Height logic
    const lowerRadio = document.querySelector('input[name="lower-height"]:checked');
    const upperRadio = document.querySelector('input[name="upper-height"]:checked');

    let totalMM = 0;
    switch (currentKitchenShape) {
        case 'straight': totalMM = a; break;
        case 'l-left':
        case 'l-right': totalMM = a + b; break;
        case 'u-shape': totalMM = a + b + c; break;
    }

    if (hasIsland) totalMM += o;

    const length = totalMM / 1000;
    const facade = parseFloat(document.getElementById('k-facade')?.value || 0);
    const countertop = parseFloat(document.getElementById('k-countertop')?.value || 0);
    const hardware = parseFloat(document.getElementById('k-hardware')?.value || 1);

    const totalDisplay = document.getElementById('k-total');
    if (!totalDisplay) return;

    if (length === 0) {
        totalDisplay.innerText = '0 ₴';
        return;
    }

    let shapeFactor = 1.0;
    if (currentKitchenShape.startsWith('l-')) shapeFactor = 1.1;
    if (currentKitchenShape === 'u-shape') shapeFactor = 1.2;
    let islandFactor = hasIsland ? 1.15 : 1.0;

    let total = (facade + countertop) * length * hardware * shapeFactor * islandFactor;
    totalDisplay.innerText = Math.round(total).toLocaleString('uk-UA') + ' ₴';
};

window.updateWardrobeOptions = function () {
    const category = document.getElementById('w-category').value;
    const typeSelect = document.getElementById('w-type');

    if (category === 'sliding') {
        typeSelect.value = '10000';
    }
    calculateWardrobe();
};

window.calculateWardrobe = function () {
    const widthMM = parseFloat(document.getElementById('w-width')?.value) || 0;
    const heightMM = parseFloat(document.getElementById('w-height')?.value) || 0;

    const width = widthMM / 1000;
    const height = heightMM / 1000;

    const type = parseFloat(document.getElementById('w-type')?.value || 0);
    const filling = parseFloat(document.getElementById('w-filling')?.value || 1);
    const category = document.getElementById('w-category')?.value || 'bedroom';

    const totalDisplay = document.getElementById('w-total');
    if (!totalDisplay) return;

    if (width === 0 || height === 0) {
        totalDisplay.innerText = '0 ₴';
        return;
    }

    let categoryFactor = 1.0;
    switch (category) {
        case 'walk-in': categoryFactor = 1.3; break;
        case 'children': categoryFactor = 1.1; break;
        case 'hallway': categoryFactor = 0.95; break;
        case 'office': categoryFactor = 1.05; break;
        case 'sliding': categoryFactor = 1.15; break;
    }

    let area = width * height;
    let total = area * type * filling * categoryFactor;
    totalDisplay.innerText = Math.round(total).toLocaleString('uk-UA') + ' ₴';
};

// Initialize function called by router
window.initializeCalculator = function () {
    console.log('Initializing Calculator...');
    if (document.getElementById('visual-preview')) {
        updateVisualization();
    }
};


