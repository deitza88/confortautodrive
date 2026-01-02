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

// Dynamic pricing calculator for preturi page
document.addEventListener('DOMContentLoaded', function() {
    const originalPriceElement = document.getElementById('originalPrice');
    
    if (originalPriceElement) {
        const BASE_PRICE = 2850; // Base price in RON (includes gear selection and exam car)
        const MEDICAL_FILE_PRICE = 250; // Additional cost for medical file
        
        const medicalFileCheckbox = document.getElementById('medicalFile');
        const examCarItem = document.getElementById('examCarItem');
        const medicalFileItem = document.getElementById('medicalFileItem');
        
        // Exam car is always included, so it should always be visible
        if (examCarItem) {
            examCarItem.classList.remove('inactive');
        }
        
        function updateFeaturesVisibility() {
            // Update medical file item visibility
            if (medicalFileItem) {
                if (medicalFileCheckbox && medicalFileCheckbox.checked) {
                    medicalFileItem.classList.remove('inactive');
                } else {
                    medicalFileItem.classList.add('inactive');
                }
            }
        }
        
        function updatePrice() {
            let totalPrice = BASE_PRICE;
            
            // Add medical file if checked
            if (medicalFileCheckbox && medicalFileCheckbox.checked) {
                totalPrice += MEDICAL_FILE_PRICE;
            }
            
            // Update displayed price
            originalPriceElement.textContent = totalPrice.toLocaleString('ro-RO') + ' RON';
            
            // Update features visibility
            updateFeaturesVisibility();
        }
        
        // Listen for changes on medical file checkbox
        if (medicalFileCheckbox) {
            medicalFileCheckbox.addEventListener('change', updatePrice);
        }
        
        // Initial price calculation and features visibility
        updatePrice();
    }
});

