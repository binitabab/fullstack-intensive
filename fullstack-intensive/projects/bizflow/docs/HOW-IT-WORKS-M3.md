# How It Works — BizFlow Milestone 3 (MongoDB + Auth)

**Run:**

```bash
cd fullstack-intensive/projects/bizflow
npm run dev
```

That starts Mongo (Docker), Express, and Vite.

- Web: http://127.0.0.1:5173  
- API: http://127.0.0.1:4000/api/health  

---

## 1. What each piece creates

| Piece | Tool / language | Job |
|-------|-----------------|-----|
| UI | React / JSX | Login, register, dashboard, customers |
| API | Express (Node JS) | Auth + customer routes |
| Database | **MongoDB** (Docker) | Durable storage of users & customers |
| Passwords | **bcryptjs** | Store **hashes**, never plaintext |
| Session | **JWT** in **httpOnly cookie** | Prove who you are without putting the token in JS-readable storage |
| ODM | **Mongoose** | Schemas/models for Mongo documents |

---

## 2. Auth flow (register)

```
[Register form]
   POST /api/auth/register { name, email, password }
        │
        ▼
Express validates → bcrypt hash password → User.create
        │
        ▼
Seed a few demo customers owned by this user
        │
        ▼
Sign JWT → Set-Cookie: bizflow_token (httpOnly)
        │
        ▼
React AuthContext stores user {id,name,email} in memory
Navigate to dashboard
```

**Why httpOnly cookie?** Browser JS cannot read it (harder XSS token theft).  
`fetch(..., { credentials: "include" })` sends it automatically on `/api/*`.

---

## 3. Authorization (customers)

```
GET/POST /api/customers
  → requireAuth middleware
  → reads cookie → verifies JWT → loads User
  → queries Customer where owner === req.user._id
```

User A never sees User B’s customers — **server-side** filter, not a UI hide.

---

## 4. When you click…

| Action | What happens |
|--------|----------------|
| Open app while logged out | `/` → ProtectedRoute → `/login` |
| Create account | register → cookie set → seeded customers → dashboard |
| Sign in | login → cookie → dashboard |
| Log out | POST `/api/auth/logout` clears cookie → login screen |
| Add customer | POST `/api/customers` with cookie → Mongo insert with your `owner` |
| Refresh page | GET `/api/auth/me` restores session from cookie |

---

## 5. File map

| Concern | File |
|---------|------|
| Connect Mongo | `server/db.js` |
| Env | `.env.example`, `server/config.js` |
| User / Customer models | `server/models/*` |
| JWT + cookie helpers | `server/middleware/auth.js` |
| Auth routes | `server/routes/auth.js` |
| Customer routes | `server/routes/customers.js` |
| React session | `src/auth/AuthContext.jsx` |
| Cookie-aware fetch | `src/data/api.js` |
| Mongo container | `docker-compose.yml` |

---

## 6. Security notes (honest)

| Done | Not done yet |
|------|----------------|
| Password hashing | Email verification |
| httpOnly JWT cookie | Refresh-token rotation |
| Owner checks on customers | Rate limiting |
| Env secret for JWT | Production HTTPS `secure` cookies (flag ready via `NODE_ENV`) |

---

## Study checklist

- [ ] I can explain hash vs password  
- [ ] I know why customers filter by `owner`  
- [ ] I know what the cookie is for  
- [ ] I know Mongo stores documents; restart no longer wipes data  

Quiz: **“quiz me on M3 how-it-works”**
