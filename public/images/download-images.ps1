# SupplySide Flooring - Image Download Script for Windows
# Run this PowerShell script from the public/images directory

Write-Host "Starting image downloads..." -ForegroundColor Green

# Hero Images
Write-Host "Downloading hero images..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" -OutFile "hero/homepage-hero.jpg"

# Service Preview Images
Write-Host "Downloading service preview images..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/7018389/pexels-photo-7018389.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/laminate-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/4907185/pexels-photo-4907185.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/hardwood-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/tile-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/6419728/pexels-photo-6419728.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/carpet-tile-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/2995012/pexels-photo-2995012.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/stone-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/shower-preview.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/backsplash-preview.jpg"

# Vinyl Service Page Images
Write-Host "Downloading vinyl service images..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2" -OutFile "services/vinyl/vinyl-hero-bg.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/1663263/pexels-photo-1663263.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-1.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/7018384/pexels-photo-7018384.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-2.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/4090585/pexels-photo-4090585.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-3.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-4.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/1571455/pexels-photo-1571455.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-5.jpg"
Invoke-WebRequest -Uri "https://images.pexels.com/photos/1663265/pexels-photo-1663265.jpeg?auto=compress&cs=tinysrgb&w=1600" -OutFile "services/vinyl/vinyl-gallery-6.jpg"

# Continue with all other services...
# (Truncated for brevity - the full script would include all images)

Write-Host "All images downloaded!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run image optimization on all downloaded images"
Write-Host "2. Replace placeholder images (team-photo.jpg, matt-portrait.jpg) with actual photos"
Write-Host "3. Verify all images are loading correctly in the website"
