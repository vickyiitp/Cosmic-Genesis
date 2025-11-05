# 🌌 Cosmic Genesis
DEPLOYED LINK - https://cosmic-genesis.vercel.app/
**An Interactive Journey Through the Evolution of the Universe**

Cosmic Genesis is a visually stunning, scroll-based web application that takes users on an immersive journey through the birth and evolution of the cosmos. Built with React, TypeScript, and powered by beautiful animations, it features interactive exploration of stars, galaxies, planets, and constellations.

![Cosmic Genesis Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## ✨ Features

- 🌟 **Interactive Cosmic Exploration**: Four main categories - Stars, Galaxies, Planets, and Constellations
- 🎨 **Stunning Visual Design**: Animated cosmic backgrounds with customizable star density
- 📱 **Responsive Design**: Beautiful experience across all devices
- 🚀 **Smooth Animations**: Parallax scrolling and cosmic particle effects
- 🔍 **Detailed Modals**: Rich information about each celestial body
- 🎯 **Navigation System**: Smooth page transitions and scroll-spy navigation
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS with custom cosmic animations
- **Build Tool**: Vite 6.2.0
- **Fonts**: Google Fonts (Poppins)
- **Optional API**: Google Gemini AI (with fallback data included)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vickyiitp/Cosmic-Genesis.git
   cd Cosmic-Genesis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Begin your cosmic journey! 🌌

## 📁 Project Structure

```
cosmic-genesis/
├── components/              # React components
│   ├── HeroSection.tsx     # Main landing section with black hole animation
│   ├── EvolutionSection.tsx # Cosmic category sections
│   ├── CosmicBackground.tsx # Animated starfield background
│   ├── DetailModal.tsx     # Information modals
│   └── ...
├── services/
│   └── geminiService.ts    # API service with fallback data
├── App.tsx                 # Main application component
├── index.tsx              # Application entry point
├── types.ts               # TypeScript type definitions
└── index.html             # Main HTML file
```

## 🎮 How to Use

1. **Start Your Journey**: Begin at the hero section with the animated black hole
2. **Scroll to Explore**: Navigate through different cosmic evolution stages
3. **Interactive Elements**: Click on celestial bodies to learn more
4. **Navigation**: Use the top navigation or scroll-spy menu
5. **Customize**: Adjust star density using the settings control

## 🌟 Content Categories

### 🔥 Stars
Explore stellar evolution from protostars to supernovae, including neutron stars, black holes, and exotic stellar types.

### 🌌 Galaxies  
Journey through cosmic islands - spirals, ellipticals, and exotic galactic formations across the universe.

### 🪐 Planets
Discover diverse worlds from familiar terrestrial planets to exotic gas giants and rogue wanderers.

### ⭐ Constellations
Uncover ancient myths and legends written in the stars, connecting humanity to the cosmos.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify
1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 🔧 Configuration

### Environment Variables (Optional)
For enhanced content generation, you can configure:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

**Note**: The app includes rich fallback content, so it works perfectly without API configuration.

## 🎨 Customization

### Star Density
Adjust the cosmic background star density using the settings control in the app.

### Colors & Themes
Modify the cosmic color palette in the Tailwind configuration or CSS custom properties.

### Content
Update celestial body information in `services/geminiService.ts` fallback data.

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Cosmic imagery inspiration from NASA and ESA
- Font: Poppins by Google Fonts
- Built with love for space exploration and education

---

**Ready to explore the cosmos?** 🚀 [Start your journey here!](https://your-deployed-url.vercel.app)

*Made with ❤️ for space enthusiasts and curious minds*
