# Deploying CV Builder to Netlify

This guide will walk you through deploying your CV Builder frontend to Netlify.

## 🚀 Quick Deploy Options

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```
   This will open a browser window to authenticate.

3. **Initialize Netlify in your project**
   ```bash
   cd "c:\Users\hicham\Desktop\cv builder\cv-builder-frontend"
   netlify init
   ```
   
   Follow the prompts:
   - **Create & configure a new site**: Yes
   - **Team**: Select your team
   - **Site name**: cv-builder (or your preferred name)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Web UI

1. **Create a Git Repository** (if not already done)
   ```bash
   cd "c:\Users\hicham\Desktop\cv builder\cv-builder-frontend"
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub/GitLab/Bitbucket**
   - Create a new repository on GitHub
   - Follow the instructions to push your code

3. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Node version**: 18 (automatically detected from `.nvmrc`)

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 3: Drag & Drop Deploy (Quick Test)

1. **Build your project locally**
   ```bash
   npm install
   npm run build
   ```

2. **Go to Netlify**
   - Visit [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop your `dist` folder
   - Your site will be deployed instantly!

## ⚙️ Environment Variables

After deployment, you need to set environment variables in Netlify:

1. Go to your site in Netlify Dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

   ```
   VITE_API_URL=https://your-backend-api.com/api
   VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
   VITE_APP_NAME=CV Builder
   VITE_APP_URL=https://your-site.netlify.app
   ```

4. **Trigger a new deploy** after adding environment variables

## 🔧 Custom Domain Setup

1. **In Netlify Dashboard**
   - Go to **Domain settings**
   - Click "Add custom domain"
   - Enter your domain name (e.g., `cvbuilder.com`)

2. **Configure DNS**
   - If using Netlify DNS:
     - Netlify will provide nameservers
     - Update your domain registrar with these nameservers
   
   - If using external DNS:
     - Add an A record pointing to Netlify's load balancer: `75.2.60.5`
     - Or add a CNAME record pointing to your Netlify subdomain

3. **Enable HTTPS**
   - Netlify automatically provisions SSL certificates
   - This usually takes a few minutes

## 📊 Continuous Deployment

Once connected to Git, Netlify will automatically:
- Deploy when you push to your main branch
- Create preview deployments for pull requests
- Run your build command on each deploy

## 🔍 Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test language switching (EN, AR, FR)
- [ ] Check RTL layout for Arabic
- [ ] Test all routes (Home, Templates, Pricing, etc.)
- [ ] Verify environment variables are working
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify SEO meta tags

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

### 404 Errors on Routes
- Ensure `netlify.toml` is in the root directory
- Verify the redirect rules are configured

### Environment Variables Not Working
- Make sure variable names start with `VITE_`
- Redeploy after adding/changing variables
- Check that you're using `import.meta.env.VITE_*` in code

### Slow Build Times
- Enable build caching in Netlify settings
- Consider using build plugins for optimization

## 📱 Deploy Previews

Netlify creates deploy previews for:
- Every pull request
- Every branch (if enabled)

Access them via the Netlify dashboard or PR comments.

## 🔄 Rollback

If something goes wrong:
1. Go to **Deploys** in Netlify dashboard
2. Find a previous successful deploy
3. Click "Publish deploy" to rollback

## 📈 Analytics & Monitoring

Enable Netlify Analytics:
1. Go to **Analytics** tab
2. Enable analytics (paid feature)
3. View traffic, performance, and more

## 🎉 Your Site is Live!

Once deployed, your site will be available at:
- **Netlify subdomain**: `https://your-site-name.netlify.app`
- **Custom domain** (if configured): `https://yourdomain.com`

---

**Need Help?**
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Netlify Status](https://www.netlifystatus.com/)
