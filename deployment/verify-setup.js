#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - Setup Verification Script
 * Verifies that deployment configuration is correct
 */

const fs = require('fs').promises;
const path = require('path');
const ftp = require('basic-ftp');
const chalk = require('chalk');
const dotenv = require('dotenv');
const config = require('./config');

// Load environment variables
dotenv.config();
dotenv.config({ path: '.env.local' });

class SetupVerifier {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  /**
   * Run all verification checks
   */
  async verify() {
    console.log(chalk.bold.blue('SupplySide Deployment Setup Verification\n'));

    // Environment checks
    await this.checkEnvironmentFile();
    await this.checkEnvironmentVariables();
    
    // File structure checks
    await this.checkProjectFiles();
    await this.checkDeploymentFiles();
    
    // Connection checks
    await this.checkFTPConnection();
    await this.checkRemoteDirectory();

    // Security checks
    await this.checkSecuritySettings();

    // Show results
    this.showResults();
  }

  /**
   * Check if .env file exists and is readable
   */
  async checkEnvironmentFile() {
    try {
      const envPath = path.join(process.cwd(), '.env');
      await fs.access(envPath);
      this.addCheck('✓ .env file exists', true);
      
      const stats = await fs.stat(envPath);
      if (stats.mode & 0o044) {
        this.addWarning('⚠ .env file may be readable by others (check permissions)');
      }
    } catch (error) {
      this.addCheck('✗ .env file missing', false);
      this.addError('Run "npm run deploy:setup" to create .env file');
    }
  }

  /**
   * Check all required environment variables
   */
  async checkEnvironmentVariables() {
    const required = config.validation.requiredEnvVars;
    const missing = [];
    const invalid = [];

    for (const varName of required) {
      const value = process.env[varName];
      if (!value) {
        missing.push(varName);
      } else {
        // Validate specific formats
        if (varName === 'FTP_HOST' && !config.validation.ftpHostPattern.test(value)) {
          invalid.push(`${varName} must be IP address (e.g., 185.212.71.198)`);
        }
        if (varName === 'FTP_USER' && !config.validation.usernamePattern.test(value)) {
          invalid.push(`${varName} format incorrect (e.g., u921052894.SupplySide)`);
        }
      }
    }

    if (missing.length === 0 && invalid.length === 0) {
      this.addCheck('✓ All environment variables present and valid', true);
    } else {
      if (missing.length > 0) {
        this.addCheck(`✗ Missing variables: ${missing.join(', ')}`, false);
      }
      if (invalid.length > 0) {
        invalid.forEach(msg => this.addCheck(`✗ ${msg}`, false));
      }
    }
  }

  /**
   * Check project files exist
   */
  async checkProjectFiles() {
    const requiredFiles = ['index.html', 'about.html', 'css', 'js', 'images'];
    const missing = [];

    for (const file of requiredFiles) {
      try {
        await fs.access(file);
      } catch (error) {
        missing.push(file);
      }
    }

    if (missing.length === 0) {
      this.addCheck('✓ All required website files present', true);
    } else {
      this.addCheck(`✗ Missing files: ${missing.join(', ')}`, false);
    }
  }

  /**
   * Check deployment files exist
   */
  async checkDeploymentFiles() {
    const deploymentFiles = [
      'deployment/config.js',
      'deployment/deploy.js',
      'deployment/verify-setup.js',
      '.env.example',
      'DEPLOYMENT.md'
    ];
    
    const missing = [];

    for (const file of deploymentFiles) {
      try {
        await fs.access(file);
      } catch (error) {
        missing.push(file);
      }
    }

    if (missing.length === 0) {
      this.addCheck('✓ All deployment files present', true);
    } else {
      this.addCheck(`✗ Missing deployment files: ${missing.join(', ')}`, false);
    }
  }

  /**
   * Test FTP connection
   */
  async checkFTPConnection() {
    if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASS) {
      this.addCheck('✗ Cannot test FTP - missing credentials', false);
      return;
    }

    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: process.env.FTP_HOST,
        port: parseInt(process.env.FTP_PORT) || 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: config.ftp.secure,
        secureOptions: { rejectUnauthorized: false }
      });

      this.addCheck('✓ FTP connection successful', true);
      await client.close();
    } catch (error) {
      this.addCheck(`✗ FTP connection failed: ${error.message}`, false);
      
      if (error.code === 530) {
        this.addError('Authentication failed - check username/password');
      } else if (error.code === 'ETIMEDOUT') {
        this.addError('Connection timeout - check host IP and firewall');
      } else if (error.code === 'ENOTFOUND') {
        this.addError('Host not found - use IP address instead of domain');
      }
    }
  }

  /**
   * Check remote directory access
   */
  async checkRemoteDirectory() {
    if (!process.env.FTP_HOST || !process.env.FTP_USER || !process.env.FTP_PASS) {
      this.addCheck('✗ Cannot test remote directory - missing credentials', false);
      return;
    }

    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: process.env.FTP_HOST,
        port: parseInt(process.env.FTP_PORT) || 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: config.ftp.secure,
        secureOptions: { rejectUnauthorized: false }
      });

      const remotePath = process.env.REMOTE_PATH || '/public_html';
      await client.cd(remotePath);
      
      this.addCheck(`✓ Remote directory accessible: ${remotePath}`, true);
      
      // List files to verify write access
      const list = await client.list();
      this.addCheck(`✓ Directory listing successful (${list.length} items)`, true);
      
      await client.close();
    } catch (error) {
      this.addCheck(`✗ Remote directory check failed: ${error.message}`, false);
      
      if (error.code === 550) {
        this.addError('Directory not found - check REMOTE_PATH setting');
      }
    }
  }

  /**
   * Check security settings
   */
  async checkSecuritySettings() {
    // Check if .env is in gitignore
    try {
      const gitignore = await fs.readFile('.gitignore', 'utf8');
      if (gitignore.includes('.env')) {
        this.addCheck('✓ .env file is in .gitignore', true);
      } else {
        this.addCheck('✗ .env file not in .gitignore', false);
        this.addError('Add .env to .gitignore to prevent committing secrets');
      }
    } catch (error) {
      this.addWarning('⚠ No .gitignore file found');
    }

    // Check password strength
    const password = process.env.FTP_PASS;
    if (password) {
      if (password.length < 8) {
        this.addWarning('⚠ FTP password is short - consider using a stronger password');
      }
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        this.addWarning('⚠ FTP password could be stronger (mix of upper, lower, numbers)');
      }
    }
  }

  /**
   * Add a check result
   */
  addCheck(message, passed) {
    this.checks.push({ message, passed });
  }

  /**
   * Add a warning
   */
  addWarning(message) {
    this.warnings.push(message);
  }

  /**
   * Add an error
   */
  addError(message) {
    this.errors.push(message);
  }

  /**
   * Show verification results
   */
  showResults() {
    console.log('\n' + chalk.bold('Verification Results:\n'));

    // Show checks
    this.checks.forEach(check => {
      if (check.passed) {
        console.log(chalk.green(check.message));
      } else {
        console.log(chalk.red(check.message));
      }
    });

    // Show warnings
    if (this.warnings.length > 0) {
      console.log('\n' + chalk.bold.yellow('Warnings:'));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(warning));
      });
    }

    // Show errors
    if (this.errors.length > 0) {
      console.log('\n' + chalk.bold.red('Errors:'));
      this.errors.forEach(error => {
        console.log(chalk.red(error));
      });
    }

    // Summary
    const passed = this.checks.filter(c => c.passed).length;
    const total = this.checks.length;
    const failed = total - passed;

    console.log('\n' + chalk.bold('Summary:'));
    console.log(chalk.green(`✓ Passed: ${passed}`));
    if (failed > 0) {
      console.log(chalk.red(`✗ Failed: ${failed}`));
    }
    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`⚠ Warnings: ${this.warnings.length}`));
    }

    if (failed === 0 && this.warnings.length === 0) {
      console.log('\n' + chalk.bold.green('🎉 Setup is perfect! Ready to deploy.'));
      console.log(chalk.gray('Run: npm run deploy'));
    } else if (failed === 0) {
      console.log('\n' + chalk.bold.yellow('⚠ Setup is working but has warnings.'));
      console.log(chalk.gray('You can deploy, but consider fixing warnings.'));
    } else {
      console.log('\n' + chalk.bold.red('❌ Setup has errors that must be fixed.'));
      console.log(chalk.gray('Fix errors above, then run: npm run deploy:verify'));
    }
  }
}

// Run verification
const verifier = new SetupVerifier();
verifier.verify();