#!/bin/bash
# SupplySide Flooring - Image Download Script
# This script downloads all required images from Pexels

# Create wget commands for all images
# Run this script from the public/images directory

echo "Starting image downloads..."

# Hero Images
echo "Downloading hero images..."
wget -O hero/homepage-hero.jpg "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"

# Service Preview Images
echo "Downloading service preview images..."
wget -O services/vinyl-preview.jpg "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate-preview.jpg "https://images.pexels.com/photos/7018389/pexels-photo-7018389.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood-preview.jpg "https://images.pexels.com/photos/4907185/pexels-photo-4907185.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile-preview.jpg "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile-preview.jpg "https://images.pexels.com/photos/6419728/pexels-photo-6419728.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone-preview.jpg "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower-preview.jpg "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash-preview.jpg "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Vinyl Service Page Images
echo "Downloading vinyl service images..."
wget -O services/vinyl/vinyl-hero-bg.jpg "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/vinyl/vinyl-gallery-1.jpg "https://images.pexels.com/photos/1663263/pexels-photo-1663263.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/vinyl/vinyl-gallery-2.jpg "https://images.pexels.com/photos/7018384/pexels-photo-7018384.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/vinyl/vinyl-gallery-3.jpg "https://images.pexels.com/photos/4090585/pexels-photo-4090585.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/vinyl/vinyl-gallery-4.jpg "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/vinyl/vinyl-gallery-5.jpg "https://images.pexels.com/photos/1571455/pexels-photo-1571455.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/vinyl/vinyl-gallery-6.jpg "https://images.pexels.com/photos/1663265/pexels-photo-1663265.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Laminate Service Page Images
echo "Downloading laminate service images..."
wget -O services/laminate/laminate-hero-bg.jpg "https://images.pexels.com/photos/4090596/pexels-photo-4090596.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/laminate/laminate-gallery-1.jpg "https://images.pexels.com/photos/6969823/pexels-photo-6969823.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate/laminate-gallery-2.jpg "https://images.pexels.com/photos/2635033/pexels-photo-2635033.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate/laminate-gallery-3.jpg "https://images.pexels.com/photos/4090591/pexels-photo-4090591.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate/laminate-gallery-4.jpg "https://images.pexels.com/photos/6969824/pexels-photo-6969824.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate/laminate-gallery-5.jpg "https://images.pexels.com/photos/276651/pexels-photo-276651.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/laminate/laminate-gallery-6.jpg "https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Hardwood Service Page Images
echo "Downloading hardwood service images..."
wget -O services/hardwood/hardwood-hero-bg.jpg "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/hardwood/hardwood-gallery-1.jpg "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood/hardwood-gallery-2.jpg "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood/hardwood-gallery-3.jpg "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood/hardwood-gallery-4.jpg "https://images.pexels.com/photos/1417273/pexels-photo-1417273.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood/hardwood-gallery-5.jpg "https://images.pexels.com/photos/1571451/pexels-photo-1571451.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/hardwood/hardwood-gallery-6.jpg "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Tile Service Page Images
echo "Downloading tile service images..."
wget -O services/tile/tile-hero-bg.jpg "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/tile/tile-gallery-1.jpg "https://images.pexels.com/photos/2635045/pexels-photo-2635045.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile/tile-gallery-2.jpg "https://images.pexels.com/photos/1866154/pexels-photo-1866154.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile/tile-gallery-3.jpg "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile/tile-gallery-4.jpg "https://images.pexels.com/photos/3935340/pexels-photo-3935340.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile/tile-gallery-5.jpg "https://images.pexels.com/photos/2028174/pexels-photo-2028174.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/tile/tile-gallery-6.jpg "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Carpet Tile Service Page Images
echo "Downloading carpet tile service images..."
wget -O services/carpet-tile/carpet-tile-hero-bg.jpg "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/carpet-tile/carpet-tile-gallery-1.jpg "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile/carpet-tile-gallery-2.jpg "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile/carpet-tile-gallery-3.jpg "https://images.pexels.com/photos/7018385/pexels-photo-7018385.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile/carpet-tile-gallery-4.jpg "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile/carpet-tile-gallery-5.jpg "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/carpet-tile/carpet-tile-gallery-6.jpg "https://images.pexels.com/photos/159839/office-home-house-desk-159839.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Stone Service Page Images
echo "Downloading stone service images..."
wget -O services/stone/stone-hero-bg.jpg "https://images.pexels.com/photos/1571456/pexels-photo-1571456.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/stone/stone-gallery-1.jpg "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone/stone-gallery-2.jpg "https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone/stone-gallery-3.jpg "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone/stone-gallery-4.jpg "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone/stone-gallery-5.jpg "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/stone/stone-gallery-6.jpg "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Shower Service Page Images
echo "Downloading shower service images..."
wget -O services/shower/shower-hero-bg.jpg "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/shower/shower-gallery-1.jpg "https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower/shower-gallery-2.jpg "https://images.pexels.com/photos/6198666/pexels-photo-6198666.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower/shower-gallery-3.jpg "https://images.pexels.com/photos/2635032/pexels-photo-2635032.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower/shower-gallery-4.jpg "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower/shower-gallery-5.jpg "https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/shower/shower-gallery-6.jpg "https://images.pexels.com/photos/105934/pexels-photo-105934.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Backsplash Service Page Images
echo "Downloading backsplash service images..."
wget -O services/backsplash/backsplash-hero-bg.jpg "https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
wget -O services/backsplash/backsplash-gallery-1.jpg "https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash/backsplash-gallery-2.jpg "https://images.pexels.com/photos/279648/pexels-photo-279648.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash/backsplash-gallery-3.jpg "https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash/backsplash-gallery-4.jpg "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash/backsplash-gallery-5.jpg "https://images.pexels.com/photos/271748/pexels-photo-271748.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O services/backsplash/backsplash-gallery-6.jpg "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1600"

# About Page Images
echo "Downloading about page images..."
wget -O about/team-photo.jpg "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O about/don-working.jpg "https://images.pexels.com/photos/8961577/pexels-photo-8961577.jpeg?auto=compress&cs=tinysrgb&w=1600"
wget -O about/matt-portrait.jpg "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600"

echo "All images downloaded!"
echo "Next steps:"
echo "1. Run image optimization on all downloaded images"
echo "2. Replace placeholder images (team-photo.jpg, matt-portrait.jpg) with actual photos"
echo "3. Verify all images are loading correctly in the website"
