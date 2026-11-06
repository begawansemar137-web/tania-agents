#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  \. "$NVM_DIR/nvm.sh"
  nvm use 22 || true
fi

mkdir -p data

if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    cp .env.example .env.local
  fi
fi

PORT=$(grep -E "^(APP_PORT|PORT)=" .env 2>/dev/null | cut -d '=' -f2 | tr -d ' ' | tail -n 1)
PORT="${PORT:-3030}"

echo "=== Menjalankan TANIA-Agents Local Dev di Port $PORT (Node 22) ==="
npx next dev --port "$PORT"

