// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Navigation Functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetSection = link.getAttribute('data-section');
        
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const target = document.getElementById(targetSection);
        if (target) {
            target.classList.add('active');
            
            // Scroll to top of main content
            document.querySelector('.main-content').scrollTop = 0;
        }
        
        // Close mobile menu after navigation
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Active Link Highlighting on Scroll (for future scroll-based navigation)
function updateActiveLink() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Form Validation
function validateForm() {
    let isValid = true;
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Get error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Reset previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');
    
    // Validate Name
    if (name.value.trim() === '') {
        nameError.textContent = 'Name is required';
        name.classList.add('error');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        name.classList.add('error');
        isValid = false;
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        emailError.textContent = 'Email is required';
        email.classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        email.classList.add('error');
        isValid = false;
    }
    
    // Validate Message
    if (message.value.trim() === '') {
        messageError.textContent = 'Message is required';
        message.classList.add('error');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        message.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

// Handle Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span class="btn-icon">✓</span> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Remove any error classes
            document.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        }, 1500);
    }
});

// Real-time Validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateForm();
    });
    
    input.addEventListener('input', () => {
        // Remove error styling on input
        if (input.classList.contains('error')) {
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement && errorElement.textContent !== '') {
                // Only clear if user is typing
                if (input.value.trim() !== '') {
                    input.classList.remove('error');
                    errorElement.textContent = '';
                }
            }
        }
    });
});

// Download CV Button
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Download CV')) {
        btn.addEventListener('click', () => {
            // Create a temporary link to download CV
            // In a real scenario, this would link to an actual CV file
            alert('CV download would start here. Replace this with actual CV file link.');
            // Example: window.open('assets/cv.pdf', '_blank');
        });
    }
});

// Portfolio Button
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Portfolio')) {
        btn.addEventListener('click', () => {
            // Navigate to projects section
            const projectsLink = document.querySelector('[data-section="projects"]');
            if (projectsLink) {
                projectsLink.click();
            }
        });
    }
});

// GitHub Links for Projects
// GitHub links are handled directly in HTML via onclick handlers

// Handle Window Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// Initialize - Show home section by default
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Set active nav link
    const homeLink = document.querySelector('[data-section="home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});

// Smooth scroll behavior (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

