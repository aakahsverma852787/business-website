#!/bin/bash

# 🚀 Automated GitHub Setup Script
# यह script आपकी website को GitHub पर upload करने में मदद करेगा

echo "=========================================="
echo "🚀 Business Website - GitHub Setup"
echo "=========================================="
echo ""

# Colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed!${NC}"
    echo "Please install Git first:"
    echo "  Windows: https://git-scm.com/download/win"
    echo "  Mac: brew install git"
    echo "  Linux: sudo apt-get install git"
    exit 1
fi

echo -e "${GREEN}✅ Git is installed${NC}"
echo ""

# Configure Git (if not already configured)
echo -e "${BLUE}📝 Git Configuration${NC}"
echo ""

git_name=$(git config --global user.name)
git_email=$(git config --global user.email)

if [ -z "$git_name" ]; then
    echo "Enter your name (for Git commits):"
    read name
    git config --global user.name "$name"
    echo -e "${GREEN}✅ Name configured${NC}"
else
    echo -e "Current name: ${GREEN}$git_name${NC}"
fi

if [ -z "$git_email" ]; then
    echo "Enter your email (same as GitHub account):"
    read email
    git config --global user.email "$email"
    echo -e "${GREEN}✅ Email configured${NC}"
else
    echo -e "Current email: ${GREEN}$git_email${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Repository Setup${NC}"
echo ""

# Get repository details
echo "Enter your GitHub username:"
read github_username

echo "Enter repository name (e.g., business-website):"
read repo_name

echo ""
echo -e "${YELLOW}📌 Repository will be created at:${NC}"
echo -e "${GREEN}https://github.com/$github_username/$repo_name${NC}"
echo ""

read -p "Is this correct? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Please run the script again with correct details."
    exit 1
fi

# Initialize Git repository
echo ""
echo -e "${BLUE}🎯 Initializing Git repository...${NC}"

if [ -d .git ]; then
    echo -e "${YELLOW}⚠️  Git repository already exists${NC}"
    read -p "Do you want to reinitialize? This will delete existing Git history. (y/n): " reinit
    if [ "$reinit" = "y" ]; then
        rm -rf .git
        git init
        echo -e "${GREEN}✅ Repository reinitialized${NC}"
    fi
else
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi

# Create/Update .gitignore if needed
if [ ! -f .gitignore ]; then
    echo -e "${YELLOW}⚠️  .gitignore not found, creating...${NC}"
    cat > .gitignore << EOF
node_modules/
.env
data/
*.db
*.log
.DS_Store
EOF
    echo -e "${GREEN}✅ .gitignore created${NC}"
fi

# Add all files
echo ""
echo -e "${BLUE}📦 Adding files to Git...${NC}"
git add .
echo -e "${GREEN}✅ Files added${NC}"

# Create initial commit
echo ""
echo -e "${BLUE}💾 Creating initial commit...${NC}"
git commit -m "Initial commit - Complete business website with admin panel

Features:
- Responsive frontend with modern design
- Contact form with email notifications
- Image gallery with filters
- Services showcase
- Admin panel with dashboard
- JWT authentication
- SQLite database
- Rate limiting and security features"

echo -e "${GREEN}✅ Initial commit created${NC}"

# Rename branch to main
echo ""
echo -e "${BLUE}🌿 Setting up main branch...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch renamed to main${NC}"

# Add remote origin
echo ""
echo -e "${BLUE}🔗 Connecting to GitHub...${NC}"
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$github_username/$repo_name.git"
echo -e "${GREEN}✅ Remote origin added${NC}"

# Instructions for creating repository
echo ""
echo -e "${YELLOW}=========================================="
echo "📋 NEXT STEPS:"
echo "==========================================${NC}"
echo ""
echo -e "${BLUE}1. Create the repository on GitHub:${NC}"
echo "   - Go to: https://github.com/new"
echo "   - Repository name: $repo_name"
echo "   - Description: Professional Business Website with Admin Panel"
echo "   - Visibility: Public"
echo "   - ❌ DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo -e "${BLUE}2. After creating the repository, run:${NC}"
echo -e "   ${GREEN}git push -u origin main${NC}"
echo ""
echo -e "${BLUE}3. Enter your credentials when prompted:${NC}"
echo "   - Username: $github_username"
echo "   - Password: Your Personal Access Token (not regular password)"
echo ""
echo -e "${YELLOW}⚠️  Need a Personal Access Token?${NC}"
echo "   1. Go to: https://github.com/settings/tokens"
echo "   2. Click 'Generate new token (classic)'"
echo "   3. Give it a name: 'Business Website Upload'"
echo "   4. Select scope: ✅ repo (all)"
echo "   5. Click 'Generate token'"
echo "   6. Copy and save the token (you won't see it again!)"
echo "   7. Use this token as your password when pushing"
echo ""
echo -e "${GREEN}=========================================="
echo "✨ Setup Complete!"
echo "==========================================${NC}"
echo ""
echo -e "Repository ready to push to:"
echo -e "${GREEN}https://github.com/$github_username/$repo_name${NC}"
echo ""
echo -e "${BLUE}Run this command to push:${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""
