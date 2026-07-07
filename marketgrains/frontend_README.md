# MarketGrains — Frontend

React + TypeScript frontend for MarketGrains, built with Vite.

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router
- Context API for auth and cart state

## Features

- Product, category, and package browsing
- Cart with persistence via `localStorage`
- Auth flow (login, protected routes) via `authContext`
- Distributor dashboard for role-based users
- Responsive navbar, hero, testimonials, and newsletter sections

## Getting Started

### Prerequisites

- Node.js 18+
- The backend running locally or a deployed backend URL (see [backend README](../marketgrains_backend/README.md))

### Installation

```bash
cd marketgrains
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable        | Description                          |
|-----------------|---------------------------------------|
| `VITE_API_URL`  | Base URL of the backend API (e.g. `http://localhost:8000` or your deployed backend URL) |

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, CartDrawer, etc.)
├── context/        # Auth and cart context providers
├── data/           # Static data (e.g. package definitions)
├── pages/          # Route-level pages
├── services/       # API service layer (auth, products, categories, orders)
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

## Deployment

Deployed on Vercel. The `vercel.json` in this directory configures the build and routing for the SPA. Make sure `VITE_API_URL` is set as an environment variable in the Vercel project settings, pointing to your deployed backend.
