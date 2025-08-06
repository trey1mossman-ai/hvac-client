#!/bin/bash

# Fix Images for Hostinger Deployment
# This script ensures all images work on case-sensitive Linux servers

echo "🔧 Fixing Images for Hostinger Deployment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean dist folder
echo "📦 Step 1: Cleaning dist folder..."
rm -rf dist
echo -e "${GREEN}✓ Dist folder cleaned${NC}"
echo ""

# Step 2: Ensure all image references are lowercase
echo "🔍 Step 2: Checking image references in code..."

# Check for uppercase image extensions in source code
UPPERCASE_REFS=$(grep -r "\.JPG\|\.PNG\|\.WEBP\|\.JPEG" src/ 2>/dev/null | wc -l)

if [ "$UPPERCASE_REFS" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Found uppercase image references in code${NC}"
    grep -r "\.JPG\|\.PNG\|\.WEBP\|\.JPEG" src/ 2>/dev/null
else
    echo -e "${GREEN}✓ All image references are lowercase${NC}"
fi
echo ""

# Step 3: Build the project
echo "🏗️  Step 3: Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Verify critical files in dist
echo "📋 Step 4: Verifying deployment files..."

CRITICAL_FILES=(
    "dist/index.html"
    "dist/.htaccess"
    "dist/images/hero/homepage-hero.webp"
    "dist/images/services/vinyl-preview.jpg"
)

ALL_GOOD=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file - MISSING!"
        ALL_GOOD=false
    fi
done
echo ""

# Step 5: Count images
echo "📊 Image Statistics:"
IMAGE_COUNT=$(find dist/images -type f \( -name "*.jpg" -o -name "*.webp" -o -name "*.png" \) 2>/dev/null | wc -l)
echo "  Total images in dist: $IMAGE_COUNT files"
echo ""

# Step 6: Create deployment checklist
echo "📝 Deployment Checklist for Hostinger:"
echo "======================================"
echo ""
echo "1. Upload the CONTENTS of /dist/ to public_html (not the folder itself)"
echo "2. Ensure .htaccess is uploaded (it may be hidden)"
echo "3. Set file permissions:"
echo "   - Files: 644"
echo "   - Directories: 755"
echo "4. Clear browser cache and test in incognito mode"
echo "5. Check browser console for any 404 errors"
echo ""

if [ "$ALL_GOOD" = true ]; then
    echo -e "${GREEN}✅ Ready for deployment!${NC}"
    echo ""
    echo "To deploy:"
    echo "1. Via FTP: Upload everything inside /dist/ to public_html/"
    echo "2. Via GitHub: git add -A && git commit -m 'Fix images' && git push"
else
    echo -e "${YELLOW}⚠ Some issues detected. Please review above.${NC}"
fi
echo ""
echo "Test URLs after deployment:"
echo "  https://supplysideflooringinstallation.com/"
echo "  https://supplysideflooringinstallation.com/images/hero/homepage-hero.webp"