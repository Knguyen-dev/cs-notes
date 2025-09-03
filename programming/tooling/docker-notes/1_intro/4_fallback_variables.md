# Docker: Fallback Variables

```yaml
services:
  postgres:
    container_name: postgres
    image: postgres:17.6
    environment:
    # ${VAR:-default} syntax
    # We're telling docker, use the environment variable `VAR` from the host if it's 
    # defined. Otherwise fall back to this default value. In this case, if our 
    # shell has POSTGRES_USER set, the nDocker will use that value. If not 
    # it will use the default value of "postgres"
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-changeme}
      PGDATA: /data/postgres
    volumes:
      - pg_data:/data/postgres
    ports:
      - 5432:5432
    networks:
      - postgres
    restart: unless-stopped
```