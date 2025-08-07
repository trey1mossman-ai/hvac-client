# Winterrowd HVAC Website - Development Guide

## 🚨 CRITICAL DEPLOYMENT GUIDANCE 🚨

### GitHub Workflows - DO NOT TRIGGER MULTIPLE DEPLOYMENTS

**IMPORTANT**: This project uses GitHub Actions for automatic deployment to Hostinger. Be extremely careful with commits to avoid triggering multiple concurrent deployments.

#### Best Practices:
1. **Batch your changes** - Make all related changes in a single commit instead of multiple small commits
2. **Use `git add -A && git commit` in one command** - This ensures atomic commits
3. **Check git status before committing** to see what will be included
4. **Never commit incomplete work** - Each commit should be a complete, working state
5. **If you need to make multiple related changes, do them all before committing**

#### Current Workflow Status:
- **Repository**: https://github.com/trey1mossman-ai/hvac-client
- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Pushes to `main` branch
- **Target**: Hostinger FTP server (peachpuff-caterpillar-314202.hostingersite.com)
- **Critical Setting**: `server-dir: public_html/` (NOT `./` - this causes nested directory issues)

### Hostinger FTP Deployment Configuration

**Site URL**: https://peachpuff-caterpillar-314202.hostingersite.com
**FTP Details**:
- Host: 185.212.71.198
- Username: u921052894.peachpuff-caterpillar-314202.hostingersite.com
- Remote Path: public_html/

#### ✅ CORRECT Configuration:
```yaml
server-dir: public_html/
```

#### ❌ WRONG Configuration (causes 404 errors):
```yaml
server-dir: ./
```

#### Why This Matters:
- Hostinger expects files in the `public_html/` directory
- Using `./` creates a nested `public_html/public_html/` structure
- This results in 404 errors because files aren't in the expected location

### Build and Deployment Process:

1. **Build Command**: `npm run build`
   - Compiles TypeScript
   - Runs Vite build with optimizations
   - Copies static files and images
   - Creates `dist/` folder with production assets

2. **GitHub Actions Workflow**:
   - Checks out code
   - Sets up Node.js
   - Installs dependencies
   - Runs build process
   - Uploads `dist/` contents to Hostinger via FTP
   - **Key**: Files go directly to `public_html/` root

3. **Post-Deployment**:
   - Site available at https://peachpuff-caterpillar-314202.hostingersite.com
   - `.htaccess` file handles routing for React Router
   - Images served from `/images/` directory

### Common Commands:

```bash
# Development
npm run dev

# Build for production (ALWAYS run before committing)
npm run build

# Check git status before committing
git status

# Atomic commit (preferred method)
git add -A && git commit -m "Your commit message"

# Push (triggers deployment)
git push origin main
```

### Troubleshooting:

#### If site shows 404:
1. Check `.github/workflows/deploy.yml`
2. Ensure `server-dir: public_html/`
3. Check if multiple deployments are running simultaneously
4. Verify build succeeded before deployment

#### If deployment not working:
1. Check GitHub Actions tab for errors
2. Verify GitHub Secrets are set: FTP_HOST, FTP_USER, FTP_PASS
3. Ensure FTP credentials are correct

---
*HVAC Client Website - Last updated: 2025-08-07*