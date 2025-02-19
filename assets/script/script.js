// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const words = ['Software Developer', 'Web Developer', 'Backend Developer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 200);
        } else {
            // Typing speed
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    // Start typing effect
    type();
}

// Form submission handling - only run on contact page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Navigation handling
const pages = ['index.html', 'portfolio.html', 'contact.htm'];
let currentPageIndex = pages.indexOf(window.location.pathname.split('/').pop()) || 0;

// Update page indicator based on current page
function updatePageIndicator() {
    const indicators = document.querySelectorAll('.page-indicator span');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPageIndex);
    });
}

// Initialize page indicator on load
document.addEventListener('DOMContentLoaded', () => {
    updatePageIndicator();
    
    // Add click events to indicators
    document.querySelectorAll('.page-indicator span').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            window.location.href = pages[index];
        });
    });
});

// Enhanced page transitions
function navigateToPage(direction) {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);

    // Current page transition out
    document.body.classList.add('page-transition-out');
    
    if (direction === 'right') {
        currentPageIndex = (currentPageIndex + 1) % pages.length;
    } else {
        currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    }
    
    setTimeout(() => {
        window.location.href = pages[currentPageIndex];
    }, 600);
}

// Initialize page content animation
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('page-content');
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 100);
    }

    // Remove transition overlay if it exists from previous page
    const existingOverlay = document.querySelector('.page-transition-overlay');
    if (existingOverlay) {
        existingOverlay.style.transform = 'scaleX(0)';
        setTimeout(() => {
            existingOverlay.remove();
        }, 600);
    }
});

// Add click events to arrows
document.querySelector('.arrow.left').addEventListener('click', () => navigateToPage('left'));
document.querySelector('.arrow.right').addEventListener('click', () => navigateToPage('right'));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigateToPage('left');
    if (e.key === 'ArrowRight') navigateToPage('right');
});

// Add page transition class when page loads
document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        pageContainer.classList.add('page-transition');
    }
});

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// Add active class to current page link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === '#home')) {
            link.classList.add('active');
        }
    });
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const expandBtn = document.querySelector('.expand-btn');
    const expandedContent = document.querySelector('.expanded-content');
    
    if (expandBtn && expandedContent) {
        expandBtn.addEventListener('click', () => {
            expandBtn.classList.toggle('active');
            expandedContent.classList.toggle('active');
            
            if (expandBtn.classList.contains('active')) {
                expandBtn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            } else {
                expandBtn.innerHTML = 'Learn More About Me <i class="fas fa-chevron-down"></i>';
            }
            
            // Smooth scroll to expanded content if it's opening
            if (expandedContent.classList.contains('active')) {
                expandedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Add fade-in effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// Add this to your CSS
document.head.insertAdjacentHTML('beforeend', `
    <style>
        body {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
    </style>
`);

// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const logoButton = document.querySelector('.logo');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'true') {
        body.classList.add('portfolio-theme');
    }
    
    // Toggle theme on logo click
    logoButton.addEventListener('click', () => {
        body.classList.toggle('portfolio-theme');
        localStorage.setItem('portfolioTheme', body.classList.contains('portfolio-theme'));
    });
});

// Loader handling
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited) {
        // If user has visited before, remove loader immediately
        loader.style.display = 'none';
    } else {
        // First visit - show loader and set flag
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
            localStorage.setItem('hasVisited', 'true');
        }, 500);
    }
});

// Update the cursor follower code
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        // Add smooth movement with transform instead of left/top
        requestAnimationFrame(() => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            
            // Check if hovering over clickable elements
            const target = e.target;
            if (target.tagName.toLowerCase() === 'a' || 
                target.tagName.toLowerCase() === 'button' ||
                target.classList.contains('project-card') ||
                target.classList.contains('tech-icon') ||
                target.classList.contains('arrow') ||
                target.classList.contains('close-preview')) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
            } else {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
            }
        });
    }
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.opacity = '0';
    }
});

// Show cursor when entering window
document.addEventListener('mouseenter', () => {
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        cursor.style.opacity = '1';
    }
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = window.scrollY / windowHeight;
    scrollProgress.style.transform = `scaleX(${progress})`;
});

// Parallax effect
const parallaxElements = document.querySelectorAll('.profile-section, .about-section, .project-card');
window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const rect = element.getBoundingClientRect();
        const offset = rect.top * speed;
        element.style.setProperty('--parallax-offset', `${offset}px`);
    });
});

// Add class for parallax effect
parallaxElements.forEach(element => {
    element.classList.add('parallax');
});

// Intersection Observer for fade-in effect
const fadeElements = document.querySelectorAll('.project-card, .skill-tags span, .point');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
    fadeObserver.observe(element);
});

// Scroll Down Button
const scrollDownBtn = document.querySelector('.scroll-down-btn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Hide scroll button when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollDownBtn.style.opacity = '0';
            setTimeout(() => {
                scrollDownBtn.style.display = 'none';
            }, 300);
        } else {
            scrollDownBtn.style.display = 'flex';
            setTimeout(() => {
                scrollDownBtn.style.opacity = '0.8';
            }, 10);
        }
    });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav items
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Prevent body scroll when mobile menu is open
function preventScroll(e) {
    if (navLinks.classList.contains('active')) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', preventScroll, { passive: false });

// Add this at the beginning of your script
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader when page is loaded
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Match this with the CSS transition duration
        }, 500); // Adjust this delay if needed
    }
});

// Intersection Observer for animations
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            // animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(element => {
    animationObserver.observe(element);
});

// Add initial animation delay for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 300);
    }
});

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Determine scroll direction
    if (currentScroll <= 0) {
        // At the top
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Project Preview Functionality
document.addEventListener('DOMContentLoaded', () => {
    const previewBtns = document.querySelectorAll('.preview-btn');
    const previewModal = document.querySelector('.preview-modal');
    const previewOverlay = document.querySelector('.preview-overlay');
    const closePreview = document.querySelector('.close-preview');
    const previewFrame = document.querySelector('.preview-modal iframe');

    if (previewBtns && previewModal && previewOverlay && closePreview && previewFrame) {
        previewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectUrl = btn.getAttribute('href');
                previewFrame.src = projectUrl;
                previewModal.classList.add('active');
                previewOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closePreviewModal() {
            previewModal.classList.remove('active');
            previewOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                previewFrame.src = '';
            }, 300);
        }

        closePreview.addEventListener('click', closePreviewModal);
        previewOverlay.addEventListener('click', closePreviewModal);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && previewModal.classList.contains('active')) {
                closePreviewModal();
            }
        });
    }
});
