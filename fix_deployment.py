#!/usr/bin/env python3
import ftplib
import os
from datetime import datetime

# FTP credentials
FTP_HOST = "185.212.71.198"
FTP_USER = "u921052894.SupplySide"
FTP_PASS = "pufMok-8guvno"
FTP_PORT = 21

def fix_deployment():
    """Force update by renaming old files and uploading new ones"""
    try:
        # Connect to FTP server
        print(f"Connecting to {FTP_HOST}...")
        ftp = ftplib.FTP()
        ftp.connect(FTP_HOST, FTP_PORT)
        ftp.login(FTP_USER, FTP_PASS)
        print("✓ Connected successfully!")
        
        # Navigate to the correct directory
        ftp.cwd('/home/u921052894/domains/mediumblue-chamois-837591.hostingersite.com/public_html')
        print("✓ Changed to public_html directory")
        
        # Backup and remove old index.html
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            print(f"Backing up old index.html to index.html.backup_{timestamp}")
            ftp.rename('index.html', f'index.html.backup_{timestamp}')
        except:
            print("No existing index.html to backup")
        
        # Upload new index.html
        print("Uploading new index.html...")
        with open('index.html', 'rb') as f:
            ftp.storbinary('STOR index.html', f)
        print("✓ Uploaded new index.html")
        
        # Check file size to confirm
        size = ftp.size('index.html')
        print(f"New index.html size: {size} bytes")
        
        # Also ensure styles and scripts directories have the new files
        for directory, files in [
            ('styles', ['typography.css', 'main.css']),
            ('scripts', ['hero-animations.js', 'form-validation.js'])
        ]:
            print(f"\nUpdating {directory}/...")
            try:
                ftp.cwd(directory)
            except:
                ftp.mkd(directory)
                ftp.cwd(directory)
            
            for filename in files:
                local_path = f"{directory}/{filename}"
                if os.path.exists(local_path):
                    with open(local_path, 'rb') as f:
                        ftp.storbinary(f'STOR {filename}', f)
                    print(f"✓ Uploaded {filename}")
            
            ftp.cwd('..')  # Go back to public_html
        
        print("\n✓ Deployment fixed!")
        print("\nIMPORTANT: Clear your browser cache completely:")
        print("- Chrome/Edge: Ctrl+Shift+Delete")
        print("- Safari: Cmd+Option+E")
        print("- Or open in Incognito/Private mode")
        
        ftp.quit()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_deployment()