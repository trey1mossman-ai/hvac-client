# SupplySide Flooring Installation - Deployment Guide

## 🚀 Quick Start

```bash
# First time setup
npm run deploy:setup

# Deploy to Hostinger
npm run deploy

# Lost configuration? Recover it
npm run deploy:discover
```

## 📋 Table of Contents

1. [Hostinger Configuration](#hostinger-configuration)
2. [FTP Credentials](#ftp-credentials)
3. [Deployment Process](#deployment-process)
4. [Troubleshooting](#troubleshooting)
5. [Recovery Procedures](#recovery-procedures)
6. [Testing](#testing)
7. [Rollback](#rollback)

## 🔧 Hostinger Configuration

### Hosting Details
- **Website URL**: https://peachpuff-caterpillar-314202.hostingersite.com
- **Server IP**: TBD (get from Hostinger FTP settings)
- **Server Name**: TBD
- **Server Location**: North America (USA)

### FTP Access Points
- **Primary FTP IP**: TBD (get from Hostinger FTP settings)
- **FTP Hostname**: ftp://peachpuff-caterpillar-314202.hostingersite.com
- **FTP Port**: 21
- **SFTP Port**: 65002 (Premium plans only)

### Directory Structure
```
When using username: u921052894.SupplySide
→ Connects directly to: /public_html

When using username: u921052894.mediumblue-chamois-837591.hostingersite.com
→ Connects to: /home/u921052894/domains/mediumblue-chamois-837591.hostingersite.com/public_html
```

## 🔑 FTP Credentials

### Environment Variables Required
Create a `.env` file with:

```env
# Hostinger FTP Configuration
FTP_HOST=185.212.71.198
FTP_PORT=21
FTP_USER=u921052894.SupplySide
FTP_PASS=your_ftp_password_here

# Deployment Settings
REMOTE_PATH=/public_html
LOCAL_PATH=./
DEPLOYMENT_MODE=production
```

### Getting Credentials from Hostinger
1. Login to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Navigate to: **Files → FTP Accounts**
3. Click on your FTP account
4. Copy the **FTP IP** (not hostname)
5. Note the username format

⚠️ **IMPORTANT**: Always use the FTP IP address, not the domain name!

## 📤 Deployment Process

### Step 1: Verify Setup
```bash
npm run deploy:verify
```
This checks:
- ✓ .env file exists
- ✓ All required variables set
- ✓ FTP connection works
- ✓ Remote directory accessible

### Step 2: Test Connection
```bash
npm run deploy:test
```
Tests FTP without deploying anything.

### Step 3: Deploy
```bash
npm run deploy
```

### What Gets Deployed
```
Local → Remote
./index.html → /public_html/index.html
./about.html → /public_html/about.html
./css/* → /public_html/css/*
./js/* → /public_html/js/*
./images/* → /public_html/images/*
./fonts/* → /public_html/fonts/*
```

### Files Excluded
- .env, .git, node_modules
- deployment directory
- *.md files
- Configuration files

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. "530 Authentication Failed"
**Cause**: Wrong username/password format
**Solution**: 
- Check username format: `u921052894.SupplySide`
- Verify password has no extra spaces
- Ensure account is not suspended

#### 2. "Connection Timeout"
**Cause**: Wrong FTP host or firewall
**Solution**:
- Use IP (185.212.71.198) not domain
- Check firewall settings
- Try passive mode

#### 3. "550 No Such Directory"
**Cause**: Wrong remote path
**Solution**:
- With u921052894.SupplySide → use `/public_html`
- Check current directory after login

#### 4. Files Upload But Don't Show on Website
**Cause**: Hostinger cache
**Solution**:
1. Login to hPanel
2. Go to: **Websites → Dashboard → Cache Manager**
3. Click **"Purge All"**
4. Wait 2-5 minutes

### Debug Mode
```bash
# Enable verbose logging
DEBUG=true npm run deploy
```

## 🔄 Recovery Procedures

### Lost .env File?

1. Run discovery:
```bash
npm run deploy:discover
```

2. Check for backups:
```bash
ls -la .env*
cat .env.example
```

3. Manual recovery from hPanel:
- Login to Hostinger
- Go to: **Files → FTP Accounts**
- Recreate .env with credentials

### Lost All Configuration?

1. Run setup wizard:
```bash
npm run deploy:setup
```

2. Have ready:
- Hostinger login
- FTP password
- Server IP (185.212.71.198)

### Connection Works But Deploy Fails?

1. Check remote structure:
```bash
npm run deploy:test -- --list
```

2. Try manual FTP:
```bash
# Using command line FTP
ftp 185.212.71.198
```

## 🧪 Testing

### Pre-Deployment Tests
```bash
# Test FTP connection
npm run deploy:test

# Verify all files present
npm run deploy:verify

# Dry run (shows what would deploy)
npm run deploy -- --dry-run
```

### Post-Deployment Tests
1. Check main URL: https://mediumblue-chamois-837591.hostingersite.com
2. Test with cache bypass: Add `?v=timestamp`
3. Check from incognito mode
4. Verify all pages load

## ↩️ Rollback

### Quick Rollback
```bash
# Deploy previous version
git checkout HEAD~1
npm run deploy
git checkout main
```

### Manual Rollback via hPanel
1. Login to Hostinger hPanel
2. Go to: **Files → File Manager**
3. Navigate to public_html
4. Restore from backups or upload previous files

## 📊 Deployment Checklist

Before deploying:
- [ ] All changes committed to git
- [ ] Tested locally
- [ ] Images optimized
- [ ] CSS/JS minified (if needed)
- [ ] .env file configured
- [ ] Connection tested

After deploying:
- [ ] Clear Hostinger cache
- [ ] Test all pages
- [ ] Check mobile responsive
- [ ] Verify forms work
- [ ] Test in multiple browsers

## 🆘 Emergency Contacts

### Hostinger Support
- **Live Chat**: Available in hPanel
- **Email**: support@hostinger.com
- **Knowledge Base**: https://support.hostinger.com

### Quick Commands Reference
```bash
npm run deploy          # Deploy to production
npm run deploy:test     # Test connection
npm run deploy:verify   # Check setup
npm run deploy:setup    # Initial setup
npm run deploy:discover # Find lost config
npm run deploy:help     # Show this guide
```

## 🔐 Security Notes

1. **Never commit .env file** - It's in .gitignore
2. **Use strong FTP passwords** - Min 12 chars, mixed case, numbers, symbols
3. **Rotate credentials regularly** - Every 90 days
4. **Use SFTP when available** - Port 65002 on Premium plans

## 📝 Notes for Future Sessions

When returning to this project:
1. Run `npm run handoff` for status check
2. Run `npm run deploy:verify` to ensure setup
3. Check `PROJECT-HANDOFF.md` for session notes
4. Update credentials if expired

---

*Last updated: August 2025*
*Deployment system version: 2.0*