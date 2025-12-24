#!/usr/bin/env python3
"""
Environment verification script
Tests that all required tools are installed
"""
import subprocess
import sys
from pathlib import Path

def check_command(command, *args):
    """Check if a command is available"""
    try:
        cmd_list = [command] + list(args) if args else [command, "--version"]
        result = subprocess.run(
            cmd_list,
            capture_output=True,
            text=True,
            timeout=5,
            shell=True  # Required for Windows batch files like npm
        )
        return result.returncode == 0
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False

def main():
    """Main function"""
    print("🔍 Checking development environment...\n")
    
    checks = [
        ("Python", "python", "--version"),
        ("Node.js", "node", "--version"),
        ("npm", "npm", "--version"),
        ("Docker", "docker", "--version"),
        ("Docker Compose", "docker", "compose", "version"),
    ]
    
    all_passed = True
    
    for check in checks:
        name = check[0]
        command_parts = check[1:]
        if check_command(*command_parts):
            print(f"✅ {name} is installed")
        else:
            print(f"❌ {name} is NOT installed")
            all_passed = False
    
    print()
    
    if all_passed:
        print("✅ All required tools are installed!")
        print("\nNext steps:")
        print("1. Copy .env.example to .env.local")
        print("2. Install dependencies (npm install, pip install)")
        print("3. Start development with: pm2 start ecosystem.config.cjs")
        return 0
    else:
        print("❌ Some required tools are missing. Please install them before continuing.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
