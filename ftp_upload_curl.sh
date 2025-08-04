#!/bin/bash

# FTP credentials
FTP_HOST="ftp.mediumblue-chamois-837591.hostingersite.com"
FTP_USER="u921052894.SupplySide"
FTP_PASS="pufMok-8guvno"

echo "Attempting to upload files using curl..."

# Function to upload a file
upload_file() {
    local file=$1
    local remote_path=$2
    
    if [ -f "$file" ]; then
        echo "Uploading $file..."
        curl -T "$file" \
            --ftp-create-dirs \
            --ftp-pasv \
            --connect-timeout 30 \
            --max-time 60 \
            "ftp://${FTP_USER}:${FTP_PASS}@${FTP_HOST}/public_html/${remote_path}" \
            2>&1
        
        if [ $? -eq 0 ]; then
            echo "✓ Uploaded $file"
        else
            echo "✗ Failed to upload $file"
        fi
    fi
}

# Upload HTML files
upload_file "index.html" ""
upload_file "about.html" ""

# Upload CSS files
upload_file "css/style.css" "css/"
upload_file "css/about.css" "css/"

# Upload JS files
upload_file "js/main.js" "js/"

# Upload new styles files
upload_file "styles/typography.css" "styles/"
upload_file "styles/main.css" "styles/"

# Upload new scripts files
upload_file "scripts/hero-animations.js" "scripts/"
upload_file "scripts/form-validation.js" "scripts/"

echo "Upload attempt complete!"