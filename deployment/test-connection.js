#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - FTP Connection Test Script
 * Tests FTP connection without deploying anything
 */

const ftp = require('basic-ftp');
const chalk = require('chalk');
const dotenv = require('dotenv');
const config = require('./config');

// Load environment variables
dotenv.config();
dotenv.config({ path: '.env.local' });

class ConnectionTester {
  constructor() {
    this.client = new ftp.Client();
  }

  /**
   * Test FTP connection
   */
  async test() {
    console.log(chalk.bold.blue('SupplySide FTP Connection Test\n'));

    try {
      // Validate environment
      console.log(chalk.blue('🔍 Validating configuration...'));
      this.validateConfig();
      console.log(chalk.green('✓ Configuration valid\n'));

      // Show connection details
      this.showConnectionDetails();

      // Test connection
      console.log(chalk.blue('🔗 Testing FTP connection...'));
      await this.testConnection();

      // Test directory access
      console.log(chalk.blue('📁 Testing directory access...'));
      await this.testDirectoryAccess();

      // Test permissions
      console.log(chalk.blue('🔒 Testing write permissions...'));
      await this.testWritePermissions();

      // List remote files
      console.log(chalk.blue('📋 Listing remote files...'));
      await this.listRemoteFiles();

      console.log(chalk.green.bold('\n🎉 All tests passed! Ready to deploy.'));

    } catch (error) {
      console.error(chalk.red.bold('\n❌ Connection test failed:'), error.message);
      this.showTroubleshootingTips(error);
      process.exit(1);
    } finally {
      await this.disconnect();
    }
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    const missing = [];
    
    for (const varName of config.validation.requiredEnvVars) {
      if (!process.env[varName]) {
        missing.push(varName);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }

    // Validate formats
    if (!config.validation.ftpHostPattern.test(process.env.FTP_HOST)) {
      throw new Error(config.errors.INVALID_HOST);
    }

    if (!config.validation.usernamePattern.test(process.env.FTP_USER)) {
      throw new Error(config.errors.INVALID_USER);
    }
  }

  /**
   * Show connection details
   */
  showConnectionDetails() {
    console.log(chalk.gray('Connection Details:'));
    console.log(chalk.gray(`  Host: ${process.env.FTP_HOST}`));
    console.log(chalk.gray(`  Port: ${process.env.FTP_PORT || 21}`));
    console.log(chalk.gray(`  User: ${process.env.FTP_USER}`));
    console.log(chalk.gray(`  Pass: ${'*'.repeat(process.env.FTP_PASS?.length || 0)}`));
    console.log(chalk.gray(`  Remote: ${process.env.REMOTE_PATH || '/public_html'}`));
    console.log();
  }

  /**
   * Test basic FTP connection
   */
  async testConnection() {
    this.client.ftp.verbose = process.env.DEBUG === 'true';

    try {
      await this.client.access({
        host: process.env.FTP_HOST,
        port: parseInt(process.env.FTP_PORT) || 21,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: config.ftp.secure,
        secureOptions: { rejectUnauthorized: false }
      });

      console.log(chalk.green('✓ FTP connection established'));
      
      // Get server info
      try {
        const pwd = await this.client.pwd();
        console.log(chalk.gray(`  Working directory: ${pwd}`));
      } catch (error) {
        console.log(chalk.yellow('  ⚠ Could not get working directory'));
      }

    } catch (error) {
      throw new Error(`Connection failed: ${error.message}`);
    }
  }

  /**
   * Test directory access
   */
  async testDirectoryAccess() {
    const remotePath = process.env.REMOTE_PATH || '/public_html';

    try {
      await this.client.cd(remotePath);
      console.log(chalk.green(`✓ Successfully accessed ${remotePath}`));
      
      const pwd = await this.client.pwd();
      console.log(chalk.gray(`  Current directory: ${pwd}`));

    } catch (error) {
      throw new Error(`Directory access failed: ${error.message}`);
    }
  }

  /**
   * Test write permissions
   */
  async testWritePermissions() {
    const testFile = '.deployment-test';
    const testContent = `SupplySide deployment test - ${new Date().toISOString()}`;

    try {
      // Try to upload a test file
      await this.client.uploadFrom(
        Buffer.from(testContent),
        testFile
      );
      console.log(chalk.green('✓ Write permission confirmed'));

      // Try to delete the test file
      try {
        await this.client.remove(testFile);
        console.log(chalk.green('✓ Delete permission confirmed'));
      } catch (error) {
        console.log(chalk.yellow('  ⚠ Could not delete test file (manual cleanup needed)'));
      }

    } catch (error) {
      if (error.code === 550) {
        throw new Error('No write permission in target directory');
      } else {
        throw new Error(`Write test failed: ${error.message}`);
      }
    }
  }

  /**
   * List remote files
   */
  async listRemoteFiles() {
    try {
      const list = await this.client.list();
      
      console.log(chalk.green(`✓ Directory listing successful (${list.length} items)`));
      
      if (list.length > 0) {
        console.log(chalk.gray('  Remote files:'));
        
        // Show first 10 items
        const itemsToShow = list.slice(0, 10);
        for (const item of itemsToShow) {
          const type = item.isDirectory ? 'DIR' : 'FILE';
          const size = item.isDirectory ? '' : ` (${item.size} bytes)`;
          console.log(chalk.gray(`    ${type}: ${item.name}${size}`));
        }
        
        if (list.length > 10) {
          console.log(chalk.gray(`    ... and ${list.length - 10} more items`));
        }
      } else {
        console.log(chalk.yellow('  ⚠ Directory is empty'));
      }

    } catch (error) {
      throw new Error(`Directory listing failed: ${error.message}`);
    }
  }

  /**
   * Show troubleshooting tips based on error
   */
  showTroubleshootingTips(error) {
    console.log(chalk.yellow('\n🔧 Troubleshooting Tips:\n'));

    if (error.message.includes('530') || error.message.includes('Authentication')) {
      console.log(chalk.yellow('Authentication Issues:'));
      console.log('• Check username format: u921052894.SupplySide');
      console.log('• Verify password has no extra spaces');
      console.log('• Ensure account is not suspended in hPanel');
      console.log('• Try recreating FTP account in hPanel');
    }

    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.log(chalk.yellow('Connection Timeout:'));
      console.log('• Use FTP IP address (185.212.71.198) not domain');
      console.log('• Check firewall/antivirus settings');
      console.log('• Try different network connection');
      console.log('• Verify port 21 is not blocked');
    }

    if (error.message.includes('550') || error.message.includes('directory')) {
      console.log(chalk.yellow('Directory Issues:'));
      console.log('• Check REMOTE_PATH setting (/public_html)');
      console.log('• Verify directory exists in File Manager');
      console.log('• Check if using correct username format');
    }

    if (error.message.includes('ENOTFOUND')) {
      console.log(chalk.yellow('Host Not Found:'));
      console.log('• Must use IP address: 185.212.71.198');
      console.log('• Cannot use domain name for FTP host');
      console.log('• Double-check IP in hPanel → FTP Accounts');
    }

    console.log(chalk.blue('\n📚 More help:'));
    console.log('• Read DEPLOYMENT.md for detailed troubleshooting');  
    console.log('• Run: npm run deploy:discover (if config is lost)');
    console.log('• Contact Hostinger support via hPanel');
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
}

// Handle CLI arguments
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(chalk.bold('SupplySide FTP Connection Test\n'));
  console.log('Usage: npm run deploy:test [options]\n');
  console.log('Options:');
  console.log('  --help     Show this help');
  console.log('  --verbose  Enable debug output');
  console.log('\nThis tool tests your FTP connection without deploying files.');
  process.exit(0);
}

if (args.includes('--verbose')) {
  process.env.DEBUG = 'true';
}

// Run test
const tester = new ConnectionTester();
tester.test();