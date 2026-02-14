@echo off
setlocal enabledelayedexpansion

:: Aakash Verma Portfolio - GitHub Upload Script

echo ==========================================
echo 🚀 Aakash Verma Portfolio - GitHub Setup
echo ==========================================
echo.

set GITHUB_USERNAME=aakahsverma852787
set REPO_NAME=portfolio
set USER_NAME=Aakash Verma

echo ✅ GitHub Username: %GITHUB_USERNAME%
echo ✅ Repository Name: %REPO_NAME%
echo.

:: Check Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git not installed!
    echo Install from: https://git-scm.com
    pause
    exit /b 1
)

echo ✅ Git installed
echo.

:: Configure Git
echo 📝 Configuring Git...
git config --global user.name "%USER_NAME%"

set /p git_email="Enter your email for Git commits: "
git config --global user.email "!git_email!"

echo ✅ Git configured
echo.

:: Initialize repository
echo 🎯 Initializing repository...
if exist .git\ (
    echo Removing existing .git folder...
    rmdir /s /q .git
)

git init
echo ✅ Repository initialized
echo.

:: Add files
echo 📦 Adding files...
git add .
echo ✅ Files added
echo.

:: Create commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Aakash Verma Portfolio" -m "" -m "Professional portfolio website showcasing:" -m "✅ 3+ years Data Operations experience" -m "✅ 12+ real-world projects" -m "✅ Market Research expertise" -m "✅ Content Moderation skills" -m "✅ Business Intelligence proficiency" -m "" -m "Projects include:" -m "- Data Validation SOP (Walmart vs Amazon)" -m "- Global Course Validation" -m "- Executive Contact Extraction" -m "- Power BI Dashboards" -m "- AI Image Moderation" -m "- Geospatial Mapping" -m "" -m "Contact:" -m "📱 +91 85278 79047" -m "✉️ aakashverma852787@outlook.com" -m "💼 linkedin.com/in/aakash-verma-3b1187272"

echo ✅ Commit created
echo.

:: Setup branch
echo 🌿 Setting up main branch...
git branch -M main
echo ✅ Main branch configured
echo.

:: Add remote
echo 🔗 Adding GitHub remote...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo ✅ Remote added
echo.

:: Instructions
echo ==========================================
echo ✨ SETUP COMPLETE!
echo ==========================================
echo.
echo 📋 NEXT STEPS:
echo.
echo 1️⃣  CREATE GITHUB REPOSITORY:
echo    → Go to: https://github.com/new
echo    → Repository name: %REPO_NAME%
echo    → Description: Professional Portfolio - Data Operations ^& Market Research
echo    → Visibility: ✅ Public
echo    → ❌ Do NOT initialize with README
echo    → Click 'Create repository'
echo.
echo 2️⃣  GET PERSONAL ACCESS TOKEN:
echo    → Go to: https://github.com/settings/tokens
echo    → Click 'Generate new token (classic)'
echo    → Note: 'Portfolio Upload'
echo    → Expiration: 90 days
echo    → Scope: ✅ repo (check all)
echo    → Click 'Generate token'
echo    → 📋 COPY and SAVE the token!
echo.
echo 3️⃣  PUSH TO GITHUB:
echo    Run this command:
echo    → git push -u origin main
echo.
echo    When prompted:
echo    → Username: %GITHUB_USERNAME%
echo    → Password: [Paste your Personal Access Token]
echo.
echo ==========================================
echo.
echo 🌐 Your portfolio will be live at:
echo    https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo 🚀 Deploy to Vercel for live website:
echo    1. Go to: https://vercel.com
echo    2. Sign in with GitHub
echo    3. Import repository: %REPO_NAME%
echo    4. Deploy!
echo    5. Live URL: https://%REPO_NAME%-aakash.vercel.app
echo.
echo ==========================================
echo ✅ All the best, Aakash! 🎉
echo ==========================================
echo.

pause
