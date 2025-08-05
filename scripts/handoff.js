#!/usr/bin/env node

/**
 * SupplySide Flooring Installation - Project Handoff Script
 * Provides status overview for new Claude Code sessions
 */

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { spawn } = require('child_process');

class ProjectHandoff {
  constructor() {
    this.status = {
      files: [],
      config: {},
      issues: [],
      ready: false
    };
  }

  /**
   * Generate handoff report
   */
  async generateReport() {
    console.log(chalk.bold.blue('🔄 SupplySide Project Handoff Report\n'));
    console.log(chalk.gray(`Generated: ${new Date().toISOString()}\n`));

    try {
      // Check project structure
      await this.checkProjectStructure();
      
      // Check configuration
      await this.checkConfiguration();
      
      // Check deployment readiness
      await this.checkDeploymentReadiness();
      
      // Check git status
      await this.checkGitStatus();
      
      // Show summary
      this.showSummary();
      
      // Save report
      await this.saveHandoffReport();
      
    } catch (error) {
      console.error(chalk.red('Handoff report generation failed:'), error.message);
    }
  }

  /**
   * Check project file structure
   */
  async checkProjectStructure() {
    console.log(chalk.blue('📁 Project Structure Check\n'));

    const requiredFiles = [
      'index.html',
      'about.html', 
      'css/style.css',
      'css/about.css',
      'js/',
      'images/',
      'DEPLOYMENT.md',
      '.env.example',
      'package.json'
    ];

    const requiredDirs = [
      'deployment/',
      'scripts/'
    ];

    const deploymentFiles = [
      'deployment/config.js',
      'deployment/deploy.js',
      'deployment/verify-setup.js',
      'deployment/test-connection.js',
      'deployment/discover-config.js',
      'deployment/setup-wizard.js'
    ];

    // Check main files
    for (const file of requiredFiles) {
      try {
        await fs.access(file);
        console.log(chalk.green(`✓ ${file}`));
        this.status.files.push({ file, status: 'present' });
      } catch (error) {
        console.log(chalk.red(`✗ ${file} - MISSING`));
        this.status.files.push({ file, status: 'missing' });
        this.status.issues.push(`Missing required file: ${file}`);
      }
    }

    // Check deployment system
    console.log(chalk.blue('\n🚀 Deployment System Check\n'));
    
    for (const file of deploymentFiles) {
      try {
        await fs.access(file);
        console.log(chalk.green(`✓ ${file}`));
      } catch (error) {
        console.log(chalk.red(`✗ ${file} - MISSING`));
        this.status.issues.push(`Missing deployment file: ${file}`);
      }
    }
  }

  /**
   * Check configuration status
   */
  async checkConfiguration() {
    console.log(chalk.blue('\n⚙️ Configuration Check\n'));

    // Check .env file
    try {
      await fs.access('.env');
      console.log(chalk.green('✓ .env file exists'));
      
      // Parse .env
      const envContent = await fs.readFile('.env', 'utf8');
      const lines = envContent.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, value] = trimmed.split('=', 2);
          if (key && value) {
            this.status.config[key.trim()] = value.trim();
          }
        }
      }
      
      // Check required variables
      const required = ['FTP_HOST', 'FTP_USER', 'FTP_PASS', 'REMOTE_PATH'];
      const missing = required.filter(key => !this.status.config[key]);
      
      if (missing.length === 0) {
        console.log(chalk.green('✓ All required environment variables present'));
      } else {
        console.log(chalk.red(`✗ Missing environment variables: ${missing.join(', ')}`));
        this.status.issues.push(`Missing env vars: ${missing.join(', ')}`);
      }
      
    } catch (error) {
      console.log(chalk.red('✗ .env file missing'));
      this.status.issues.push('No .env configuration file');
    }

    // Check .env.example
    try {
      await fs.access('.env.example');
      console.log(chalk.green('✓ .env.example template exists'));
    } catch (error) {
      console.log(chalk.yellow('⚠ .env.example template missing'));
    }
  }

  /**
   * Check deployment readiness
   */
  async checkDeploymentReadiness() {
    console.log(chalk.blue('\n🎯 Deployment Readiness Check\n'));

    // Check if we can run verification
    if (this.status.config.FTP_HOST && this.status.config.FTP_USER) {
      console.log(chalk.blue('Running deployment verification...'));
      
      try {
        await this.runCommand('node', ['deployment/verify-setup.js']);
        console.log(chalk.green('✓ Deployment verification passed'));
        this.status.ready = true;
      } catch (error) {
        console.log(chalk.red('✗ Deployment verification failed'));
        this.status.issues.push('Deployment verification failed');
      }
    } else {
      console.log(chalk.yellow('⚠ Cannot verify deployment - missing FTP config'));
      this.status.issues.push('FTP configuration incomplete');
    }
  }

  /**
   * Check git status
   */
  async checkGitStatus() {
    console.log(chalk.blue('\n📝 Git Status Check\n'));

    try {
      // Check if it's a git repo
      await this.runCommand('git', ['status', '--porcelain']);
      
      const gitStatus = await this.runCommand('git', ['status', '--short']);
      
      if (gitStatus.trim()) {
        console.log(chalk.yellow('⚠ Uncommitted changes:'));
        console.log(gitStatus);
      } else {
        console.log(chalk.green('✓ Working directory clean'));
      }
      
      // Get current branch
      const branch = await this.runCommand('git', ['branch', '--show-current']);
      console.log(chalk.blue(`Current branch: ${branch.trim()}`));
      
      // Get recent commits
      const recentCommits = await this.runCommand('git', ['log', '--oneline', '-5']);
      console.log(chalk.blue('\nRecent commits:'));
      console.log(chalk.gray(recentCommits));
      
    } catch (error) {
      console.log(chalk.gray('- Not a git repository or git not available'));
    }
  }

  /**
   * Show handoff summary
   */
  showSummary() {
    console.log(chalk.bold('\n📊 Project Summary\n'));

    // Project info
    console.log(chalk.bold('Project: ') + chalk.cyan('SupplySide Flooring Installation'));
    console.log(chalk.bold('Website: ') + chalk.blue('https://mediumblue-chamois-837591.hostingersite.com'));
    console.log(chalk.bold('Server: ') + chalk.cyan('Hostinger (185.212.71.198)'));
    
    // Configuration status
    if (Object.keys(this.status.config).length > 0) {
      console.log(chalk.bold('\nFTP Configuration:'));
      console.log(`  Host: ${this.status.config.FTP_HOST || 'Not set'}`);
      console.log(`  User: ${this.status.config.FTP_USER || 'Not set'}`);
      console.log(`  Path: ${this.status.config.REMOTE_PATH || 'Not set'}`);
    }

    // Issues
    if (this.status.issues.length > 0) {
      console.log(chalk.bold.red('\n⚠ Issues to Address:\n'));
      this.status.issues.forEach(issue => {
        console.log(chalk.red(`• ${issue}`));
      });
    } else {
      console.log(chalk.bold.green('\n✅ No issues detected'));
    }

    // Readiness status
    if (this.status.ready) {
      console.log(chalk.bold.green('\n🚀 Ready to Deploy!'));
      console.log(chalk.gray('Run: npm run deploy'));
    } else {
      console.log(chalk.bold.yellow('\n⚠ Not Ready to Deploy'));
      console.log(chalk.gray('Fix issues above, then run: npm run deploy:verify'));
    }

    // Quick commands
    console.log(chalk.bold('\n🔧 Quick Commands:\n'));
    console.log(chalk.cyan('npm run deploy') + '          - Deploy to production');
    console.log(chalk.cyan('npm run deploy:setup') + '    - Run setup wizard');
    console.log(chalk.cyan('npm run deploy:test') + '     - Test FTP connection');
    console.log(chalk.cyan('npm run deploy:verify') + '   - Verify setup');
    console.log(chalk.cyan('npm run handoff') + '         - Generate this report');
  }

  /**
   * Save handoff report to file
   */
  async saveHandoffReport() {
    const timestamp = new Date().toISOString();
    
    const report = {
      timestamp,
      project: 'SupplySide Flooring Installation',
      version: '2.0.0',
      website: 'https://mediumblue-chamois-837591.hostingersite.com',
      server: {
        provider: 'Hostinger',
        ip: '185.212.71.198',
        name: 'server648'
      },
      status: this.status,
      quickStart: {
        setup: 'npm run deploy:setup',
        test: 'npm run deploy:test', 
        deploy: 'npm run deploy',
        verify: 'npm run deploy:verify'
      },
      documentation: [
        'DEPLOYMENT.md - Complete deployment guide',
        '.env.example - Configuration template',
        'deployment/ - All deployment scripts'
      ],
      lastUpdated: timestamp
    };

    try {
      await fs.writeFile('PROJECT-HANDOFF.md', this.generateMarkdownReport(report));
      console.log(chalk.green('\n✓ Handoff report saved to PROJECT-HANDOFF.md'));
    } catch (error) {
      console.log(chalk.yellow('⚠ Could not save handoff report'));
    }
  }

  /**
   * Generate markdown handoff report
   */
  generateMarkdownReport(report) {
    return `# SupplySide Flooring Installation - Project Handoff

*Generated: ${report.timestamp}*

## 🏢 Project Overview

- **Project**: ${report.project}
- **Version**: ${report.version}
- **Website**: ${report.website}
- **Server**: ${report.server.provider} (${report.server.ip})

## 🎯 Current Status

${report.status.ready ? '✅ **Ready to Deploy**' : '⚠️ **Setup Required**'}

### Configuration Status
${Object.keys(report.status.config).length > 0 ? '✅ Configuration present' : '❌ No configuration found'}

### Issues
${report.status.issues.length === 0 ? 'None detected' : report.status.issues.map(issue => `- ${issue}`).join('\n')}

## 🚀 Quick Start Commands

\`\`\`bash
# Setup (first time)
${report.quickStart.setup}

# Test connection
${report.quickStart.test}

# Deploy to production
${report.quickStart.deploy}

# Verify setup
${report.quickStart.verify}
\`\`\`

## 📚 Documentation

${report.documentation.map(doc => `- ${doc}`).join('\n')}

## 🔧 Deployment System

This project uses a bulletproof deployment system designed to persist across Claude Code sessions:

- **Self-documenting**: All configuration is documented
- **Recovery mechanisms**: Can recover lost configuration  
- **Multiple verification layers**: Comprehensive testing
- **Backup system**: Automatic backups before deployment
- **Error handling**: Detailed error messages and troubleshooting

## 📞 Support

- **Hostinger Support**: Available in hPanel
- **Documentation**: See DEPLOYMENT.md for complete guide
- **Configuration Issues**: Run \`npm run deploy:discover\`
- **Connection Issues**: Run \`npm run deploy:test\`

---

*Last updated: ${report.lastUpdated}*
*Deployment system version: 2.0*
`;
  }

  /**
   * Run a command and return output
   */
  runCommand(command, args) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, { stdio: 'pipe' });
      let output = '';
      let error = '';

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(error || `Command failed with code ${code}`));
        }
      });
    });
  }
}

// Run handoff report
const handoff = new ProjectHandoff();
handoff.generateReport();