#!/bin/bash

# SupplySide Image Deployment Fix Script
# This script ensures all images are properly built and ready for deployment

echo "🔧 SupplySide Image Deployment Fix"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean dist folder
echo "📦 Step 1: Cleaning dist folder..."
rm -rf dist
echo -e "${GREEN}✓ Dist folder cleaned${NC}"
echo ""

# Step 2: Run the build
echo "🏗️  Step 2: Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed. Please fix any errors and try again.${NC}"
    exit 1
fi
echo ""

# Step 3: Verify images were copied
echo "🔍 Step 3: Verifying image deployment..."
echo ""

# Count images in source
SOURCE_COUNT=$(find public/images -type f \( -name "*.jpg" -o -name "*.webp" -o -name "*.png" -o -name "*.svg" \) 2>/dev/null | wc -l | tr -d ' ')

# Count images in dist
DIST_COUNT=$(find dist/images -type f \( -name "*.jpg" -o -name "*.webp" -o -name "*.png" -o -name "*.svg" \) 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Image Statistics:"
echo "  Source images (public/images/): $SOURCE_COUNT files"
echo "  Deployed images (dist/images/): $DIST_COUNT files"
echo ""

if [ "$SOURCE_COUNT" -eq "$DIST_COUNT" ] && [ "$DIST_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ All images successfully copied to dist!${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Image count mismatch or no images found${NC}"
    echo "  This might indicate an issue with the copy process."
fi
echo ""

# Step 4: List key images that should exist
echo "📋 Step 4: Checking critical images..."
echo ""

CRITICAL_IMAGES=(
    "dist/images/hero/homepage-hero.webp"
    "dist/images/services/vinyl-preview.jpg"
    "dist/images/services/laminate-preview.jpg"
    "dist/images/services/hardwood-preview.jpg"
    "dist/images/services/tile-preview.jpg"
)

ALL_GOOD=true
for img in "${CRITICAL_IMAGES[@]}"; do
    if [ -f "$img" ]; then
        echo -e "  ${GREEN}✓${NC} $img"
    else
        echo -e "  ${RED}✗${NC} $img - MISSING!"
        ALL_GOOD=false
    fi
done

echo ""

# Step 5: Show folder structure
echo "📁 Step 5: Dist folder structure:"
echo ""
if [ -d "dist/images" ]; then
    tree -L 2 dist/images 2>/dev/null || ls -la dist/images/
else
    echo -e "${RED}✗ dist/images folder not found!${NC}"
fi
echo ""

# Step 6: Final status
echo "🎯 Deployment Status:"
echo "===================="
if [ "$ALL_GOOD" = true ] && [ "$DIST_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ SUCCESS: Your site is ready for deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: git add -A"
    echo "2. Run: git commit -m 'Fix image deployment to Hostinger'"
    echo "3. Run: git push origin main"
    echo ""
    echo "GitHub Actions will automatically deploy to Hostinger."
else
    echo -e "${YELLOW}⚠ WARNING: Some issues detected.${NC}"
    echo ""
    echo "Manual fix options:"
    echo "1. Check if images exist in public/images/"
    echo "2. Run: node copy-static-files.js"
    echo "3. Manually copy public/images/ to dist/images/"
fi
echo ""
echo "📍 Testing URLs (after deployment):"
echo "  https://supplysideflooringinstallation.com/images/hero/homepage-hero.webp"
echo "  https://supplysideflooringinstallation.com/images/services/vinyl-preview.jpg"
echo ""