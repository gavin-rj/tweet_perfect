# 📱 TweetPerfect

A sophisticated AI-powered tweet generation tool that transforms your content into platform-optimized social media posts. TweetPerfect uses OpenAI's GPT models to generate multiple variations of tweets based on your input content, helping you maintain a consistent voice across all social media platforms.

## ✨ Features

### 🎯 Core Features
- **Multi-Platform Support**: Optimize content for Twitter, Facebook, Instagram, and LinkedIn
- **AI-Powered Generation**: Advanced GPT API generates 3 tweet variations instantly
- **Custom Style**: Provide tweet examples to train AI on your brand voice
- **One-Click Copy**: Copy any generated tweet to clipboard with instant feedback

### 👤 User Features
- **GitHub & Google Authentication**: Secure OAuth login without passwords
- **Dashboard**: Track tweet history, view statistics, and monitor platform usage
- **User Settings**: 
  - Custom OpenAI API key configuration
  - Light/Dark theme toggle with persistence
  - Default platform preference
- **Tweet History**: Save and view all previously generated tweets

### 🎨 Design & UX
- **Dark Mode Support**: Full light/dark theme with automatic persistence
- **Responsive Design**: Mobile-first Tailwind CSS for all devices
- **Modern UI**: Beautiful card-based layout with smooth animations
- **Real-time Feedback**: Loading states, success messages, error handling

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18.2.0, Next.js 13.3.0 |
| **Styling** | Tailwind CSS 3.3.0, PostCSS |
| **Database** | Prisma ORM, SQLite (dev) / PostgreSQL (prod) |
| **Authentication** | NextAuth 4.22.0 (GitHub & Google OAuth) |
| **AI Integration** | OpenAI API (text-davinci-003) |
| **Deployment** | Vercel (serverless functions) |

## ⚡ Quick Start

### Prerequisites
- Node.js 16+
- OpenAI API key (from https://platform.openai.com/account/api-keys)
- GitHub account (for OAuth)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/tweet-perfect.git
cd tweet-perfect

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local and add your credentials
# - OPENAI_API_KEY
# - GITHUB_ID & GITHUB_SECRET
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)

# Initialize database
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Generating Tweets

1. **Enter Content**: Paste your article, whitepaper, or content
2. **Add Examples** (optional): Include tweet examples to match your style
3. **Select Platform**: Choose target platform (Twitter, Facebook, Instagram, LinkedIn)
4. **Generate**: Click "Generate Tweets" to create variations
5. **Copy**: Click "Copy" on any tweet to copy to clipboard

### Dashboard

- **Stats**: View total tweets generated and platform usage breakdown
- **History**: See all previously generated tweets with timestamps
- **Quick Links**: Access settings and start new generation session

### Settings

- **API Key**: Enter your OpenAI API key for dedicated quota
- **Theme**: Switch between light and dark mode
- **Platform**: Set your default social media platform
- **Account**: View account information and creation date

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── index.js              # Home - main tweet generator
│   ├── dashboard.js          # User dashboard (protected)
│   ├── settings.js           # User settings (protected)
│   ├── about.js              # About page
│   ├── auth/signin.js        # Sign in page
│   └── api/
│       ├── gpt.js            # Tweet generation endpoint
│       ├── user/
│       │   ├── dashboard.ts  # Get user stats & tweet history
│       │   ├── settings.ts   # Manage user preferences
│       │   └── api-key.ts    # Validate & save API key
│       └── auth/[...nextauth].js
├── components/
│   ├── Header.js             # Navigation + theme toggle
│   ├── Form.js               # Tweet generation form
│   ├── TweetOutput.js        # Display generated tweets
│   ├── DashboardStats.js     # Statistics cards
│   ├── TweetHistory.js       # Tweet history list
│   ├── QuickActions.js       # Action buttons
│   └── ui/                   # UI component library
│       ├── Button.js
│       ├── Input.js
│       └── Card.js
├── contexts/
│   ├── GptResponseContext.js # Tweet generation state
│   └── UserSettingsContext.js # User preferences state
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   ├── db-helpers.ts         # Database utility functions
│   ├── auth.ts               # Authentication utilities
│   └── withProtectedRoute.js # Protected page wrapper
├── styles/
│   └── globals.scss          # Global Tailwind styles
└── prisma/
    └── schema.prisma         # Database schema
```

## 🔐 Authentication

### Supported Providers
- **GitHub**: Create OAuth app at https://github.com/settings/developers
- **Google**: Create project at https://console.cloud.google.com/

### How It Works
1. User clicks "Sign In"
2. Redirected to GitHub/Google login
3. Redirected back to TweetPerfect with session token
4. User profile created automatically
5. Access to dashboard and settings

## 💾 Database Schema

### User
```prisma
- id: Unique identifier
- email: User email
- apiKey: Custom OpenAI API key
- theme: light | dark
- defaultPlatform: twitter | facebook | instagram | linkedin
- createdAt, updatedAt: Timestamps
```

### Tweet
```prisma
- id: Unique identifier
- userId: User who generated it
- content: Tweet text
- platform: Which platform it's for
- createdAt: When generated
```

### Preference
```prisma
- userId: User settings
- theme: light | dark
- createdAt, updatedAt: Timestamps
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import repository
4. Add environment variables:
   - All `.env.local` variables
   - Use Vercel Postgres for database (or external PostgreSQL)
5. Deploy!

### Production Checklist

- [ ] All environment variables set
- [ ] Database migrations complete
- [ ] OAuth apps created (GitHub & Google)
- [ ] NEXTAUTH_URL matches domain
- [ ] NEXTAUTH_SECRET is secure and random
- [ ] OpenAI API key valid and has credits
- [ ] Test login flow
- [ ] Test tweet generation
- [ ] Test dashboard and settings
- [ ] Test dark mode

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide.

## 📚 Documentation

- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Comprehensive getting started guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment and production setup
- **[API.md](./API.md)** - API endpoints reference (coming soon)

## 🔌 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/about` | About page |

### Protected Endpoints (Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/gpt` | Generate tweets |
| GET | `/api/user/settings` | Get user settings |
| POST | `/api/user/settings` | Update settings |
| POST | `/api/user/api-key` | Save API key |
| GET | `/api/user/dashboard` | Get dashboard data |

See detailed [API documentation](./API.md) (coming soon).

## 🎨 Customization

### Change Brand Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#your-brand-color'
  }
}
```

### Add Custom Social Platforms

1. Update form options in `src/components/Form.js`
2. Update platform validation in `src/pages/api/user/settings.ts`
3. Add character limits and tips

### Switch GPT Model

Edit `src/pages/api/gpt.js`:
```javascript
model: 'gpt-3.5-turbo' // or another model
```

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

### Authentication Issues
- Clear browser cookies
- Verify OAuth credentials
- Check NEXTAUTH_URL matches exactly

### API Generation Fails
- Verify OpenAI API key at https://platform.openai.com/account/api-keys
- Check API rate limits and credits
- Review error logs in browser console

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting.

## 📈 Roadmap

- [ ] Scheduled tweet posting
- [ ] AI image generation integration
- [ ] Tweet performance analytics
- [ ] Hashtag suggestions
- [ ] Multi-account management
- [ ] Tweet scheduling to multiple platforms
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🤖 AI Model Information

**Current Model**: OpenAI text-davinci-003
- **Max Tokens**: 1000
- **Temperature**: 0.7 (creative but focused)
- **Variations**: 3 per request

## 💡 Pro Tips

- Provide 2-3 tweet examples for better style matching
- Keep source content concise for focused tweets
- Twitter has 280 char limit - watch out for length
- Different platforms have different tones:
  - Twitter: Witty, concise, conversational
  - LinkedIn: Professional, insightful, industry-focused
  - Instagram: Visual-friendly, hashtag-rich
  - Facebook: Detailed, story-driven, engaging

## 📞 Support

For issues and questions:
- 📖 Check [GETTING_STARTED.md](./GETTING_STARTED.md)
- 🚀 Read [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 Review [GitHub Issues](https://github.com/yourusername/tweet-perfect/issues)
- 💬 Start a discussion

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Prisma](https://www.prisma.io) - Database ORM
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [OpenAI](https://openai.com) - AI API

---

**Made with ❤️ for better social media content**

Latest Update: 2026-04-19 | Version: 1.0.0 | [Changelog](./CHANGELOG.md)

