#!/usr/bin/env python3
import ftplib
import os
import sys
import time

# FTP credentials
FTP_HOST = "ftp.mediumblue-chamois-837591.hostingersite.com"
FTP_USER = "u921052894.SupplySide"
FTP_PASS = "pufMok-8guvno"
FTP_PORT = 21

# Alternative hosts to try
ALTERNATIVE_HOSTS = [
    "mediumblue-chamois-837591.hostingersite.com",
    "148.135.128.145",
    "77.37.76.219"
]

def try_ftp_connection(host, port=21):
    """Try to establish FTP connection with given host"""
    print(f"\nTrying {host}:{port}...")
    try:
        ftp = ftplib.FTP()
        # Try with different settings
        ftp.set_debuglevel(1)  # Enable some debug output
        ftp.set_pasv(True)     # Try passive mode
        
        # Connect with longer timeout
        ftp.connect(host, port, timeout=60)
        print(f"✓ Connected to {host}")
        
        # Try to login
        ftp.login(FTP_USER, FTP_PASS)
        print("✓ Login successful")
        
        return ftp
    except ftplib.error_temp as e:
        print(f"Temporary error: {e}")
    except ftplib.error_perm as e:
        print(f"Permanent error: {e}")
    except Exception as e:
        print(f"Connection failed: {e}")
    
    return None

def upload_file(ftp, local_file, remote_path=""):
    """Upload a single file to FTP server"""
    try:
        with open(local_file, 'rb') as f:
            remote_file = os.path.join(remote_path, os.path.basename(local_file))
            print(f"Uploading {local_file} to {remote_file}")
            ftp.storbinary(f'STOR {remote_file}', f)
            print(f"✓ Uploaded {local_file}")
        return True
    except Exception as e:
        print(f"✗ Failed to upload {local_file}: {e}")
        return False

def create_directory(ftp, directory):
    """Create directory if it doesn't exist"""
    try:
        ftp.mkd(directory)
        print(f"Created directory: {directory}")
    except ftplib.error_perm:
        # Directory might already exist
        pass

def main():
    """Main upload function"""
    # Try primary host first
    ftp = try_ftp_connection(FTP_HOST)
    
    # If failed, try alternative hosts
    if not ftp:
        for host in ALTERNATIVE_HOSTS:
            ftp = try_ftp_connection(host)
            if ftp:
                break
    
    if not ftp:
        print("\n✗ Could not establish FTP connection to any host")
        print("\nPossible reasons:")
        print("1. FTP server is temporarily down")
        print("2. Firewall is blocking outgoing FTP connections")
        print("3. Credentials have changed")
        print("\nPlease check:")
        print("- Your internet connection")
        print("- Hostinger control panel for FTP status")
        print("- Any firewall or VPN software")
        return
    
    try:
        # Try to change to public_html
        try:
            ftp.cwd('public_html')
            print("✓ Changed to public_html directory")
        except:
            print("! Could not change to public_html")
        
        # Upload files
        files_to_upload = [
            ("index.html", ""),
            ("about.html", ""),
            ("css/style.css", "css"),
            ("css/about.css", "css"),
            ("js/main.js", "js"),
            ("styles/typography.css", "styles"),
            ("styles/main.css", "styles"),
            ("scripts/hero-animations.js", "scripts"),
            ("scripts/form-validation.js", "scripts")
        ]
        
        # Create necessary directories
        for directory in ["css", "js", "styles", "scripts", "images", "fonts"]:
            create_directory(ftp, directory)
        
        # Upload files
        success_count = 0
        for local_file, remote_dir in files_to_upload:
            if os.path.exists(local_file):
                if upload_file(ftp, local_file, remote_dir):
                    success_count += 1
        
        print(f"\n✓ Uploaded {success_count} files successfully!")
        
        # Close connection
        ftp.quit()
        
    except Exception as e:
        print(f"\n✗ Error during upload: {e}")

if __name__ == "__main__":
    main()