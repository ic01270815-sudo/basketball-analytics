# PowerShell Deployment Script for Basketball Analytics Dashboard
# Run this script to prepare and deploy your dashboard

Write-Host "🚀 Basketball Analytics Dashboard Deployment" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Check if we're in the right directory
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the my-next-app directory." -ForegroundColor Red
    exit 1
}

# Step 1: Check Git status
Write-Host "📋 Step 1: Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    Write-Host $gitStatus
    $commit = Read-Host "`nDo you want to commit these changes? (y/n)"
    if ($commit -eq "y" -or $commit -eq "Y") {
        $message = Read-Host "Enter commit message (or press Enter for default)"
        if ([string]::IsNullOrWhiteSpace($message)) {
            $message = "Deploy dashboard"
        }
        git add .
        git commit -m $message
        Write-Host "✅ Changes committed" -ForegroundColor Green
    }
} else {
    Write-Host "✅ No uncommitted changes" -ForegroundColor Green
}

# Step 2: Test build
Write-Host "`n🔨 Step 2: Testing production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green

# Step 3: Deployment options
Write-Host "`n📦 Step 3: Choose deployment method:" -ForegroundColor Yellow
Write-Host "1. Deploy via Vercel CLI (requires: npm install -g vercel)"
Write-Host "2. Push to GitHub (for Vercel Dashboard deployment)"
Write-Host "3. Build only (test locally)"
Write-Host "4. Exit"
$choice = Read-Host "`nEnter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host "`n🚀 Deploying to Vercel..." -ForegroundColor Cyan
        vercel --prod
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Deployment successful!" -ForegroundColor Green
        } else {
            Write-Host "`n❌ Deployment failed. Make sure Vercel CLI is installed: npm install -g vercel" -ForegroundColor Red
        }
    }
    "2" {
        Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Cyan
        $branch = git branch --show-current
        git push origin $branch
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Pushed to GitHub!" -ForegroundColor Green
            Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
            Write-Host "1. Go to https://vercel.com"
            Write-Host "2. Import your GitHub repository"
            Write-Host "3. Set Root Directory to 'my-next-app' (if needed)"
            Write-Host "4. Click Deploy!"
        } else {
            Write-Host "`n❌ Push failed. Check your Git configuration." -ForegroundColor Red
        }
    }
    "3" {
        Write-Host "`n✅ Build completed. Test locally with: npm start" -ForegroundColor Green
    }
    "4" {
        Write-Host "`n👋 Exiting..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "`n❌ Invalid choice" -ForegroundColor Red
    }
}

Write-Host "`n✨ Done! Check DEPLOY.md for detailed instructions." -ForegroundColor Cyan

