@echo off
setlocal enabledelayedexpansion

:: Business Website - GitHub Setup Script for Windows
:: यह script आपकी website को GitHub पर upload करने में मदद करेगा

echo ==========================================
echo 🚀 Business Website - GitHub Setup
echo ==========================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo.
    echo Please install Git first from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

:: Git Configuration
echo 📝 Git Configuration
echo.

for /f "tokens=*" %%i in ('git config --global user.name') do set git_name=%%i
for /f "tokens=*" %%i in ('git config --global user.email') do set git_email=%%i

if "!git_name!"=="" (
    set /p name="Enter your name (for Git commits): "
    git config --global user.name "!name!"
    echo ✅ Name configured
) else (
    echo Current name: !git_name!
)

if "!git_email!"=="" (
    set /p email="Enter your email (same as GitHub account): "
    git config --global user.email "!email!"
    echo ✅ Email configured
) else (
    echo Current email: !git_email!
)

echo.
echo 🔧 Repository Setup
echo.

:: Get repository details
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter repository name (e.g., business-website): "

echo.
echo 📌 Repository will be created at:
echo https://github.com/%github_username%/%repo_name%
echo.

set /p confirm="Is this correct? (y/n): "
if /i not "!confirm!"=="y" (
    echo Please run the script again with correct details.
    pause
    exit /b 1
)

:: Initialize Git repository
echo.
echo 🎯 Initializing Git repository...

if exist .git\ (
    echo ⚠️  Git repository already exists
    set /p reinit="Do you want to reinitialize? This will delete existing Git history. (y/n): "
    if /i "!reinit!"=="y" (
        rmdir /s /q .git
        git init
        echo ✅ Repository reinitialized
    )
) else (
    git init
    echo ✅ Git repository initialized
)

:: Create .gitignore if needed
if not exist .gitignore (
    echo ⚠️  .gitignore not found, creating...
    (
        echo node_modules/
        echo .env
        echo data/
        echo *.db
        echo *.log
        echo .DS_Store
    ) > .gitignore
    echo ✅ .gitignore created
)

:: Add all files
echo.
echo 📦 Adding files to Git...
git add .
echo ✅ Files added

:: Create initial commit
echo.
echo 💾 Creating initial commit...
git commit -m "Initial commit - Complete business website with admin panel" -m "Features:" -m "- Responsive frontend with modern design" -m "- Contact form with email notifications" -m "- Image gallery with filters" -m "- Services showcase" -m "- Admin panel with dashboard" -m "- JWT authentication" -m "- SQLite database" -m "- Rate limiting and security features"
echo ✅ Initial commit created

:: Rename branch to main
echo.
echo 🌿 Setting up main branch...
git branch -M main
echo ✅ Branch renamed to main

:: Add remote origin
echo.
echo 🔗 Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/%github_username%/%repo_name%.git
echo ✅ Remote origin added

:: Final instructions
echo.
echo ==========================================
echo 📋 NEXT STEPS:
echo ==========================================
echo.
echo 1. Create the repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Repository name: %repo_name%
echo    - Description: Professional Business Website with Admin Panel
echo    - Visibility: Public
echo    - ❌ DO NOT initialize with README, .gitignore, or license
echo    - Click 'Create repository'
echo.
echo 2. After creating the repository, run:
echo    git push -u origin main
echo.
echo 3. Enter your credentials when prompted:
echo    - Username: %github_username%
echo    - Password: Your Personal Access Token (not regular password)
echo.
echo ⚠️  Need a Personal Access Token?
echo    1. Go to: https://github.com/settings/tokens
echo    2. Click 'Generate new token (classic)'
echo    3. Give it a name: 'Business Website Upload'
echo    4. Select scope: ✅ repo (all)
echo    5. Click 'Generate token'
echo    6. Copy and save the token (you won't see it again!)
echo    7. Use this token as your password when pushing
echo.
echo ==========================================
echo ✨ Setup Complete!
echo ==========================================
echo.
echo Repository ready to push to:
echo https://github.com/%github_username%/%repo_name%
echo.
echo Run this command to push:
echo git push -u origin main
echo.

pause
