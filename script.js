// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateActiveLink(link);
    });
});

// Update active navigation link
function updateActiveLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Review Form Submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewerName').value.trim();
    const email = document.getElementById('reviewerEmail').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('reviewText').value.trim();

    if (name && email && rating && reviewText) {
        // Create new review card
        const newReview = document.createElement('div');
        newReview.className = 'review-card';
        newReview.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${name}</h4>
                    <p>Recent Review</p>
                </div>
                <div class="stars">
                    ${'<i class="fas fa-star"></i>'.repeat(rating)}
                </div>
            </div>
            <p class="review-text">"${reviewText}"</p>
        `;

        // Add to reviews grid at beginning
        const reviewsGrid = document.getElementById('reviewsGrid');
        reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);

        // Show success message
        const submitMessage = document.getElementById('submitMessage');
        submitMessage.className = 'submit-message success';
        submitMessage.textContent = 'Thank you for your review! We appreciate your feedback.';
        submitMessage.style.display = 'block';

        // Reset form
        this.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            submitMessage.style.display = 'none';
        }, 5000);
    } else {
        const submitMessage = document.getElementById('submitMessage');
        submitMessage.className = 'submit-message error';
        submitMessage.textContent = 'Please fill in all fields.';
        submitMessage.style.display = 'block';
    }
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (name && email && message) {
        // Simulate form submission
        const formData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toLocaleString()
        };

        // Log form data (in a real application, this would be sent to a server)
        console.log('Contact Form Submitted:', formData);

        // Show success message (in a real app, this would come from server)
        alert(`Thank you ${name}! We've received your consultation request and will contact you soon at ${email}.`);

        // Reset form
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all service and vision cards
document.querySelectorAll('.service-card, .vision-card, .review-card').forEach(card => {
    observer.observe(card);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize
console.log('R&F Outdoor Services website loaded successfully!');
