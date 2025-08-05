#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - Configuration Discovery Script
 * Attempts to recover lost deployment configuration
 */

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');
const config = require('./config');

class ConfigDiscovery {
  constructor() {
    this.foundConfig = {};
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Main discovery process
   */
  async discover() {
    console.log(chalk.bold.blue('SupplySide Deployment Configuration Discovery\n'));
    console.log('This tool will help recover your deployment configuration.\n');

    try {
      // Check for existing configurations
      await this.searchExistingConfigs();
      
      // Try to recover from various sources
      await this.searchGitHistory();
      await this.searchBackups();
      await this.searchSystemLocations();
      
      // Show what we found
      await this.showFindings();
      
      // Offer to create new config if needed
      await this.offerConfigCreation();
      
    } catch (error) {
      console.error(chalk.red('Discovery failed:'), error.message);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Search for existing configuration files
   */
  async searchExistingConfigs() {
    console.log(chalk.blue('🔍 Searching for existing configuration files...\n'));

    const configFiles = [
      '.env',
      '.env.local', 
      '.env.production',
      '.supplyside-deploy',
      'deployment/config.js',
      '.env.example'
    ];

    for (const file of configFiles) {
      try {
        await fs.access(file);
        console.log(chalk.green(`✓ Found: ${file}`));
        
        if (file.includes('.env')) {
          await this.parseEnvFile(file);
        }
      } catch (error) {
        console.log(chalk.gray(`- Missing: ${file}`));
      }
    }
    console.log();
  }

  /**
   * Parse environment file for configuration
   */
  async parseEnvFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, value] = trimmed.split('=', 2);
          if (key && value) {
            this.foundConfig[key.trim()] = value.trim();
          }
        }
      }
    } catch (error) {
      console.log(chalk.yellow(`  ⚠ Could not read ${filePath}: ${error.message}`));
    }
  }

  /**
   * Search git history for configuration
   */
  async searchGitHistory() {
    console.log(chalk.blue('🔍 Searching git history for configuration...\n'));

    try {
      const { spawn } = require('child_process');
      
      // Check if we're in a git repo
      const gitCheck = spawn('git', ['status'], { stdio: 'pipe' });
      
      gitCheck.on('close', async (code) => {
        if (code === 0) {
          console.log(chalk.green('✓ Git repository detected'));
          
          // Look for .env in git history (should not be there, but check)
          try {
            const gitLog = spawn('git', ['log', '--oneline', '--all', '--', '.env*'], { stdio: 'pipe' });
            let hasEnvHistory = false;
            
            gitLog.stdout.on('data', (data) => {
              if (data.toString().trim()) {
                hasEnvHistory = true;
                console.log(chalk.yellow('⚠ Found .env files in git history (this is a security risk)'));
              }
            });
            
            gitLog.on('close', () => {
              if (!hasEnvHistory) {
                console.log(chalk.green('✓ No .env files found in git history (good!)'));
              }
            });
          } catch (error) {
            console.log(chalk.gray('- Could not search git history'));
          }
        } else {
          console.log(chalk.gray('- Not a git repository'));
        }
      });
    } catch (error) {
      console.log(chalk.gray('- Git not available'));
    }
    console.log();
  }

  /**
   * Search for backup files
   */
  async searchBackups() {
    console.log(chalk.blue('🔍 Searching for backup files...\n'));

    const backupLocations = [
      'backups/',
      '../backups/',
      '~/.supplyside-backups/',
      path.join(require('os').homedir(), '.supplyside-deploy')
    ];

    for (const location of backupLocations) {
      try {
        const expandedPath = location.replace('~', require('os').homedir());
        const stats = await fs.stat(expandedPath);
        
        if (stats.isDirectory()) {
          console.log(chalk.green(`✓ Found backup directory: ${location}`));
          await this.searchBackupDirectory(expandedPath);
        } else if (stats.isFile()) {
          console.log(chalk.green(`✓ Found backup file: ${location}`));
          await this.parseEnvFile(expandedPath);
        }
      } catch (error) {
        console.log(chalk.gray(`- No backups at: ${location}`));
      }
    }
    console.log();
  }

  /**
   * Search backup directory
   */
  async searchBackupDirectory(dir) {
    try {
      const files = await fs.readdir(dir);
      const envFiles = files.filter(f => f.includes('.env') || f.includes('config'));
      
      for (const file of envFiles) {
        const filePath = path.join(dir, file);
        console.log(chalk.yellow(`  📁 Found backup: ${file}`));
        await this.parseEnvFile(filePath);
      }
    } catch (error) {
      console.log(chalk.yellow(`  ⚠ Could not read backup directory: ${error.message}`));
    }
  }

  /**
   * Search system locations
   */
  async searchSystemLocations() {
    console.log(chalk.blue('🔍 Searching system locations...\n'));

    const systemLocations = [
      path.join(require('os').homedir(), '.supplyside-deploy'),
      path.join(require('os').homedir(), '.config', 'supplyside'),
      '/tmp/.supplyside-deploy'
    ];

    for (const location of systemLocations) {
      try {
        await fs.access(location);
        console.log(chalk.green(`✓ Found system config: ${location}`));
        await this.parseEnvFile(location);
      } catch (error) {
        console.log(chalk.gray(`- No config at: ${location}`));
      }
    }
    console.log();
  }

  /**
   * Show discovered configuration
   */
  async showFindings() {
    console.log(chalk.bold('📋 Configuration Discovery Results:\n'));

    if (Object.keys(this.foundConfig).length === 0) {
      console.log(chalk.red('❌ No configuration found'));
      return;
    }

    console.log(chalk.green('✓ Found configuration variables:'));
    
    const sensitiveKeys = ['FTP_PASS', 'PASSWORD', 'SECRET', 'KEY'];
    
    for (const [key, value] of Object.entries(this.foundConfig)) {
      const isSensitive = sensitiveKeys.some(sensitive => key.includes(sensitive));
      
      if (isSensitive) {
        const masked = value.substring(0, 2) + '*'.repeat(value.length - 4) + value.substring(value.length - 2);
        console.log(chalk.yellow(`  ${key} = ${masked}`));
      } else {
        console.log(chalk.cyan(`  ${key} = ${value}`));
      }
    }

    // Check completeness
    const required = config.validation.requiredEnvVars;
    const missing = required.filter(key => !this.foundConfig[key]);
    
    if (missing.length === 0) {
      console.log(chalk.green('\n✅ All required variables found!'));
    } else {
      console.log(chalk.yellow(`\n⚠ Missing variables: ${missing.join(', ')}`));
    }
  }

  /**
   * Offer to create configuration
   */
  async offerConfigCreation() {
    console.log('\n' + chalk.bold('🔧 Configuration Options:\n'));

    if (Object.keys(this.foundConfig).length > 0) {
      const restore = await this.ask('Restore found configuration to .env? [Y/n] ');
      
      if (restore.toLowerCase() !== 'n') {
        await this.restoreConfiguration();
        return;
      }
    }

    const create = await this.ask('Create new configuration? [Y/n] ');
    
    if (create.toLowerCase() !== 'n') {
      await this.createNewConfiguration();
    }
  }

  /**
   * Restore found configuration
   */
  async restoreConfiguration() {
    try {
      let envContent = '# SupplySide Flooring Installation - FTP Configuration\n';
      envContent += '# Restored by configuration discovery\n\n';
      
      for (const [key, value] of Object.entries(this.foundConfig)) {
        envContent += `${key}=${value}\n`;
      }
      
      // Add any missing defaults
      const defaults = {
        FTP_PORT: '21',
        REMOTE_PATH: '/public_html',
        LOCAL_PATH: './',
        DEPLOYMENT_MODE: 'production',
        CLEAR_CACHE: 'true',
        CREATE_BACKUP: 'true',
        DEBUG: 'false'
      };
      
      for (const [key, defaultValue] of Object.entries(defaults)) {
        if (!this.foundConfig[key]) {
          envContent += `${key}=${defaultValue}\n`;
        }
      }
      
      await fs.writeFile('.env', envContent);
      console.log(chalk.green('✅ Configuration restored to .env'));
      
      // Run verification
      console.log('\n' + chalk.blue('Running setup verification...'));
      const { spawn } = require('child_process');
      spawn('node', ['deployment/verify-setup.js'], { stdio: 'inherit' });
      
    } catch (error) {
      console.error(chalk.red('Failed to restore configuration:'), error.message);
    }
  }

  /**
   * Create new configuration interactively
   */
  async createNewConfiguration() {
    console.log(chalk.blue('\n🔧 Creating new configuration...\n'));
    console.log('You will need your Hostinger FTP credentials.');
    console.log('Find them at: hPanel → Files → FTP Accounts\n');

    const newConfig = {};
    
    // Get FTP details
    newConfig.FTP_HOST = await this.ask('FTP Host (IP address, e.g., 185.212.71.198): ');
    newConfig.FTP_PORT = await this.ask('FTP Port [21]: ') || '21';
    newConfig.FTP_USER = await this.ask('FTP Username (e.g., u921052894.SupplySide): ');
    newConfig.FTP_PASS = await this.askPassword('FTP Password: ');
    newConfig.REMOTE_PATH = await this.ask('Remote Path [/public_html]: ') || '/public_html';
    
    // Optional settings
    newConfig.LOCAL_PATH = './';
    newConfig.DEPLOYMENT_MODE = 'production';
    newConfig.CLEAR_CACHE = 'true';
    newConfig.CREATE_BACKUP = 'true';
    newConfig.DEBUG = 'false';

    // Write to .env
    let envContent = '# SupplySide Flooring Installation - FTP Configuration\n\n';
    
    for (const [key, value] of Object.entries(newConfig)) {
      envContent += `${key}=${value}\n`;
    }
    
    await fs.writeFile('.env', envContent);
    console.log(chalk.green('\n✅ New configuration created!'));
    
    // Run verification
    console.log(chalk.blue('\nRunning setup verification...'));
    const { spawn } = require('child_process');
    spawn('node', ['deployment/verify-setup.js'], { stdio: 'inherit' });
  }

  /**
   * Ask a question
   */
  ask(question) {
    return new Promise(resolve => {
      this.rl.question(question, resolve);
    });
  }

  /**
   * Ask for password (hidden input)
   */
  askPassword(question) {
    return new Promise(resolve => {
      this.rl.question(question, resolve);
      // Note: This doesn't actually hide input in Node.js CLI
      // For production, you'd want to use a proper password input library
    });
  }
}

// Run discovery
const discovery = new ConfigDiscovery();
discovery.discover();