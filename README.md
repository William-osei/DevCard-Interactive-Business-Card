# DevCard - Interactive Developer Business Card 🚀

[![GitHub Pages](https://img.shields.io/badge/Demo-Live%20Site-brightgreen)](https://william-osei.github.io/devcard-interactive-business-card/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/William-osei/DevCard-Interactive-Business-Card)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Transform your boring business card into an interactive web experience that showcases your coding skills!**

An interactive, responsive web-based business card designed for developers. Built for GitHub's "For the Love of Code" hackathon, this project combines modern web technologies with creative design to create a memorable digital presence.

## 🌟 Live Demo

**[👉 Try the Live Demo Here!](https://william-osei.github.io/devcard-interactive-business-card/)**

## 📸 Screenshots

### Light Theme - Front of Card
![DevCard Light Theme Front](./screenshots/devcard-light-front.png)

### Dark Theme - Front of Card
![DevCard Dark Theme Front](./screenshots/devcard-dark-front.png)

### Contact Side - Back of Card
![DevCard Contact Side](./screenshots/devcard-contact-back.png)

### Mobile Responsive Design
![DevCard Mobile](./screenshots/devcard-mobile.png)

## ✨ Features

### 🎨 Interactive Design
- **3D Card Flip Animation**: Smooth card flip transition between profile and contact views
- **Dual Theme Support**: Toggle between light and dark themes with smooth transitions
- **Responsive Design**: Perfectly optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging hover effects, loading animations, and micro-interactions

### 🔗 GitHub Integration
- **Real-time Stats**: Automatically fetches and displays GitHub repositories and followers
- **Dynamic Projects**: Shows recent repositories with language tags and descriptions
- **Live Profile Image**: Pulls profile picture directly from GitHub

### 🎯 Interactive Elements
- **Skill Visualization**: Animated progress bars showing technology proficiency
- **Contact Form**: Functional contact form with form validation
- **QR Code Generator**: Auto-generates QR code for easy sharing
- **Social Links**: Direct links to email, GitHub, and LinkedIn profiles

### 🎮 User Experience
- **Keyboard Navigation**: Press 'F' to flip, 'T' for theme, 'S' to share
- **Share Functionality**: Native web sharing API with clipboard fallback
- **Easter Eggs**: Hidden interactive elements for engaged users
- **Performance Optimized**: Lazy loading, intersection observers, and smooth scrolling

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom properties, Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, and modern APIs
- **Font Awesome**: Beautiful icons and visual elements
- **QR Code.js**: QR code generation functionality
- **GitHub API**: Real-time data integration

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/William-osei/DevCard-Interactive-Business-Card.git
   cd DevCard-Interactive-Business-Card
   ```

2. **Open the project**
   ```bash
   # Option 1: Open directly in browser
   open index.html
   
   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **View in browser**
   Navigate to `http://localhost:8000` (if using local server) or open `index.html` directly

### Customization

#### Update Personal Information
Edit the HTML in `index.html`:

```html
<!-- Update profile information -->
<h1 class="name">Your Name Here</h1>
<p class="title">Your Title Here</p>
<p class="location">Your Location</p>

<!-- Update contact links -->
<a href="mailto:your-email@example.com" class="contact-link email">
<a href="https://github.com/your-username" class="contact-link github">
<a href="https://linkedin.com/in/your-profile" class="contact-link linkedin">
```

#### Update GitHub Integration
Modify the JavaScript in `script.js`:

```javascript
// Change the GitHub username
this.githubUsername = 'your-github-username';
```

#### Customize Skills
Update the skills section in `index.html`:

```html
<div class="skill-item" data-skill="YourSkill">
    <i class="fab fa-your-icon"></i>
    <span>Your Skill</span>
    <div class="skill-progress">
        <div class="skill-bar" style="width: 90%"></div>
    </div>
</div>
```

#### Theme Colors
Customize colors in `style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
    /* ... more color variables */
}
```

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 70+     | ✅ Full Support |
| Firefox | 65+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |

## 🎯 Project Structure

```
DevCard-Interactive-Business-Card/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
├── LICENSE             # MIT License
│
└── screenshots/        # Demo images (create after deployment)
    ├── devcard-light-front.png
    ├── devcard-dark-front.png
    ├── devcard-contact-back.png
    └── devcard-mobile.png
```

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Create a new repository** on GitHub
2. **Upload your files** to the repository
3. **Go to Settings** > Pages
4. **Select source** as "Deploy from a branch"
5. **Choose** `main` branch and `/root` folder
6. **Your site** will be available at `https://yourusername.github.io/repository-name/`

### Alternative Deployment Options

- **Netlify**: Drag and drop the folder to [netlify.com](https://netlify.com)
- **Vercel**: Connect your GitHub repo to [vercel.com](https://vercel.com)
- **Surge**: Use `surge .` command in the project directory

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 💡 Ideas for Enhancement

- [ ] Add more social media platform integrations
- [ ] Include blog posts or articles feed
- [ ] Add music/Spotify integration
- [ ] Create different card themes/templates
- [ ] Add analytics tracking
- [ ] Implement contact form backend
- [ ] Add more interactive animations
- [ ] Create PWA functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**William Osei Aborah**
- 📧 Email: [trickskidwilliam@gmail.com](mailto:trickskidwilliam@gmail.com)
- 🐙 GitHub: [@William-osei](https://github.com/William-osei)
- 💼 LinkedIn: [william-osei](https://linkedin.com/in/william-osei)
- 🎓 Computer Engineering Student at KNUST, Ghana

## 🙏 Acknowledgments

- **GitHub** for hosting the "For the Love of Code" hackathon
- **Font Awesome** for the beautiful icons
- **QR Code.js** for QR code generation
- **CSS Gradient** generators for the beautiful color schemes
- The **developer community** for inspiration and feedback

---

## 🏆 Hackathon Submission

This project was created for **GitHub's "For the Love of Code" hackathon** in the **"World wide wonder"** category. It demonstrates:

- Modern web development skills
- Creative problem-solving
- User-centered design
- Interactive and engaging user experience
- Responsive and accessible design principles

**Built with ❤️ for developers, by developers!**

---

### 🚀 Quick Start Checklist

- [ ] Clone the repository
- [ ] Update personal information in HTML
- [ ] Change GitHub username in JavaScript
- [ ] Customize colors and themes in CSS
- [ ] Test responsiveness across devices
- [ ] Deploy to GitHub Pages or preferred platform
- [ ] Share your awesome DevCard with the world! 🌟

**Happy Coding! 🎉**
