#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for image optimization
const config = {
  quality: 85, // WebP quality (80-90 is usually optimal)
  maxWidth: 1920, // Maximum width for hero images
  maxHeight: 1080, // Maximum height for hero images
  targetSizeKB: 100, // Target size in KB
};

// Service directories to process
const serviceDirectories = [
  'vinyl',
  'laminate',
  'hardwood',
  'tile',
  'carpet-tile',
  'stone',
  'shower',
  'backsplash'
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate resize dimensions maintaining aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > config.maxWidth) {
      height = Math.round((config.maxWidth / width) * height);
      width = config.maxWidth;
    }
    
    if (height > config.maxHeight) {
      width = Math.round((config.maxHeight / height) * width);
      height = config.maxHeight;
    }
    
    // Convert to WebP with optimization
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: config.quality,
        effort: 6 // Higher effort = better compression
      })
      .toFile(outputPath);
    
    // Check file size and re-optimize if needed
    const stats = fs.statSync(outputPath);
    const sizeKB = stats.size / 1024;
    
    if (sizeKB > config.targetSizeKB) {
      // Reduce quality if file is too large
      const newQuality = Math.max(70, Math.floor(config.quality * (config.targetSizeKB / sizeKB)));
      
      await sharp(inputPath)
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: newQuality,
          effort: 6
        })
        .toFile(outputPath);
    }
    
    const finalStats = fs.statSync(outputPath);
    const finalSizeKB = Math.round(finalStats.size / 1024);
    
    console.log(`✅ Optimized: ${path.basename(inputPath)} → ${path.basename(outputPath)} (${finalSizeKB}KB)`);
    
    return { success: true, size: finalSizeKB };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function processServiceImages() {
  console.log('🚀 Starting image optimization...\n');
  
  const results = [];
  
  for (const service of serviceDirectories) {
    const serviceDir = path.join(__dirname, 'public', 'images', 'services', service);
    const heroImagePath = path.join(serviceDir, `${service}-hero-bg.jpg`);
    const outputPath = path.join(serviceDir, `${service}-hero-bg.webp`);
    
    if (fs.existsSync(heroImagePath)) {
      console.log(`Processing ${service} hero image...`);
      const result = await optimizeImage(heroImagePath, outputPath);
      results.push({ service, ...result });
    } else {
      console.log(`⚠️  No hero image found for ${service}`);
    }
  }
  
  // Summary
  console.log('\n📊 Optimization Summary:');
  console.log('========================');
  
  const successful = results.filter(r => r.success);
  const totalOriginalSize = results.reduce((sum, r) => sum + (r.originalSize || 0), 0);
  const totalOptimizedSize = successful.reduce((sum, r) => sum + r.size, 0);
  
  console.log(`✅ Successfully optimized: ${successful.length}/${results.length} images`);
  console.log(`📦 Total size: ${totalOptimizedSize}KB (average: ${Math.round(totalOptimizedSize / successful.length)}KB per image)`);
  
  if (successful.length === results.length) {
    console.log('\n🎉 All images optimized successfully!');
  }
}

// Run the optimization
processServiceImages().catch(console.error);