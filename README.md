## CV Landing Page + QR (Vite + React + Tailwind)

A minimal, mobile‑first personal landing page with a high‑res QR code you can print or show at meetups.

### 1) Install & run
- **Install dependencies**
  ```bash
  npm install
  ```
- **Start dev server**
  ```bash
  npm run dev
  ```
- Open `http://localhost:5173`

### 2) Where to put your real CV
- Replace the placeholder file at `public/cv.pdf` with your actual CV.
- Keep the same filename (`cv.pdf`) so the "Download CV" button continues to work.
  - For example, if your file is named `KhawlaAbusaleh_CV_2026.pdf`, copy/rename it to:
    ```bash
    # On Windows PowerShell
    Copy-Item .\KhawlaAbusaleh_CV_2026.pdf .\public\cv.pdf
    # Or on macOS/Linux
    cp ./KhawlaAbusaleh_CV_2026.pdf ./public/cv.pdf
    ```

### 3) Set deployed URL and generate `public/qr.png`
There are three ways the QR generator picks a URL, in this order:
1. CLI argument
   ```bash
   npm run qr -- https://your-deployed-url.com
   ```
2. From `qr-config.json`
   ```json
   {
     "url": "https://your-deployed-url.com"
   }
   ```
   Then run:
   ```bash
   npm run qr
   ```
3. Default to `http://localhost:5173` if neither of the above is provided.

Notes:
- The script outputs a high‑resolution `public/qr.png` (1024px) suitable for printing.
- You can also download the QR image from the page via the "Download QR" link.

### 4) Recommended deployment (static)
- This is a static site built with Vite. Good options:
  - Vercel — push to GitHub, import the repo in Vercel, deploy.
  - Netlify — drag & drop or connect to your repo.
- Build locally if needed:
  ```bash
  npm run build
  npm run preview
  ```

### 5) Quick checklist for a meetup
- [ ] Open the deployed page on your phone.
- [ ] Generate and keep `public/qr.png` handy.
- [ ] Print a small card with the QR, your name, and title.
- [ ] Verify buttons: Download CV, LinkedIn, GitHub, Email.
- [ ] Ensure the "Copy link" button copies your deployed URL.

---

## Customize content
Edit `src/App.jsx`:
- Name/title, 2–3 line summary
- Update the button links (LinkedIn, GitHub, Email)
- Optional: tweak spacing and sizes (Tailwind classes)

Open Graph tags for nicer link previews are in `index.html`:
- Update `<title>`, `og:title`, `og:description`, and `og:url` to match your deployment.

## Tech
- Vite + React + Tailwind
- QR generator script using the `qrcode` npm package at `scripts/generate-qr.mjs`

## NPM scripts
- `dev` — start Vite dev server
- `build` — build for production
- `preview` — preview production build
- `qr` — generate `public/qr.png`

