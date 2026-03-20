# Vercel Deployment - Quick Reference Card

## 🚀 One-Line Deployment

```bash
# First time: Connect repository
vercel

# Subsequent: Deploy to production
vercel --prod
```

---

## 📋 Prerequisites Checklist

- [ ] Node.js v16+ installed (`node --version`)
- [ ] Git initialized (`git init` if needed)
- [ ] Code pushed to GitHub
- [ ] Vercel account created (https://vercel.com/signup)
- [ ] Vercel CLI installed (`npm install -g vercel`)

---

## 📝 Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
Name: VITE_API_URL
Value: https://your-backend-api-url.com
Environments: All
```

---

## 🏗️ Build Information

| Item | Value |
|------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Framework | Vite + React |
| Node Version | 16+ (automatic) |

---

## 🔄 Deployment Flow

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "message"
   git push origin main
   ```

2. **Vercel Auto-Deploys** (or manually trigger)

3. **Visit**: `https://your-project.vercel.app`

4. **Test All Pages**:
   - Login works
   - Feed loads
   - Profile displays
   - API calls connect

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Vercel logs: Dashboard → Deployments |
| 404 on routes | vercel.json should be present (it is) |
| API calls fail | Set VITE_API_URL in Vercel dashboard |
| Variables undefined | Use `import.meta.env.VITE_API_URL` |
| Styles missing | Clear cache (Ctrl+Shift+Del) |

---

## ✅ Local Testing Before Deploy

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Should work perfectly, then deploy safely
vercel --prod
```

---

## 📊 Vercel Dashboard Links

- **Project Settings**: `vercel.com/[project]/settings`
- **Environment Variables**: `vercel.com/[project]/settings/environment-variables`
- **Deployments**: `vercel.com/[project]/deployments`
- **Logs**: `vercel.com/[project]/logs`
- **Analytics**: `vercel.com/[project]/analytics`

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Build configuration |
| `.vercelignore` | Files to exclude |
| `.env` | Local variables (NOT committed) |
| `.env.example` | Template for variables |
| `vite.config.js` | Build optimization |
| `package.json` | Scripts: `npm run deploy` |

---

## 💡 Pro Tips

1. **Test Build Locally First**
   ```bash
   npm run build && npm run preview
   ```

2. **Monitor Deployments**
   - Use Vercel dashboard for real-time logs
   - Check Network tab (F12) on live site

3. **Rollback Quickly**
   - Vercel Dashboard → Deployments → Click past version → "Promote to Production"

4. **Custom Domain**
   - Vercel Dashboard → Settings → Domains
   - Update nameservers at domain registrar

5. **Auto-Deployments**
   - Automatically enabled for main branch
   - Disable if needed in Settings → Git

---

## 📞 Commands Reference

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (preview/staging)
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add VITE_API_URL

# List environment variables
vercel env list

# Remove deployment
vercel remove [deployment-id]

# Check deployment status
vercel ls
```

---

## 🎯 Success Checklist

After deployment, verify:

- [ ] Site loads at vercel.app URL
- [ ] No console errors (F12 → Console)
- [ ] Login page works
- [ ] Authentication tokens stored in localStorage
- [ ] Feed page displays posts
- [ ] API calls show in Network tab
- [ ] Protected routes work
- [ ] Profile page loads user info
- [ ] All styles load correctly
- [ ] Mobile responsive design works

---

## 📚 Full Documentation

- **Detailed Guide**: Read `DEPLOYMENT_GUIDE.md`
- **Complete Setup**: See `VERCEL_SETUP_SUMMARY.md`
- **Checklist**: Follow `VERCEL_CHECKLIST.md`

---

**Status**: ✅ Your project is ready for Vercel deployment!
