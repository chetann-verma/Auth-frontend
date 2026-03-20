#!/bin/bash

# Vercel Deployment Quick Start Script
# This script helps verify your project is ready for Vercel deployment

echo "🚀 Vercel Deployment Pre-Flight Check"
echo "======================================"
echo ""

# Check Node version
echo "✓ Checking Node.js installation..."
node --version
npm --version
echo ""

# Check if .env file exists but not committed
echo "✓ Checking .env file..."
if [ -f ".env" ]; then
    echo "  ✓ .env file exists"
    if git check-ignore .env > /dev/null 2>&1; then
        echo "  ✓ .env is properly ignored in Git"
    else
        echo "  ⚠ WARNING: .env might be committed to Git!"
    fi
else
    echo "  ⚠ .env file not found (create from .env.example)"
fi
echo ""

# Check if .env.example exists
echo "✓ Checking .env.example..."
if [ -f ".env.example" ]; then
    echo "  ✓ .env.example exists"
else
    echo "  ⚠ .env.example not found"
fi
echo ""

# Check package.json
echo "✓ Checking package.json..."
if [ -f "package.json" ]; then
    echo "  ✓ package.json exists"
else
    echo "  ✗ package.json not found!"
fi
echo ""

# Check vite.config.js
echo "✓ Checking vite.config.js..."
if [ -f "vite.config.js" ]; then
    echo "  ✓ vite.config.js exists"
else
    echo "  ✗ vite.config.js not found!"
fi
echo ""

# Check vercel.json
echo "✓ Checking vercel.json..."
if [ -f "vercel.json" ]; then
    echo "  ✓ vercel.json exists"
else
    echo "  ✗ vercel.json not found!"
fi
echo ""

# Check .vercelignore
echo "✓ Checking .vercelignore..."
if [ -f ".vercelignore" ]; then
    echo "  ✓ .vercelignore exists"
else
    echo "  ✗ .vercelignore not found!"
fi
echo ""

# Check node_modules
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules exists"
else
    echo "  ⚠ node_modules not found. Run: npm install"
fi
echo ""

# Try to build
echo "✓ Testing build process..."
echo "  Running: npm run build"
npm run build
if [ $? -eq 0 ]; then
    echo "  ✓ Build successful!"
else
    echo "  ✗ Build failed! Fix errors before deploying"
fi
echo ""

# Check dist folder
echo "✓ Checking build output..."
if [ -d "dist" ]; then
    echo "  ✓ dist/ folder created"
    echo "  Files: $(find dist -type f | wc -l) files"
else
    echo "  ✗ dist/ folder not found!"
fi
echo ""

echo "✓ Checking Git status..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "  ✓ Git repository initialized"
    UNCOMMITTED=$(git status --porcelain | wc -l)
    echo "  Uncommitted changes: $UNCOMMITTED"
else
    echo "  ⚠ Not a Git repository. Initialize with: git init"
fi
echo ""

echo "======================================"
echo "✓ Pre-flight check complete!"
echo ""
echo "Next steps:"
echo "1. Verify all checks passed"
echo "2. Fix any warnings in red"
echo "3. Commit changes: git add . && git commit -m 'Deploy ready'"
echo "4. Push to GitHub: git push origin main"
echo "5. Deploy to Vercel: vercel --prod"
echo ""
