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
const source = path.join(__dirname, 'public', 'images');
const destination = path.join(__dirname, 'dist', 'images');

try {
  copyFolderRecursiveSync(source, destination);
  console.log('✅ Images copied successfully to dist folder');
} catch (err) {
  console.error('❌ Error copying images:', err);
}
