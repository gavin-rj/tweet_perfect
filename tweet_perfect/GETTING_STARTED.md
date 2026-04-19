# Tweet Perfect - Getting Started Guide

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites
- Node.js 16+ installed
- OpenAI API key
- GitHub account (for OAuth login)

### 2. Clone & Setup

```bash
# Clone the repository
git clone <repo-url>
cd tweet_perfect

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# - Add OPENAI_API_KEY
# - Add GitHub OAuth credentials
# - Generate NEXTAUTH_SECRET (see DEPLOYMENT.md)
```

### 3. Start Database

```bash
# Initialize SQLite database
npx prisma migrate dev --name init

# Seed with initial data (optional)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📚 Features Overview

### 🎯 Tweet Generation
- **AI-Powered**: Uses OpenAI GPT API to generate 3 tweet variations
- **Multi-Platform**: Optimizes for Twitter, Facebook, Instagram, LinkedIn
- **Custom Style**: Provide examples to match your brand voice

### 💾 User Accounts
- Login with GitHub or Google OAuth
- Automatic user creation on first login
- Persistent preferences and API keys

### 🎨 Personalization
- **Theme Toggle**: Light/Dark mode with persistent preference
- **Custom API Key**: Use your own OpenAI API key
- **Default Platform**: Set your most-used platform

### 📊 Dashboard
- View all generated tweets
- Statistics: Total tweets, platforms used, most popular
- Tweet history with timestamps and character counts

### 🔐 Security
- OAuth authentication (no passwords to manage)
- API keys encrypted in database
- Protected routes for dashboard and settings

## 🎮 User Journey

### First Time User
1. Visit http://localhost:3000
2. Click "Sign In" → Choose GitHub or Google
3. Redirected to home page
4. Fill in content and examples
5. Click "Generate Tweets"
6. See 3 tweet variations
7. Click "Copy" to copy any tweet

### Returning User
1. Click "Sign In" with same provider
2. Dashboard shown (if navigated there)
3. Access settings to change theme, API key, etc.
4. All previous tweets in history

## 🛠️ Project Structure

```
src/
├── pages/
│   ├── index.js              # Home (tweet generator)
│   ├── dashboard.js          # User dashboard
│   ├── settings.js           # User settings
│   ├── auth/signin.js        # Sign in page
│   └── api/
│       ├── gpt.js            # Tweet generation endpoint
│       ├── user/             # User-specific endpoints
│       │   ├── dashboard.ts  # Get stats & history
│       │   ├── settings.ts   # Get/save user settings
│       │   └── api-key.ts    # Save and validate API key
│       └── auth/[...nextauth].js
├── components/
│   ├── Header.js             # Navigation & theme toggle
│   ├── Form.js               # Tweet input form
│   ├── TweetOutput.js        # Display generated tweets
│   ├── Dashboard*.js         # Dashboard components
│   └── ui/                   # Reusable UI components
├── contexts/
│   ├── GptResponseContext.js # Tweet state
│   └── UserSettingsContext.js # User preferences
├── lib/
│   ├── prisma.ts            # Database client
│   ├── db-helpers.ts        # Database functions
│   ├── auth.ts              # Auth utilities
│   └── withProtectedRoute.js # Route protection
└── styles/
    └── globals.scss         # Tailwind directives
```

## 🔌 API Endpoints

### Public
- `GET /` - Home page
- `GET /about` - About page

### Protected (Requires Authentication)
- `POST /api/gpt` - Generate tweets
- `GET /api/user/settings` - Get user settings
- `POST /api/user/settings` - Save user settings
- `POST /api/user/api-key` - Save API key
- `GET /api/user/dashboard` - Get stats and history

### NextAuth
- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/callback/[provider]` - OAuth callbacks

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { 600: '#your-color' }
}
```

### Add New Social Platforms

Edit `src/pages/api/gpt.js` and form validation:
```javascript
['twitter', 'facebook', 'instagram', 'linkedin', 'tiktok']
```

### Change GPT Model

Edit `src/pages/api/gpt.js`:
```javascript
model: 'text-davinci-003', // Change to another model
```

## 🐛 Common Issues

### "Cannot find module '@/lib/prisma'"
**Solution**: Ensure you've run `npm install`

### "OpenAI API key invalid"
**Solution**: Check your API key at https://platform.openai.com/account/api-keys

### "Tweets aren't saving"
**Solution**: 
- Check database is initialized: `npx prisma migrate dev --name init`
- Ensure you're logged in
- Check browser console for errors

### "Theme toggle isn't working"
**Solution**:
- Clear browser cache
- Sign in to save theme preference
- Check dark mode is enabled in your OS settings

## 📈 Next Steps

1. **Customize**: Add your branding and colors
2. **Deploy**: Follow DEPLOYMENT.md for Vercel
3. **Monitor**: Set up error tracking
4. **Extend**: Add more features (AI image generation, scheduling, etc.)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma ORM](https://www.prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [OpenAI API](https://platform.openai.com/docs)

## 💬 Support

- Check docs: DEPLOYMENT.md and README.md
- Check GitHub issues
- Review error logs: `npm run dev` console output

Happy tweeting! 🚀
