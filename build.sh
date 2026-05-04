#!/usr/bin/env bash
# Script de BUILD para Render
set -o errexit

echo "Instalando dependencias raíz..."
npm install --include=dev

echo "Compilando Frontend..."
cd frontend
npm install --include=dev
npm run build
cd ..

echo "Instalando dependencias del Backend..."
cd backend
npm install
cd ..

echo "Build completado!"
