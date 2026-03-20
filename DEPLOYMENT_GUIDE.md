# Vercel Deployment Guide

This guide explains how to deploy the Authentication Frontend to Vercel.

## Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **Vercel Account** - [Sign up free](https://vercel.com/signup)
4. **Vercel CLI** (optional but recommended)
   ```bash
   npm install -g vercel
   ```

## Project Structure

```
auth-frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Feed.jsx
│   │   └── Profile.jsx
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
├── vercel.json
├── index.html
└── .env.example
```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/auth-frontend.git
   git push -u origin main
   ```

2. **Go to Vercel.com**
   - Sign in to your Vercel account
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Select "auth-frontend" folder (if in monorepo)

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add the following variables:
     ```
     VITE_API_URL = https://your-backend-api-url.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd auth-frontend
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   # Enter: https://your-backend-api-url.com
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables Setup

### Local Development (.env file)
```
VITE_API_URL=http://localhost:8080
```

### Staging/Production (Vercel Dashboard)
1. Go to your project → Settings → Environment Variables
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-api-url.com`
   - **Environments**: Select all (Production, Preview, Development)
3. Re-deploy for changes to take effect

## Build Configuration

The project uses Vite for building. Configuration is in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Build Process
```bash
npm install
npm run build  # Creates optimized dist/ folder
npm run preview  # Test production build locally
```

## Verify Deployment

1. **Check Build Logs**
   - Vercel Dashboard → Deployments → Click latest → View logs
   - Ensure no errors in build output

2. **Test Live Site**
   - Visit your Vercel URL: `https://your-project.vercel.app`
   - Try logging in with test credentials
   - Verify API calls work correctly

3. **Check Environment Variables**
   ```bash
   vercel env list
   ```

## Continuous Deployment

Vercel automatically deploys when you push to your GitHub repository:
- **Push to main** → Automatic production deployment
- **Push to other branches** → Preview deployment

To disable auto-deploy:
1. Vercel Dashboard → Settings → Git
2. Toggle off "Deploy on push"

## Troubleshooting

### Build Failed Error
**Problem**: Deployment fails during build
**Solution**:
1. Check build logs: Dashboard → Deployments → Failed deployment
2. Common issues:
   - Missing environment variables
   - Node modules not installed properly
   - Syntax errors in code

### 404 on Routes
**Problem**: React Router paths return 404
**Solution**:
- Vercel automatically handles SPA routing
- If issue persists, add `vercel.json` configuration (already done)

### API Calls Failing
**Problem**: "CORS error" or "Network error" on live site
**Solution**:
1. Check if backend API is accessible
2. Verify `VITE_API_URL` environment variable is set correctly
3. Ensure backend allows requests from your Vercel domain
4. Backend should have appropriate CORS headers:
   ```javascript
   response.setHeader('Access-Control-Allow-Origin', 'https://your-project.vercel.app');
   ```

### Environment Variables Not Working
**Problem**: `process.env.VITE_API_URL` is undefined
**Solution**:
1. In Vite, use `import.meta.env.VITE_API_URL` instead
2. Environment variable must start with `VITE_` prefix
3. Re-deploy after setting variables in Vercel dashboard
4. Clear browser cache (Ctrl+Shift+Delete)

## Optimization Tips

### Reduce Build Size
1. **Lazy load routes** - Use React.lazy() for heavy components
2. **Minify assets** - Vite does this automatically
3. **Remove unused dependencies** - `npm prune`

### Performance
1. **Enable caching headers** - Already configured in Vercel
2. **Use CDN** - Vercel provides global CDN automatically
3. **Optimize images** - Compress before uploading

## Custom Domain

1. **Buy Domain** - GoDaddy, Namecheap, etc.
2. **Add to Vercel**
   - Dashboard → Settings → Domains
   - Enter your domain name
   - Follow DNS configuration steps
   - Update nameservers at your registrar (typically takes 24-48 hours)

3. **Enable SSL/HTTPS**
   - Automatically provided by Vercel (Let's Encrypt)

## Monitoring & Analytics

**Vercel Dashboard includes**:
- Build times and logs
- Deployment history
- Environment variable tracking
- Domain/SSL status
- Team collaboration tools

## Rollback to Previous Deployment

1. Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click "..." → "Promote to Production"

## Local Testing Before Deploy

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Then deploy
vercel --prod
```

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)

## Support

For issues:
1. Check Vercel deployment logs
2. Verify environment variables are set
3. Ensure backend API is accessible
4. Contact Vercel support: https://vercel.com/support
