# PillNav Component Usage

## Basic Usage

The PillNav component is a modern, animated navigation bar with pill-shaped menu items. It uses GSAP for smooth animations.

### Using the Bundled Version (Recommended)

1. Include the CSS and JS bundles in your HTML:

```html
<link rel="stylesheet" href="pill-nav-bundle.css">
<script src="pill-nav-bundle.js"></script>
```

The component will automatically initialize and replace your existing `.navbar` element.

### Using in React/JSX

```jsx
import PillNav from './components/PillNav/PillNav';
import logo from 'assets/images/logos/white and green.png';

<PillNav
  theme="color"
  initialLoadAnimation
  className="custom-nav"
  logo={logo}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Process', href: 'process' },
    { label: 'AI Software', href: 'software' },
    { label: 'Resources', href: 'resources' },
    { label: 'Case Studies', href: 'case-studies' },
    { label: 'About Us', href: 'about' },
    { label: 'Team', href: 'team' },
  ]}
  ctaButton={{
    label: 'Get in touch',
    href: 'https://go.growaiagency.io/w-app?utm_source=Website&utm_medium=web&utm_content=index&EL=Website-Homepage'
  }}
/>
```

## Props

- `theme` (string, default: 'default'): Theme variant. Options: 'default', 'color'
- `initialLoadAnimation` (boolean, default: false): Enable GSAP animation on initial load
- `className` (string): Additional CSS classes
- `logo` (string): Path to logo image
- `items` (array): Array of navigation items with `label` and `href` properties
- `ctaButton` (object): Call-to-action button with `label` and `href` properties

## Building

To rebuild the bundle after making changes:

```bash
npm run build:pillnav
```

## Features

- ✅ GSAP-powered animations
- ✅ Active state detection based on current URL
- ✅ Responsive design (mobile-friendly)
- ✅ Smooth hover effects
- ✅ Pill-shaped navigation items
- ✅ Customizable themes
- ✅ Logo support
- ✅ CTA button support

