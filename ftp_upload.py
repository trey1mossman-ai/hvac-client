#!/usr/bin/env python3
import ftplib
import os
import sys

# FTP credentials
FTP_HOST = "185.212.71.198"
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
        # Connect to FTP server
        print(f"Connecting to {FTP_HOST}...")
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, FTP_PORT)
        ftp.login(FTP_USER, FTP_PASS)
        print("✓ Connected successfully!")
        
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
        upload_file(ftp, "index.html")
        upload_file(ftp, "about.html")
        
        # Create and upload to CSS directory
        print("\nUploading CSS files...")
        create_directory(ftp, "css")
        upload_file(ftp, "css/style.css", "css")
        upload_file(ftp, "css/about.css", "css")
        
        # Create and upload to JS directory
        print("\nUploading JavaScript files...")
        create_directory(ftp, "js")
        upload_file(ftp, "js/main.js", "js")
        
        # Create and upload to styles directory (new)
        print("\nUploading new styles files...")
        create_directory(ftp, "styles")
        upload_file(ftp, "styles/typography.css", "styles")
        upload_file(ftp, "styles/main.css", "styles")
        
        # Create and upload to scripts directory (new)
        print("\nUploading new scripts files...")
        create_directory(ftp, "scripts")
        upload_file(ftp, "scripts/hero-animations.js", "scripts")
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