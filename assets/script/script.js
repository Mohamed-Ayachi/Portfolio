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
const pages = ['index.html', 'portfolio.html', 'contact.html'];
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

    // Show scroll hint for new visitors
    if (!localStorage.getItem('hasSeenScrollHint')) {
        const scrollHint = document.createElement('div');
        scrollHint.className = 'scroll-hint';
        scrollHint.textContent = 'Scroll to navigate between pages';
        document.body.appendChild(scrollHint);

        setTimeout(() => {
            scrollHint.classList.add('show');
            setTimeout(() => {
                scrollHint.classList.remove('show');
                localStorage.setItem('hasSeenScrollHint', 'true');
            }, 3000);
        }, 2000);
    }
});

// Enhanced page transitions
function navigateToPage(direction) {
    const transitionOverlay = document.querySelector('.page-transition-overlay') || 
                             document.createElement('div');
    transitionOverlay.className = 'page-transition-overlay';
    document.body.appendChild(transitionOverlay);

    // Current page transition out
    document.body.classList.add('page-transition-out');
    
    if (direction === 'right') {
        currentPageIndex = (currentPageIndex + 1) % pages.length;
    } else {
        currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    }

    // Add a visual indication of scroll direction
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = `scroll-direction-indicator ${direction}`;
    document.body.appendChild(scrollIndicator);
    
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

// Add touch swipe functionality
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

// Listen for touch events on the body
document.body.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.body.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal swipes if they're more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Minimum swipe distance (in pixels)
        const minSwipeDistance = 50;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swiped left, go to next page
                navigateToPage('right');
            } else {
                // Swiped right, go to previous page
                navigateToPage('left');
            }
        }
    }
}

// Add visual feedback for touch
document.body.addEventListener('touchstart', () => {
    document.body.style.transition = 'transform 0.2s ease';
});

document.body.addEventListener('touchmove', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    // Only move if the swipe is more horizontal than vertical
    if (Math.abs(diff) > Math.abs(e.changedTouches[0].screenY - touchStartY)) {
        // Prevent default scrolling when swiping horizontally
        e.preventDefault();
        // Add a subtle transform effect while swiping
        if (Math.abs(diff) < window.innerWidth / 2) {
            document.body.style.transform = `translateX(${diff / 4}px)`;
        }
    }
}, { passive: false });

document.body.addEventListener('touchend', () => {
    document.body.style.transition = 'transform 0.3s ease';
    document.body.style.transform = '';
});

// Add visual indicator for swipe
const swipeIndicator = document.createElement('div');
swipeIndicator.className = 'swipe-indicator';
swipeIndicator.innerHTML = `
    <div class="swipe-icon">
        <i class="fas fa-chevron-left"></i>
        <i class="fas fa-mobile-alt"></i>
        <i class="fas fa-chevron-right"></i>
    </div>
    <span>Swipe to navigate</span>
`;
document.body.appendChild(swipeIndicator);

// Show swipe indicator on first visit
if (!localStorage.getItem('hasSeenSwipeIndicator')) {
    setTimeout(() => {
        swipeIndicator.classList.add('show');
        setTimeout(() => {
            swipeIndicator.classList.remove('show');
        }, 3000);
        localStorage.setItem('hasSeenSwipeIndicator', 'true');
    }, 2000);
}

// Update particle creation for more dynamic effects
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particlesContainer);
        
        // Increased number of particles
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // More varied sizes
            const size = 6 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position across full width
            particle.style.left = Math.random() * 100 + '%';
            
            // Start from random positions
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Varied animation duration
            const duration = 8 + Math.random() * 8;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delays for more natural flow
            particle.style.animationDelay = -Math.random() * duration + 's';
            
            // Varied opacity
            particle.style.opacity = 0.4 + Math.random() * 0.3;
            
            particlesContainer.appendChild(particle);
        }
    }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Remove the wheel event listener and add mouse swipe handling
let mouseStartX = 0;
let mouseStartY = 0;
let isDragging = false;

// Mouse events for desktop swipe
document.querySelector('.main-content').addEventListener('mousedown', (e) => {
    // Don't trigger swipe if user is selecting text
    if (window.getSelection().toString()) return;
    
    mouseStartX = e.clientX;
    mouseStartY = e.clientY;
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = mouseStartX - currentX;
    const diffY = mouseStartY - currentY;
    
    // Only handle horizontal swipes if they're more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault(); // Prevent scrolling only during horizontal swipe
        // Add a subtle transform effect while swiping
        if (Math.abs(diffX) < window.innerWidth / 2) {
            document.body.style.transform = `translateX(${-diffX/4}px)`;
        }
    }
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    const diffX = mouseStartX - e.clientX;
    const diffY = mouseStartY - e.clientY;
    
    // Only handle horizontal swipes if they're more horizontal than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Minimum swipe distance (in pixels)
        const minSwipeDistance = 100;
        
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swiped left, go to next page
                navigateToPage('right');
            } else {
                // Swiped right, go to previous page
                navigateToPage('left');
            }
        } else {
            // Reset transform if swipe wasn't far enough
            document.body.style.transform = '';
        }
    }
    
    isDragging = false;
    document.body.style.transform = '';
});

// Prevent default drag behaviors
document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

// Language translations
const translations = {
    en: {
        // Navigation
        home: "Home",
        projects: "Projects",
        contact: "Contact",
        
        // Hero section
        greeting: "Hi, I'm Mohamed",
        roles: ["Software Developer", "Web Developer", "Backend Developer", "Problem Solver"],
        heroDescription: "Software Developer specializing in creating responsive and dynamic web applications. Experienced in both frontend and backend development.",
        contactMe: "Contact Me",
        downloadCV: "Download CV",
        
        // About section
        aboutMe: "About Me",
        whoIAm: "Who I Am",
        aboutDescription: "I'm a 17 year old student from the Netherlands. Currently, I'm studying Software Development at the Grafisch Lyceum Rotterdam. I'm a very passionate person when it comes to programming and I love to learn new things. I'm a very fast learner and I'm always looking for new challenges.",
        
        // Skills
        webDev: "Web Development",
        webDevDesc: "Building responsive and dynamic web applications using modern technologies.",
        backendDev: "Backend Development",
        backendDevDesc: "Creating robust server-side applications and efficient databases.",
        uiDesign: "UI/UX Design",
        uiDesignDesc: "Designing intuitive and engaging user interfaces for better experiences.",
        database: "Database Creation",
        databaseDesc: "Designing and implementing efficient database structures and management systems.",
        scrum: "Scrum and Agile",
        scrumDesc: "Experienced in agile methodologies and scrum practices for efficient project delivery.",
        teamwork: "Team Worker",
        teamworkDesc: "Strong collaboration skills and experience working effectively in diverse teams.",
        
        // Projects section
        featuredProjects: "Featured Projects",
        viewLive: "Live Demo",
        viewSource: "Source",
        viewAll: "View All Projects"
    },
    nl: {
        // Navigation
        home: "Home",
        projects: "Projecten",
        contact: "Contact",
        
        // Hero section
        greeting: "Hoi, ik ben Mohamed",
        roles: ["Software Ontwikkelaar", "Web Ontwikkelaar", "Backend Ontwikkelaar", "Probleemoplosser"],
        heroDescription: "Software ontwikkelaar gespecialiseerd in het maken van responsieve en dynamische webapplicaties. Ervaren in zowel frontend als backend ontwikkeling.",
        contactMe: "Neem Contact Op",
        downloadCV: "Download CV",
        
        // About section
        aboutMe: "Over Mij",
        whoIAm: "Wie Ben Ik",
        aboutDescription: "Ik ben een 17-jarige student uit Nederland. Momenteel studeer ik Software Development aan het Grafisch Lyceum Rotterdam. Ik ben een zeer gepassioneerd persoon als het gaat om programmeren en ik hou ervan om nieuwe dingen te leren. Ik ben een snelle leerling en ben altijd op zoek naar nieuwe uitdagingen.",
        
        // Skills
        webDev: "Web Ontwikkeling",
        webDevDesc: "Bouwen van responsieve en dynamische webapplicaties met moderne technologieën.",
        backendDev: "Backend Ontwikkeling",
        backendDevDesc: "Creëren van robuuste server-side applicaties en efficiënte databases.",
        uiDesign: "UI/UX Design",
        uiDesignDesc: "Ontwerpen van intuïtieve en aantrekkelijke gebruikersinterfaces.",
        database: "Database Creatie",
        databaseDesc: "Ontwerpen en implementeren van efficiënte databasestructuren en managementsystemen.",
        scrum: "Scrum en Agile",
        scrumDesc: "Ervaren in agile methodologieën en scrum practices voor efficiënte projectoplevering.",
        teamwork: "Teamwerker",
        teamworkDesc: "Sterke samenwerkingsvaardigheden en ervaring in het effectief werken in diverse teams.",
        
        // Projects section
        featuredProjects: "Uitgelichte Projecten",
        viewLive: "Live Demo",
        viewSource: "Broncode",
        viewAll: "Bekijk Alle Projecten"
    }
};

// Language switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const languageBtn = document.querySelector('.language-btn');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.querySelector('.current-lang');
    
    // Get user's preferred language or default to English
    const userLang = localStorage.getItem('preferred-language') || 'en';
    setLanguage(userLang);
    
    // Language option click handlers
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = e.currentTarget.dataset.lang;
            setLanguage(lang);
            localStorage.setItem('preferred-language', lang);
        });
    });
    
    function setLanguage(lang) {
        currentLangSpan.textContent = lang.toUpperCase();
        updateContent(lang);
    }
    
    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update typing effect words
        if (window.words) {
            window.words = translations[lang].roles;
            resetTypingEffect();
        }
    }
    
    function resetTypingEffect() {
        if (window.type) {
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            type();
        }
    }
});
