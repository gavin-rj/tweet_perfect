# NextAuth.js Implementation Guide

## Overview

NextAuth.js is a complete open-source authentication solution for Next.js applications. This guide covers practical implementation steps for setting up Credentials provider authentication (username/password) with a simple hardcoded user account.

---

## 1. Credentials Provider Setup

### What is the Credentials Provider?

The Credentials provider allows you to handle signing in with arbitrary credentials, such as username and password. It's designed for custom authentication mechanisms where you control the verification logic directly.

**Important Security Note**: NextAuth.js intentionally limits Credentials provider functionality to discourage password-based authentication due to inherent security risks. Consider this approach for development/testing environments or specific use cases only.

### Configuration Steps

#### Step 1: Install NextAuth.js

```bash
npm install next-auth
```

#### Step 2: Create API Route Handler

Create the authentication API route at `pages/api/auth/[...nextauth].js`:

```javascript
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to find the user from the credentials supplied
        // For hardcoded user (development only):
        if (credentials.username === "demo" && credentials.password === "password123") {
          return {
            id: 1,
            name: "Demo User",
            email: "demo@example.com"
          }
        }
        // Return null if user data could not be retrieved
        return null
        
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
})
```

#### Step 3: Wrap Your App with SessionProvider

In your Next.js app (typically `pages/_app.js` or `app/layout.js` for App Router):

```javascript
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

#### Step 4: Use useSession Hook in Components

```javascript
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>
  }

  return (
    <>
      <p>Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}
```

---

## 2. Basic Configuration Details

### Essential Environment Variables

Create a `.env.local` file with the following required variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

**Generating a Secure Secret**:
```bash
openssl rand -base64 32
```

### Core Configuration Options

| Option | Description | Required |
|--------|-------------|----------|
| `providers` | Array of authentication providers | Yes |
| `secret` / `NEXTAUTH_SECRET` | Encrypts JWT and hashes email verification tokens | Yes (production) |
| `session.strategy` | Either `"jwt"` (stateless) or `"database"` (default) | No |
| `jwt.secret` | Alternative way to specify JWT secret | No |
| `pages` | Custom pages (signin, signout, error, etc.) | No |
| `callbacks` | Functions to control actions and expose data | No |

### Session Strategy Selection

**JWT Strategy (Stateless)**:
- No database required
- Token stored in encrypted cookie
- Good for serverless/edge deployments
- Default for Credentials provider

```javascript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60 // 24 hours
}
```

**Database Strategy**:
- Requires database adapter (MongoDB, PostgreSQL, etc.)
- Sessions stored in database
- Better for high-security scenarios

### Credentials Provider Configuration Details

The `credentials` object defines the fields shown on the sign-in form:

```javascript
credentials: {
  username: { 
    label: "Username", 
    type: "text", 
    placeholder: "Enter your username" 
  },
  password: { 
    label: "Password", 
    type: "password" 
  },
  // You can add more fields as needed
  rememberMe: {
    label: "Remember me",
    type: "checkbox"
  }
}
```

The `authorize()` method receives these credentials and must:
- Return a **user object** (with at least `id`, `email`, or `name`) if authentication succeeds
- Return **null** if authentication fails
- **Throw an Error** to redirect to error page with error message as query param

---

## 3. Session Callbacks

### How Session Callbacks Work

Session callbacks execute whenever a session is verified. They determine what data is accessible to the client and how token data is exposed.

**Important**: Only a subset of the token is returned for security. You must explicitly forward additional data (like access tokens) through the session callback.

### Callback Flow

1. **JWT Callback** (runs first on sign-in/token update)
   - Processes initial user data
   - Persists custom data to token
   - Returns encrypted token

2. **Session Callback** (runs when session is accessed)
   - Exposes token data to client
   - Controls what user information is available

### JWT Callback Implementation

```javascript
callbacks: {
  async jwt({ token, user, account, profile, isNewUser }) {
    // user, account, profile, isNewUser only passed on new session
    if (user) {
      token.id = user.id
      token.role = user.role // Custom data
    }
    // Persist OAuth access token for API calls
    if (account?.access_token) {
      token.accessToken = account.access_token
    }
    return token
  },
}
```

### Session Callback Implementation

```javascript
callbacks: {
  async session({ session, token }) {
    // Return token data to client
    session.user.id = token.id
    session.user.role = token.role
    // Don't expose sensitive data like access tokens to client if not needed
    return session
  },
}
```

### Complete Callback Example with Hardcoded User

```javascript
export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded user for demo
        if (credentials.username === "admin" && credentials.password === "admin123") {
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin"
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    }
  }
})
```

### Server-Side Session Access

For API routes or server-side rendering:

```javascript
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  
  // User is authenticated
  res.status(200).json({ user: session.user })
}
```

---

## 4. Important Security Considerations

### 1. Generate and Secure NEXTAUTH_SECRET

**Critical**: Not providing a secret will throw an error in production.

```bash
# Generate a secure secret
openssl rand -base64 32
```

Store in `.env.local` (development) or secure environment variable service (production).

### 2. Never Log or Expose Passwords

```javascript
// ❌ WRONG - Never log credentials
async authorize(credentials, req) {
  console.log(credentials.password) // SECURITY RISK!
  // ...
}

// ✅ CORRECT - Only log necessary info
async authorize(credentials, req) {
  console.log(`Login attempt for user: ${credentials.username}`)
  // ...
}
```

### 3. Use HTTPS in Production

- The `NEXTAUTH_URL` should use `https://` in production
- Browsers won't send cookies over insecure connections
- Cookie policies restrict transmission to secure channels

### 4. Cookie Security

NextAuth.js uses signed, prefixed, server-only cookies by default:
- **Secure flag**: Only transmitted over HTTPS
- **HttpOnly flag**: Not accessible via JavaScript (prevents XSS attacks)
- **SameSite policy**: Prevents CSRF attacks
- **Prefix**: Provides additional protection

**Do not override cookie defaults unless necessary** - custom policies may introduce security flaws.

### 5. Avoid Password-Based Auth When Possible

NextAuth.js recommends passwordless alternatives:
- Email sign-in links
- OAuth providers (Google, GitHub, etc.)
- SAML/Enterprise solutions

The Credentials provider's limited functionality is intentional to discourage password usage.

### 6. Implement Proper Password Handling (If Required)

For production Credentials provider:

```javascript
import bcrypt from 'bcrypt'

async authorize(credentials) {
  // Never hardcode passwords in production
  const user = await getUserFromDatabase(credentials.username)
  
  if (!user) {
    return null
  }
  
  // Hash passwords before comparison
  const isPasswordValid = await bcrypt.compare(
    credentials.password, 
    user.passwordHash
  )
  
  if (!isPasswordValid) {
    return null
  }
  
  return user
}
```

### 7. Rate Limiting

Implement rate limiting on the sign-in endpoint to prevent brute-force attacks:

```javascript
// Use a library like express-rate-limit or similar
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts per window
})

// Apply to auth routes
```

### 8. CSRF Protection

NextAuth.js includes automatic HTTP POST + CSRF token validation:
- All state-changing operations use POST
- CSRF tokens are automatically validated
- No additional configuration needed

### 9. Session Security

- **Default session timeout**: 30 days (configurable)
- **Token rotation**: Configure `updateAge` for periodic token refresh
- **Logout**: Properly clear sessions on sign-out

```javascript
session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60    // Refresh daily
}
```

### 10. Data Validation

Always validate user input in the `authorize()` function:

```javascript
async authorize(credentials) {
  // Validate inputs
  if (!credentials?.username || !credentials?.password) {
    return null
  }
  
  // Sanitize inputs
  const username = credentials.username.trim()
  
  if (username.length < 3 || username.length > 50) {
    return null
  }
  
  // Continue with authentication...
}
```

### 11. JWT Encryption

Tokens are encrypted by default using:
- **JWS** (JSON Web Signature): For signing
- **JWE** (JSON Web Encryption): For encryption
- **JWK** (JSON Web Key Set): For key management

Configuration is typically automatic and should not be overridden.

### 12. Prevent Token Leakage

- Don't expose access tokens in client-side session if not needed
- Use HTTP-only cookies for session tokens
- Keep sensitive data server-side

```javascript
// ❌ Avoid exposing sensitive data
callbacks: {
  async session({ session, token }) {
    session.accessToken = token.accessToken // Risky if not needed client-side
    return session
  }
}

// ✅ Better approach - only expose what's needed
callbacks: {
  async session({ session, token }) {
    session.user.id = token.id
    // Don't expose accessToken unless client needs it
    return session
  }
}
```

---

## Quick Reference: Development Setup

For a quick development setup with hardcoded credentials:

```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // DEVELOPMENT ONLY - Hardcoded user
        if (credentials.username === "demo" && 
            credentials.password === "demo123") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com"
          }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  }
})
```

---

## Resources

- **Official Documentation**: https://next-auth.js.org/
- **Credentials Provider Docs**: https://next-auth.js.org/providers/credentials
- **Configuration Options**: https://next-auth.js.org/configuration/options
- **Callbacks**: https://next-auth.js.org/configuration/callbacks
- **Security Best Practices**: https://next-auth.js.org/ (Introduction section)
