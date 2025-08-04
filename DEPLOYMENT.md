# SupplySide Website Deployment Guide

## 🚀 Quick Start

1. **Get your FTP IP from Hostinger hPanel**:
   - Log into [Hostinger hPanel](https://hpanel.hostinger.com)
   - Go to **Files → FTP Accounts**
   - Click on your FTP account
   - Copy the **FTP IP address** (NOT the domain name!)
   - It will look like: `185.28.21.XXX` or similar

2. **Update the .env file**:
   ```bash
   # Edit .env and replace FTP_HOST with your actual IP
   FTP_HOST=YOUR_FTP_IP_HERE
   ```

3. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

4. **Deploy to Hostinger**:
   ```bash
   npm run deploy
   ```

## 📋 Configuration

### Environment Variables (.env)
```env
FTP_HOST=148.135.128.145       # Your FTP IP from hPanel
FTP_PORT=21                     # Use 21 for FTP, 65002 for SFTP (Premium)
FTP_USER=u921052894.SupplySide # Your username
FTP_PASS=your_password          # Your FTP password
FTP_REMOTE_ROOT=/public_html    # Remote directory
DEBUG_MODE=true                 # Enable verbose logging
```

### Important Hostinger Requirements
- ✅ **MUST use FTP IP address** (not domain name)
- ✅ **Passive mode is REQUIRED**
- ✅ **Maximum 8 concurrent connections**
- ✅ **Timeout after 20 seconds of inactivity**

## 🛠️ Deployment Commands

```bash
# Standard deployment
npm run deploy

# Verbose deployment (with debug info)
npm run deploy:verbose

# Check configuration without deploying
npm run deploy:check
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Connection Timeout
```
Error: Timeout (control socket)
```
**Solution**: 
- Verify you're using the FTP IP (not domain)
- Check firewall isn't blocking port 21
- Try increasing timeout in .env

#### 2. Authentication Failed (Error 530)
```
Error: 530 Login authentication failed
```
**Solution**:
- Check username format: `u12345678` or `u12345678.domain`
- Verify password is correct
- Ensure account is active in hPanel

#### 3. Too Many Connections (Error 421)
```
Error: 421 Too many connections from this IP
```
**Solution**:
- Wait 5 minutes and try again
- Reduce `FTP_MAX_CONNECTIONS` in .env
- Close any FTP clients (FileZilla, etc.)

#### 4. Can't Open Data Connection
```
Error: 425 Can't open data connection
```
**Solution**:
- Ensure passive mode is enabled (it is by default)
- Check VPN isn't interfering
- Try from a different network

### Getting Your FTP IP

1. **Via hPanel**:
   ![FTP Details](https://example.com/ftp-details.png)
   - Navigate to: Files → FTP Accounts
   - Click on your account
   - Copy the IP address shown

2. **Via Command Line** (if you know your domain):
   ```bash
   # This gives you possible IPs, but use hPanel for the correct one
   nslookup ftp.yourdomain.com
   ```

### Manual FTP Test

Test your credentials manually:
```bash
# Using curl
curl -v ftp://u921052894.SupplySide:yourpassword@148.135.128.145/

# Using ftp command (if available)
ftp 148.135.128.145
# Then enter username and password when prompted
```

## 📁 What Gets Deployed

### Included Files:
- ✅ `index.html`, `about.html`
- ✅ All CSS files (`css/`, `styles/`)
- ✅ All JavaScript (`js/`, `scripts/`)
- ✅ Images and fonts
- ✅ `robots.txt`, `sitemap.xml` (if present)

### Excluded Files:
- ❌ Node modules
- ❌ Git files
- ❌ Environment files (.env)
- ❌ Deployment scripts
- ❌ Python files
- ❌ Log files

## 🆘 Still Having Issues?

1. **Enable debug mode**:
   ```bash
   DEBUG_MODE=true npm run deploy
   ```

2. **Check Hostinger status**:
   - Visit [Hostinger Status](https://www.hostinger.com/status)
   - Check if FTP services are operational

3. **Contact Hostinger Support**:
   - Live chat in hPanel
   - Mention: "FTP connection timeout issues"
   - Provide your FTP IP and username

4. **Alternative deployment methods**:
   - Use Hostinger File Manager (manual upload)
   - Try Git deployment (if available on your plan)
   - Use SFTP on port 65002 (Premium plans only)

## 🔐 Security Notes

- Never commit `.env` file to Git
- Rotate FTP password regularly
- Use strong passwords (min 12 chars)
- Consider IP whitelisting in hPanel

## 📊 Deployment Stats

After successful deployment, you'll see:
```
Deployment Summary:
✓ Files uploaded: 42
ℹ Data transferred: 3.2 MB
ℹ Duration: 45.3 seconds
```

Your site will be live at: `http://mediumblue-chamois-837591.hostingersite.com`

---

**Need help?** Check the logs in `deployment.log` or run with `DEBUG_MODE=true`