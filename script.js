// Smooth scrolling for same-page anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    // Only prevent default for same-page anchors
    if (href !== '#' && document.querySelector(href)) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Hide top banner on scroll
let lastScrollTop = 0;
const topBanner = document.getElementById('topBanner');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        topBanner.classList.add('hidden');
        navbar.classList.add('banner-hidden');
    } else {
        topBanner.classList.remove('hidden');
        navbar.classList.remove('banner-hidden');
    }

    lastScrollTop = scrollTop;
}, false);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Floating widgets close functionality
const closeWidgetsBtn = document.getElementById('closeWidgets');
const floatingWidgets = document.getElementById('floatingWidgets');

if (closeWidgetsBtn && floatingWidgets) {
    closeWidgetsBtn.addEventListener('click', function() {
        floatingWidgets.classList.add('hidden');
    });
}

// Discount banner functionality (per page, per session)
document.addEventListener('DOMContentLoaded', function() {
    const discountBanner = document.getElementById('discountBanner');
    const closeDiscountBanner = document.getElementById('closeDiscountBanner');

    if (discountBanner && closeDiscountBanner) {
        // Get current page identifier (e.g., 'home', 'preturi', 'despre-noi', 'contact')
        const currentPath = window.location.pathname;
        let pageKey = 'home';
        
        if (currentPath.includes('preturi')) {
            pageKey = 'preturi';
        } else if (currentPath.includes('despre-noi')) {
            pageKey = 'despre-noi';
        } else if (currentPath.includes('contact')) {
            pageKey = 'contact';
        }
        
        const sessionKey = `discountBannerClosed_${pageKey}`;
        
        // Check if banner was closed for this page in this session
        const bannerClosed = sessionStorage.getItem(sessionKey);
        
        if (bannerClosed === 'true') {
            discountBanner.classList.add('hidden');
        } else {
            // Show banner after a short delay for better UX
            setTimeout(function() {
                discountBanner.style.display = 'block';
            }, 500);
        }
        
        // Close button handler
        closeDiscountBanner.addEventListener('click', function() {
            discountBanner.classList.add('hidden');
            sessionStorage.setItem(sessionKey, 'true');
        });
    }
});

