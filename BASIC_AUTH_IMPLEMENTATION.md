# Basic Auth Implementation - Credentials Provider

## Overview

The TweetPerfect app now uses **NextAuth.js with Credentials Provider** for username/password authentication instead of OAuth. This provides a simple, self-contained auth system that works without external OAuth configuration.

### ⚡ Demo Credentials
- **Username**: `admin`
- **Password**: `1234`

---

## What Was Implemented

### 1. **Environment Configuration** (`.env.local`)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-key-12345-change-in-production
```

**Why**: NextAuth requires these variables:
- `NEXTAUTH_URL`: Tells NextAuth where your app is deployed (for OAuth redirect URIs and cookie validation)
- `NEXTAUTH_SECRET`: Encrypts JWT tokens and hashes email verification tokens

### 2. **Authentication Configuration** (`src/lib/auth.ts`)
Switched from OAuth (GitHub/Google) to **Credentials Provider**:

```typescript
CredentialsProvider({
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    // Hardcoded admin validation (development)
    if (credentials.username === "admin" && 
        credentials.password === "1234") {
      return { id: "1", email: "admin@...", name: "Admin User" }
    }
    return null
  }
})
```

**Key features**:
- JWT strategy (stateless - no database needed)
- Session callbacks to persist user ID and role
- 30-day session with daily token refresh
- Proper error handling for invalid credentials

### 3. **Sign-In Page** (`src/pages/auth/signin.js`)
Added a **credentials form** for username/password login:

```javascript
<form onSubmit={handleSubmit}>
  <input name="username" placeholder="admin" />
  <input name="password" type="password" placeholder="1234" />
  <button type="submit">Sign In</button>
</form>
```

**Features**:
- Form validation
- Error messaging
- Loading state
- Demo credentials displayed on form
- Callback redirect after successful login

---

## How It Works

### Sign-In Flow
1. User enters username/password on `/auth/signin`
2. Form calls `signIn('credentials', { username, password })`
3. NextAuth sends POST to `/api/auth/callback/credentials`
4. `authorize()` function validates credentials
5. If valid → JWT token created → session established → redirect
6. If invalid → error message shown

### Session Management
- **Authentication**: JWT tokens stored in `HTTP-only`, `Secure` cookies
- **Session data**: Retrieved via `useSession()` hook or `getServerSession()`
- **Token refresh**: Automatic daily refresh for active sessions
- **Logout**: `signOut()` clears session cookie

### API Protection
Protected API routes use the `requireAuth()` helper:

```typescript
import { requireAuth } from '@/lib/auth'

export default async function handler(req, res) {
  const session = await requireAuth(req, res)
  if (!session) return // 401 already sent
  
  // Use session.user.email, session.user.id, etc.
}
```

---

## Security Considerations

### ✅ Current Implementation (Development)
- Hardcoded credentials (fine for demo/testing)
- HTTPS-ready (uses Secure flag on cookies)
- CSRF protection (automatic)
- HTTP-only (no JavaScript access)
- Type-safe session data

### ⚠️ Production Upgrade Path

For production, implement:

1. **Database Integration** (Prisma + PostgreSQL)
   ```typescript
   const user = await prisma.user.findUnique({ 
     where: { username: credentials.username } 
   })
   ```

2. **Password Hashing** (bcrypt)
   ```typescript
   import bcrypt from 'bcrypt'
   const isValid = await bcrypt.compare(password, user.hashedPassword)
   ```

3. **Rate Limiting** (prevent brute-force)
   ```typescript
   // Use packages like express-rate-limit
   // Limit to 5 attempts per 15 minutes per IP
   ```

4. **Audit Logging** (track auth attempts)
   ```typescript
   console.log(`Login attempt: ${username} at ${new Date()}`)
   ```

---

## Files Modified/Created

| File | Change | Reason |
|------|--------|--------|
| `.env.local` | Created | NextAuth requires `NEXTAUTH_URL` and `NEXTAUTH_SECRET` |
| `src/lib/auth.ts` | Updated | Switched from OAuth to Credentials provider |
| `src/pages/auth/signin.js` | Updated | Added credentials form (username/password) |
| `src/pages/auth/error.js` | Existing | Already handles auth errors |

---

## Testing the Implementation

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Test Sign In
- Go to `http://localhost:3000/auth/signin`
- Enter: `admin` / `1234`
- Should redirect to home page signed in

### 3. Check Session
- Open browser dev tools → Application → Cookies
- Look for `next-auth.jwt` cookie (encrypted)
- Open browser console:
  ```javascript
  import { useSession } from 'next-auth/react'
  const { data: session } = useSession()
  console.log(session)
  ```

### 4. Protected Routes
- Try accessing `/dashboard` while logged in → works ✅
- Log out and try `/dashboard` → redirects to signin ✅

---

## Next Steps (Optional)

### Immediate
- [ ] Test credentials: admin / 1234
- [ ] Verify protected routes work
- [ ] Test sign out functionality

### Short Term
- [ ] Connect Prisma database
- [ ] Add user registration
- [ ] Implement password hashing (bcrypt)

### Medium Term
- [ ] Add OAuth back (GitHub/Google as alternatives)
- [ ] Implement "Remember me" functionality
- [ ] Add 2FA (two-factor authentication)
- [ ] Add audit logging

---

## Troubleshooting

**Issue**: Sign-in returns 401 error
- Check `.env.local` has `NEXTAUTH_SECRET` set
- Verify `NEXTAUTH_URL` matches your domain

**Issue**: Credentials not working
- Ensure username is `admin` and password is `1234` (case-sensitive)
- Check browser cookies have `next-auth.jwt` set

**Issue**: Build fails with env loading error
- Ensure `.env.local` uses simple values (no command substitution)
- Regenerate: `NEXTAUTH_SECRET=$(openssl rand -base64 32)`

---

## Architecture Diagram

```
User Input (signin form)
    ↓
POST /api/auth/callback/credentials
    ↓
authorize() in auth.ts validates
    ↓
JWT token created and stored in cookie
    ↓
Session available via useSession() hook
    ↓
Protected routes check session
    ↓
API routes use requireAuth() middleware
```

---

## Documentation References

- NextAuth.js: https://next-auth.js.org
- Credentials Provider: https://next-auth.js.org/providers/credentials
- Session Callbacks: https://next-auth.js.org/configuration/callbacks
- Security: https://next-auth.js.org/security

