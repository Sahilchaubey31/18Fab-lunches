# Railway Deployment Guide

## Step 1: Push to GitHub

```bash
cd d:\18Fab-lunches
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/18Fab-lunches.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub (easiest)
3. Authorize Railway to access your GitHub

## Step 3: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your `18Fab-lunches` repository
4. Click "Deploy"

## Step 4: Configure Backend Service

Railway will auto-detect your .NET project. Configure:

1. **Service Name**: `ecommerce-api`
2. **Root Directory**: `backend/ECommerceAPI`
3. **Build Command**: Leave default (Railway auto-detects .NET)
4. **Start Command**: Leave default

## Step 5: Set Environment Variables

In Railway dashboard:

1. Go to your project
2. Click on `ecommerce-api` service
3. Go to "Variables" tab
4. Add if needed:
   ```
   ASPNETCORE_ENVIRONMENT=Production
   ```

## Step 6: Get Your API URL

1. Go to "Deployments" tab
2. Wait for deployment to complete (green checkmark)
3. Click on the service
4. Copy the public URL (e.g., `https://ecommerce-api-prod.up.railway.app`)

## Step 7: Update Frontend API URL

Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = 'https://ecommerce-api-prod.up.railway.app/api';
```

Replace with your actual Railway URL.

## Step 8: Deploy Frontend to GitHub Pages (Optional)

```bash
cd frontend
npm run build
```

Or deploy to Vercel/Netlify for free.

## Step 9: Test API

```
GET https://ecommerce-api-prod.up.railway.app/api/products
```

Should return your products list.

## Auto-Deployment

Every time you push to GitHub:
```bash
git add .
git commit -m "Your message"
git push
```

Railway automatically redeploys!

## Troubleshooting

- **Build fails**: Check Railway logs in dashboard
- **API not responding**: Verify environment variables
- **CORS errors**: Already configured in your backend
- **Port issues**: Railway assigns port automatically

## Free Tier Limits

- $5/month credit (usually enough)
- 500 build minutes/month
- Automatic sleep after inactivity (wakes on request)

## Next Steps

1. Deploy frontend to Vercel/Netlify (free)
2. Add database (PostgreSQL free tier on Railway)
3. Monitor logs in Railway dashboard
