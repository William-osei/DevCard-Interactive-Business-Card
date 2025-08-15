// DevCard - Interactive Developer Business Card JavaScript

class DevCard {
    constructor() {
        this.isFlipped = false;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.githubUsername = 'William-osei';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
        this.fetchGitHubData();
        this.loadProjects();
        this.generateQRCode();
        this.animateSkillBars();
    }

    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Contact form
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => this.handleContactForm(e));

        // Skill items hover effects
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.animateSkillItem(item));
        });

        // Card hover effects
        const devCard = document.querySelector('.dev-card');
        devCard.addEventListener('mouseenter', () => this.addCardHoverEffect());
        devCard.addEventListener('mouseleave', () => this.removeCardHoverEffect());

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeIcon = document.querySelector('#themeToggle i');
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    async fetchGitHubData() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}`);
            
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            
            const userData = response.json();
            const reposResponse = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`);
            const reposData = await reposResponse.json();
            
            // Update stats
            document.getElementById('githubRepos').textContent = (await userData).public_repos || 'N/A';
            document.getElementById('githubFollowers').textContent = (await userData).followers || 'N/A';
            
            // Store repos data for projects section
            this.userRepos = reposData;
            
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            // Fallback values
            document.getElementById('githubRepos').textContent = '5+';
            document.getElementById('githubFollowers').textContent = '10+';
        }
    }

    loadProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        
        // Default projects if GitHub API fails
        const defaultProjects = [
            {
                name: 'Personal Portfolio',
                description: 'A responsive portfolio website showcasing my skills and projects. Built with HTML, CSS, and JavaScript.',
                html_url: 'https://github.com/William-osei/William-osei',
                language: 'HTML',
                topics: ['portfolio', 'responsive', 'css', 'javascript']
            },
            {
                name: 'DevCard Interactive Business Card',
                description: 'An interactive web-based business card for developers with theme switching and GitHub integration.',
                html_url: '#',
                language: 'JavaScript',
                topics: ['business-card', 'interactive', 'web-development', 'portfolio']
            },
            {
                name: 'Python Learning Projects',
                description: 'Collection of Python exercises and small projects for learning programming fundamentals.',
                html_url: '#',
                language: 'Python',
                topics: ['python', 'learning', 'data-structures', 'algorithms']
            }
        ];

        const projectsToShow = this.userRepos && this.userRepos.length > 0 ? 
            this.userRepos.slice(0, 3) : defaultProjects;

        projectsGrid.innerHTML = projectsToShow.map(project => `
            <div class="project-card" data-aos="fade-up" data-aos-delay="${Math.random() * 300}">
                <h3>${project.name}</h3>
                <p>${project.description || 'A coding project to enhance my development skills.'}</p>
                <div class="project-tags">
                    ${project.language ? `<span class="project-tag">${project.language}</span>` : ''}
                    ${(project.topics || []).slice(0, 3).map(topic => 
                        `<span class="project-tag">${topic}</span>`
                    ).join('')}
                </div>
                <a href="${project.html_url}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i>
                    View Project
                </a>
            </div>
        `).join('');
    }

    generateQRCode() {
        const qrCodeElement = document.getElementById('qrCode');
        const currentURL = window.location.href;
        
        try {
            QRCode.toCanvas(qrCodeElement, currentURL, {
                width: 120,
                height: 120,
                colorDark: getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary-color').trim(),
                colorLight: getComputedStyle(document.documentElement)
                    .getPropertyValue('--card-bg').trim(),
                correctLevel: QRCode.CorrectLevel.M
            }, (error) => {
                if (error) {
                    console.error('QR Code generation failed:', error);
                    qrCodeElement.innerHTML = '<p>QR Code unavailable</p>';
                }
            });
        } catch (error) {
            console.error('QR Code library not loaded:', error);
            qrCodeElement.innerHTML = '<p>QR Code unavailable</p>';
        }
    }

    animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-bar');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.transform = 'scaleX(1)';
                            bar.style.transformOrigin = 'left';
                        }, index * 100);
                    });
                }
            });
        });

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    animateSkillItem(item) {
        const skillName = item.dataset.skill;
        item.style.transform = 'translateY(-5px) scale(1.05)';
        
        setTimeout(() => {
            item.style.transform = '';
        }, 300);

        // Add a subtle color change to the progress bar
        const progressBar = item.querySelector('.skill-bar');
        if (progressBar) {
            progressBar.style.background = 'var(--gradient-secondary)';
            setTimeout(() => {
                progressBar.style.background = progressBar.classList.contains('learning') ? 
                    'var(--gradient-secondary)' : 'var(--gradient-primary)';
            }, 500);
        }
    }

    addCardHoverEffect() {
        const card = document.querySelector('.dev-card');
        card.style.transform = 'scale(1.02)';
    }

    removeCardHoverEffect() {
        const card = document.querySelector('.dev-card');
        if (!this.isFlipped) {
            card.style.transform = '';
        }
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('senderName').value,
            email: document.getElementById('senderEmail').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission
        this.showNotification('Message sent! I\'ll get back to you soon.', 'success');
        
        // Reset form
        e.target.reset();
        
        // In a real implementation, you would send this data to a backend service
        console.log('Contact form submitted:', formData);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: type === 'success' ? 'var(--success-color)' : 'var(--primary-color)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px var(--shadow-color)',
            zIndex: '10000',
            fontWeight: '600',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.opacity = '1', 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    handleKeyboardNavigation(e) {
        // Press 'F' to flip card
        if (e.key.toLowerCase() === 'f') {
            flipCard();
        }
        
        // Press 'T' to toggle theme
        if (e.key.toLowerCase() === 't') {
            this.toggleTheme();
        }
        
        // Press 'S' to share card
        if (e.key.toLowerCase() === 's') {
            shareCard();
        }
    }
}

// Global functions for HTML onclick events
function flipCard() {
    const card = document.querySelector('.dev-card');
    card.classList.toggle('flipped');
    devCardInstance.isFlipped = !devCardInstance.isFlipped;
}

function shareCard() {
    if (navigator.share) {
        navigator.share({
            title: 'William Osei Aborah - DevCard',
            text: 'Check out my interactive developer business card!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            devCardInstance.showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            devCardInstance.showNotification('Unable to copy link. Please copy manually.', 'error');
        });
    }
}

// Add some easter eggs and interactive elements
function addEasterEggs() {
    let clickCount = 0;
    const avatar = document.querySelector('.avatar');
    
    avatar.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount === 5) {
            devCardInstance.showNotification('🎉 You found the easter egg! Keep exploring!', 'success');
            
            // Add rainbow effect to avatar
            avatar.style.background = 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff)';
            avatar.style.backgroundSize = '200% 200%';
            avatar.style.animation = 'rainbow 2s linear infinite, avatarGlow 2s ease-in-out infinite alternate';
            
            setTimeout(() => {
                avatar.style.background = 'var(--gradient-primary)';
                avatar.style.animation = 'avatarGlow 2s ease-in-out infinite alternate';
                clickCount = 0;
            }, 3000);
        }
    });
}

// Add CSS for rainbow animation
function addRainbowAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the DevCard when DOM is loaded
let devCardInstance;

document.addEventListener('DOMContentLoaded', () => {
    devCardInstance = new DevCard();
    addEasterEggs();
    addRainbowAnimation();
    
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Performance optimization: Intersection Observer for animations
const observeElements = () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Call after DOM is loaded
window.addEventListener('load', observeElements);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DevCard, flipCard, shareCard };
}
