# Resume Builder

A modern, responsive resume builder with multiple templates, real-time preview, user authentication, and AI-assisted content generation.

## Features

- Multiple resume templates (Professional, Modern, Creative)
- Real-time preview while editing
- Save/load resumes per user (PostgreSQL)
- Authentication (server-side API)
- AI-assisted resume content generation (Google Generative Language API)
- Export / download as PDF
- Dark/Light theme support

## Tech Stack

- Frontend: React + TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: PostgreSQL
- Auth & DB client: Supabase client used in frontend for some features

## Quick Start (Windows / PowerShell)

Prerequisites:

- Node.js (v18+ recommended) or Bun
- PostgreSQL CLI (`psql`) available in PATH if you plan to run the included DB script

Install dependencies and run the app:

1. Install frontend deps and start Vite dev server

```powershell
npm install
npm run dev
```

2. Start the backend API (in a separate terminal), or use the helper script

```powershell
# Option A: use the helper script (installs server deps and starts server)
powershell -ExecutionPolicy Bypass -File scripts\\setup-and-run.ps1

# Option B: manual
cd server
npm install
npm start
```

The frontend dev server typically runs at `http://localhost:5173` and the API server at `http://localhost:3001`.

## Database Setup

The repo includes `scripts\\setup-database.ps1` which runs the SQL in `server\\database.sql`.

Run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\\setup-database.ps1
```

This script relies on `psql` being available and uses default connection values set in the script. Edit the script or set environment variables if your PostgreSQL instance uses different credentials.

## Environment Variables

Create a `.env` (or `.env.local`) file in the frontend root with the following keys used in the app:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
# Optional: VITE_PDFLAYER_KEY=your_pdflayer_api_key
```

Server-side environment variables (used by `server`):

```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=reactra
PGPASSWORD=your_db_password
PGPORT=2103
PORT=3001
```

Notes:

- `src/lib/supabase.ts` expects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- `src/lib/aiAPI.ts` expects `VITE_GOOGLE_AI_API_KEY`.

## Scripts (what's available)

- Frontend (root `package.json`):

  - `npm run dev` — start Vite dev server
  - `npm run build` — build production bundle
  - `npm run preview` — preview production build
  - `npm run lint` — run ESLint

- Server (`server/package.json`):
  - `npm start` — start Express API (runs `node server.js`)

Helper PowerShell scripts are in `scripts\\`:

- `setup-and-run.ps1` — installs server deps and starts the server
- `setup-database.ps1` — creates DB and runs `server\\database.sql` (uses `psql`)

## Environment & Secrets Guidance

- Do not commit `.env` files or secret keys to the repository.
- For production, set environment variables in your hosting environment (Vercel, Netlify, or your server provider).

## Project Structure (high level)

```
Resume_Builder
├── src/                 # React app
├── server/              # Express API and DB schema
├── public/              # Static assets
├── scripts/             # PowerShell helpers for setup
├── package.json         # Frontend dev/build scripts
└── README.md
```

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and add tests where appropriate
4. Submit a pull request describing your changes

## License

This project is released under the MIT License. See the `LICENSE` file for details.
