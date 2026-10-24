# Nithin Deepa | AI & Software Engineering Portfolio

A responsive React portfolio with a FastAPI service using Google's official Gemini SDK for the portfolio assistant and EmailJS browser delivery for the contact form.

## Project layout

- `frontend/` — React 19, TypeScript, Vite, Tailwind CSS, Motion
- `backend/app/` — FastAPI endpoints and the structured portfolio knowledge base
- `backend/tests/` — API behavior tests (external providers mocked)

## Run locally

### Frontend

```sh
cd frontend
npm install
cp -n .env.example .env.local
npm run dev
```

Local requests use Vite’s `/api` proxy, targeting `http://127.0.0.1:8001`. Set `API_PROXY_TARGET` in `frontend/.env.local` if the backend port changes. Leave `VITE_API_BASE_URL` unset locally so any Vite port works without additional CORS setup. Restart Vite after changing its environment.

### Backend

Use Python 3.10 or newer. From the repository root:

```sh
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
cp -n .env.example .env
```

Set `GEMINI_API_KEY` in `backend/.env` (never commit it), then start the API:

```sh
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8001
```

The backend loads `backend/.env` automatically, without overriding environment variables supplied by Render. Restart the backend after editing credentials. Never use a `VITE_` variable for a secret.

The API health check is `http://127.0.0.1:8001/api/health`. Chat uses `POST /api/chat`. The frontend contact form sends directly through EmailJS. The legacy `POST /api/contact` endpoint remains available for existing integrations but is no longer used by the portfolio form.

Run backend tests from `backend/`:

```sh
pytest -q
```

Run frontend checks from `frontend/`:

```sh
npm run lint
npm run build
```

## Deployment

### Vercel frontend

1. Import the repository into Vercel and set the project root to `frontend`.
2. Use `npm install` for install and `npm run build` for build; Vite outputs `dist`.
3. Add `VITE_API_BASE_URL` with the public Render API origin (for example `https://your-service.onrender.com`, no trailing slash).
4. Deploy. `frontend/vercel.json` provides SPA fallback routing.

### Render backend

1. Create a Web Service from the repository using the included `render.yaml` (or set the root directory to `backend`).
2. Add `GEMINI_API_KEY` as a secret in Render. `GEMINI_MODEL` defaults to `gemini-3.5-flash-lite`.
3. Set `FRONTEND_ORIGINS` to the exact deployed Vercel origin(s), comma-separated. Include `http://localhost:5173` only if local browser access is needed.
4. Contact delivery is configured in the frontend through EmailJS; Resend variables are not needed for the portfolio form.
5. Copy the Render service origin into the Vercel `VITE_API_BASE_URL` setting, then redeploy the frontend.

The chat uses the official `google-genai` Python SDK and a bounded local JSON knowledge base; it does not require a vector database. API keys remain on the backend. The in-memory rate limiter is suitable for a single service instance; use a shared store or gateway limiter if scaling to multiple instances.

## Personal details to complete

- The supplied `frontend/public/Nithin_Deepa_Resume.pdf` is linked from Hero and Contact. Replace that file to update the download. The chatbot’s structured facts live in `backend/app/knowledge_base.json`; update those separately when your background changes.
- LinkedIn is linked in Hero and Contact and included in the chatbot knowledge base: https://www.linkedin.com/in/nithin-deepa.
- Confirm PatSnap responsibilities/dates and add any confirmed leadership details in `frontend/src/sections/Experience.tsx` and `backend/app/knowledge_base.json`.
- Add verified project repositories and live demos to `frontend/src/data/portfolio.ts` only when those URLs are available.

## Verification and troubleshooting

- A `chat_configured: true` health response confirms a key is loaded, not that Google accepts it. Send a real `POST /api/chat` to verify provider access.
- A 503 busy response indicates provider quota/rate limits. Check the key’s Google AI Studio project quota and billing before retrying.
- Local proxy errors: ensure the backend is running at `API_PROXY_TARGET`. Use the exact URL printed by Vite; it may choose another available port.
- Production: set `FRONTEND_ORIGINS` to the exact Vercel HTTPS origin. Preview deployments need their own explicitly allowed origin. Vite’s development proxy does not run on Vercel.
- Frontend requests allow 60 seconds for backend startup. Slow provider calls still have a 20-second SDK timeout.
- Backend tests isolate credentials and mock Gemini; they do not incur provider usage.
- No project completion, achievements, or employment details should be inferred beyond the supplied facts.

## Verification performed

- Frontend ESLint and TypeScript/Vite production build passed.
- 15 backend tests passed; `pip check` found no broken requirements.
- Real Gemini conversation returned HTTP 200 for both project/resume and follow-up graduation/awards questions. The assistant explicitly said award information was not provided.
- The previous `gemini-2.5-flash` request returned 404 with the replacement key. Configuration now uses the available stable [Gemini 3.5 Flash-Lite](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite) model.
- The restarted backend on port 8001 and existing Vite frontend on port 5181 returned HTTP 200 for a real chat request through `/api/chat`.
- Photo and resume returned HTTP 200 and are included in the production build.
- Desktop and mobile browser checks are documented below.
- Tests emit an upstream Starlette TestClient/httpx deprecation warning; tests pass. No extra HTTP client package was added solely to suppress it.

## Portfolio presentation update

- Hero renders the unchanged original `frontend/public/portfolio.jpg` through a separate CSS alpha mask (`portfolio-mask.png`), preserving the original face and colors. Subtle decorative pixel animations surround the portrait and respect reduced-motion preferences. The earlier generated cutout is retained but is no longer displayed. Hero content follows the supplied professional introduction.
- Padsnap AI Assistant and RAG Market Intelligence System are the featured projects. Their facts and the reported 500+ interactions come from Nithin’s upgrade brief; no additional performance or security claims were added.
- Padsnap links to the exact supplied live demo. Repository URLs remain absent until supplied. AI Outreach links to the supplied deployment at https://ai-outreach-agent-pi.vercel.app/; OpsPilot remains in development.
- Academic focus areas and the expanded skills are based on the supplied brief, without proficiency scores or invented completed coursework.
- The assistant greeting appears after 2.5 seconds, opens chat when clicked, has a separate dismiss action, and appears at most once per browser-tab session. Reduced-motion settings suppress its movement.
- The existing internship entry remains “AI Growth Intern — PatSnap.” The Padsnap brief mentions an AI engineering internship but does not establish whether this is the same employer/role. Confirm before changing the Experience entry.
- Gemini routes and configuration are unchanged by this presentation update. The backend reads the structured knowledge JSON on each chat request.

Browser verification passed at 1440px desktop and 320px, 390px, and 768px widths: no horizontal overflow or JavaScript page errors; verified five project cards, social/resume paths, mobile navigation offsets, greeting dismissal/session persistence/open action, chat focus/Escape, and reduced-motion orbital behavior. A real browser chat request successfully described both new projects.

## EmailJS contact form

Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in `frontend/.env.local`. Restart Vite after changing them. For deployment, set the same variables in Vercel and rebuild. Only the EmailJS public key belongs here; never place a private key or Gemini key in a `VITE_` variable. `.env.local` stays ignored.

Connect your email service and configure the template recipient in EmailJS. Use exactly `{{from_name}}`, `{{from_email}}`, and `{{message}}` in the template; set Reply-To to `{{from_email}}`. The recipient is configured in EmailJS, not accepted from visitors. If you use an origin allowlist, include your local and deployed origins.

The form validates name (2–100 characters), email (valid format, up to 254 characters), and message (10–5000 characters), trims submitted text, disables editing and repeat submission while sending, and clears only after EmailJS accepts the request. A provider error preserves the fields for retry. Success means the provider accepted the request; inbox delivery depends on the connected service and recipient settings.

### EmailJS sending failures

The contact helper distinguishes missing configuration, Gmail authorization failures (including 412 insufficient scopes), invalid service/template/public-key responses, access restrictions, quota limits, and network errors. Local development displays actionable setup hints and logs only a fixed diagnostic code plus HTTP status; raw provider text and credential values are not logged. Production keeps visitor-facing messages concise.

Obtain configuration from your own EmailJS dashboard:

- Email Services → your connected Gmail service → Service ID → `VITE_EMAILJS_SERVICE_ID`.
- Email Templates → your contact template → Settings → Template ID → `VITE_EMAILJS_TEMPLATE_ID`.
- Account → API Keys → Public Key → `VITE_EMAILJS_PUBLIC_KEY` (never Private Key).

For `412 Gmail_API: Request had insufficient authentication scopes`:

1. Open EmailJS → Email Services → the Gmail service used by this form.
2. Use its reconnect option (or disconnect the account and connect it again within that service), select the intended Gmail account, and grant the requested email-sending permission in Google's consent screen.
3. Save/update the service and run its test email. A successful service test is required before troubleshooting the React form further.
4. Check your contact template: To Email should be your Gmail address (or the service's default recipient), From Email should use the connected service, Reply-To should be `{{from_email}}`, and the content should use `{{from_name}}`, `{{from_email}}`, and `{{message}}`.
5. Save the actual service/template IDs in `frontend/.env.local`, restart Vite if needed, then submit the portfolio form. Check EmailJS Email History and the recipient inbox/spam folder. Set the same public configuration in Vercel and rebuild when deploying.

If Google does not offer the needed permission during reconnection, review the EmailJS connection under your Google Account's third-party connections and reconnect it through EmailJS. Managed Google Workspace accounts may require administrator approval. Do not disable account security or place a private API key in browser code.

References: [EmailJS services](https://www.emailjs.com/docs/tutorial/adding-email-service/), [EmailJS templates](https://www.emailjs.com/docs/tutorial/creating-email-template/), [Gmail authorization errors](https://developers.google.com/workspace/gmail/api/guides/handle-errors).

## Cinematic reveals and project pages

- `frontend/src/components/Reveal.tsx` centralizes once-only Motion reveals: 750 ms for standard content, 950 ms for headings, and 2.3 seconds for the original portrait rising inside a clipped, fixed-aspect container. Reduced-motion users see content immediately. Content defaults to visible when animations do not run.
- Project slugs and factual detail sections live alongside the existing records in `frontend/src/data/portfolio.ts`. No project screenshots are fabricated; add actual screenshots only when supplied.
- The homepage uses full-width numbered project links. `frontend/src/pages/ProjectDetails.tsx` renders each project's overview, available architecture, highlights, status, and verified external links.
- Project links use normal browser navigation, with no router dependency. `App.tsx` selects the matching page by pathname; browser history, new tabs, direct links, and refresh work with the existing Vite SPA fallback and `frontend/vercel.json` rewrite. Navigation and footer links return to homepage sections from detail pages. Unknown paths show a page-not-found screen.
- Available paths: `/projects/padsnap-ai-assistant`, `/projects/rag-market-intelligence`, `/projects/ai-outreach-agent`, `/projects/opspilot`, `/projects/college-management-portal`.
- The animation brief referenced four screenshots, but only its text was attached. Implementation follows the written direction and the existing palette.
- This update is local only; it does not deploy or modify EmailJS, Gemini, backend routes, environment values, resume files, or original photo assets.
