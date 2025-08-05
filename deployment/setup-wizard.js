#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - Interactive Setup Wizard
 * Guides users through initial deployment setup
 */

const fs = require('fs').promises;
const readline = require('readline');
const chalk = require('chalk');
const config = require('./config');

class SetupWizard {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.configuration = {};
  }

  /**
   * Run the setup wizard
   */
  async run() {
    console.log(chalk.bold.blue('🧙‍♂️ SupplySide Deployment Setup Wizard\n'));
    console.log('This wizard will help you configure deployment to Hostinger.\n');

    try {
      // Welcome and prerequisites
      await this.showWelcome();
      
      // Check existing configuration
      await this.checkExisting();
      
      // Gather FTP configuration
      await this.gatherFTPConfig();
      
      // Gather deployment settings
      await this.gatherDeploymentSettings();
      
      // Review configuration
      await this.reviewConfiguration();
      
      // Save configuration
      await this.saveConfiguration();
      
      // Test connection
      await this.testConnection();
      
      // Show next steps
      this.showNextSteps();
      
    } catch (error) {
      console.error(chalk.red('Setup failed:'), error.message);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Show welcome and prerequisites
   */
  async showWelcome() {
    console.log(chalk.blue('📋 Prerequisites:\n'));
    console.log('Before starting, you need:');
    console.log('• Hostinger hosting account with FTP access');
    console.log('• FTP credentials from hPanel → Files → FTP Accounts');
    console.log('• FTP IP address (not domain name)');
    console.log('• FTP username and password\n');

    const ready = await this.ask('Do you have all the prerequisites? [Y/n] ');
    
    if (ready.toLowerCase() === 'n') {
      console.log(chalk.yellow('\n⏸  Please gather your credentials and run setup again.'));
      console.log('Find them at: https://hpanel.hostinger.com → Files → FTP Accounts');
      process.exit(0);
    }
  }

  /**
   * Check for existing configuration
   */
  async checkExisting() {
    try {
      await fs.access('.env');
      console.log(chalk.yellow('⚠ Existing .env file found\n'));
      
      const overwrite = await this.ask('Overwrite existing configuration? [y/N] ');
      
      if (overwrite.toLowerCase() !== 'y') {
        console.log(chalk.blue('\n💡 To modify existing config, edit .env file directly'));
        console.log('or run: npm run deploy:discover');
        process.exit(0);
      }
      
      // Backup existing
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await fs.copyFile('.env', `.env.backup.${timestamp}`);
      console.log(chalk.green(`✓ Backed up existing config to .env.backup.${timestamp}\n`));
      
    } catch (error) {
      // No existing file, continue
    }
  }

  /**
   * Gather FTP configuration
   */
  async gatherFTPConfig() {
    console.log(chalk.bold.blue('🔗 FTP Configuration\n'));
    
    // FTP Host
    console.log('Enter your FTP host IP address (from hPanel → FTP Accounts)');
    console.log(chalk.gray('Example: 185.212.71.198'));
    this.configuration.FTP_HOST = await this.validateInput(
      'FTP Host: ',
      (value) => config.validation.ftpHostPattern.test(value),
      'Must be an IP address (e.g., 185.212.71.198)'
    );

    // FTP Port
    this.configuration.FTP_PORT = await this.ask('FTP Port [21]: ') || '21';

    // FTP Username
    console.log('\nEnter your FTP username (from hPanel → FTP Accounts)');
    console.log(chalk.gray('Example: u921052894.SupplySide'));
    this.configuration.FTP_USER = await this.validateInput(
      'FTP Username: ',
      (value) => config.validation.usernamePattern.test(value),
      'Format: u123456789.SupplySide or u123456789.domain.hostingersite.com'
    );

    // FTP Password
    console.log('\nEnter your FTP password');
    this.configuration.FTP_PASS = await this.askPassword('FTP Password: ');

    // Remote Path
    console.log('\nEnter the remote directory path');
    console.log(chalk.gray('Usually /public_html for main domain'));
    this.configuration.REMOTE_PATH = await this.ask('Remote Path [/public_html]: ') || '/public_html';
  }

  /**
   * Gather deployment settings
   */
  async gatherDeploymentSettings() {
    console.log(chalk.bold.blue('\n⚙️  Deployment Settings\n'));

    // Local path
    this.configuration.LOCAL_PATH = await this.ask('Local directory to deploy [./]: ') || './';

    // Deployment mode
    const modes = ['production', 'staging', 'development'];
    console.log('Deployment modes:');
    modes.forEach((mode, i) => console.log(`  ${i + 1}. ${mode}`));
    
    const modeChoice = await this.ask('Choose deployment mode [1]: ') || '1';
    this.configuration.DEPLOYMENT_MODE = modes[parseInt(modeChoice) - 1] || 'production';

    // Cache settings
    const clearCache = await this.ask('Clear cache after deployment? [Y/n] ');
    this.configuration.CLEAR_CACHE = clearCache.toLowerCase() !== 'n' ? 'true' : 'false';

    // Backup settings
    const createBackup = await this.ask('Create backups before deployment? [Y/n] ');
    this.configuration.CREATE_BACKUP = createBackup.toLowerCase() !== 'n' ? 'true' : 'false';

    if (this.configuration.CREATE_BACKUP === 'true') {
      const retentionDays = await this.ask('Backup retention days [7]: ') || '7';
      this.configuration.BACKUP_RETENTION_DAYS = retentionDays;
    }

    // Debug mode
    const debug = await this.ask('Enable debug mode? [y/N] ');
    this.configuration.DEBUG = debug.toLowerCase() === 'y' ? 'true' : 'false';
  }

  /**
   * Review configuration before saving
   */
  async reviewConfiguration() {
    console.log(chalk.bold.blue('\n📋 Configuration Review\n'));

    console.log(chalk.bold('FTP Settings:'));
    console.log(`  Host: ${chalk.cyan(this.configuration.FTP_HOST)}`);
    console.log(`  Port: ${chalk.cyan(this.configuration.FTP_PORT)}`);
    console.log(`  Username: ${chalk.cyan(this.configuration.FTP_USER)}`);
    console.log(`  Password: ${chalk.cyan('*'.repeat(this.configuration.FTP_PASS.length))}`);
    console.log(`  Remote Path: ${chalk.cyan(this.configuration.REMOTE_PATH)}`);

    console.log(chalk.bold('\nDeployment Settings:'));
    console.log(`  Local Path: ${chalk.cyan(this.configuration.LOCAL_PATH)}`);
    console.log(`  Mode: ${chalk.cyan(this.configuration.DEPLOYMENT_MODE)}`);
    console.log(`  Clear Cache: ${chalk.cyan(this.configuration.CLEAR_CACHE)}`);
    console.log(`  Create Backup: ${chalk.cyan(this.configuration.CREATE_BACKUP)}`);
    console.log(`  Debug Mode: ${chalk.cyan(this.configuration.DEBUG)}`);

    const confirm = await this.ask('\nSave this configuration? [Y/n] ');
    
    if (confirm.toLowerCase() === 'n') {
      console.log(chalk.yellow('Setup cancelled.'));
      process.exit(0);
    }
  }

  /**
   * Save configuration to .env file
   */
  async saveConfiguration() {
    console.log(chalk.blue('\n💾 Saving configuration...\n'));

    let envContent = '# SupplySide Flooring Installation - FTP Configuration\n';
    envContent += `# Created by Setup Wizard on ${new Date().toISOString()}\n\n`;

    envContent += '# Hostinger FTP Settings\n';
    envContent += `FTP_HOST=${this.configuration.FTP_HOST}\n`;
    envContent += `FTP_PORT=${this.configuration.FTP_PORT}\n`;
    envContent += `FTP_USER=${this.configuration.FTP_USER}\n`;
    envContent += `FTP_PASS=${this.configuration.FTP_PASS}\n`;
    envContent += `REMOTE_PATH=${this.configuration.REMOTE_PATH}\n\n`;

    envContent += '# Deployment Settings\n';
    envContent += `LOCAL_PATH=${this.configuration.LOCAL_PATH}\n`;
    envContent += `DEPLOYMENT_MODE=${this.configuration.DEPLOYMENT_MODE}\n\n`;

    envContent += '# Cache and Backup Settings\n';
    envContent += `CLEAR_CACHE=${this.configuration.CLEAR_CACHE}\n`;
    envContent += `CREATE_BACKUP=${this.configuration.CREATE_BACKUP}\n`;
    
    if (this.configuration.BACKUP_RETENTION_DAYS) {
      envContent += `BACKUP_RETENTION_DAYS=${this.configuration.BACKUP_RETENTION_DAYS}\n`;
    }
    
    envContent += `DEBUG=${this.configuration.DEBUG}\n`;

    await fs.writeFile('.env', envContent);
    console.log(chalk.green('✓ Configuration saved to .env'));

    // Set file permissions (Unix systems only)
    try {
      await fs.chmod('.env', 0o600);
      console.log(chalk.green('✓ Set secure file permissions'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Could not set file permissions (Windows?)'));
    }
  }

  /**
   * Test the connection
   */
  async testConnection() {
    console.log(chalk.blue('\n🧪 Testing FTP connection...\n'));

    const test = await this.ask('Test connection now? [Y/n] ');
    
    if (test.toLowerCase() === 'n') {
      console.log(chalk.yellow('⏭ Skipping connection test'));
      return;
    }

    try {
      // Run connection test
      const { spawn } = require('child_process');
      
      const testProcess = spawn('node', ['deployment/test-connection.js'], {
        stdio: 'inherit',
        env: { ...process.env, ...this.configuration }
      });

      await new Promise((resolve, reject) => {
        testProcess.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Connection test failed with code ${code}`));
          }
        });
      });

    } catch (error) {
      console.log(chalk.red('\n❌ Connection test failed'));
      console.log('You can test manually later with: npm run deploy:test');
      
      const continueAnyway = await this.ask('Continue with setup anyway? [Y/n] ');
      
      if (continueAnyway.toLowerCase() === 'n') {
        console.log(chalk.yellow('Setup incomplete. Fix connection issues and try again.'));
        process.exit(1);
      }
    }
  }

  /**
   * Show next steps
   */
  showNextSteps() {
    console.log(chalk.bold.green('\n🎉 Setup Complete!\n'));

    console.log(chalk.bold('Next Steps:\n'));
    console.log('1. ' + chalk.cyan('npm run deploy:verify') + ' - Verify your setup');
    console.log('2. ' + chalk.cyan('npm run deploy:test') + ' - Test FTP connection');
    console.log('3. ' + chalk.cyan('npm run deploy') + ' - Deploy your website');
    console.log('4. Clear cache in Hostinger hPanel after deployment\n');

    console.log(chalk.bold('Available Commands:\n'));
    console.log(chalk.cyan('npm run deploy') + '          - Deploy to production');
    console.log(chalk.cyan('npm run deploy:test') + '     - Test FTP connection');
    console.log(chalk.cyan('npm run deploy:verify') + '   - Verify setup');
    console.log(chalk.cyan('npm run deploy:discover') + ' - Recover lost config');
    console.log(chalk.cyan('npm run deploy:setup') + '    - Run this wizard again\n');

    console.log(chalk.bold('Documentation:\n'));
    console.log('• Read ' + chalk.cyan('DEPLOYMENT.md') + ' for detailed instructions');
    console.log('• Check ' + chalk.cyan('.env.example') + ' for configuration reference');
    console.log('• Visit: ' + chalk.blue(config.project.url) + '\n');

    console.log(chalk.gray('Configuration saved to .env (never commit this file!)'));
  }

  /**
   * Ask a question with validation
   */
  async validateInput(question, validator, errorMessage) {
    while (true) {
      const answer = await this.ask(question);
      
      if (validator(answer)) {
        return answer;
      }
      
      console.log(chalk.red(`Invalid input: ${errorMessage}`));
    }
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
   * Ask for password (note: doesn't actually hide input in basic Node.js)
   */
  async askPassword(question) {
    const password = await this.ask(question);
    
    if (!password.trim()) {
      console.log(chalk.red('Password cannot be empty'));
      return await this.askPassword(question);
    }
    
    return password;
  }
}

// Show help if requested
if (process.argv.includes('--help')) {
  console.log(chalk.bold('SupplySide Deployment Setup Wizard\n'));
  console.log('This interactive wizard helps you configure deployment to Hostinger.\n');
  console.log('You will need:');
  console.log('• Hostinger FTP credentials');
  console.log('• FTP IP address from hPanel');
  console.log('• FTP username and password\n');
  console.log('Usage: npm run deploy:setup');
  process.exit(0);
}

// Run wizard
const wizard = new SetupWizard();
wizard.run();