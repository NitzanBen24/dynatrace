# Employee Status Dashboard

A small Next.js + Supabase application for tracking employee work status. The project is built as a take‑home assignment and emphasizes clean architecture, MVVM on the client, and a clear server boundary.

## Tech stack

- Next.js (App Router, TypeScript)
- Supabase (Postgres + REST via `@supabase/supabase-js`)
- React Query (server state management)
- Tailwind CSS (styling)

## Features

- Employee list dashboard
- Create and edit employees in a modal
- Status management (Working, OnVacation, LunchTime, BusinessTrip)
- Server actions + API routes for CRUD
- MVVM client structure with feature isolation

## Project structure

```
src/
  app/
    api/                 # Next.js Route Handlers (REST endpoints)
    server/              # Domain, repositories, server actions
  features/
    employees/           # MVVM feature module (types, view-models, context, UI)
  lib/                   # Shared client utilities (fetch + query client)
  providers/             # Global providers (React Query)
```

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root:

```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

> If Row Level Security (RLS) is enabled, you must allow `SELECT`, `INSERT`, `UPDATE`, and `DELETE` for the anon role, or use a service role key on the server.

### 3) Run the app

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Supabase schema

The app expects a table named `employees` with these columns:

- `id` (uuid, primary key, default `gen_random_uuid()`)
- `name` (text, not null)
- `status` (text, not null)
- `created_at` (timestamp, default `now()`)

Example SQL:

```sql
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null,
  created_at timestamp with time zone default now()
);
```

## API endpoints

- `GET /api/employees` — list employees
- `POST /api/employees` — create employee
- `PATCH /api/employees/:id` — update employee
- `DELETE /api/employees/:id` — delete employee

## Design patterns

### Server

- **Domain**: data types for employees
- **Repository**: Supabase data access
- **Server Actions**: encapsulated mutation logic + revalidation hooks

### Client (MVVM)

- **Model**: API client + types
- **ViewModel**: React Query hooks + business logic
- **View**: presentational components (dashboard, modal, cards)
- **Context**: provides VM state to the view tree

## Notes

- The UI is intentionally simple and easy to scan.
- Statuses are enforced end‑to‑end: API validation, types, and UI dropdowns.
- React Query is configured with sensible defaults (staleTime 30s, low retries).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run start` — run production build
- `npm run lint` — lint

## Future improvements

- Add authentication and RLS policies per user/team
- Add optimistic updates
- Add filtering/search and pagination
- Add a detail view per employee

## License

This project is for evaluation purposes as part of a hiring process.
