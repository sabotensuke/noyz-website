// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Modal Functionality
const serviceCards = document.querySelectorAll('.service-card');
const modalOverlays = document.querySelectorAll('.modal-overlay');
const modalCloseButtons = document.querySelectorAll('.modal-close');

// Open modal when service card is clicked
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when close button is clicked
modalCloseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = button.closest('.modal-overlay');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close modal when clicking outside of modal content
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalOverlays.forEach(overlay => {
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let slideInterval;

// Initialize slider
function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Go to specific slide
function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Pause slider when hovering
function pauseSlider() {
    clearInterval(slideInterval);
}

// Resume slider when not hovering
function resumeSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// Event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    pauseSlider();
    resumeSlider();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    pauseSlider();
    resumeSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        goToSlide(slideIndex);
        pauseSlider();
        resumeSlider();
    });
});

// Start the slider
startSlider();

// Pause on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', pauseSlider);
slider.addEventListener('mouseleave', resumeSlider);

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .about-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.service-card, .about-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
