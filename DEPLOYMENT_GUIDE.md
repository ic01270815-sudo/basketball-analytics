# Deployment Guide: GitHub & Vercel

## Prerequisites
- ✅ Git is initialized
- ✅ GitHub repository configured: `https://github.com/ic01270815-sudo/basketball-analytics.git`
- ✅ Next.js project ready

## Step 1: Commit and Push to GitHub

### 1.1 Stage all changes
```bash
git add .
```

### 1.2 Commit changes
```bash
git commit -m "Update basketball analytics components and data"
```

### 1.3 Push to GitHub
```bash
git push origin main
```

If you encounter authentication issues, you may need to:
- Use a Personal Access Token (PAT) instead of password
- Set up SSH keys
- Use GitHub CLI (`gh auth login`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in with your GitHub account

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `ic01270815-sudo/basketball-analytics`
   - Vercel will auto-detect it's a Next.js project

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `my-next-app` (if your repo root is the parent folder)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (if needed):
   - Add any environment variables your app requires
   - For this project, none appear to be needed

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd my-next-app
   vercel
   ```
   - Follow the prompts
   - Choose production deployment when asked

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

## Step 3: Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Rebuild on every commit

## Troubleshooting

### Build Errors
- Check Vercel build logs in the dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (Vercel uses Node 18.x by default)

### Environment Variables
- Add them in Vercel Dashboard → Project Settings → Environment Variables
- Redeploy after adding variables

### Custom Domain
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Connect repository to Vercel
3. ✅ Deploy and share your live URL!

