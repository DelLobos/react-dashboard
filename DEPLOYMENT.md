# GitHub Pages Deployment Setup

## Summary
This document outlines the steps taken to deploy the React Dashboard to GitHub Pages.

## Changes Made

### 1. React Router Configuration (`react-router.config.ts`)
- Set `ssr: false` for SPA mode
- Added `prerender: ["/"]` for static generation
- Added `basename: "/react-dashboard"` for GitHub Pages routing

### 2. Vite Configuration (`vite.config.ts`)
- Set `base: '/react-dashboard/'` for asset paths
- Configured `publicDir: 'public'` for static assets

### 3. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automated deployment to GitHub Pages
- Builds the project and deploys `build/client/` directory
- Copies SPA fallback to `404.html` for client-side routing

### 4. Asset Path Utility (`app/utils/assetPath.ts`)
- Created utility function to handle image paths correctly
- Automatically prefixes `/react-dashboard/` in production
- Uses `/` prefix in development

### 5. Component Updates
- Updated image references to use `getAssetPath()` utility
- Ensures images load correctly on GitHub Pages

## Deployment URL
https://dellobos.github.io/react-dashboard/

## Build Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Output directory: `build/client/`

## Troubleshooting
- If images don't load, ensure all `src="/images/..."` are replaced with `src={getAssetPath("/images/...")}`
- If routing fails, check that basename is correctly set in React Router config
- Check GitHub Actions logs for deployment issues