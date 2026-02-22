# Quick Start: Install Node.js and Deploy

## Step 1: Install Node.js (includes npm)

### Download Node.js:
1. **I'll open the download page for you** - or visit: https://nodejs.org/
2. **Download the LTS version** (Long Term Support) - currently v18.x or v20.x
3. **Run the installer** and follow the prompts
4. **Keep all default settings** (this includes npm automatically)

### Verify Installation:
After installation, open a **new** PowerShell or Command Prompt and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.19.0
9.2.0
```

---

## Step 2: Install Project Dependencies

Open PowerShell/Command Prompt in your project folder:

```bash
cd "c:\Users\hicham\Desktop\cv builder\cv-builder-frontend"
npm install
```

This will install all the packages listed in `package.json`. It may take 2-5 minutes.

---

## Step 3: Build the Project

```bash
npm run build
```

This creates an optimized `dist` folder ready for deployment.

---

## Step 4: Deploy to Netlify

### Option A: Netlify CLI (Recommended)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify (opens browser)
netlify login

# Initialize and deploy
netlify init

# Deploy to production
netlify deploy --prod
```

**Your deployment URL will be shown in the terminal!** 🎉

### Option B: Drag & Drop (Easiest)

1. Go to: https://app.netlify.com/drop
2. Drag your `dist` folder to the page
3. Get instant URL like: `https://random-name-12345.netlify.app`

### Option C: GitHub + Netlify

1. Create GitHub account: https://github.com/signup
2. Create new repository
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/cv-builder.git
   git push -u origin main
   ```
4. Go to Netlify: https://app.netlify.com/
5. Click "Add new site" → "Import an existing project"
6. Connect GitHub and select your repository
7. Netlify auto-deploys!

---

## Troubleshooting

### "npm is not recognized"
- **Solution**: Restart your terminal/PowerShell after installing Node.js
- Or restart your computer

### Build fails
- Make sure you're in the correct folder
- Delete `node_modules` and run `npm install` again

### Port already in use
- Change the port in `vite.config.js` or kill the process using that port

---

## After Deployment

### Set Environment Variables in Netlify:
1. Go to your site in Netlify Dashboard
2. **Site settings** → **Environment variables**
3. Add these variables:
   ```
   VITE_API_URL=https://your-backend-api.com/api
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_APP_URL=https://your-site.netlify.app
   ```
4. **Trigger redeploy** after adding variables

---

## 🎉 You're Done!

Your site will be live at: `https://your-site-name.netlify.app`

You can customize the subdomain or add a custom domain in Netlify settings.
