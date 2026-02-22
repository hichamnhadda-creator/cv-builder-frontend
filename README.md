# CV Builder Frontend

A modern, multi-language CV/Resume builder built with React + Vite.

## 🚀 Features

- **Multi-language Support**: English, Arabic (RTL), and French
- **Multiple Templates**: Choose from various professional templates
- **Real-time Customization**: Colors, fonts, layouts
- **Export Options**: PDF and Word (Premium)
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Powered by Framer Motion

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository** (if not already done)
```bash
cd "c:\Users\hicham\Desktop\cv builder\cv-builder-frontend"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example env file
copy .env.example .env.local

# Edit .env.local with your configuration
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
cv-builder-frontend/
├── public/
│   └── locales/              # Translation files (en, ar, fr)
├── src/
│   ├── assets/               # Images, fonts, icons
│   ├── components/           # React components
│   │   ├── common/           # Reusable components
│   │   ├── auth/             # Authentication components
│   │   ├── cv-builder/       # CV editor components
│   │   ├── dashboard/        # Dashboard components
│   │   └── pricing/          # Pricing components
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.jsx   # Authentication state
│   │   ├── CVContext.jsx     # CV data management
│   │   └── ThemeContext.jsx  # Theme management
│   ├── hooks/                # Custom React hooks
│   ├── layouts/              # Layout components
│   ├── pages/                # Page components
│   ├── services/             # API services
│   ├── styles/               # Global styles
│   │   ├── globals.css       # Global CSS + Tailwind
│   │   ├── animations.css    # Animation styles
│   │   └── rtl.css           # RTL support for Arabic
│   ├── utils/                # Utility functions
│   │   ├── i18n.js           # i18n configuration
│   │   ├── constants.js      # App constants
│   │   ├── validation.js     # Form validation
│   │   └── cvHelpers.js      # CV helper functions
│   ├── App.jsx               # Main App component
│   └── main.jsx              # Entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🌍 Multi-Language Support

The app supports three languages:
- **English** (en)
- **Arabic** (ar) - with RTL support
- **French** (fr)

Language files are located in `public/locales/`

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette.

### Fonts
Fonts are loaded from Google Fonts. Edit `src/styles/globals.css` to change fonts.

### Templates
CV templates are located in `src/templates/`

## 📦 Key Dependencies

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Framer Motion** - Animations
- **React i18next** - Internationalization
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **jsPDF** - PDF export
- **docx** - Word export

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Next Steps

1. **Install Node.js** if not already installed
2. **Run `npm install`** to install dependencies
3. **Run `npm run dev`** to start the development server
4. **Start building** your CV builder!

## 📝 Development Roadmap

See `project_plan.md` in the brain folder for the complete development roadmap and implementation details.

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Happy Coding! 🎉**
