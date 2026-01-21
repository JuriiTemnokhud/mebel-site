// SPA Router for Furniture Website
// Handles navigation and dynamic content loading

(function () {
    'use strict';

    // Route definitions
    const routes = {
        '': 'pages/home.html',
        'home': 'pages/home.html',
        'about': 'pages/about.html',
        'calculator': 'pages/calculator.html',
        'services': 'pages/services.html'
    };

    // Content container
    const contentContainer = document.getElementById('app-content');

    // Loading indicator
    function showLoading() {
        if (contentContainer) {
            contentContainer.innerHTML = '<div class="loading-spinner" style="text-align: center; padding: 3rem;"><p>Завантаження...</p></div>';
        }
    }

    // Load page content
    async function loadPage(pageName) {
        const route = routes[pageName] || routes['home'];

        showLoading();

        try {
            const response = await fetch(route);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();

            if (contentContainer) {
                contentContainer.innerHTML = html;

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Re-initialize any scripts that need to run on the new content
                initializePageScripts(pageName);

                // Update active nav link
                updateActiveNavLink(pageName);
            }
        } catch (error) {
            console.error('Error loading page:', error);
            if (contentContainer) {
                contentContainer.innerHTML = `
                    <div style="text-align: center; padding: 3rem;">
                        <h2>Помилка завантаження</h2>
                        <p>Не вдалося завантажити сторінку. Спробуйте ще раз.</p>
                        <button onclick="location.reload()" class="cta-button">Оновити</button>
                    </div>
                `;
            }
        }
    }

    // Initialize page-specific scripts
    function initializePageScripts(pageName) {
        switch (pageName) {
            case 'home':
                // Re-initialize portfolio gallery listeners
                if (window.initializeGalleries) {
                    window.initializeGalleries();
                }
                // Re-initialize reviews carousel
                if (window.initializeReviewsCarousel) {
                    window.initializeReviewsCarousel();
                }
                break;
            case 'calculator':
                // Calculator will have its own initialization
                if (window.initializeCalculator) {
                    window.initializeCalculator();
                }
                break;
        }
    }

    // Update active navigation link
    function updateActiveNavLink(pageName) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current page link
        const currentLink = document.querySelector(`.nav-links a[data-route="${pageName}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    // Handle navigation
    function navigate(pageName) {
        // Update URL hash
        window.location.hash = pageName || 'home';
    }

    // Handle hash change
    function handleHashChange() {
        const hash = window.location.hash.slice(1); // Remove #
        const pageName = hash || 'home';
        loadPage(pageName);
    }

    // Initialize router
    function init() {
        // Handle hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Handle navigation link clicks
        document.addEventListener('click', function (e) {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                navigate(route);
            }
        });

        // Load initial page
        handleHashChange();
    }

    // Export router functions
    window.router = {
        navigate: navigate,
        init: init
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
