#!/bin/bash
# SupplySide Flooring - Fix Service Page Navigation Links

# This script updates all service pages with correct relative paths

# Array of all service page files
SERVICE_PAGES=(
    "luxury-vinyl-flooring-installation-chicago-il.html"
    "laminate-flooring-installation-chicago-il.html"
    "hardwood-floor-installation-chicago-il.html"
    "tile-installation-chicago-il.html"
    "carpet-tile-installation-chicago-il.html"
    "stone-tile-installation-chicago-il.html"
    "shower-tile-installation-chicago-il.html"
    "backsplash-installation-chicago-il.html"
)

# Function to update a service page
update_service_page() {
    local file=$1
    echo "Updating $file..."
    
    # Update CSS link
    sed -i '' 's|href="../css/styles.css"|href="../css/main.css"|g' "$file"
    
    # Update logo link
    sed -i '' 's|href="/"|href="../index.html"|g' "$file"
    
    # Update navigation links - remove leading slashes and fix paths
    sed -i '' 's|href="/luxury-vinyl-flooring-installation-chicago-il/"|href="luxury-vinyl-flooring-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/laminate-flooring-installation-chicago-il/"|href="laminate-flooring-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/hardwood-floor-installation-chicago-il/"|href="hardwood-floor-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/tile-installation-chicago-il/"|href="tile-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/carpet-tile-installation-chicago-il/"|href="carpet-tile-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/stone-tile-installation-chicago-il/"|href="stone-tile-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/shower-tile-installation-chicago-il/"|href="shower-tile-installation-chicago-il.html"|g' "$file"
    sed -i '' 's|href="/backsplash-installation-chicago-il/"|href="backsplash-installation-chicago-il.html"|g' "$file"
    
    # Update About and FAQ links to point to homepage
    sed -i '' 's|href="/#about"|href="../index.html#about"|g' "$file"
    sed -i '' 's|href="/#faq"|href="../index.html#faq"|g' "$file"
    
    # Update script references
    sed -i '' 's|src="../js/main.js"|src="../js/main.js"|g' "$file"
    
    echo "✓ $file updated"
}

# Change to services directory
cd "/Volumes/Trey's Macbook TB/SupplySide website/services" || exit

# Update all service pages
for page in "${SERVICE_PAGES[@]}"; do
    if [ -f "$page" ]; then
        update_service_page "$page"
    else
        echo "⚠ Warning: $page not found"
    fi
done

echo "
✅ All service pages have been updated with correct navigation links!

Summary of changes:
- CSS links now point to ../css/main.css
- Logo links now point to ../index.html
- Service navigation links use relative paths
- About and FAQ links point to homepage sections
- All paths are now relative for local file system compatibility
"