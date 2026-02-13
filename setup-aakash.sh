#!/bin/bash

# 🚀 GitHub Setup Script for Aakash Verma
# Personalized setup for business-website repository

echo "=========================================="
echo "🚀 Business Website - GitHub Setup"
echo "👤 User: Aakash Verma"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Your details (pre-filled)
GITHUB_USERNAME="aakahsverma852787"
USER_NAME="Aakash Verma"
REPO_NAME="business-website"

echo -e "${GREEN}✅ Pre-configured for: $USER_NAME${NC}"
echo -e "${GREEN}✅ GitHub Username: $GITHUB_USERNAME${NC}"
echo -e "${GREEN}✅ Repository: $REPO_NAME${NC}"
echo ""

# Check Git installation
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

# Configure Git
echo -e "${BLUE}📝 Configuring Git...${NC}"
git config --global user.name "$USER_NAME"

echo "Enter your email (for GitHub):"
read git_email
git config --global user.email "$git_email"

echo -e "${GREEN}✅ Git configured${NC}"
echo ""

# Repository name option
echo -e "${BLUE}📁 Repository Setup${NC}"
echo ""
echo "Default repository name: $REPO_NAME"
read -p "Do you want to use a different name? (y/n): " change_name

if [ "$change_name" = "y" ]; then
    echo "Enter new repository name:"
    read REPO_NAME
fi

echo ""
echo -e "${YELLOW}📌 Repository will be:${NC}"
echo -e "${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""

read -p "Continue? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "Setup cancelled."
    exit 0
fi

# Git setup
echo ""
echo -e "${BLUE}🎯 Setting up Git repository...${NC}"

if [ -d .git ]; then
    echo -e "${YELLOW}⚠️  Removing existing Git repository...${NC}"
    rm -rf .git
fi

git init
echo -e "${GREEN}✅ Git initialized${NC}"

# Add files
echo ""
echo -e "${BLUE}📦 Adding files...${NC}"
git add .
echo -e "${GREEN}✅ Files added${NC}"

# Commit
echo ""
echo -e "${BLUE}💾 Creating commit...${NC}"
git commit -m "Initial commit - Professional Business Website

Created by: Aakash Verma
Repository: $REPO_NAME

Features:
✨ Modern responsive design
📧 Contact form with email notifications
🖼️ Image gallery with filters
💼 Services showcase
🔐 Admin panel with dashboard
🔒 JWT authentication
💾 SQLite database
🛡️ Rate limiting & security"

echo -e "${GREEN}✅ Commit created${NC}"

# Branch setup
echo ""
echo -e "${BLUE}🌿 Setting up main branch...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch configured${NC}"

# Remote setup
echo ""
echo -e "${BLUE}🔗 Connecting to GitHub...${NC}"
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✅ Remote configured${NC}"

# Final instructions
echo ""
echo -e "${YELLOW}=========================================="
echo "✨ SETUP COMPLETE!"
echo "==========================================${NC}"
echo ""
echo -e "${BLUE}📋 NEXT STEPS:${NC}"
echo ""
echo -e "${GREEN}Step 1: Create GitHub Repository${NC}"
echo "   1. Open: https://github.com/new"
echo "   2. Repository name: $REPO_NAME"
echo "   3. Description: Professional Business Website by Aakash Verma"
echo "   4. Select: ✅ Public"
echo "   5. ❌ DO NOT add README, .gitignore, or license"
echo "   6. Click 'Create repository'"
echo ""
echo -e "${GREEN}Step 2: Get Personal Access Token${NC}"
echo "   1. Go to: https://github.com/settings/tokens"
echo "   2. Click: 'Generate new token (classic)'"
echo "   3. Note: 'Business Website Upload'"
echo "   4. Expiration: 90 days (or No expiration)"
echo "   5. Scope: ✅ repo (check all boxes under repo)"
echo "   6. Click 'Generate token'"
echo "   7. 📋 COPY the token and SAVE it safely!"
echo ""
echo -e "${GREEN}Step 3: Push to GitHub${NC}"
echo "   Run this command:"
echo -e "   ${YELLOW}git push -u origin main${NC}"
echo ""
echo "   When prompted:"
echo "   Username: $GITHUB_USERNAME"
echo "   Password: [Paste your Personal Access Token]"
echo ""
echo -e "${BLUE}Your repository will be live at:${NC}"
echo -e "${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""
echo -e "${YELLOW}==========================================${NC}"
echo ""
echo -e "${BLUE}💡 Quick Commands:${NC}"
echo ""
echo "Push to GitHub:"
echo "  git push -u origin main"
echo ""
echo "Future updates:"
echo "  git add ."
echo "  git commit -m \"Updated features\""
echo "  git push"
echo ""
echo -e "${GREEN}🎉 Good luck with your website, Aakash!${NC}"
echo ""
