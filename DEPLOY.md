# 🚀 Dashboard Deployment Guide

This guide will help you deploy your Independence Basketball Analytics Dashboard to production.

## Quick Start: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications. It's made by the creators of Next.js.

### Prerequisites
- ✅ Node.js installed (v18 or higher)
- ✅ Git installed
- ✅ GitHub account
- ✅ Vercel account (free at [vercel.com](https://vercel.com))

---

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Code

1. **Navigate to your project directory:**
   ```powershell
   cd my-next-app
   ```

2. **Ensure everything is committed to Git:**
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with your GitHub account

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository:**
   - Select `ic01270815-sudo/basketball-analytics` (or your repo)
   - If your repo is in a subfolder, set **Root Directory** to `my-next-app`

4. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
   - **Node.js Version**: 18.x (default)

5. **Click "Deploy"**
   - Wait 2-3 minutes for the build
   - Your dashboard will be live at `https://your-project-name.vercel.app`

### Step 3: Access Your Dashboard

- Your dashboard URL will be shown after deployment
- Example: `https://basketball-analytics-xyz.vercel.app`
- Share this URL with anyone who needs access!

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Login to Vercel

```powershell
vercel login
```

### Step 3: Deploy

```powershell
cd my-next-app
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time) or Yes (if updating)
- **Project name?** → Press Enter for default
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 4: Deploy to Production

```powershell
vercel --prod
```

---

## Method 3: Deploy to Other Platforms

### Netlify

1. **Install Netlify CLI:**
   ```powershell
   npm install -g netlify-cli
   ```

2. **Build your project:**
   ```powershell
   npm run build
   ```

3. **Deploy:**
   ```powershell
   netlify deploy --prod --dir=.next
   ```

### Railway

1. **Go to [railway.app](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Select your repository**
4. **Railway auto-detects Next.js and deploys**

### Self-Hosted (VPS/Server)

1. **Build the project:**
   ```powershell
   npm run build
   ```

2. **Start production server:**
   ```powershell
   npm start
   ```

3. **Use PM2 for process management:**
   ```powershell
   npm install -g pm2
   pm2 start npm --name "dashboard" -- start
   pm2 save
   ```

---

## Post-Deployment Checklist

- [ ] ✅ Dashboard loads correctly
- [ ] ✅ All data displays properly
- [ ] ✅ Charts and graphs render
- [ ] ✅ Navigation works
- [ ] ✅ Mobile responsive design works
- [ ] ✅ Performance is acceptable

---

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- ✅ Deploys every push to `main` branch
- ✅ Creates preview deployments for pull requests
- ✅ Rebuilds on every commit

**No manual deployment needed!** Just push to GitHub and your dashboard updates automatically.

---

## Custom Domain (Optional)

### Add Custom Domain in Vercel:

1. Go to **Project Settings → Domains**
2. Add your domain (e.g., `dashboard.yourschool.com`)
3. Update DNS records as instructed:
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (5-60 minutes)

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```powershell
# Delete node_modules and reinstall
rm -r node_modules
npm install
```

**Error: TypeScript errors**
```powershell
# Check for type errors
npm run lint
```

### Environment Variables

If you need environment variables:
1. Go to **Vercel Dashboard → Project Settings → Environment Variables**
2. Add variables (e.g., `NEXT_PUBLIC_API_URL`)
3. Redeploy

### Performance Issues

- Check Vercel Analytics in dashboard
- Optimize images (use Next.js Image component)
- Enable caching headers

---

## Quick Commands Reference

```powershell
# Development
npm run dev

# Build locally
npm run build

# Test production build locally
npm start

# Deploy to Vercel (CLI)
vercel
vercel --prod

# Check build logs
vercel logs
```

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **GitHub Issues**: Check your repository's issues page

---

## 🎉 You're All Set!

Your dashboard should now be live and accessible to anyone with the URL. Share it with coaches, players, and parents!

