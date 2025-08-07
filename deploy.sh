#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create deployment directory
echo "Creating deployment package..."
mkdir -p hvac-deploy

# Copy built files
cp -r dist/* hvac-deploy/
cp -r public/* hvac-deploy/ 2>/dev/null || true

# Create zip file
zip -r hvac-deploy.zip hvac-deploy

# Clean up
rm -rf hvac-deploy

echo "Deployment package created: hvac-deploy.zip"
echo "Upload this to Hostinger at: https://peachpuff-caterpillar-314202.hostingersite.com"
echo "Extract it in the public_html directory"