# MarketGrains — Backend

Django REST Framework API powering MarketGrains.

## Tech Stack

- Django + Django REST Framework
- PostgreSQL (via [Neon](https://neon.tech))
- Token-based authentication

## Apps

- **accounts** — Custom user model, role-based accounts (customer/distributor), auth serializers and views
- **products** — Products, categories, and packages; `IsAdminOrReadOnly` permission for catalog management
- **orders** — Order creation and management

## Getting Started

### Prerequisites

- Python 3.11+
- A PostgreSQL database (Neon or local Postgres)

### Installation

```bash
cd marketgrains_backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable         | Description                                  |
|------------------|-----------------------------------------------|
| `DATABASE_URL`   | Postgres connection string (Neon or local)    |
| `SECRET_KEY`     | Django secret key                             |
| `DEBUG`          | `True` for local development, `False` in production |
| `ALLOWED_HOSTS`  | Comma-separated list of allowed hosts         |
| `CORS_ALLOWED_ORIGINS` | Frontend URL(s) allowed to call the API |

### Run migrations and seed data

```bash
python manage.py migrate
python manage.py seed_products
```

### Run locally

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`.

## Key Design Decisions

- **Permissions:** A custom `IsAdminOrReadOnly` permission class restricts write access on catalog endpoints (products, categories, packages) to admin users, while keeping read access public.
- **Password validation:** Registration enforces Django's built-in `validate_password` plus role allowlisting to prevent arbitrary role assignment at signup.
- **Serialization:** API responses use snake_case (Django convention); the frontend transforms these to camelCase at the service layer.

## Deployment

Deployed on Vercel using the `vercel.json` in this directory, connected to a Neon Postgres database. Run migrations against the production database before or during deployment:

```bash
python manage.py migrate --noinput
```

Static files are collected via:

```bash
python manage.py collectstatic --noinput
```
