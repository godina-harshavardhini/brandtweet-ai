#!/bin/bash

echo "🚀 BrandTweet AI - Setup Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "app" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Setting up Frontend..."
cd app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "  Installing npm dependencies..."
    npm install
else
    echo "  ✓ npm dependencies already installed"
fi

echo ""
echo "📦 Setting up Backend..."
cd ../backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "  Creating Python virtual environment..."
    python3 -m venv venv
else
    echo "  ✓ Virtual environment already exists"
fi

# Activate virtual environment
echo "  Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "  Installing Python dependencies..."
pip install -q -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "⚠️  Please create a .env file in the backend directory"
    echo "   Copy .env.example to .env and add your OpenAI API key"
    echo ""
    echo "   cp backend/.env.example backend/.env"
    echo ""
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python manage.py migrate"
echo "   python manage.py runserver"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   cd app"
echo "   npm run dev"
echo ""
echo "   Then visit: http://localhost:5173"
echo ""
