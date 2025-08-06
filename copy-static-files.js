import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyFolderRecursiveSync(source, target) {
  // Create target folder if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read source directory
  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Recursively copy subdirectory
      copyFolderRecursiveSync(sourcePath, targetPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

// Copy images from public to dist
const imagesSource = path.join(__dirname, 'public', 'images');
const imagesDestination = path.join(__dirname, 'dist', 'images');

// Copy .htaccess file
const htaccessSource = path.join(__dirname, 'public', '.htaccess');
const htaccessDestination = path.join(__dirname, 'dist', '.htaccess');

try {
  // Copy images
  copyFolderRecursiveSync(imagesSource, imagesDestination);
  console.log('✅ Images copied successfully to dist folder');
  
  // Copy .htaccess if it exists
  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDestination);
    console.log('✅ .htaccess file copied to dist folder');
  }
} catch (err) {
  console.error('❌ Error copying files:', err);
}
