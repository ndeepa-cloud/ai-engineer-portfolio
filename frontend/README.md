# Portfolio frontend

React, TypeScript, Vite, Tailwind CSS, and Motion. See [the project README](../README.md) for backend setup, credentials, tests, and Vercel/Render deployment.

```sh
npm install
npm run dev
```

Local `/api` calls are proxied to `http://127.0.0.1:8001`. Change `API_PROXY_TARGET` in `.env.local` to use another backend port. Set `VITE_API_BASE_URL` in Vercel to the deployed Render origin.

```sh
npm run lint
npm run build
```

Portfolio content lives in `src/data/portfolio.ts`; public assets live in `public/`. Keep backend `app/knowledge_base.json` in sync when changing professional facts. Never put secrets in frontend environment variables.
