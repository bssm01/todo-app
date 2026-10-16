# Daymark — Todo App

A calm, full-stack todo application.

## Structure

```
├── backend/     # Express API (auth, todos, email utils)
└── frontend/    # React + Vite client
    └── src/
        ├── components/   # UI components (auth, sidebar, task list, dialog…)
        ├── hooks/        # useTodos data logic
        ├── lib/          # API client + session helpers
        └── styles.css
```

## Getting started

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` for the frontend if the API is not proxied to `/api`.
