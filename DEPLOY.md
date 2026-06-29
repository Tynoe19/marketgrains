# Deploy MarketGrains

This guide deploys the **Django API on Render** and the **React frontend on Vercel**. Both have free tiers — good for a portfolio project.

Estimated time: **30–45 minutes** the first time.

---

## Before you start

1. Push your latest code to GitHub: `https://github.com/Tynoe19/marketgrains`
2. Create free accounts at [render.com](https://render.com) and [vercel.com](https://vercel.com)
3. Sign in to both with GitHub so they can access your repo

---

## Part 1 — Deploy the backend (Render)

### Option A: Blueprint (easiest)

1. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint**
2. Connect the `marketgrains` GitHub repo
3. Render reads `render.yaml` and creates:
   - A PostgreSQL database (`marketgrains-db`)
   - A web service (`marketgrains-api`)
4. When prompted, set these env vars on the web service:
   - `ALLOWED_HOSTS` → `marketgrains-api.onrender.com` (use your actual Render URL)
   - `CORS_ALLOWED_ORIGINS` → leave blank for now — you'll update after Vercel deploys
5. Click **Apply** and wait for the first deploy (~5–10 min)

### Option B: Manual setup

1. **New → PostgreSQL** (free) — name it `marketgrains-db`
2. **New → Web Service** → connect GitHub repo
3. Settings:
   - **Root Directory:** `marketgrains_backend`
   - **Runtime:** Python
   - **Build Command:** `./build.sh`
   - **Start Command:** `gunicorn marketgrains_backend.wsgi:application --bind 0.0.0.0:$PORT`
4. **Environment variables:**

   | Key | Value |
   | --- | --- |
   | `PYTHON_VERSION` | `3.12.7` |
   | `DEBUG` | `False` |
   | `SECRET_KEY` | Generate a long random string |
   | `DATABASE_URL` | Copy from your PostgreSQL service (Internal URL) |
   | `ALLOWED_HOSTS` | `your-service-name.onrender.com` |
   | `CORS_ALLOWED_ORIGINS` | *(set after frontend deploy)* |

5. Deploy and wait until status is **Live**

### After backend deploys

1. Copy your API URL, e.g. `https://marketgrains-api.onrender.com`
2. Test in browser: `https://marketgrains-api.onrender.com/api/products/`  
   You should see JSON (possibly an empty list before seed runs — build script seeds products)
3. Create an admin user (Render shell or one-off command):

   ```bash
   python manage.py createsuperuser
   ```

   On Render: open your web service → **Shell** tab → run the command above.

4. Optional: log into Django admin at `/admin/` and add product image URLs.

---

## Part 2 — Deploy the frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New → Project**
2. Import the `marketgrains` GitHub repo
3. Configure:
   - **Root Directory:** `marketgrains` (click Edit)
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment variable:**

   | Key | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://YOUR-RENDER-URL.onrender.com/api/` |

   Include the trailing `/api/`.

5. Click **Deploy**
6. Copy your Vercel URL, e.g. `https://marketgrains.vercel.app`

---

## Part 3 — Connect frontend and backend

1. Go back to **Render** → your web service → **Environment**
2. Update:

   ```
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   ```

   Use your exact Vercel URL (no trailing slash). Add `http://localhost:5173` too if you still develop locally:

   ```
   https://your-app.vercel.app,http://localhost:5173
   ```

3. Save — Render will redeploy automatically
4. Open your Vercel site and test:
   - Products load on the home page
   - Register / login works
   - Add to cart → checkout (creates an order)

---

## Part 4 — Share it

Your live links:

- **App:** `https://your-app.vercel.app`
- **API:** `https://your-api.onrender.com/api/`

Tell friends/family:

> Portfolio project — feedback welcome! Checkout saves an order; payment isn’t connected yet.

---

## Troubleshooting

### Products page says "Could not load products"

- Backend may be cold-starting (Render free tier sleeps after inactivity — wait ~30s and refresh)
- Check `VITE_API_URL` on Vercel includes `/api/` at the end
- Check `CORS_ALLOWED_ORIGINS` on Render matches your Vercel URL exactly

### CORS errors in browser console

- `CORS_ALLOWED_ORIGINS` must be the frontend origin only, e.g. `https://marketgrains.vercel.app`
- No path, no trailing slash

### 400 Bad Request / DisallowedHost

- Add your Render hostname to `ALLOWED_HOSTS`

### Login works locally but not on Vercel

- Rebuild Vercel after setting `VITE_API_URL` (env vars are baked in at build time)

### Empty product images

- Seed products ship without image URLs. Add them in Django admin (`/admin/` → Products → Image field)

---

## Redeploying after changes

- **Frontend:** push to GitHub → Vercel auto-deploys
- **Backend:** push to GitHub → Render auto-deploys
- If you change `VITE_API_URL`, trigger a new Vercel deploy manually

---

## Local development (unchanged)

```bash
# Terminal 1 — backend
cd marketgrains_backend
source venv/bin/activate   # or .venv
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py runserver

# Terminal 2 — frontend
cd marketgrains
npm install
npm run dev
```

Use `marketgrains/.env.example` and `marketgrains_backend/.env.example` as templates.
