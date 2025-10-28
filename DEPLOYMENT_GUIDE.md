# 🚀 Deploying Parloux Store to Vercel - Quick Start Guide

## **Prerequisites**
- ✅ Vercel account (free tier works perfectly)
- ✅ GitHub/GitLab/Bitbucket repository (or connect directly)
- ✅ Environment variables ready

## **Step 1: Create `.env.production` File** 
Create this file in your project root:

```bash
# Shopify API Credentials
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token

# For Admin API (if using webhooks)
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret

# Public URL (Vercel will set this automatically)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

⚠️ **IMPORTANT**: Don't commit this file! It should be in `.gitignore`

## **Step 2: Push to GitHub** (If not already done)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## **Step 3: Deploy to Vercel**

### **Option A: Via Vercel Dashboard (Easiest)**
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Add your environment variables from Step 1
6. Click **"Deploy"**

### **Option B: Via Vercel CLI (Faster)**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

## **Step 4: Configure Environment Variables**
1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable from `.env.production`
4. Click **Save** and redeploy

## **Step 5: Configure Build Settings**
Vercel automatically detects:
- ✅ Framework: Next.js
- ✅ Build Command: `next build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

## **🔧 Deployment Checklist**

### **Before Deployment:**
- [ ] All environment variables ready
- [ ] `.env.production` file created
- [ ] Code pushed to GitHub
- [ ] No build errors (run `npm run build` locally)
- [ ] Test all pages work locally
- [ ] Check for hardcoded localhost URLs

### **After Deployment:**
- [ ] Verify environment variables are set
- [ ] Test homepage loads
- [ ] Test product pages
- [ ] Test collections page
- [ ] Test authentication
- [ ] Test cart functionality
- [ ] Test wishlist functionality
- [ ] Share URL with client

## **🛠️ Troubleshooting**

### **Build Fails**
```bash
# Check build locally first
npm run build

# Fix any TypeScript or ESLint errors
# Then redeploy
```

### **Environment Variables Missing**
- ✅ Always add them in Vercel Dashboard
- ✅ Never commit secrets to Git
- ✅ Use different values for production vs development

### **404 Errors**
- ✅ Check `next.config.ts` redirects
- ✅ Verify all pages are in `src/app/` directory
- ✅ Check API routes are in `src/app/api/` directory

### **Image Loading Issues**
- ✅ Use relative paths or full URLs
- ✅ Check image optimization settings
- ✅ Verify `next/image` is used correctly

## **📊 Performance Tips**

### **Optimize Images**
```typescript
// Use next/image component
import Image from 'next/image';

<Image
  src="/images/product.jpg"
  alt="Product"
  width={500}
  height={600}
  priority // For above-the-fold images
/>
```

### **Enable Analytics**
1. Go to Vercel Dashboard → Settings → Analytics
2. Enable Web Analytics (free)
3. See real user metrics

### **Configure Caching**
```typescript
// In API routes
export async function GET(request: Request) {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

## **🔐 Security Checklist**
- [ ] Environment variables not in Git
- [ ] API keys secured
- [ ] Webhooks properly signed
- [ ] No sensitive data in frontend code
- [ ] HTTPS enabled (automatic on Vercel)

## **📱 Mobile Preview**
1. Vercel provides mobile preview automatically
2. Test on actual devices using the Vercel URL
3. Check responsive design on different screen sizes

## **🚀 Quick Deploy Command**
```bash
# One-line deployment to production
vercel --prod --yes
```

## **🔄 Continuous Deployment**
Vercel automatically deploys on every push to `main` branch:
- ✅ Automatic deployments
- ✅ Preview deployments for PRs
- ✅ Zero-downtime updates
- ✅ Rollback to previous version

## **💡 Pro Tips**
1. **Use Vercel's Preview Deployments** for testing before production
2. **Set up custom domain** for professional URL
3. **Enable Analytics** to track user behavior
4. **Use Vercel's Edge Network** for faster global performance
5. **Monitor build logs** for debugging

## **📞 Need Help?**
- Check [Vercel Documentation](https://vercel.com/docs)
- Check build logs in Vercel Dashboard
- Use Vercel's built-in error reporting

## **🎯 Post-Deployment Steps**
1. ✅ Test all functionality
2. ✅ Share preview URL with client
3. ✅ Gather feedback
4. ✅ Make adjustments
5. ✅ Prepare for production launch

---

**Estimated Time**: 5-10 minutes for first deployment  
**Cost**: Free (Vercel's free tier is generous)  
**Next Steps**: After deployment, we'll optimize performance and prepare for production launch! 🚀

