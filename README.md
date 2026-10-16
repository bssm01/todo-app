# Daymark — Todo App

A calm, full-stack todo application designed around a simple idea: **make room for what matters.** Daymark pairs a polished, intentional React frontend with a JWT-secured Express API and MongoDB storage, so users can sign up, organize their tasks, track daily progress, and recover their account — all from a distraction-free workspace.

---

## Tech Stack

### Frontend
| Technology | Role |
| --- | --- |
| **React 19** | UI library — function components, hooks (`useState`, `useEffect`, `useMemo`, `useCallback`) |
| **Vite 7** | Dev server, HMR, and production bundling |
| **JavaScript (ESM)** | `type: module` throughout, JSX via `@vitejs/plugin-react` |
| **Plain CSS** | Single design-token stylesheet (`src/styles.css`), no CSS framework |

### Backend
| Technology | Role |
| --- | --- |
| **Node.js + Express 5** | REST API server (`/api/auth`, `/api/todo`) |
| **MongoDB + Mongoose 9** | Database and schema models (`User`, `Todo`) |
| **JSON Web Tokens** | Stateless authentication for protected todo routes |
| **bcryptjs** | Password hashing |
| **Joi** | Request payload validation |
| **Nodemailer** | Password-reset emails |
| **dotenv** | Environment configuration |
| **Nodemon** | Auto-restarting dev server |

---

## Features

### Authentication & account
- **Register / sign in** with email + password — bcrypt hashing (cost 12) and a JWT valid for 1 day
- **Joi validation** on every auth payload (username, email format, 6+ character password)
- **Forgot password** — submits your email and sends a reset link (30-minute expiry, SHA-256-hashed and single-use, delivered via Nodemailer)
- **Reset password** — dedicated `/reset-password` page with token validation, new/confirm fields, and mismatch checks
- **Persistent sessions** — token and user stored in `localStorage`, so a refresh keeps you signed in
- **Auto sign-out** — an invalid/expired token detected by the API call signs the user out automatically

### Tasks
- **Create, edit, delete** tasks via a modal dialog (name + details, both length-limited)
- **Toggle complete** with a single click on the task's check button
- **Three filter views** — All tasks, In progress, Completed — with live counts in the sidebar
- **Instant search** across task titles and descriptions, with a clear-search button
- **Context-aware empty states** — different copy for empty list, no search results, nothing completed, etc.

### Dashboard & UX
- **Progress card** with completion ratio ("3 of 5 tasks completed today") and a percentage meter
- **Greeting header**, workspace breadcrumb, and a live-formatted current date in the topbar
- **Toast notifications** for API errors and status messages, auto-dismissing after ~4.5s
- **Loading state** while tasks are being fetched
- **Responsive split-screen auth layout** (brand story panel + form panel), collapsing to a mobile brand header on small screens

---

## Project Structure

```
├── backend/
│   ├── app.js                 # Express app, JSON parsing, route mounting
│   ├── connectDB.js           # Mongoose connection
│   ├── controllers/
│   │   ├── authContol.js      # register, login, forgot/reset password
│   │   └── todoContol.js      # create, list, get, update, delete todos
│   ├── middlewares/
│   │   └── authMiddleware.js  # verifyToken (JWT guard)
│   ├── models/                # User & Todo schemas
│   ├── routes/                # /api/auth, /api/todo routers
│   └── utils/sendEmail.js     # Nodemailer helper
│
└── frontend/
    └── src/
        ├── App.jsx            # Routing + top-level state wiring only
        ├── main.jsx           # React root
        ├── components/        # 14 presentational components
        │   ├── AuthLayout.jsx / AuthScreen.jsx / ResetPasswordScreen.jsx
        │   ├── Sidebar.jsx / Topbar.jsx / WelcomeHeader.jsx / ProgressCard.jsx
        │   ├── TaskToolbar.jsx / TodoList.jsx / TodoCard.jsx / EmptyState.jsx
        │   ├── TaskDialog.jsx / Toast.jsx / Brand.jsx
        ├── hooks/
        │   └── useTodos.js    # Fetching, CRUD, busy IDs, counts, filtering
        ├── lib/
        │   ├── api.js         # fetch wrapper, auth header, error handling
        │   └── session.js     # localStorage token/user helpers
        └── styles.css
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local instance or an Atlas connection string)

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/daymark
JWT_SECRET_KEY=your-secret-key
FRONTEND_URL=http://localhost:5173
EMAIL_USER=you@example.com
EMAIL_PASS=your-email-app-password
```

> `FRONTEND_URL` is used to build the `/reset-password?token=…` link in the forgot-password email.

```bash
npm run dev   # starts with nodemon
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite serves the app on `http://localhost:5173` and proxies `/api` to `http://localhost:5000` (see `vite.config.js`). To point at another API, set `VITE_API_URL` in a `.env` file.

### Production build

```bash
cd frontend
npm run build   # outputs to frontend/dist
npm run preview
```

---

## API Overview

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | — | Create an account |
| `POST` | `/api/auth/login` | — | Sign in, returns JWT + user |
| `POST` | `/api/auth/forgot-password` | — | Email a password reset link |
| `POST` | `/api/auth/reset-password` | — | Set a new password via token |
| `GET` | `/api/todo/todos` | JWT | List the current user's todos |
| `GET` | `/api/todo/:id` | JWT | Fetch a single todo |
| `POST` | `/api/todo/create` | JWT | Create a todo |
| `PUT` | `/api/todo/update/:id` | JWT | Update a todo (or toggle status) |
| `DELETE` | `/api/todo/delete/:id` | JWT | Delete a todo |
