#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - Main Deployment Script
 * Deploys website files to Hostinger via FTP
 */

const ftp = require('basic-ftp');
const path = require('path');
const fs = require('fs').promises;
const glob = require('glob-promise');
const chalk = require('chalk');
const ora = require('ora');
const dotenv = require('dotenv');
const config = require('./config');

// Load environment variables
dotenv.config();
dotenv.config({ path: '.env.local' });

class Deployer {
  constructor() {
    this.client = new ftp.Client();
    this.client.ftp.verbose = process.env.DEBUG === 'true';
    this.deployedFiles = [];
    this.failedFiles = [];
  }

  /**
   * Main deployment process
   */
  async deploy() {
    const spinner = ora('Starting deployment...').start();

    try {
      // Validate environment
      spinner.text = 'Validating configuration...';
      this.validateEnv();

      // Connect to FTP
      spinner.text = 'Connecting to Hostinger FTP...';
      await this.connect();

      // Get files to deploy
      spinner.text = 'Gathering files to deploy...';
      const files = await this.getFilesToDeploy();
      spinner.succeed(`Found ${files.length} files to deploy`);

      // Create backup if enabled
      if (process.env.CREATE_BACKUP === 'true') {
        spinner.start('Creating backup...');
        await this.createBackup();
        spinner.succeed('Backup created');
      }

      // Deploy files
      spinner.start('Deploying files...');
      await this.deployFiles(files, spinner);

      // Clear cache if enabled
      if (process.env.CLEAR_CACHE === 'true') {
        spinner.text = 'Waiting for files to propagate...';
        await this.wait(config.cache.waitTime);
        spinner.succeed('Deployment complete! Clear cache in Hostinger hPanel.');
      } else {
        spinner.succeed('Deployment complete!');
      }

      // Show summary
      this.showSummary();

    } catch (error) {
      spinner.fail('Deployment failed');
      console.error(chalk.red('Error:'), error.message);
      
      if (error.code === 530) {
        console.log(chalk.yellow('\nAuthentication failed. Check your FTP credentials:'));
        console.log('- Username format: u921052894.SupplySide');
        console.log('- Password: No extra spaces');
        console.log('- Account: Not suspended in hPanel');
      }
      
      process.exit(1);
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Validate environment variables
   */
  validateEnv() {
    const missing = [];
    
    for (const varName of config.validation.requiredEnvVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(', ')}\nRun 'npm run deploy:setup' to configure.`);
    }

    // Validate FTP host format
    if (!config.validation.ftpHostPattern.test(process.env.FTP_HOST)) {
      throw new Error(config.errors.INVALID_HOST);
    }

    // Validate username format
    if (!config.validation.usernamePattern.test(process.env.FTP_USER)) {
      throw new Error(config.errors.INVALID_USER);
    }
  }

  /**
   * Connect to FTP server
   */
  async connect() {
    try {
      await this.client.access({
        host: process.env.FTP_HOST,
        port: parseInt(process.env.FTP_PORT) || 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: config.ftp.secure,
        secureOptions: { rejectUnauthorized: false }
      });

      // Change to remote directory
      const remotePath = process.env.REMOTE_PATH || '/public_html';
      await this.client.cd(remotePath);
      
      console.log(chalk.green('✓ Connected to Hostinger FTP'));
      console.log(chalk.gray(`  Server: ${process.env.FTP_HOST}`));
      console.log(chalk.gray(`  User: ${process.env.FTP_USER}`));
      console.log(chalk.gray(`  Directory: ${remotePath}`));

    } catch (error) {
      throw new Error(`Connection failed: ${error.message}`);
    }
  }

  /**
   * Get list of files to deploy
   */
  async getFilesToDeploy() {
    const files = [];
    const localPath = process.env.LOCAL_PATH || './';

    // Get all files matching include patterns
    for (const pattern of config.deployment.include) {
      const matches = await glob(pattern, {
        cwd: localPath,
        nodir: true,
        dot: true
      });
      files.push(...matches);
    }

    // Remove duplicates and filter excludes
    const uniqueFiles = [...new Set(files)];
    const filtered = uniqueFiles.filter(file => {
      return !config.deployment.exclude.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(file);
      });
    });

    return filtered;
  }

  /**
   * Deploy files to server
   */
  async deployFiles(files, spinner) {
    const total = files.length;
    let completed = 0;

    for (const file of files) {
      try {
        spinner.text = `Deploying (${completed}/${total}): ${file}`;
        
        const localFile = path.join(process.env.LOCAL_PATH || './', file);
        const remoteFile = file.replace(/\\/g, '/');
        
        // Ensure remote directory exists
        const remoteDir = path.dirname(remoteFile);
        if (remoteDir !== '.') {
          await this.client.ensureDir(remoteDir);
        }

        // Upload file
        await this.client.uploadFrom(localFile, remoteFile);
        
        this.deployedFiles.push(file);
        completed++;
        
      } catch (error) {
        console.error(chalk.red(`\nFailed to deploy ${file}: ${error.message}`));
        this.failedFiles.push({ file, error: error.message });
      }
    }
  }

  /**
   * Create backup of current deployment
   */
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(config.paths.backup, timestamp);
    
    await fs.mkdir(backupDir, { recursive: true });
    
    // Copy deployment config
    await fs.copyFile('.env', path.join(backupDir, '.env.backup'));
    
    // Save deployment manifest
    const manifest = {
      timestamp,
      server: config.server,
      deployedAt: new Date().toISOString(),
      files: this.deployedFiles
    };
    
    await fs.writeFile(
      path.join(backupDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
  }

  /**
   * Disconnect from FTP
   */
  async disconnect() {
    try {
      await this.client.close();
    } catch (error) {
      // Ignore disconnect errors
    }
  }

  /**
   * Show deployment summary
   */
  showSummary() {
    console.log('\n' + chalk.bold('Deployment Summary:'));
    console.log(chalk.green(`✓ Deployed: ${this.deployedFiles.length} files`));
    
    if (this.failedFiles.length > 0) {
      console.log(chalk.red(`✗ Failed: ${this.failedFiles.length} files`));
      this.failedFiles.forEach(({ file, error }) => {
        console.log(chalk.red(`  - ${file}: ${error}`));
      });
    }

    console.log('\n' + chalk.yellow('Next steps:'));
    console.log('1. Visit: ' + chalk.cyan(config.project.url));
    console.log('2. Clear cache in Hostinger hPanel:');
    console.log('   ' + chalk.gray(config.hostinger.cacheManagerPath));
    console.log('3. Test with cache bypass: ' + chalk.gray(`${config.project.url}?v=${Date.now()}`));
  }

  /**
   * Wait for specified milliseconds
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Handle CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');

if (isDryRun) {
  console.log(chalk.yellow('DRY RUN MODE - No files will be uploaded'));
  // TODO: Implement dry run
} else {
  // Run deployment
  const deployer = new Deployer();
  deployer.deploy();
}