# 🚀 GitHub पर Upload करने के Steps

## Step 1: GitHub Account बनाएं (अगर नहीं है)

1. https://github.com पर जाएं
2. "Sign up" पर क्लिक करें
3. अपना email, password दें
4. Account verify करें

## Step 2: New Repository बनाएं

1. GitHub पर login करें
2. ऊपर right में "+" आइकन पर क्लिक करें
3. "New repository" चुनें
4. Repository का नाम दें (जैसे: `business-website`)
5. Description लिखें: "Professional Business Website with Admin Panel"
6. Public या Private चुनें
7. "Create repository" पर क्लिक करें

## Step 3: Git Install करें (अगर नहीं है)

### Windows:
- https://git-scm.com/download/win से download करें
- Install करें

### Mac:
```bash
brew install git
```

### Linux:
```bash
sudo apt-get install git
```

## Step 4: अपने Computer पर Setup करें

### Terminal/Command Prompt खोलें और ये commands चलाएं:

```bash
# 1. Git configure करें (पहली बार)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# 2. Project folder में जाएं
cd path/to/business-website

# 3. Git repository initialize करें
git init

# 4. सभी files add करें
git add .

# 5. First commit करें
git commit -m "Initial commit - Complete business website"

# 6. Main branch rename करें (modern practice)
git branch -M main

# 7. GitHub repository से connect करें
# ⚠️ अपना username और repo name डालें
git remote add origin https://github.com/YOUR-USERNAME/business-website.git

# 8. Code upload करें
git push -u origin main
```

## Step 5: Username और Password

### Personal Access Token बनाएं (Password की जगह):

1. GitHub पर जाएं
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token (classic)" पर क्लिक करें
4. Note दें: "Business Website Access"
5. Expiration: "90 days" या "No expiration" चुनें
6. Select scopes:
   - ✅ repo (सभी)
   - ✅ workflow
7. "Generate token" पर क्लिक करें
8. **Token को copy करें और सुरक्षित रखें!** (फिर नहीं दिखेगा)

### Push करते समय:
- Username: आपका GitHub username
- Password: Personal Access Token (जो अभी बनाया)

## 🎯 Quick Commands Reference

### नई files add करने के लिए:
```bash
git add .
git commit -m "Added new features"
git push
```

### Changes देखने के लिए:
```bash
git status
git log
```

### Latest changes download करने के लिए:
```bash
git pull
```

### Repository clone करने के लिए (दूसरे computer पर):
```bash
git clone https://github.com/YOUR-USERNAME/business-website.git
```

## 🔧 Troubleshooting

### "Permission denied" error?
Personal Access Token use करें password की जगह

### "Repository not found" error?
Repository URL check करें और सही username डालें

### Files नहीं add हो रहे?
```bash
git rm -r --cached .
git add .
git commit -m "Fixed gitignore"
git push
```

## 📱 GitHub से Website Deploy करें

### Option 1: GitHub Pages (Static Site)
1. Repository Settings में जाएं
2. Pages section में जाएं
3. Source: "Deploy from a branch"
4. Branch: main, folder: /public
5. Save करें
6. URL मिलेगा: `https://YOUR-USERNAME.github.io/business-website`

### Option 2: Vercel (Full Stack)
1. https://vercel.com पर जाएं
2. GitHub से connect करें
3. Repository select करें
4. Deploy करें

### Option 3: Railway (Full Stack)
1. https://railway.app पर जाएं
2. "New Project" → "Deploy from GitHub repo"
3. Repository select करें
4. Environment variables add करें
5. Deploy करें

### Option 4: Render (Full Stack)
1. https://render.com पर जाएं
2. "New +" → "Web Service"
3. Connect GitHub repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables
7. Create Web Service

## ✅ हो गया!

अब आपकी website GitHub पर है! 🎉

Repository URL: `https://github.com/YOUR-USERNAME/business-website`

---

## 🎁 Bonus Tips

### README में अच्छा दिखने के लिए:
- Screenshots add करें
- Demo link add करें
- Badges लगाएं

### Automatic Deployment:
- हर `git push` पर automatically deploy हो

### Collaboration:
- दूसरों को invite करें (Settings → Collaborators)

---

**मदद चाहिए?**
- GitHub Docs: https://docs.github.com
- Git Tutorial: https://www.youtube.com/results?search_query=git+tutorial+hindi

**शुभकामनाएं!** 🚀
