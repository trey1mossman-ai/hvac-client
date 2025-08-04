#!/usr/bin/env python3
import socket
import ftplib

# FTP credentials
FTP_HOST = "ftp.mediumblue-chamois-837591.hostingersite.com"
FTP_USER = "u921052894.SupplySide"
FTP_PASS = "pufMok-8guvno"

# Common FTP ports to test
PORTS_TO_TEST = [21, 22, 2121, 990, 21212]

print(f"Testing FTP connectivity to {FTP_HOST}")
print("-" * 50)

# First resolve the hostname
try:
    ip = socket.gethostbyname(FTP_HOST)
    print(f"Resolved to IP: {ip}")
except:
    print("Failed to resolve hostname")
    exit(1)

# Test each port
for port in PORTS_TO_TEST:
    print(f"\nTesting port {port}...")
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(5)
    result = sock.connect_ex((FTP_HOST, port))
    
    if result == 0:
        print(f"✓ Port {port} is open!")
        sock.close()
        
        # Try FTP connection on this port
        if port in [21, 2121, 21212]:
            try:
                print(f"  Attempting FTP connection on port {port}...")
                ftp = ftplib.FTP()
                ftp.connect(FTP_HOST, port, timeout=10)
                ftp.login(FTP_USER, FTP_PASS)
                print(f"  ✓ FTP connection successful on port {port}!")
                ftp.quit()
                print(f"\n>>> Use port {port} for FTP uploads! <<<")
                break
            except Exception as e:
                print(f"  ✗ FTP failed: {e}")
    else:
        print(f"✗ Port {port} is closed or filtered")
        sock.close()

# Try alternative hostnames
print("\n" + "-" * 50)
print("Testing alternative hostnames...")

alt_hosts = [
    "mediumblue-chamois-837591.hostingersite.com",
    "ftp.hostinger.com",
    "148.135.128.145",  # Direct IP from curl output
    "77.37.76.219"      # Alternative IP from curl output
]

for host in alt_hosts:
    print(f"\nTesting {host}:21...")
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(3)
        result = sock.connect_ex((host, 21))
        if result == 0:
            print(f"✓ {host}:21 is reachable!")
        else:
            print(f"✗ {host}:21 is not reachable")
        sock.close()
    except:
        print(f"✗ Could not test {host}")