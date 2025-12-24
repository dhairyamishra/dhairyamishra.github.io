# Port Allocation

This file tracks all port assignments to prevent conflicts.

## Port Assignments

| Service | Port | Path | Status | Date Added |
|---------|------|------|--------|------------|
| web (dev) | 4321 | `/` | Active | 2025-12-21 |
| web (prod) | 8080 | `/` | Active | 2025-12-21 |
| api | 8000 | `/api/*` | Active | 2025-12-21 |
| demos | 7860 | `/demos/*` | Active | 2025-12-21 |
| project-1 | 8001 | `/projects/[name]/*` | Reserved | - |
| project-2 | 8002 | `/projects/[name]/*` | Reserved | - |
| project-3 | 8003 | `/projects/[name]/*` | Reserved | - |

## Port Ranges

- **4000-4999**: Development servers
- **7000-7999**: ML/Data services (Streamlit, Jupyter, etc.)
- **8000-8099**: Production services and project containers

## Adding New Services

1. Choose next available port in appropriate range
2. Update this table
3. Update docker-compose files
4. Update nginx configuration
5. Commit changes
