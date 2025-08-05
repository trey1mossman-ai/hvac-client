#!/bin/bash
# SupplySide Flooring - Image Download Script (curl version)
# This script downloads all required images from Pexels using curl

echo "Starting image downloads with curl..."

# Hero Images
echo "Downloading hero images..."
curl -L -o hero/homepage-hero.jpg "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"

# Service Preview Images
echo "Downloading service preview images..."
curl -L -o services/vinyl-preview.jpg "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate-preview.jpg "https://images.pexels.com/photos/7018389/pexels-photo-7018389.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood-preview.jpg "https://images.pexels.com/photos/4907185/pexels-photo-4907185.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile-preview.jpg "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile-preview.jpg "https://images.pexels.com/photos/6419728/pexels-photo-6419728.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone-preview.jpg "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower-preview.jpg "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash-preview.jpg "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Vinyl Service Page Images
echo "Downloading vinyl service images..."
mkdir -p services/vinyl
curl -L -o services/vinyl/vinyl-hero-bg.jpg "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/vinyl/vinyl-gallery-1.jpg "https://images.pexels.com/photos/1663263/pexels-photo-1663263.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/vinyl/vinyl-gallery-2.jpg "https://images.pexels.com/photos/7018384/pexels-photo-7018384.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/vinyl/vinyl-gallery-3.jpg "https://images.pexels.com/photos/4090585/pexels-photo-4090585.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/vinyl/vinyl-gallery-4.jpg "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/vinyl/vinyl-gallery-5.jpg "https://images.pexels.com/photos/1571455/pexels-photo-1571455.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/vinyl/vinyl-gallery-6.jpg "https://images.pexels.com/photos/1663265/pexels-photo-1663265.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Laminate Service Page Images
echo "Downloading laminate service images..."
mkdir -p services/laminate
curl -L -o services/laminate/laminate-hero-bg.jpg "https://images.pexels.com/photos/4090596/pexels-photo-4090596.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/laminate/laminate-gallery-1.jpg "https://images.pexels.com/photos/6969823/pexels-photo-6969823.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate/laminate-gallery-2.jpg "https://images.pexels.com/photos/2635033/pexels-photo-2635033.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate/laminate-gallery-3.jpg "https://images.pexels.com/photos/4090591/pexels-photo-4090591.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate/laminate-gallery-4.jpg "https://images.pexels.com/photos/6969824/pexels-photo-6969824.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate/laminate-gallery-5.jpg "https://images.pexels.com/photos/276651/pexels-photo-276651.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/laminate/laminate-gallery-6.jpg "https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Hardwood Service Page Images
echo "Downloading hardwood service images..."
mkdir -p services/hardwood
curl -L -o services/hardwood/hardwood-hero-bg.jpg "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/hardwood/hardwood-gallery-1.jpg "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood/hardwood-gallery-2.jpg "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood/hardwood-gallery-3.jpg "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood/hardwood-gallery-4.jpg "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood/hardwood-gallery-5.jpg "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/hardwood/hardwood-gallery-6.jpg "https://images.pexels.com/photos/4907157/pexels-photo-4907157.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Tile Service Page Images
echo "Downloading tile service images..."
mkdir -p services/tile
curl -L -o services/tile/tile-hero-bg.jpg "https://images.pexels.com/photos/4846461/pexels-photo-4846461.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/tile/tile-gallery-1.jpg "https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile/tile-gallery-2.jpg "https://images.pexels.com/photos/7214474/pexels-photo-7214474.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile/tile-gallery-3.jpg "https://images.pexels.com/photos/4846503/pexels-photo-4846503.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile/tile-gallery-4.jpg "https://images.pexels.com/photos/4846437/pexels-photo-4846437.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile/tile-gallery-5.jpg "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/tile/tile-gallery-6.jpg "https://images.pexels.com/photos/7214628/pexels-photo-7214628.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Carpet Tile Service Page Images
echo "Downloading carpet tile service images..."
mkdir -p services/carpet-tile
curl -L -o services/carpet-tile/carpet-tile-hero-bg.jpg "https://images.pexels.com/photos/6207819/pexels-photo-6207819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/carpet-tile/carpet-tile-gallery-1.jpg "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile/carpet-tile-gallery-2.jpg "https://images.pexels.com/photos/7255322/pexels-photo-7255322.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile/carpet-tile-gallery-3.jpg "https://images.pexels.com/photos/945688/pexels-photo-945688.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile/carpet-tile-gallery-4.jpg "https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile/carpet-tile-gallery-5.jpg "https://images.pexels.com/photos/945669/pexels-photo-945669.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/carpet-tile/carpet-tile-gallery-6.jpg "https://images.pexels.com/photos/7601144/pexels-photo-7601144.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Stone Service Page Images
echo "Downloading stone service images..."
mkdir -p services/stone
curl -L -o services/stone/stone-hero-bg.jpg "https://images.pexels.com/photos/2995013/pexels-photo-2995013.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/stone/stone-gallery-1.jpg "https://images.pexels.com/photos/4030314/pexels-photo-4030314.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone/stone-gallery-2.jpg "https://images.pexels.com/photos/4846455/pexels-photo-4846455.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone/stone-gallery-3.jpg "https://images.pexels.com/photos/5707607/pexels-photo-5707607.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone/stone-gallery-4.jpg "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone/stone-gallery-5.jpg "https://images.pexels.com/photos/8289026/pexels-photo-8289026.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/stone/stone-gallery-6.jpg "https://images.pexels.com/photos/3637739/pexels-photo-3637739.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Shower Service Page Images
echo "Downloading shower service images..."
mkdir -p services/shower
curl -L -o services/shower/shower-hero-bg.jpg "https://images.pexels.com/photos/4239142/pexels-photo-4239142.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/shower/shower-gallery-1.jpg "https://images.pexels.com/photos/3737424/pexels-photo-3737424.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower/shower-gallery-2.jpg "https://images.pexels.com/photos/4857781/pexels-photo-4857781.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower/shower-gallery-3.jpg "https://images.pexels.com/photos/5900806/pexels-photo-5900806.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower/shower-gallery-4.jpg "https://images.pexels.com/photos/5707684/pexels-photo-5707684.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower/shower-gallery-5.jpg "https://images.pexels.com/photos/4239032/pexels-photo-4239032.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/shower/shower-gallery-6.jpg "https://images.pexels.com/photos/4099471/pexels-photo-4099471.jpeg?auto=compress&cs=tinysrgb&w=1600"

# Backsplash Service Page Images
echo "Downloading backsplash service images..."
mkdir -p services/backsplash
curl -L -o services/backsplash/backsplash-hero-bg.jpg "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
curl -L -o services/backsplash/backsplash-gallery-1.jpg "https://images.pexels.com/photos/7061410/pexels-photo-7061410.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash/backsplash-gallery-2.jpg "https://images.pexels.com/photos/6908422/pexels-photo-6908422.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash/backsplash-gallery-3.jpg "https://images.pexels.com/photos/7535026/pexels-photo-7535026.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash/backsplash-gallery-4.jpg "https://images.pexels.com/photos/7535042/pexels-photo-7535042.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash/backsplash-gallery-5.jpg "https://images.pexels.com/photos/6908442/pexels-photo-6908442.jpeg?auto=compress&cs=tinysrgb&w=1600"
curl -L -o services/backsplash/backsplash-gallery-6.jpg "https://images.pexels.com/photos/5570224/pexels-photo-5570224.jpeg?auto=compress&cs=tinysrgb&w=1600"

# About Page Images
echo "Downloading about page images..."
mkdir -p about
# Team photo placeholder - replace with actual team photo
touch about/team-photo.jpg
# Matt portrait placeholder - replace with actual photo
touch about/matt-portrait.jpg

echo "All images downloaded!"
echo "Next steps:"
echo "1. Replace placeholder images (team-photo.jpg, matt-portrait.jpg) with actual photos"
echo "2. Optimize all images for web use (reduce file size while maintaining quality)"
echo "3. Verify all images are loading correctly in the website"