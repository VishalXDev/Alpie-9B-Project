#!/bin/bash

# PulseAI Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up PulseAI Analytics Dashboard..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print success message
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error message
error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print info message
info() {
    echo -e "${YELLOW}→ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

info "Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    error "npm is not installed. Please install npm first."
    exit 1
fi

info "npm version: $(npm --version)"

# Setup Server
info "Setting up server..."
cd server

if [ ! -f .env ]; then
    info "Creating .env file from .env.example..."
    cp .env.example .env
    success ".env file created"
else
    success ".env file already exists"
fi

info "Installing server dependencies..."
npm install
success "Server dependencies installed"

# Setup Client
info "Setting up client..."
cd ../client

if [ ! -f .env ]; then
    info "Creating .env file from .env.example..."
    cp .env.example .env
    success ".env file created"
else
    success ".env file already exists"
fi

info "Installing client dependencies..."
npm install
success "Client dependencies installed"

# Verify installations
echo ""
echo "📦 Installed packages:"
echo ""
echo "Server:"
npm list --depth=0 | head -10
echo ""
echo "Client:"
npm list --depth=0 | head -10

# Final message
echo ""
echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "📝 Next steps:"
echo "  1. Start the server: cd server && npm run dev"
echo "  2. Start the client: cd client && npm run dev"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo "🎉 Happy coding!"
echo ""
