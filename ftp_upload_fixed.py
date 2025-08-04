#!/usr/bin/env python3
import ftplib
import os
import sys

# FTP credentials
FTP_HOST = "ftp.mediumblue-chamois-837591.hostingersite.com"
FTP_USER = "u921052894.SupplySide"
FTP_PASS = "pufMok-8guvno"
FTP_PORT = 21

def upload_file(ftp, local_file, remote_path=""):
    """Upload a single file to FTP server"""
    with open(local_file, 'rb') as f:
        remote_file = os.path.join(remote_path, os.path.basename(local_file))
        print(f"Uploading {local_file} to {remote_file}")
        ftp.storbinary(f'STOR {remote_file}', f)
        print(f"✓ Uploaded {local_file}")

def create_directory(ftp, directory):
    """Create directory if it doesn't exist"""
    try:
        ftp.mkd(directory)
        print(f"Created directory: {directory}")
    except ftplib.error_perm:
        # Directory might already exist
        pass

def upload_website():
    """Upload all website files to Hostinger"""
    try:
        # Connect to FTP server with passive mode
        print(f"Connecting to {FTP_HOST}...")
        ftp = ftplib.FTP()
        ftp.set_pasv(True)  # Use passive mode
        ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        print("✓ Connected successfully!")
        
        # Set binary mode
        ftp.voidcmd('TYPE I')
        
        # List current directory
        print("\nCurrent FTP directory contents:")
        ftp.dir()
        
        # Try to change to the correct directory
        try:
            # Navigate to the full path
            ftp.cwd('/home/u921052894/domains/mediumblue-chamois-837591.hostingersite.com/public_html')
            print("\n✓ Changed to public_html directory")
        except:
            # Try just public_html if full path doesn't work
            try:
                ftp.cwd('public_html')
                print("\n✓ Changed to public_html directory")
            except:
                print("\n! Could not change to public_html, uploading to current directory")
        
        # Upload HTML files
        print("\nUploading HTML files...")
        if os.path.exists("index.html"):
            upload_file(ftp, "index.html")
        if os.path.exists("about.html"):
            upload_file(ftp, "about.html")
        
        # Create and upload to CSS directory
        print("\nUploading CSS files...")
        create_directory(ftp, "css")
        if os.path.exists("css/style.css"):
            upload_file(ftp, "css/style.css", "css")
        if os.path.exists("css/about.css"):
            upload_file(ftp, "css/about.css", "css")
        
        # Create and upload to JS directory
        print("\nUploading JavaScript files...")
        create_directory(ftp, "js")
        if os.path.exists("js/main.js"):
            upload_file(ftp, "js/main.js", "js")
        
        # Create and upload to styles directory (new)
        print("\nUploading new styles files...")
        create_directory(ftp, "styles")
        if os.path.exists("styles/typography.css"):
            upload_file(ftp, "styles/typography.css", "styles")
        if os.path.exists("styles/main.css"):
            upload_file(ftp, "styles/main.css", "styles")
        
        # Create and upload to scripts directory (new)
        print("\nUploading new scripts files...")
        create_directory(ftp, "scripts")
        if os.path.exists("scripts/hero-animations.js"):
            upload_file(ftp, "scripts/hero-animations.js", "scripts")
        if os.path.exists("scripts/form-validation.js"):
            upload_file(ftp, "scripts/form-validation.js", "scripts")
        
        # Create empty directories
        print("\nCreating directories...")
        create_directory(ftp, "images")
        create_directory(ftp, "fonts")
        
        # Upload other files
        print("\nUploading other files...")
        if os.path.exists("README.md"):
            upload_file(ftp, "README.md")
        
        print("\n✓ All files uploaded successfully!")
        print(f"\nYour website should now be live at:")
        print(f"http://mediumblue-chamois-837591.hostingersite.com")
        
        # Close connection
        ftp.quit()
        
    except ftplib.error_perm as e:
        print(f"\n✗ FTP Permission Error: {e}")
        print("Please check your FTP credentials and permissions")
    except Exception as e:
        print(f"\n✗ Error: {e}")
        print("Please verify your FTP settings in Hostinger")

if __name__ == "__main__":
    upload_website()