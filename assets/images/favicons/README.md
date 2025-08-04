# Favicons Folder

This folder contains all favicon files for the Grow AI Agency website.

## 📁 Required Favicon Files

### Standard Favicons:
- `favicon.ico` - Multi-size ICO file (16×16, 32×32, 48×48)
- `favicon-16x16.png` - 16×16 PNG favicon
- `favicon-32x32.png` - 32×32 PNG favicon

### Apple Touch Icons:
- `apple-touch-icon.png` - 180×180 for iOS devices
- `apple-touch-icon-152x152.png` - 152×152 for iPad
- `apple-touch-icon-120x120.png` - 120×120 for iPhone

### Android Chrome Icons:
- `android-chrome-192x192.png` - 192×192 for Android
- `android-chrome-512x512.png` - 512×512 for Android

### Web App Manifest:
- `site.webmanifest` - Web app manifest file

## 🔧 Favicon Generation

### Online Tools:
1. **Favicon.io** - https://favicon.io/
   - Upload your logo
   - Generate all required favicon files
   - Download complete package

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - More comprehensive options
   - Detailed configuration
   - HTML code generation

### Generation Steps:
1. Start with a high-resolution logo (at least 512×512)
2. Use your brand green (#5CC49D) as primary color
3. Ensure good contrast with background
4. Test favicon visibility at small sizes
5. Generate all required sizes

## 📋 To Do:
- [ ] Create high-resolution logo for favicon
- [ ] Generate favicon files using online tool
- [ ] Test favicon display across browsers
- [ ] Update HTML with favicon links
- [ ] Verify mobile device compatibility

## 🔗 HTML Implementation

Once favicons are created, add these links to your HTML head:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons/favicon-16x16.png">
<link rel="manifest" href="/assets/images/favicons/site.webmanifest">
``` 