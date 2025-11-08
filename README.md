# BYD ATTO 2 DM-i - Interactive Presentation

Interactive presentation application for BYD ATTO 2 DM-i Europe Sales Training in Barcelona 2025.

## Features

- **Full-screen presentation mode** (1920x1080px optimized)
- **Keyboard navigation** (Arrow keys to navigate between slides)
- **Touch/Click navigation** for interactive displays
- **BYD branding** with official colors and logos
- **Vehicle catalog** with interactive vehicle selection
- **Responsive scaling** for different screen sizes

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Navigation

- **Arrow Right** / **Click/Touch**: Next slide
- **Arrow Left**: Previous slide
- **Click on vehicles**: Navigate to vehicle detail slides

## Project Structure

```
src/
├── App.jsx              # Main app component with slide routing
├── App.css              # App-level styles
├── index.css            # Global styles and BYD branding
├── main.jsx             # Entry point
├── hooks/
│   └── useKeyboardNavigation.js  # Keyboard navigation hook
└── slides/
    ├── Slide1.jsx       # Cover slide
    ├── Slide2.jsx       # Vehicle catalog
    ├── Slide3.jsx       # Vehicle detail example
    └── Slide.css        # Shared slide styles
```

## BYD Branding

The application uses official BYD brand colors:
- **Primary Blue**: `#3B82F6`
- **Light Blue**: `#93C5FD`
- **Sky Blue**: `#BFDBFE`
- **Dark Grey**: `#374151`
- **Charcoal**: `#1F2937`
- **ATTO Green**: `#B8D4A8`

## Technology Stack

- **React 18
- **Vite**: Build tool and dev server
- **Lucide React**: Icon library
- **CSS**: Custom styling with BYD brand guidelines

## Display Mode

The presentation is optimized for:
- **Full-screen displays** (1920x1080px)
- **Touch screens** for interactive kiosks
- **Large format displays** for events

## License

Internal use for BYD Europe Sales Training 2025.

