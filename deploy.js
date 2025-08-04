#!/usr/bin/env node

const { Client } = require('basic-ftp');
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
// Simple spinner for progress indication
const spinner = {
    text: '',
    isSpinning: false,
    start(text) {
        this.text = text;
        this.isSpinning = true;
        console.log(chalk.blue('⠋'), text);
        return this;
    },
    succeed(text) {
        console.log(chalk.green('✓'), text || this.text);
        this.isSpinning = false;
        return this;
    },
    fail(text) {
        console.log(chalk.red('✗'), text || this.text);
        this.isSpinning = false;
        return this;
    }
};
const config = require('./deploy-config.json');

// Load environment variables
require('dotenv').config();

// Deployment statistics
let stats = {
    filesUploaded: 0,
    filesFailed: 0,
    bytesTransferred: 0,
    startTime: Date.now(),
    retryCount: 0
};

// Logger utility
const log = {
    info: (msg) => console.log(chalk.blue('ℹ'), msg),
    success: (msg) => console.log(chalk.green('✓'), msg),
    error: (msg) => console.log(chalk.red('✗'), msg),
    warn: (msg) => console.log(chalk.yellow('⚠'), msg),
    debug: (msg) => {
        if (process.env.DEBUG_MODE === 'true') {
            console.log(chalk.gray('[DEBUG]'), msg);
        }
    }
};

// Sleep utility for delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Exponential backoff calculator
function calculateBackoff(attempt) {
    const delay = config.deployment.retry.delay;
    const multiplier = config.deployment.retry.backoffMultiplier;
    const maxDelay = config.deployment.retry.maxDelay;
    
    const backoff = Math.min(delay * Math.pow(multiplier, attempt - 1), maxDelay);
    return Math.round(backoff);
}

// Get FTP configuration from environment
function getFTPConfig() {
    const requiredVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASS'];
    const missing = requiredVars.filter(v => !process.env[v]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}\nPlease check your .env file`);
    }
    
    // Check if using domain name instead of IP
    if (process.env.FTP_HOST.includes('.com') || process.env.FTP_HOST.includes('.net')) {
        log.warn('You appear to be using a domain name for FTP_HOST');
        log.warn('Hostinger requires using the FTP IP address from hPanel');
        log.warn('Example: 185.28.21.XXX (not ftp.yourdomain.com)');
    }
    
    return {
        host: process.env.FTP_HOST,
        port: parseInt(process.env.FTP_PORT || '21'),
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: false,
        ...config.deployment.connection
    };
}

// Create FTP client with Hostinger-optimized settings
async function createFTPClient() {
    const client = new Client();
    
    // Set Hostinger-specific configurations
    client.ftp.verbose = process.env.DEBUG_MODE === 'true';
    client.ftp.timeout = config.deployment.connection.timeout;
    
    // Configure event handlers
    client.trackProgress(info => {
        if (info.type === 'upload') {
            stats.bytesTransferred += info.bytes;
        }
    });
    
    return client;
}

// Connect to FTP with retry logic
async function connectWithRetry(client, ftpConfig) {
    const maxAttempts = config.deployment.retry.attempts;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            log.info(`Connecting to ${ftpConfig.host}:${ftpConfig.port} (attempt ${attempt}/${maxAttempts})`);
            
            await client.access(ftpConfig);
            
            log.success('Connected successfully!');
            log.debug(`Server: ${client.ftp.version}`);
            
            // Ensure passive mode
            await client.ensureDir(process.env.FTP_REMOTE_ROOT || '/public_html');
            
            return true;
        } catch (error) {
            stats.retryCount++;
            log.error(`Connection failed: ${error.message}`);
            
            // Check for specific Hostinger errors
            if (error.code === 530) {
                log.error('Authentication failed. Please check:');
                log.error('- Username format (should be u12345678 or u12345678.domain)');
                log.error('- Password is correct');
                log.error('- Account is not suspended');
                throw error; // Don't retry auth errors
            }
            
            if (attempt < maxAttempts) {
                const delay = calculateBackoff(attempt);
                log.info(`Waiting ${delay / 1000} seconds before retry...`);
                await sleep(delay);
            } else {
                throw error;
            }
        }
    }
    
    return false;
}

// Get list of files to upload
async function getFilesToUpload(localRoot) {
    const files = [];
    const config_paths = config.deployment.paths;
    
    async function scanDirectory(dir, baseDir = '') {
        const items = await fs.readdir(dir);
        
        for (const item of items) {
            const fullPath = path.join(dir, item);
            const relativePath = path.join(baseDir, item);
            const stat = await fs.stat(fullPath);
            
            // Check if excluded
            const isExcluded = config_paths.exclude.some(pattern => {
                const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
                return regex.test(relativePath);
            });
            
            if (isExcluded) {
                log.debug(`Skipping excluded: ${relativePath}`);
                continue;
            }
            
            if (stat.isDirectory()) {
                await scanDirectory(fullPath, relativePath);
            } else {
                // Check if included
                const isIncluded = config_paths.include.some(pattern => {
                    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
                    return regex.test(relativePath);
                });
                
                if (isIncluded) {
                    files.push({
                        local: fullPath,
                        remote: relativePath.replace(/\\/g, '/'),
                        size: stat.size
                    });
                }
            }
        }
    }
    
    await scanDirectory(localRoot);
    return files;
}

// Upload a single file with retry logic
async function uploadFile(client, file, remoteRoot) {
    const maxAttempts = 3;
    const remotePath = path.posix.join(remoteRoot, file.remote);
    const remoteDir = path.posix.dirname(remotePath);
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Ensure remote directory exists
            await client.ensureDir(remoteDir);
            
            // Use atomic upload if configured
            if (config.deployment.fileHandling.atomicUploads) {
                const tempPath = remotePath + config.deployment.fileHandling.tempExtension;
                await client.uploadFrom(file.local, tempPath);
                await client.rename(tempPath, remotePath);
            } else {
                await client.uploadFrom(file.local, remotePath);
            }
            
            stats.filesUploaded++;
            return true;
        } catch (error) {
            log.debug(`Upload failed (attempt ${attempt}): ${error.message}`);
            
            if (attempt < maxAttempts) {
                await sleep(2000); // Brief pause between retries
            } else {
                stats.filesFailed++;
                throw error;
            }
        }
    }
    
    return false;
}

// Main deployment function
async function deploy() {
    spinner.start('Initializing deployment...');
    
    try {
        // Get configuration
        const ftpConfig = getFTPConfig();
        const localRoot = process.env.LOCAL_ROOT || './';
        const remoteRoot = process.env.FTP_REMOTE_ROOT || '/public_html';
        
        // Get files to upload
        spinner.text = 'Scanning local files...';
        const files = await getFilesToUpload(localRoot);
        
        if (files.length === 0) {
            spinner.fail('No files to upload');
            return;
        }
        
        spinner.succeed(`Found ${files.length} files to upload`);
        
        // Create FTP client
        const client = await createFTPClient();
        
        try {
            // Connect to server
            spinner.start('Connecting to FTP server...');
            await connectWithRetry(client, ftpConfig);
            spinner.succeed('Connected to FTP server');
            
            // Upload files in batches
            const batchSize = config.deployment.concurrency.batchSize;
            const totalBatches = Math.ceil(files.length / batchSize);
            
            for (let i = 0; i < files.length; i += batchSize) {
                const batch = files.slice(i, i + batchSize);
                const batchNum = Math.floor(i / batchSize) + 1;
                
                spinner.start(`Uploading batch ${batchNum}/${totalBatches}...`);
                
                // Process batch with connection limit
                const uploadPromises = [];
                for (const file of batch) {
                    // Add delay between uploads
                    if (uploadPromises.length > 0) {
                        await sleep(config.deployment.concurrency.uploadDelay);
                    }
                    
                    const promise = uploadFile(client, file, remoteRoot)
                        .then(() => {
                            spinner.text = `Uploaded: ${file.remote}`;
                        })
                        .catch(error => {
                            log.error(`Failed to upload ${file.remote}: ${error.message}`);
                        });
                    
                    uploadPromises.push(promise);
                    
                    // Limit concurrent uploads
                    if (uploadPromises.length >= config.deployment.concurrency.maxConnections) {
                        await Promise.race(uploadPromises);
                        uploadPromises.splice(0, 1);
                    }
                }
                
                // Wait for remaining uploads in batch
                await Promise.all(uploadPromises);
                
                // Delay between batches
                if (i + batchSize < files.length) {
                    await sleep(config.deployment.concurrency.connectionDelay);
                }
            }
            
            spinner.succeed('All files uploaded successfully!');
            
        } finally {
            // Always close the connection
            client.close();
        }
        
        // Display summary
        const duration = (Date.now() - stats.startTime) / 1000;
        const mbTransferred = (stats.bytesTransferred / (1024 * 1024)).toFixed(2);
        
        console.log('\n' + chalk.bold('Deployment Summary:'));
        console.log(chalk.green(`✓ Files uploaded: ${stats.filesUploaded}`));
        if (stats.filesFailed > 0) {
            console.log(chalk.red(`✗ Files failed: ${stats.filesFailed}`));
        }
        console.log(chalk.blue(`ℹ Data transferred: ${mbTransferred} MB`));
        console.log(chalk.blue(`ℹ Duration: ${duration.toFixed(1)} seconds`));
        if (stats.retryCount > 0) {
            console.log(chalk.yellow(`⚠ Connection retries: ${stats.retryCount}`));
        }
        
        console.log('\n' + chalk.green.bold('Deployment completed successfully! 🚀'));
        console.log(chalk.gray(`Your site should be live at: http://${process.env.FTP_HOST}`));
        
    } catch (error) {
        spinner.fail('Deployment failed');
        log.error(error.message);
        
        // Provide helpful troubleshooting tips
        console.log('\n' + chalk.yellow('Troubleshooting tips:'));
        console.log('1. Verify your FTP IP address in Hostinger hPanel');
        console.log('2. Check username format (u12345678 or u12345678.domain)');
        console.log('3. Ensure your account is active and not suspended');
        console.log('4. Try disabling firewall/VPN temporarily');
        console.log('5. Contact Hostinger support if issues persist');
        
        process.exit(1);
    }
}

// Handle script termination
process.on('SIGINT', () => {
    console.log('\n' + chalk.yellow('Deployment cancelled by user'));
    process.exit(0);
});

// Run deployment
if (require.main === module) {
    deploy();
}

module.exports = { deploy };