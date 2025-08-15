# DevCard - Interactive Developer Business Card

A modern, interactive web-based business card that showcases development skills through games, live data, and beautiful animations. Built for GitHub's "For the Love of Code" hackathon.

## Live Demo

**[View Live Demo](https://william-osei.github.io/DevCard-Interactive-Business-Card/)**

## Features

### Core Card Features
- **Interactive Flip Design** - Click to flip between profile and contact sides
- **Live GitHub Data** - Shows real repository count and follower stats  
- **Theme Toggle** - Switch between light and dark modes
- **QR Code Sharing** - Auto-generated QR code for easy sharing
- **Responsive Design** - Works perfectly on all devices

### Interactive Games & Tools
- **Typing Speed Test** - Test your WPM with programming quotes
- **Code Runner** - Write and execute JavaScript code in real-time
- **Memory Game** - Match programming symbols with increasing difficulty
- **AI Chat Assistant** - Ask questions about skills and experience

### Data Visualizations
- **GitHub Activity Charts** - Visual representation of coding patterns
- **Skills Radar Chart** - Interactive display of technology proficiency
- **Coding Statistics** - Animated counters for achievements and metrics
- **API Integrations** - Weather, Spotify, and GitHub activity widgets

### Advanced Features
- **PWA Support** - Install as a mobile app with offline functionality
- **Particle Background** - Interactive particle effects
- **Smooth Animations** - GSAP-powered transitions and effects
- **Keyboard Shortcuts** - Press F (flip), T (theme), S (share)

## Tech Stack

- **HTML5, CSS3, JavaScript** - Core web technologies
- **Chart.js** - Data visualization
- **Particles.js** - Background effects  
- **GSAP** - Advanced animations
- **GitHub API** - Real-time data
- **Service Worker** - PWA functionality

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/William-osei/DevCard-Interactive-Business-Card.git
   cd DevCard-Interactive-Business-Card
   ```

2. Start a local server:
   ```bash
   python -m http.server 8080
   ```

3. Open http://localhost:8080 in your browser

## Customization

To make this your own:

1. **Update personal info** in `index.html`
2. **Change GitHub username** in `script.js`:
   ```javascript
   this.githubUsername = 'your-username';
   ```
3. **Modify colors** in `style.css` custom properties
4. **Update contact links** with your social media

## PWA Installation

This works as a Progressive Web App! Visit the live demo and look for the "Install App" button to add it to your home screen for offline access.

## Project Structure

```
├── index.html      # Main page structure
├── style.css       # All styling and animations
├── script.js       # Interactive functionality  
├── manifest.json   # PWA configuration
├── sw.js          # Service worker for offline support
└── README.md      # This file
```

## Browser Support

Works on all modern browsers (Chrome 70+, Firefox 65+, Safari 12+, Edge 79+)

## License

MIT License - feel free to use this for your own portfolio.

## Contact

- **Email**: trickskidwilliam@gmail.com
- **GitHub**: [@William-osei](https://github.com/William-osei)
- **LinkedIn**: [william-osei](https://linkedin.com/in/william-osei)
- **Student**: Computer Engineering at KNUST, Ghana

---

Built for GitHub's "For the Love of Code" hackathon • MIT Licensed • Made with ❤️ and lots of coffee ☕
