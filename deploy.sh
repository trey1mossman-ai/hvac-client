#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create deployment directory
echo "Creating deployment package..."
mkdir -p supplyside-deploy

# Copy only necessary files
cp -r dist supplyside-deploy/
cp .htaccess supplyside-deploy/
cp package.json supplyside-deploy/
cp -r public supplyside-deploy/
cp -r src supplyside-deploy/

# Create zip file
zip -r supplyside-deploy.zip supplyside-deploy

# Clean up
rm -rf supplyside-deploy

echo "Deployment package created: supplyside-deploy.zip"
echo "Upload this entire zip to Hostinger and extract it in public_html"