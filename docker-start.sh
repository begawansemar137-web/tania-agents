#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "=== Menyiapkan Direktori Persistent Data ==="
mkdir -p data

ENV_FILE=".env"
if [ -f .env.local ]; then
  ENV_FILE=".env.local"
elif [ ! -f .env ] && [ -f .env.example ]; then
  echo "Membuat .env dari .env.example..."
  cp .env.example .env
fi

# Load APP_PORT if defined
APP_PORT=$(grep -E "^(APP_PORT|PORT)=" "$ENV_FILE" 2>/dev/null | cut -d '=' -f2 | tr -d ' ' | tail -n 1)
APP_PORT="${APP_PORT:-3030}"

echo "=== Memulai TANIA-Agents Stack via Docker Compose (Port: $APP_PORT) ==="
docker compose --env-file "$ENV_FILE" up -d --force-recreate

echo ""
echo "======================================================"
echo " TANIA-Agents berhasil dijalankan!"
echo " Web Dashboard : http://localhost:$APP_PORT"
echo " Cek Log       : docker compose logs -f tania-web"
echo " Hentikan      : ./docker-stop.sh"
echo "======================================================"

