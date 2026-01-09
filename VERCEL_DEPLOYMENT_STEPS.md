# 🚀 Step-by-Step: Deploy to Vercel

## ✅ Step 1: Code is on GitHub (COMPLETED)
- ✅ All changes committed
- ✅ Pushed to: `https://github.com/ic01270815-sudo/basketball-analytics.git`
- ✅ Branch: `main`

---

## 📋 Step 2: Create/Login to Vercel Account

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "Sign Up"** (or "Log In" if you have an account)
3. **Sign in with GitHub:**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account
   - This allows automatic deployments

---

## 📦 Step 3: Import Your Project

1. **In Vercel Dashboard, click "Add New..." → "Project"**

2. **Find your repository:**
   - You should see: `ic01270815-sudo/basketball-analytics`
   - Click "Import" next to it

3. **Configure Project Settings:**
   
   **⚠️ IMPORTANT: Root Directory**
   - Since your Next.js app is in the `my-next-app` folder:
   - Click "Edit" next to "Root Directory"
   - Change from `./` to `my-next-app`
   - Click "Continue"

   **Other Settings (should auto-detect):**
   - Framework Preset: `Next.js` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
   - Install Command: `npm install` ✅
   - Node.js Version: `18.x` ✅

4. **Environment Variables:**
   - For this project, you don't need any environment variables
   - Click "Deploy" to proceed

---

## ⏳ Step 4: Wait for Deployment

- Build will take 2-3 minutes
- You'll see build logs in real-time
- Watch for any errors (there shouldn't be any!)

---

## ✅ Step 5: Your Dashboard is Live!

Once deployment completes:

1. **You'll see a success message**
2. **Your dashboard URL will be:**
   - `https://basketball-analytics-[random].vercel.app`
   - Or a custom name if you set one

3. **Click the URL to view your live dashboard!**

---

## 🔄 Step 6: Automatic Deployments (Already Set Up!)

From now on:
- ✅ Every push to `main` branch = automatic deployment
- ✅ Pull requests = preview deployments
- ✅ No manual deployment needed!

---

## 🎨 Optional: Custom Domain

1. Go to **Project Settings → Domains**
2. Add your domain (e.g., `basketball.yourschool.com`)
3. Follow DNS instructions
4. Wait 5-60 minutes for DNS propagation

---

## 🐛 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Make sure Root Directory is set to `my-next-app`
- Verify Node.js version is 18.x

### Can't Find Repository?
- Make sure you authorized Vercel to access GitHub
- Check repository is public or you have access

### Wrong Root Directory?
- Go to Project Settings → General
- Update Root Directory to `my-next-app`
- Redeploy

---

## 📞 Need Help?

- Vercel Support: https://vercel.com/support
- Check build logs in Vercel dashboard
- Your repository: https://github.com/ic01270815-sudo/basketball-analytics

---

## 🎉 You're Done!

Your dashboard is now live and accessible to anyone with the URL!


