#!/usr/bin/env bash
set -e

echo "=== Memeriksa Environment Node.js ==="
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  \. "$NVM_DIR/nvm.sh"
  nvm use 22 || true
fi

echo "Menggunakan Node: $(node -v) dan npm: $(npm -v)"

echo "=== Menjalankan Build Next.js ==="
npm run build

echo "=== Build Selesai dengan Sukses ==="

