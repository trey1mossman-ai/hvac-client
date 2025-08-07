#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function loadEnvFile() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const env = {};
    
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    
    return env;
  } catch (error) {
    log('❌ Error reading .env file:', colors.red);
    log(error.message, colors.red);
    process.exit(1);
  }
}

function validateEnv(env) {
  const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
  const missing = required.filter(key => !env[key] || env[key].includes('TBD'));
  
  if (missing.length > 0) {
    log('❌ Missing required environment variables:', colors.red);
    missing.forEach(key => log(`   ${key}`, colors.yellow));
    log('\nPlease update your .env file with the correct values.', colors.cyan);
    process.exit(1);
  }
}

function deployWithFTP(env) {
  log('\n🚀 Starting FTP deployment...', colors.bright);
  log(`📍 Target: ${env.FTP_HOST}`, colors.cyan);
  log(`👤 User: ${env.FTP_USER}`, colors.cyan);
  log(`📁 Remote: ${env.REMOTE_PATH || '/public_html'}`, colors.cyan);
  
  // Check if dist folder exists
  if (!fs.existsSync('./dist')) {
    log('❌ dist folder not found. Run npm run build first.', colors.red);
    process.exit(1);
  }
  
  try {
    // Use the existing deploy.sh script
    log('\n📤 Uploading files via FTP...', colors.yellow);
    execSync('./deploy.sh', { stdio: 'inherit' });
    
    log('\n✅ Deployment completed successfully!', colors.green);
    log(`🌐 Your site should be available at: https://peachpuff-caterpillar-314202.hostingersite.com`, colors.cyan);
    log('\n💡 Note: It may take a few minutes for changes to appear due to caching.', colors.yellow);
    
  } catch (error) {
    log('\n❌ Deployment failed:', colors.red);
    log(error.message, colors.red);
    log('\nTry running: npm run deploy:test', colors.cyan);
    process.exit(1);
  }
}

function main() {
  log('🔧 Winterrowd HVAC Website Deployment', colors.bright);
  log('=====================================', colors.bright);
  
  const env = loadEnvFile();
  validateEnv(env);
  deployWithFTP(env);
}

main();