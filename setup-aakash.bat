@echo off
setlocal enabledelayedexpansion

:: GitHub Setup for Aakash Verma
:: Business Website Upload Script

echo ==========================================
echo 🚀 Business Website - GitHub Setup
echo 👤 User: Aakash Verma
echo ==========================================
echo.

:: Pre-configured details
set GITHUB_USERNAME=aakahsverma852787
set USER_NAME=Aakash Verma
set REPO_NAME=business-website

echo ✅ Pre-configured for: %USER_NAME%
echo ✅ GitHub Username: %GITHUB_USERNAME%
echo ✅ Repository: %REPO_NAME%
echo.

:: Check Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo.
    echo Download from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

:: Configure Git
echo 📝 Configuring Git...
git config --global user.name "%USER_NAME%"

set /p git_email="Enter your email (for GitHub): "
git config --global user.email "!git_email!"

echo ✅ Git configured
echo.

:: Repository name
echo 📁 Repository Setup
echo.
echo Default repository name: %REPO_NAME%
set /p change_name="Do you want to use a different name? (y/n): "

if /i "!change_name!"=="y" (
    set /p REPO_NAME="Enter new repository name: "
)

echo.
echo 📌 Repository will be:
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

set /p confirm="Continue? (y/n): "
if /i not "!confirm!"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

:: Git setup
echo.
echo 🎯 Setting up Git repository...

if exist .git\ (
    echo ⚠️  Removing existing Git repository...
    rmdir /s /q .git
)

git init
echo ✅ Git initialized

:: Add files
echo.
echo 📦 Adding files...
git add .
echo ✅ Files added

:: Commit
echo.
echo 💾 Creating commit...
git commit -m "Initial commit - Professional Business Website" -m "" -m "Created by: Aakash Verma" -m "Repository: %REPO_NAME%" -m "" -m "Features:" -m "✨ Modern responsive design" -m "📧 Contact form with email notifications" -m "🖼️ Image gallery with filters" -m "💼 Services showcase" -m "🔐 Admin panel with dashboard" -m "🔒 JWT authentication" -m "💾 SQLite database" -m "🛡️ Rate limiting & security"

echo ✅ Commit created

:: Branch setup
echo.
echo 🌿 Setting up main branch...
git branch -M main
echo ✅ Branch configured

:: Remote setup
echo.
echo 🔗 Connecting to GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo ✅ Remote configured

:: Final instructions
echo.
echo ==========================================
echo ✨ SETUP COMPLETE!
echo ==========================================
echo.
echo 📋 NEXT STEPS:
echo.
echo Step 1: Create GitHub Repository
echo    1. Open: https://github.com/new
echo    2. Repository name: %REPO_NAME%
echo    3. Description: Professional Business Website by Aakash Verma
echo    4. Select: ✅ Public
echo    5. ❌ DO NOT add README, .gitignore, or license
echo    6. Click 'Create repository'
echo.
echo Step 2: Get Personal Access Token
echo    1. Go to: https://github.com/settings/tokens
echo    2. Click: 'Generate new token (classic)'
echo    3. Note: 'Business Website Upload'
echo    4. Expiration: 90 days (or No expiration)
echo    5. Scope: ✅ repo (check all boxes under repo)
echo    6. Click 'Generate token'
echo    7. 📋 COPY the token and SAVE it safely!
echo.
echo Step 3: Push to GitHub
echo    Run this command:
echo    git push -u origin main
echo.
echo    When prompted:
echo    Username: %GITHUB_USERNAME%
echo    Password: [Paste your Personal Access Token]
echo.
echo Your repository will be live at:
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo ==========================================
echo.
echo 💡 Quick Commands:
echo.
echo Push to GitHub:
echo   git push -u origin main
echo.
echo Future updates:
echo   git add .
echo   git commit -m "Updated features"
echo   git push
echo.
echo 🎉 Good luck with your website, Aakash!
echo.

pause
