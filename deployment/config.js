/**
 * Deployment Configuration
 * Non-sensitive deployment settings
 */

const path = require('path');
const os = require('os');

module.exports = {
  // Project Info
  project: {
    name: 'SupplySide Flooring Installation',
    version: '2.0.0',
    description: 'Chicago flooring installation website',
    url: 'https://mediumblue-chamois-837591.hostingersite.com'
  },

  // Server Info (non-sensitive)
  server: {
    ip: '185.212.71.198',
    name: 'server648',
    location: 'North America (USA AZ)',
    provider: 'Hostinger'
  },

  // File patterns
  deployment: {
    // Files to include
    include: [
      'index.html',
      'about.html',
      'css/**/*',
      'js/**/*',
      'images/**/*',
      'fonts/**/*',
      'favicon.ico',
      'robots.txt',
      'sitemap.xml'
    ],
    
    // Files to exclude
    exclude: [
      '.git/**',
      'node_modules/**',
      '.env*',
      '*.md',
      'deployment/**',
      'package*.json',
      '.gitignore',
      '.vscode/**',
      '*.log',
      '.DS_Store',
      'Thumbs.db'
    ]
  },

  // FTP Settings (non-sensitive)
  ftp: {
    secure: false, // SFTP not available on basic plan
    passive: true,
    timeout: 30000,
    keepalive: 10000,
    verbose: process.env.DEBUG === 'true'
  },

  // Cache settings
  cache: {
    bustingParam: 'v',
    clearAfterDeploy: true,
    waitTime: 5000 // Wait 5 seconds after deploy before cache clear
  },

  // Paths
  paths: {
    env: [
      path.join(process.cwd(), '.env'),
      path.join(process.cwd(), '.env.local'),
      path.join(os.homedir(), '.supplyside-deploy')
    ],
    backup: path.join(process.cwd(), 'backups'),
    logs: path.join(process.cwd(), 'logs')
  },

  // Hostinger specific
  hostinger: {
    hpanelUrl: 'https://hpanel.hostinger.com',
    cacheManagerPath: 'Websites → Dashboard → Cache Manager',
    ftpAccountsPath: 'Files → FTP Accounts',
    fileManagerPath: 'Files → File Manager'
  },

  // Validation rules
  validation: {
    requiredEnvVars: [
      'FTP_HOST',
      'FTP_PORT', 
      'FTP_USER',
      'FTP_PASS',
      'REMOTE_PATH'
    ],
    ftpHostPattern: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    usernamePattern: /^u\d+\.(SupplySide|[\w-]+\.hostingersite\.com)$/
  },

  // Error messages
  errors: {
    NO_ENV: 'No .env file found. Run "npm run deploy:setup" to create one.',
    INVALID_HOST: 'FTP_HOST must be an IP address (e.g., 185.212.71.198), not a domain.',
    INVALID_USER: 'FTP_USER format incorrect. Should be like: u921052894.SupplySide',
    CONNECTION_FAILED: 'FTP connection failed. Check credentials and try "npm run deploy:test"',
    CACHE_HINT: 'Files uploaded but not showing? Clear cache in Hostinger hPanel.'
  }
};