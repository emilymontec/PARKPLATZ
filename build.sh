#!/usr/bin/env bash
# Script de BUILD para Render
# Instala dependencias y compila el frontend
set -o errexit

echo "📦 Instalando dependencias raíz..."
npm install

echo "🎨 Compilando Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "⚙️ Instalando dependencias del Backend..."
cd backend
npm install
cd ..

echo "✅ Build completado!"
