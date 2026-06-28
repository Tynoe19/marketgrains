# Elita07 grains market place

Elita07 is a full-stack web application for browsing and selling organic grain products. The frontend is built with React, TypeScript, and Vite, while the backend uses Django REST Framework with JWT authentication.

The project currently supports buyer and distributor accounts, product browsing, cart interactions, protected distributor routes, and token-based authentication.

## Features

- Buyer and distributor registration
- Email/password login with JWT access and refresh tokens
- Protected user session stored in local storage
- Role-based navigation for distributor users
- Product catalogue with organic grain products
- Cart drawer and cart state management
- Distributor dashboard for wholesale package visibility
- Django REST API with custom user roles
- Backend auth tests for register, login, invalid password, and authenticated `/me/`

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- React Icons
- CSS/Tailwind-style utility classes

### Backend

- Django 6
- Django REST Framework
- Simple JWT
- SQLite for local development
- django-cors-headers

## Project Structure

```text
marketgrains/
├── marketgrains/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── marketgrains_backend/          # Django backend
│   ├── accounts/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   ├── marketgrains_backend/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3
- pip

### Backend Setup

From the repository root:

```bash
cd marketgrains_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend runs at:

```text
http://localhost:8000
```

### Frontend Setup

Open a second terminal from the repository root:

```bash
cd marketgrains
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

If Vite starts on a different port, update `CORS_ALLOWED_ORIGINS` in:

```text
marketgrains_backend/marketgrains_backend/settings.py
```

## Environment Variables

The frontend reads the API base URL from:

```text
VITE_API_URL=http://localhost:8000/api/
```

If this variable is not set, the current code falls back to:

```text
http://localhost:8000/api/
```

## API Endpoints

Base path:

```text
/api/accounts/
```

Available auth endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register/` | Create an account and return JWT tokens |
| POST | `/login/` | Login with email and password |
| POST | `/refresh/` | Refresh an access token |
| GET | `/me/` | Return the authenticated user |

## Authentication Flow

1. A user registers or logs in with email and password.
2. The backend validates the credentials.
3. The backend returns an access token, refresh token, and user object.
4. The frontend stores the tokens and user in local storage.
5. Protected API requests send the access token as a Bearer token.
6. Role-based UI checks the user role, for example `buyer` or `distributor`.

## Running Checks

Backend tests:

```bash
./.venv/bin/python marketgrains_backend/manage.py test accounts
```

Frontend production build:

```bash
cd marketgrains
npm run build
```

## Current Status

MarketGrains is in active development. The core frontend experience and authentication flow are in place, with the next likely steps being product persistence, order management, payment flow, and deployment configuration.

