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

    if (modalClose) {
        modalClose.addEventListener('click', function () {
            closeModal();
        });
    }

    // close when clicking on overlay
    contactsModal && contactsModal.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.modal-overlay')) {
            closeModal();
        }
    });

    // close on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (contactsModal && contactsModal.classList.contains('open')) closeModal();
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
    const reviewsTrack = document.getElementById('reviewsTrack');
    if (reviewsTrack) {
        const prevBtn = document.getElementById('reviewsPrev');
        const nextBtn = document.getElementById('reviewsNext');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                // Scroll left by width of one card (approx 300px + gap)
                // Better: scroll by width of container / 3 or specific amount
                const cardWidth = reviewsTrack.firstElementChild ? reviewsTrack.firstElementChild.offsetWidth + 20 : 320;
                reviewsTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                const cardWidth = reviewsTrack.firstElementChild ? reviewsTrack.firstElementChild.offsetWidth + 20 : 320;
                reviewsTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
            });
        }
    }

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
});
