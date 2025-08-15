// DevCard - Interactive Developer Business Card JavaScript
// Advanced Version with Games, Analytics, AI Chat, and More!


class TypingTest {
    constructor() {
        this.texts = [
            "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet.",
            "Programming is the art of telling another human being what one wants the computer to do. - Donald Knuth",
            "Code is like humor. When you have to explain it, it's bad. - Cory House",
            "First, solve the problem. Then, write the code. - John Johnson",
            "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
            "JavaScript is the world's most misunderstood programming language. - Douglas Crockford",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
        ];
        this.currentText = '';
        this.startTime = 0;
        this.isActive = false;
        this.errors = 0;
        this.currentIndex = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.timeLeft = 60;
        this.timer = null;
        this.inputListener = null;
        this.setupGame();
    }

    setupGame() {
        const startButton = document.getElementById('startTyping');
        if (startButton) {
            startButton.addEventListener('click', () => {
                if (this.isActive) {
                    this.reset();
                } else {
                    this.start();
                }
            });
        }
    }

    start() {
        // Clear any existing timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Remove existing input listener
        const input = document.getElementById('typingInput');
        if (this.inputListener && input) {
            input.removeEventListener('input', this.inputListener);
        }
        
        this.currentText = this.texts[Math.floor(Math.random() * this.texts.length)];
        const typingTextEl = document.getElementById('typingText');
        const typingInputEl = document.getElementById('typingInput');
        const startButtonEl = document.getElementById('startTyping');
        
        if (!typingTextEl || !typingInputEl || !startButtonEl) {
            console.error('Typing test elements not found');
            return;
        }
        
        typingTextEl.textContent = this.currentText;
        typingInputEl.disabled = false;
        typingInputEl.value = '';
        typingInputEl.focus();
        startButtonEl.textContent = 'Reset';
        
        this.startTime = Date.now();
        this.isActive = true;
        this.errors = 0;
        this.currentIndex = 0;
        this.timeLeft = 60;
        
        // Update timer display
        const timerEl = document.getElementById('timer');
        if (timerEl) timerEl.textContent = this.timeLeft;
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (timerEl) timerEl.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.end();
            }
        }, 1000);
        
        // Add new input listener
        this.inputListener = this.handleInput.bind(this);
        typingInputEl.addEventListener('input', this.inputListener);
    }

    reset() {
        this.end();
        setTimeout(() => this.start(), 100);
    }

    handleInput(e) {
        if (!this.isActive) return;
        
        const typed = e.target.value;
        const expected = this.currentText.substring(0, typed.length);
        
        // Calculate errors
        this.errors = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] !== this.currentText[i]) {
                this.errors++;
            }
        }
        
        // Calculate WPM
        const timeElapsed = (Date.now() - this.startTime) / 60000;
        const wordsTyped = typed.length / 5;
        this.wpm = Math.round(wordsTyped / timeElapsed) || 0;
        
        // Calculate accuracy
        this.accuracy = typed.length > 0 ? Math.round(((typed.length - this.errors) / typed.length) * 100) : 100;
        
        // Update display
        document.getElementById('wpm').textContent = this.wpm;
        document.getElementById('accuracy').textContent = this.accuracy + '%';
        
        // Check if completed
        if (typed === this.currentText) {
            this.end();
        }
    }

    end() {
        this.isActive = false;
        clearInterval(this.timer);
        document.getElementById('typingInput').disabled = true;
        document.getElementById('startTyping').textContent = 'Start Test';
        
        // Show results
        const message = `Test completed! WPM: ${this.wpm}, Accuracy: ${this.accuracy}%`;
        devCardInstance.showNotification(message, 'success');
    }
}

class CodeRunner {
    constructor() {
        this.setupCodeRunner();
    }

    setupCodeRunner() {
        document.getElementById('runCode').addEventListener('click', this.runCode.bind(this));
        document.getElementById('clearCode').addEventListener('click', this.clearCode.bind(this));
    }

    runCode() {
        const code = document.getElementById('codeInput').value;
        const output = document.getElementById('codeOutput');
        
        // Clear previous output
        output.textContent = '';
        
        // Capture console.log output
        const originalLog = console.log;
        const logs = [];
        
        console.log = (...args) => {
            logs.push(args.join(' '));
        };
        
        try {
            // Create a safer eval environment
            const result = Function(code)();
            if (result !== undefined) {
                logs.push(`Return value: ${result}`);
            }
            if (logs.length === 0) {
                logs.push('Code executed successfully (no output)');
            }
        } catch (error) {
            logs.push(`Error: ${error.message}`);
        } finally {
            // Restore original console.log
            console.log = originalLog;
        }
        
        output.textContent = logs.join('\n');
        
        // Add syntax highlighting effect
        output.style.color = logs.some(log => log.startsWith('Error:')) ? '#ff6b6b' : '#00ff00';
    }

    clearCode() {
        document.getElementById('codeInput').value = '';
        document.getElementById('codeOutput').textContent = 'Click "Run Code" to see output...';
    }
}

class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedCards = [];
        this.level = 1;
        this.score = 0;
        this.lives = 3;
        this.symbols = ['🚀', '💻', '⚡', '🔥', '🎯', '🌟', '💡', '🎨', '🔧', '📱', '🎮', '🏆'];
        this.setupGame();
    }

    setupGame() {
        document.getElementById('startMemory').addEventListener('click', this.startGame.bind(this));
    }

    startGame() {
        this.resetGame();
        this.createCards();
        this.renderCards();
    }

    resetGame() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedCards = [];
        this.score = 0;
        this.lives = 3;
        this.updateStats();
    }

    createCards() {
        const pairsCount = Math.min(4 + this.level, 8);
        const selectedSymbols = this.symbols.slice(0, pairsCount);
        
        // Create pairs
        this.cards = [...selectedSymbols, ...selectedSymbols]
            .map((symbol, index) => ({ id: index, symbol, flipped: false, matched: false }))
            .sort(() => Math.random() - 0.5);
    }

    renderCards() {
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = '';
        
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.cardId = index;
            cardElement.textContent = card.flipped || card.matched ? card.symbol : '?';
            cardElement.addEventListener('click', () => this.flipCard(index));
            
            if (card.matched) {
                cardElement.classList.add('matched');
            } else if (card.flipped) {
                cardElement.classList.add('flipped');
            }
            
            grid.appendChild(cardElement);
        });
    }

    flipCard(cardIndex) {
        const card = this.cards[cardIndex];
        
        if (card.flipped || card.matched || this.flippedCards.length >= 2) {
            return;
        }
        
        card.flipped = true;
        this.flippedCards.push(cardIndex);
        this.renderCards();
        
        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    checkMatch() {
        const [first, second] = this.flippedCards;
        const firstCard = this.cards[first];
        const secondCard = this.cards[second];
        
        if (firstCard.symbol === secondCard.symbol) {
            firstCard.matched = true;
            secondCard.matched = true;
            this.matchedCards.push(first, second);
            this.score += 10;
            
            if (this.matchedCards.length === this.cards.length) {
                this.levelUp();
            }
        } else {
            firstCard.flipped = false;
            secondCard.flipped = false;
            this.lives--;
            
            if (this.lives <= 0) {
                this.gameOver();
            }
        }
        
        this.flippedCards = [];
        this.updateStats();
        this.renderCards();
    }

    levelUp() {
        this.level++;
        this.lives = Math.min(this.lives + 1, 5);
        devCardInstance.showNotification(`Level ${this.level}! Great job! 🎉`, 'success');
        setTimeout(() => this.startGame(), 2000);
    }

    gameOver() {
        devCardInstance.showNotification(`Game Over! Final Score: ${this.score}`, 'error');
        document.getElementById('startMemory').textContent = 'Start Game';
    }

    updateStats() {
        document.getElementById('memoryLevel').textContent = this.level;
        document.getElementById('memoryScore').textContent = this.score;
        document.getElementById('memoryLives').textContent = this.lives;
    }
}

class AIChat {
    constructor() {
        this.isOpen = false;
        this.responses = {
            'skills': "William is proficient in HTML, CSS, JavaScript, Python, and Git. He's currently learning React and always exploring new technologies!",
            'projects': "William has worked on personal portfolios, this DevCard project, the Smart Calculator Pro with advanced scientific functions, Snake Game, IoT Weather Station, and various other projects. Check out his GitHub!",
            'calculator': "William built Smart Calculator Pro - an advanced scientific calculator with memory operations, keyboard support, and responsive design. You can find it at https://github.com/William-osei/smart-calculator-pro!",
            'education': "William is a Computer Engineering student at KNUST (Kwame Nkrumah University of Science and Technology) in Ghana, started in 2023.",
            'contact': "You can reach William at trickskidwilliam@gmail.com or connect on LinkedIn and GitHub. He's always open to collaboration!",
            'experience': "William is building his experience through personal projects, coursework, and continuous learning. He's passionate about web development and software engineering.",
            'hobbies': "Besides coding, William enjoys exploring new technologies, working on creative projects, and connecting with fellow developers.",
            'goals': "William aims to become a skilled full-stack developer and contribute to meaningful projects that make a difference.",
            'default': "I'm here to help you learn about William! Ask me about his skills, projects, education, or anything else you'd like to know! 🚀"
        };
        this.setupChat();
    }

    setupChat() {
        document.getElementById('chatToggle').addEventListener('click', this.toggleChat.bind(this));
        document.getElementById('chatClose').addEventListener('click', this.closeChat.bind(this));
        document.getElementById('sendMessage').addEventListener('click', this.sendMessage.bind(this));
        document.getElementById('chatInputField').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.toggle('active', this.isOpen);
    }

    closeChat() {
        this.isOpen = false;
        document.getElementById('chatWindow').classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('chatInputField');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'ai');
        }, 1000);
    }

    addMessage(text, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const icon = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        messageDiv.innerHTML = `${icon}<p>${text}</p>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(this.responses)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Check for greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 I'm William's AI assistant. How can I help you learn more about him today?";
        }
        
        // Check for thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Feel free to ask me anything else about William! 😊";
        }
        
        return this.responses.default;
    }
}

class APIs {
    constructor() {
        this.spotify = null;
        this.weather = null;
        this.githubContributions = null;
        this.setupAPIs();
    }

    async setupAPIs() {
        await this.loadWeatherData();
        await this.loadGitHubContributions();
        this.setupSpotifyWidget();
    }

    async loadWeatherData() {
        try {
            // Using a free weather API (OpenWeatherMap requires API key in production)
            // For demo purposes, we'll use mock data
            const mockWeatherData = {
                location: 'Kumasi, Ghana',
                temperature: 28,
                condition: 'Partly Cloudy',
                humidity: 65,
                icon: '⛅'
            };
            
            this.weather = mockWeatherData;
            this.displayWeather();
        } catch (error) {
            console.error('Weather API error:', error);
            this.displayWeatherError();
        }
    }

    displayWeather() {
        const weatherWidget = document.getElementById('weatherWidget');
        if (weatherWidget && this.weather) {
            weatherWidget.innerHTML = `
                <div class="weather-info">
                    <span class="weather-icon">${this.weather.icon}</span>
                    <div class="weather-details">
                        <div class="weather-temp">${this.weather.temperature}°C</div>
                        <div class="weather-location">${this.weather.location}</div>
                        <div class="weather-condition">${this.weather.condition}</div>
                    </div>
                </div>
            `;
        }
    }

    displayWeatherError() {
        const weatherWidget = document.getElementById('weatherWidget');
        if (weatherWidget) {
            weatherWidget.innerHTML = `
                <div class="weather-error">
                    <i class="fas fa-cloud-rain"></i>
                    <span>Weather unavailable</span>
                </div>
            `;
        }
    }

    async loadGitHubContributions() {
        try {
            // Mock GitHub contributions data (in production, use GitHub GraphQL API)
            const mockContributions = {
                totalContributions: 247,
                weeks: this.generateMockContributions()
            };
            
            this.githubContributions = mockContributions;
            this.displayGitHubHeatmap();
        } catch (error) {
            console.error('GitHub contributions error:', error);
        }
    }

    generateMockContributions() {
        const weeks = [];
        for (let week = 0; week < 52; week++) {
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                weekData.push({
                    count: Math.floor(Math.random() * 5),
                    date: new Date(2024, 0, week * 7 + day).toISOString().split('T')[0]
                });
            }
            weeks.push(weekData);
        }
        return weeks;
    }

    displayGitHubHeatmap() {
        const heatmapContainer = document.getElementById('githubHeatmap');
        if (!heatmapContainer || !this.githubContributions) return;

        let heatmapHTML = '<div class="heatmap-title">GitHub Contributions</div>';
        heatmapHTML += '<div class="heatmap-grid">';
        
        this.githubContributions.weeks.forEach(week => {
            week.forEach(day => {
                const intensity = day.count === 0 ? 0 : Math.min(4, day.count);
                heatmapHTML += `<div class="heatmap-day" data-count="${day.count}" data-level="${intensity}" title="${day.count} contributions on ${day.date}"></div>`;
            });
        });
        
        heatmapHTML += '</div>';
        heatmapHTML += `<div class="heatmap-summary">Total: ${this.githubContributions.totalContributions} contributions this year</div>`;
        
        heatmapContainer.innerHTML = heatmapHTML;
    }

    setupSpotifyWidget() {
        // Mock Spotify currently playing data
        const mockSpotifyData = {
            isPlaying: true,
            track: 'Coding in the Dark',
            artist: 'Dev Beats',
            album: 'Programming Playlist',
            progress: 45,
            duration: 180
        };
        
        this.displaySpotifyWidget(mockSpotifyData);
    }

    displaySpotifyWidget(data) {
        const spotifyWidget = document.getElementById('spotifyWidget');
        if (!spotifyWidget) return;

        if (data.isPlaying) {
            spotifyWidget.innerHTML = `
                <div class="spotify-playing">
                    <i class="fab fa-spotify"></i>
                    <div class="spotify-info">
                        <div class="spotify-track">${data.track}</div>
                        <div class="spotify-artist">by ${data.artist}</div>
                        <div class="spotify-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(data.progress / data.duration) * 100}%"></div>
                            </div>
                            <span class="time">${this.formatTime(data.progress)} / ${this.formatTime(data.duration)}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            spotifyWidget.innerHTML = `
                <div class="spotify-idle">
                    <i class="fab fa-spotify"></i>
                    <span>Not currently playing</span>
                </div>
            `;
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

class Analytics {
    constructor() {
        this.charts = {};
        this.setupAnalytics();
    }

    setupAnalytics() {
        this.generateMockData();
        this.createCharts();
    }

    generateMockData() {
        // Simulate some coding stats
        document.getElementById('linesOfCode').textContent = '12,450+';
        document.getElementById('codingTime').textContent = '247h';
        document.getElementById('streakDays').textContent = '28';
        document.getElementById('achievements').textContent = '15';
        
        // Animate the numbers
        this.animateNumbers();
    }

    animateNumbers() {
        const elements = ['linesOfCode', 'codingTime', 'streakDays', 'achievements'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            element.style.animation = 'pulse 2s ease-in-out infinite alternate';
        });
    }

    createCharts() {
        this.createActivityChart();
        this.createSkillsChart();
        this.createLanguagesChart();
    }

    createActivityChart() {
        const ctx = document.getElementById('activityChart').getContext('2d');
        this.charts.activity = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Commits',
                    data: [12, 19, 3, 5, 2, 3, 7],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    createSkillsChart() {
        const ctx = document.getElementById('skillsChart').getContext('2d');
        this.charts.skills = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['HTML', 'CSS', 'JavaScript', 'Python', 'Git', 'React'],
                datasets: [{
                    label: 'Skill Level',
                    data: [85, 80, 70, 75, 65, 30],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    createLanguagesChart() {
        const ctx = document.getElementById('languagesChart').getContext('2d');
        this.charts.languages = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['JavaScript', 'HTML', 'CSS', 'Python'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#f39c12', '#e74c3c', '#3498db', '#27ae60']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

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

    async loadProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;
        
        // Show loading state
        projectsGrid.innerHTML = `
            <div class="projects-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading projects...</p>
            </div>
        `;
        
        // Enhanced default projects with actual repositories
        const defaultProjects = [
            {
                name: 'DevCard - Interactive Business Card',
                description: 'A cutting-edge interactive web-based business card featuring games, AI chat, analytics dashboard, and PWA support. Built with vanilla JavaScript, HTML5, and CSS3.',
                html_url: 'https://github.com/William-osei/DevCard-Interactive-Business-Card',
                homepage: 'https://william-osei.github.io/DevCard-Interactive-Business-Card/',
                language: 'JavaScript',
                topics: ['business-card', 'interactive', 'pwa', 'web-development', 'games'],
                stargazers_count: 0,
                updated_at: new Date().toISOString()
            },
            {
                name: 'Smart Calculator Pro',
                description: 'Advanced scientific calculator with memory operations, keyboard support, and responsive design built with vanilla JavaScript.',
                html_url: 'https://github.com/William-osei/smart-calculator-pro',
                homepage: 'https://william-osei.github.io/smart-calculator-pro/',
                language: 'JavaScript',
                topics: ['calculator', 'scientific-calculator', 'javascript', 'responsive-design', 'keyboard-support'],
                stargazers_count: 0,
                updated_at: '2025-06-12T21:59:13Z'
            },
            {
                name: 'Snake Game',
                description: 'Classic Snake game with Python GUI and HTML5/JavaScript versions. Features progressive difficulty, score tracking, and collision detection algorithms.',
                html_url: 'https://github.com/William-osei/snake-game',
                homepage: 'https://william-osei.github.io/snake-game/',
                language: 'HTML',
                topics: ['game', 'snake-game', 'python', 'javascript', 'html5'],
                stargazers_count: 0,
                updated_at: '2025-06-12T21:58:02Z'
            },
            {
                name: 'Data Analysis Dashboard',
                description: 'Interactive web-based data analysis dashboard with real-time visualizations built for comprehensive data insights.',
                html_url: 'https://github.com/William-osei/data-analysis-dashboard',
                homepage: 'https://william-osei.github.io/data-analysis-dashboard/',
                language: 'JavaScript',
                topics: ['data-analysis', 'dashboard', 'visualizations', 'charts', 'web-app'],
                stargazers_count: 0,
                updated_at: '2025-06-12T21:38:27Z'
            },
            {
                name: 'IoT Weather Station',
                description: 'Real-time IoT Weather Station Dashboard with interactive monitoring and alerts for comprehensive weather tracking.',
                html_url: 'https://github.com/William-osei/iot-weather-station',
                homepage: 'https://william-osei.github.io/iot-weather-station/',
                language: 'JavaScript',
                topics: ['iot', 'weather-station', 'dashboard', 'real-time', 'monitoring'],
                stargazers_count: 0,
                updated_at: '2025-06-12T21:46:29Z'
            },
            {
                name: 'Portfolio Website',
                description: 'Professional portfolio website showcasing my development journey, projects, and skills as a Computer Engineering student.',
                html_url: 'https://github.com/William-osei/portfolio',
                homepage: 'https://william-osei.github.io/portfolio/',
                language: 'HTML',
                topics: ['portfolio', 'responsive', 'css3', 'javascript', 'web-design'],
                stargazers_count: 0,
                updated_at: '2025-06-12T11:38:06Z'
            }
        ];

        try {
            // Try to use GitHub repos if available
            let projectsToShow = defaultProjects;
            
            if (this.userRepos && this.userRepos.length > 0) {
                // Enhance GitHub repos with fallback data
                projectsToShow = this.userRepos.slice(0, 4).map((repo, index) => ({
                    name: repo.name,
                    description: repo.description || defaultProjects[index]?.description || 'A coding project to enhance my development skills.',
                    html_url: repo.html_url,
                    language: repo.language,
                    topics: repo.topics || [],
                    stargazers_count: repo.stargazers_count || 0,
                    updated_at: repo.updated_at
                }));
            }

            // Render projects with enhanced styling
            projectsGrid.innerHTML = projectsToShow.map((project, index) => {
                const lastUpdate = new Date(project.updated_at).toLocaleDateString();
                const isRecent = new Date(project.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                
                return `
                    <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                        <div class="project-header">
                            <h3>${project.name}</h3>
                            ${isRecent ? '<span class="recent-badge">🔥 Recent</span>' : ''}
                        </div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-meta">
                            <div class="project-tags">
                                ${project.language ? `<span class="project-tag language-tag">${project.language}</span>` : ''}
                                ${(project.topics || []).slice(0, 3).map(topic => 
                                    `<span class="project-tag topic-tag">${topic}</span>`
                                ).join('')}
                            </div>
                            <div class="project-stats">
                                ${project.stargazers_count !== undefined ? `<span class="stars">⭐ ${project.stargazers_count}</span>` : ''}
                                <span class="updated">📅 ${lastUpdate}</span>
                            </div>
                        </div>
                        <div class="project-actions">
                            <a href="${project.html_url}" target="_blank" class="project-link primary">
                                <i class="fab fa-github"></i>
                                View Code
                            </a>
                            ${project.homepage ? `
                                <a href="${project.homepage}" target="_blank" class="project-link secondary">
                                    <i class="fas fa-external-link-alt"></i>
                                    Live Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('');
            
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback to default projects on error
            projectsGrid.innerHTML = defaultProjects.slice(0, 3).map((project, index) => `
                <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
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
    const cardContainer = document.querySelector('.card-container');
    
    // Add flip animation effect
    card.classList.toggle('flipped');
    devCardInstance.isFlipped = !devCardInstance.isFlipped;
    
    // Add visual feedback
    cardContainer.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cardContainer.style.transform = '';
    }, 150);
    
    // Update button text based on card state
    const contactBtn = card.querySelector('.btn.primary');
    const backBtn = card.querySelector('.back-button');
    
    if (devCardInstance.isFlipped) {
        // Card is now showing back (contact side)
        if (contactBtn) contactBtn.textContent = 'Back to Profile';
        // Show notification
        if (devCardInstance) {
            devCardInstance.showNotification('💼 Contact information displayed!', 'info');
        }
        // Focus on the first input field
        setTimeout(() => {
            const firstInput = document.getElementById('senderName');
            if (firstInput) firstInput.focus();
        }, 300);
    } else {
        // Card is now showing front (profile side)
        if (contactBtn) {
            contactBtn.innerHTML = '<i class="fas fa-envelope"></i> Contact Me';
        }
        if (devCardInstance) {
            devCardInstance.showNotification('👨‍💻 Profile view restored!', 'info');
        }
    }
    
// Play flip sound effect (if available)
    playFlipSound();
}

// Sound effect function
function playFlipSound() {
    // Create a subtle flip sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create a short "whoosh" sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.15);
        
        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
        // Silently fail if Web Audio API is not supported
        console.log('Web Audio API not supported');
    }
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

// Initialize particles and 3D background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#3498db'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3498db',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize 3D background animation
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simple animated gradient background
    let time = 0;
    
    function animate() {
        time += 0.01;
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const color1 = `hsl(${200 + Math.sin(time) * 30}, 70%, 50%)`;
        const color2 = `hsl(${280 + Math.cos(time) * 30}, 70%, 30%)`;
        
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize typing test game
function initTypingTest() {
    const startButton = document.getElementById('startTyping');
    if (startButton) {
        startButton.addEventListener('click', () => {
            if (devCardInstance.typingTest) {
                devCardInstance.typingTest.start();
            }
        });
    }
}

// Loading screen management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000); // Reduced to 1 second for faster loading
    }
}

// PWA Installation
class PWAInstaller {
    constructor() {
        this.deferredPrompt = null;
        this.setupPWA();
    }

    setupPWA() {
        // Register Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('🔥 Service Worker registered:', registration.scope);
                    this.showInstallPrompt();
                })
                .catch((error) => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }

        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallButton();
        });

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            console.log('🎉 DevCard installed successfully!');
            this.hideInstallButton();
            devCardInstance.showNotification('DevCard installed! 🎉', 'success');
        });
    }

    showInstallButton() {
        // Create install button
        const installButton = document.createElement('button');
        installButton.id = 'installPWA';
        installButton.className = 'btn secondary install-btn';
        installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
        installButton.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            box-shadow: 0 2px 10px var(--shadow-color);
            transition: all 0.3s ease;
        `;

        installButton.addEventListener('click', () => this.installPWA());
        document.body.appendChild(installButton);

        // Add hover effect
        installButton.addEventListener('mouseenter', () => {
            installButton.style.transform = 'scale(1.05)';
        });
        installButton.addEventListener('mouseleave', () => {
            installButton.style.transform = 'scale(1)';
        });
    }

    hideInstallButton() {
        const installButton = document.getElementById('installPWA');
        if (installButton) {
            installButton.remove();
        }
    }

    async installPWA() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('✅ User accepted PWA install');
            } else {
                console.log('❌ User dismissed PWA install');
            }
            
            this.deferredPrompt = null;
            this.hideInstallButton();
        }
    }

    showInstallPrompt() {
        // Show notification about PWA capabilities
        setTimeout(() => {
            devCardInstance?.showNotification('💡 This app can be installed for offline use!', 'info');
        }, 5000);
    }
}

// Initialize the DevCard when DOM is loaded
let devCardInstance;
let typingTest, codeRunner, memoryGame, aiChat, analytics, pwaInstaller, apis;

// Ensure loading screen is hidden after maximum 3 seconds regardless of initialization status
setTimeout(() => {
    hideLoadingScreen();
}, 3000);

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main DevCard
        devCardInstance = new DevCard();
        
        // Initialize games and features after a short delay to ensure DOM is ready
        setTimeout(() => {
            try {
                typingTest = new TypingTest();
                codeRunner = new CodeRunner();
                memoryGame = new MemoryGame();
                aiChat = new AIChat();
                analytics = new Analytics();
                apis = new APIs();
                pwaInstaller = new PWAInstaller();
                
                console.log('✅ All features initialized successfully');
            } catch (error) {
                console.error('❌ Error initializing features:', error);
                // Still show the card even if some features fail
                hideLoadingScreen();
            }
        }, 100);
    } catch (error) {
        console.error('❌ Error initializing DevCard:', error);
        // Hide loading screen even if initialization fails
        hideLoadingScreen();
    }
    
    // Initialize background effects
    initParticles();
    init3DBackground();
    hideLoadingScreen();
    
    // Add easter eggs and animations
    addEasterEggs();
    addRainbowAnimation();
    
    // Add smooth scrolling to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GSAP animations for enhanced visual effects
    if (typeof gsap !== 'undefined') {
        gsap.from('.dev-card', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)',
            delay: 2.2
        });
        
        gsap.from('.analytics-dashboard', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            delay: 2.5,
            scrollTrigger: {
                trigger: '.analytics-dashboard',
                start: 'top 80%'
            }
        });
        
        gsap.from('.games-section', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            delay: 2.7,
            scrollTrigger: {
                trigger: '.games-section',
                start: 'top 80%'
            }
        });
    }
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 2500);
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
