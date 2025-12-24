# Contributing Guidelines

## Scripting Standards

**IMPORTANT: All automation scripts MUST be written in Python**

### Why Python Only?

✅ **Cross-Platform**: Works on Windows, Linux, and macOS  
✅ **No Permission Issues**: No execution policy or chmod needed  
✅ **Project Dependency**: Python already required for demos  
✅ **Better Error Handling**: Proper exception handling  
✅ **More Maintainable**: Easier to read, debug, and extend

### Prohibited Script Types

❌ **Shell Scripts (`.sh`)**: Not compatible with Windows  
❌ **PowerShell (`.ps1`)**: Not compatible with Linux/macOS  
❌ **Batch Files (`.bat`)**: Limited functionality, Windows-only

### Script Template

When creating new automation scripts:

```python
#!/usr/bin/env python3
"""
Script Description: What this script does
"""
import sys
from pathlib import Path

def main():
    """Main function"""
    try:
        # Your code here
        print("✅ Success message")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
```

### Best Practices

1. **Use Python**: Create `.py` files in `scripts/` directory
2. **Add Shebang**: Start with `#!/usr/bin/env python3`
3. **Cross-Platform**: Use `pathlib.Path` instead of string paths
4. **Error Handling**: Use try/except blocks
5. **User Feedback**: Use colored output for clarity (✅ ❌ ⚠️)
6. **Documentation**: Add docstrings and comments

## Code Style

### Python
- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Use Black for formatting

### TypeScript/JavaScript
- Follow Airbnb style guide
- Use ESLint + Prettier
- Maximum line length: 100 characters

### Commits
- Use conventional commits format
- Examples:
  - `feat: add contact form validation`
  - `fix: resolve CORS issue in API`
  - `docs: update deployment guide`
  - `chore: update dependencies`
