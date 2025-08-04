#!/usr/bin/env python3
import ftplib
import socket

# FTP credentials
FTP_HOST = "ftp.mediumblue-chamois-837591.hostingersite.com"
FTP_USER = "u921052894.SupplySide"
FTP_PASS = "pufMok-8guvno"
FTP_PORT = 21

print(f"Testing FTP connection to {FTP_HOST}:{FTP_PORT}")

try:
    # First test if we can reach the host
    print("1. Testing socket connection...")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    result = sock.connect_ex((FTP_HOST, FTP_PORT))
    sock.close()
    
    if result == 0:
        print("✓ Socket connection successful")
    else:
        print(f"✗ Socket connection failed with error code: {result}")
        exit(1)
    
    # Try FTP connection
    print("\n2. Testing FTP connection...")
    ftp = ftplib.FTP()
    ftp.set_debuglevel(2)  # Enable debug output
    ftp.connect(FTP_HOST, FTP_PORT, timeout=10)
    print("✓ FTP connection established")
    
    # Try login
    print("\n3. Testing FTP login...")
    ftp.login(FTP_USER, FTP_PASS)
    print("✓ FTP login successful")
    
    # List directory
    print("\n4. Current directory:")
    ftp.pwd()
    
    ftp.quit()
    print("\n✓ All tests passed!")
    
except socket.timeout:
    print("\n✗ Connection timed out - the server might be unreachable")
except ftplib.error_perm as e:
    print(f"\n✗ FTP Permission Error: {e}")
except Exception as e:
    print(f"\n✗ Error: {type(e).__name__}: {e}")