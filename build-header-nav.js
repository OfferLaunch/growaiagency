#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');

async function buildCSS() {
  const inputCss = fs.readFileSync('./header-nav-input.css', 'utf-8');

  const result = await postcss([
    tailwindcss({
      content: [
        './components/ui/**/*.{js,ts,jsx,tsx}',
        './index.html',
        './**/*.html'
      ]
    })
  ]).process(inputCss, { from: './header-nav-input.css' });

  fs.writeFileSync('./pill-nav-bundle.css', result.css);
  console.log('✅ CSS built');
}

buildCSS().catch(err => {
  console.error('❌ CSS build failed:', err);
  process.exit(1);
});
