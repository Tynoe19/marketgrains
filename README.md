# MarketGrains

A full-stack marketplace platform for buying and distributing grain products, built with a Django REST Framework backend and a React + TypeScript frontend.

🔗 **Live app:** [https://marketgrains.vercel.app/]

![MarketGrains screenshot](./screenshot.png)
<!-- Add a screenshot or GIF of the homepage/dashboard here -->

## Overview

MarketGrains connects customers with grain distributors, offering:

- Product and category browsing with an admin-managed catalog
- Bundled product **packages** for bulk/distributor pricing
- Cart with persistent storage across sessions
- Role-based accounts (customer / distributor) with a dedicated distributor dashboard
- Order placement and checkout flow
- Token-based authentication with hardened password validation

## Tech Stack

**Frontend** (`/marketgrains`)
- React 18 + TypeScript
- Vite
- React Router

**Backend** (`/marketgrains_backend`)
- Django + Django REST Framework
- PostgreSQL (hosted on [Neon](https://neon.tech))
- Token-based authentication

**Infrastructure**
- Deployed on [Vercel](https://vercel.com) (frontend and backend as separate projects)
- Neon serverless Postgres for the database

## Project Structure

```
marketgrains/
├── marketgrains/           # React + TypeScript frontend
├── marketgrains_backend/   # Django REST Framework backend
└── README.md                # You are here
```

Each half of the project has its own README with setup instructions:

- [`marketgrains/README.md`](./marketgrains/README.md) — Frontend setup
- [`marketgrains_backend/README.md`](./marketgrains_backend/README.md) — Backend setup

## Quick Start

Clone the repo, then set up each side independently:

```bash
git clone https://github.com/Tynoe19/marketgrains.git
cd marketgrains
```

See the frontend and backend READMEs linked above for environment variables and run instructions.

## Deployment

Both the frontend and backend are deployed on Vercel as separate projects, connected to a shared Neon Postgres database. Environment variables (API URLs, database credentials, secret keys) are configured per-project in the Vercel dashboard rather than committed to the repo.

## Roadmap

- [ ] Payment integration
- [ ] Order tracking for customers
- [ ] Expanded distributor analytics

## Author

Built by [Tinotenda](https://github.com/Tynoe19) as a portfolio project.
