#!/usr/bin/env node

/**
 * Placeholder Image Generator for SupplySide Website
 * This script generates SVG placeholder images for missing image files
 * Run with: node generate-placeholders.js
 */

const fs = require('fs');
const path = require('path');

// Image specifications
const imageSpecs = {
  hero: { width: 1920, height: 1080, bg: '#1C1F2A', text: 'Hero Image' },
  preview: { width: 800, height: 600, bg: '#7A9D54', text: 'Service Preview' },
  gallery: { width: 1200, height: 800, bg: '#A47551', text: 'Gallery Image' },
  about: { width: 600, height: 400, bg: '#B0C4A3', text: 'About Image' }
};

// Required images structure
const requiredImages = {
  'public/images/hero': [
    { file: 'homepage-hero.webp', type: 'hero', label: 'Homepage Hero' }
  ],
  'public/images/about': [
    { file: 'team-photo.webp', type: 'about', label: 'Team Photo' },
    { file: 'don-working.webp', type: 'about', label: 'Don Working' },
    { file: 'matt-portrait.webp', type: 'about', label: 'Matt Portrait' }
  ],
  'public/images/services': [
    { file: 'vinyl-preview.webp', type: 'preview', label: 'Vinyl Preview' },
    { file: 'laminate-preview.webp', type: 'preview', label: 'Laminate Preview' },
    { file: 'hardwood-preview.webp', type: 'preview', label: 'Hardwood Preview' },
    { file: 'tile-preview.webp', type: 'preview', label: 'Tile Preview' },
    { file: 'carpet-tile-preview.webp', type: 'preview', label: 'Carpet Tile Preview' },
    { file: 'stone-preview.webp', type: 'preview', label: 'Stone Preview' },
    { file: 'shower-preview.webp', type: 'preview', label: 'Shower Preview' },
    { file: 'backsplash-preview.webp', type: 'preview', label: 'Backsplash Preview' }
  ]
};

// Service gallery images
const services = ['vinyl', 'laminate', 'hardwood', 'tile', 'carpet-tile', 'stone', 'shower', 'backsplash'];
services.forEach(service => {
  const serviceDir = `public/images/services/${service}`;
  requiredImages[serviceDir] = [
    { file: `${service}-hero-bg.webp`, type: 'hero', label: `${service} Hero` }
  ];
  for (let i = 1; i <= 6; i++) {
    requiredImages[serviceDir].push({
      file: `${service}-gallery-${i}.webp`,
      type: 'gallery',
      label: `${service} Gallery ${i}`
    });
  }
});

/**
 * Generate SVG placeholder
 */
function generateSVG(spec, label) {
  return `<svg width="${spec.width}" height="${spec.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${spec.bg}"/>
  <rect x="10" y="10" width="${spec.width - 20}" height="${spec.height - 20}" 
        fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="10,10" opacity="0.3"/>
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" 
        fill="#FFFFFF" text-anchor="middle" opacity="0.7">${spec.text}</text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" 
        fill="#FFFFFF" text-anchor="middle" opacity="0.5">${label}</text>
  <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="16" 
        fill="#FFFFFF" text-anchor="middle" opacity="0.3">${spec.width}x${spec.height}</text>
</svg>`;
}

/**
 * Convert SVG to base64 data URL for WebP placeholder
 */
function svgToDataURL(svg) {
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Create a simple WebP-like placeholder (actually creates SVG for compatibility)
 */
function createPlaceholder(filePath, spec, label) {
  const svg = generateSVG(spec, label);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ Created placeholder: ${filePath}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 SupplySide Placeholder Image Generator');
  console.log('=========================================\n');

  let created = 0;
  let existing = 0;
  let errors = 0;

  Object.entries(requiredImages).forEach(([dir, images]) => {
    // Ensure directory exists
    const fullDir = path.join(__dirname, dir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }

    images.forEach(({ file, type, label }) => {
      const filePath = path.join(fullDir, file);
      const svgPath = filePath.replace('.webp', '.svg'); // Create SVG placeholders

      if (fs.existsSync(filePath)) {
        console.log(`✓ Exists: ${dir}/${file}`);
        existing++;
      } else {
        try {
          const spec = imageSpecs[type];
          createPlaceholder(svgPath, spec, label);
          created++;
        } catch (error) {
          console.error(`❌ Error creating ${dir}/${file}: ${error.message}`);
          errors++;
        }
      }
    });
  });

  console.log('\n=========================================');
  console.log(`📊 Summary:`);
  console.log(`   ✅ Created: ${created} placeholders`);
  console.log(`   ✓ Existing: ${existing} files`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors}`);
  }
  console.log('\n💡 Note: SVG placeholders were created with .svg extension');
  console.log('   Convert them to .webp format using an image converter');
  console.log('   or use them directly by updating the references to .svg\n');
}

// Run the script
if (require.main === module) {
  main();
}