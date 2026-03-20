# Vercel Deployment Checklist

Use this checklist before deploying to Vercel:

## Pre-Deployment Checklist

### Code Quality
- [ ] All code is committed to Git
- [ ] No console.log statements in production code
- [ ] No TODO comments left unfixed
- [ ] ESLint passes: `npm run lint`
- [ ] All imports are correct and working

### Testing
- [ ] Login page works
- [ ] Register page works
- [ ] Feed page loads and displays posts
- [ ] Profile page displays user info
- [ ] Navigation between pages works
- [ ] Authentication tokens are stored correctly
- [ ] Protected routes redirect unauthenticated users to login

### Environment Setup
- [ ] `.env` file is NOT committed to Git
- [ ] `.env.example` file is up-to-date
- [ ] All required environment variables are documented
- [ ] `VITE_API_URL` points to correct backend

### Build Verification
- [ ] Local build succeeds: `npm run build`
- [ ] No build warnings or errors
- [ ] `dist/` folder builds correctly
- [ ] Preview works: `npm run preview`

### Vercel Configuration
- [ ] `vercel.json` is configured correctly
- [ ] `.vercelignore` has necessary exclusions
- [ ] GitHub repository is connected to Vercel
- [ ] Project name is set in Vercel dashboard

### Environment Variables in Vercel
- [ ] `VITE_API_URL` is set in Vercel dashboard
- [ ] Variables are set for all environments (Production, Preview, Development)
- [ ] No hardcoded URLs in code

## Deployment Steps

1. **Final Code Push**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Trigger Vercel Deployment**
   - Automatic: Push to main branch
   - Manual: Go to Vercel dashboard and re-deploy
   - CLI: `vercel --prod`

3. **Post-Deployment Testing**
   - [ ] Site loads without errors
   - [ ] All pages are accessible
   - [ ] Authentication flows work
   - [ ] API calls connect to backend
   - [ ] No console errors (F12 → Console)

## Rollback Plan

If deployment fails:
1. Check Vercel build logs for errors
2. Fix issues locally
3. Commit and push to trigger new deployment
4. Or manually promote previous working build in Vercel dashboard

## Performance Monitoring

After deployment:
- Monitor Vercel Analytics dashboard
- Check for any failed requests
- Verify Core Web Vitals
- Monitor function logs for errors

## Common Issues & Solutions

### Build Fails
- Check Node version compatibility
- Verify all dependencies are in package.json
- Clear node_modules and reinstall
- Check for environment variable references

### Routes Return 404
- Vercel SPA configuration is automatic with Vite
- Check vercel.json is present
- Ensure React Router is properly configured

### API Calls Fail
- Verify VITE_API_URL environment variable
- Check backend CORS settings
- Verify backend URL is accessible
- Check network tab in browser DevTools

### Styles Not Loading
- Clear browser cache
- Check CSS file extensions (.css)
- Verify CSS imports in component files
- Check Vercel build output for CSS files

## Success Indicators

Deployment is successful when:
✓ Build completes without errors
✓ Site is live at vercel.app URL
✓ All pages load correctly
✓ Authentication works end-to-end
✓ API responses are visible in Network tab
✓ No console errors or warnings
