# 🚀 Deploy Playwright Roadmap lên Vercel

## 📋 Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier OK)
- Node.js 18+ installed locally

## 🛠️ Setup Steps

### 1. Install Dependencies

```bash
cd playwright-basic
npm install
# or
yarn install
```

### 2. Build Locally (Test)

```bash
# Development server
npm run dev
# Server runs at http://localhost:4000

# Build static site
npm run build
# Output in _book/ directory
```

### 3. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Playwright learning roadmap"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/playwright-basic.git

# Push
git push -u origin main
```

### 4. Deploy to Vercel

#### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option B: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel auto-detects `vercel.json` config
5. Click **"Deploy"**

## ⚙️ Configuration Files

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "_book",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### package.json (scripts)
```json
{
  "scripts": {
    "dev": "honkit serve",
    "build": "honkit build",
    "clean": "rm -rf _book"
  }
}
```

## 🌐 Custom Domain (Optional)

### Add Custom Domain in Vercel

1. Go to your project settings
2. Navigate to **Domains**
3. Add your domain (e.g., `playwright-learning.com`)
4. Configure DNS:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update Week 1 content"
git push

# Vercel automatically builds and deploys!
```

### Preview Deployments

- **Production**: Deploys on push to `main` branch
- **Preview**: Deploys for pull requests
- Each PR gets unique preview URL

## 📊 Build Configuration

### Environment Variables (if needed)

1. Go to **Project Settings** → **Environment Variables**
2. Add variables:
   - `NODE_VERSION`: `18`
   - `NPM_VERSION`: `9` (optional)

### Build & Development Settings

```
Build Command: npm run build
Output Directory: _book
Install Command: npm install
Development Command: npm run dev
```

## 🎨 Customize GitBook Theme

### book.json
```json
{
  "title": "Lộ Trình Học Playwright",
  "plugins": [
    "theme-comscore",
    "github",
    "copy-code-button",
    "search-plus"
  ]
}
```

### Install Additional Plugins

```bash
npm install --save-dev gitbook-plugin-theme-comscore
npm install --save-dev gitbook-plugin-github
```

## 📁 File Structure

```
playwright-basic/
├── _book/                      # Build output (gitignored)
├── module-1-basics/            # Course content
├── module-2-organization/
├── module-3-api-testing/
├── phu-luc/                    # Appendix
├── .gitignore                  # Git ignore
├── book.json                   # GitBook config
├── package.json                # Dependencies
├── README.md                   # Homepage
├── SUMMARY.md                  # Table of contents
└── vercel.json                 # Vercel config
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### vercel.json Not Detected

Make sure `vercel.json` is in root directory:
```bash
ls -la vercel.json
```

### Missing Dependencies

```bash
# Install honkit explicitly
npm install --save-dev honkit@^6.1.4

# Rebuild
npm run build
```

## 📈 Performance Optimization

### Enable Caching

Already configured in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

### Optimize Images

Place images in `/images/` folder:
```markdown
![Diagram](images/architecture.png)
```

## 🔒 Security

### .gitignore

Make sure these are ignored:
```
_book/
node_modules/
.env
.vercel/
```

### Environment Variables

Never commit:
- API keys
- Passwords
- Tokens

Use Vercel's environment variables instead.

## 📊 Analytics (Optional)

### Add Google Analytics

1. Get GA tracking ID
2. Add to `book.json`:
```json
{
  "plugins": ["ga"],
  "pluginsConfig": {
    "ga": {
      "token": "UA-XXXXXXXX-X"
    }
  }
}
```

## 🎯 Deployment Checklist

- [ ] All content files created
- [ ] `SUMMARY.md` up to date
- [ ] `package.json` has honkit dependency
- [ ] `vercel.json` configured
- [ ] `.gitignore` includes `_book/`
- [ ] Local build works (`npm run build`)
- [ ] Pushed to GitHub
- [ ] Connected to Vercel
- [ ] Production deployment successful
- [ ] Custom domain configured (optional)

## 🌟 Example Sites

- **SQL Basic**: https://sql-basic.vercel.app
- **Your Site**: https://playwright-basic.vercel.app

## 📞 Support

### Issues?

1. Check Vercel build logs
2. Test locally first: `npm run build`
3. Check [Vercel Docs](https://vercel.com/docs)
4. Check [HonKit Docs](https://github.com/honkit/honkit)

### Useful Commands

```bash
# Development
npm run dev

# Build
npm run build

# Clean
npm run clean

# Deploy
vercel --prod
```

---

**🎉 Deployment Complete!**

Your Playwright learning roadmap is now live at:
`https://YOUR_PROJECT.vercel.app`

**Share it with the world!** 🌍
