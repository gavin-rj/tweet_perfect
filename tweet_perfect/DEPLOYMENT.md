# Tweet Perfect - Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git
- OpenAI API key
- GitHub OAuth app credentials
- Google OAuth credentials (optional)

### 1. Clone & Install

```bash
git clone <your-repo>
cd tweet_perfect
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Fill in `.env.local` with your credentials:
- **OpenAI API Key**: Get from https://platform.openai.com/account/api-keys
- **GitHub OAuth**: Create app at https://github.com/settings/developers
- **Google OAuth**: Create project at https://console.cloud.google.com/
- **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`

### 3. Initialize Database

```bash
npx prisma migrate dev --name init
```

This creates the SQLite database and runs migrations.

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Vercel Project

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure environment variables in Vercel settings:
   - Add all variables from `.env.local`
   - Use Vercel Postgres or external PostgreSQL for production

### 3. Database Setup

**Option A: Vercel Postgres (Recommended)**
```bash
# From Vercel dashboard, connect Vercel Postgres
# Copy the DATABASE_URL to your environment variables
```

**Option B: External PostgreSQL**
1. Use services like: Railway, Render, AWS RDS, Supabase
2. Get the connection string
3. Add to Vercel environment variables

### 4. Update Prisma for PostgreSQL

Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Run migration:
```bash
npx prisma migrate deploy
```

### 5. Deploy

Vercel automatically deploys on git push. The first deployment will:
- Install dependencies
- Build the Next.js app
- Run database migrations

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations completed
- [ ] GitHub/Google OAuth apps created and configured
- [ ] OpenAI API key valid and has sufficient credits
- [ ] NEXTAUTH_SECRET is a secure random string
- [ ] NEXTAUTH_URL matches your Vercel domain
- [ ] Test login flow (GitHub + Google)
- [ ] Test tweet generation with GPT API
- [ ] Test dashboard and settings pages
- [ ] Test dark mode toggle
- [ ] Verify tweets are saved to database

## Database Schema Overview

### Users
- Store user profile, API keys, theme preference
- Integrated with NextAuth for OAuth

### Tweets
- Store generated tweets with platform and timestamp
- Linked to user for history tracking

### Preferences
- User-specific settings (theme, default platform)

## Troubleshooting

### Database Connection Error
```
Error: Cannot find a valid datasource named "db"
```
**Solution**: Ensure `DATABASE_URL` is set in `.env.local`

### OpenAI API Error "Invalid API Key"
**Solution**: 
- Verify API key from https://platform.openai.com/account/api-keys
- Check you haven't exceeded rate limits
- Verify API key is active

### NextAuth Sessions Not Working
**Solution**:
- Ensure `NEXTAUTH_URL` matches exactly (including protocol)
- Generate new `NEXTAUTH_SECRET` with `openssl rand -base64 32`
- Clear browser cookies and try again

### Prisma Migration Issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name migration_name
```

## GitHub/Google OAuth Setup

### GitHub OAuth
1. Go to https://github.com/settings/developers
2. New OAuth App
3. Application name: Tweet Perfect
4. Homepage URL: http://localhost:3000 (dev) or your domain (prod)
5. Authorization callback URL: http://localhost:3000/api/auth/callback/github
6. Copy Client ID and Client Secret to `.env.local`

### Google OAuth
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable Google+  API
4. Create OAuth 2.0 Credentials (Web application)
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://yourdomain.com/api/auth/callback/google
6. Copy Client ID and Secret to `.env.local`

## Monitoring & Maintenance

### Check Database Size
```bash
# SQLite (local)
ls -lh prisma/dev.db

# PostgreSQL
SELECT pg_database.datname,
       pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database;
```

### View Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Local**: npm run dev console output

### Backup Database
```bash
# SQLite
cp prisma/dev.db prisma/dev.db.backup

# PostgreSQL
pg_dump $DATABASE_URL > backup.sql
```

## Next Steps

1. **Custom Domain**: Add custom domain in Vercel settings
2. **SSL/HTTPS**: Automatically provided by Vercel
3. **Analytics**: Connect to Vercel Analytics
4. **Monitoring**: Set up error tracking with Sentry
5. **Performance**: Optimize images and implement caching

## Support

For issues:
1. Check this guide first
2. Review error logs in Vercel dashboard
3. Check Next.js & Prisma documentation
4. Visit: https://github.com/yourusername/tweet-perfect/issues
