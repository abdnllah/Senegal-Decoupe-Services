# sds.sn

The Sénégal Découpe Services website: Next.js (App Router) and Tailwind, exported as static HTML.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
npx serve out    # preview the exported site
```

## Updating content

- **Phone / WhatsApp / address / hours:** `src/config/site.ts`. This is the only place they are set.
- **Photos:**
  1. Add or remove JPGs in `../Photos/<folder>`.
  2. Run `npm run photos`. This regenerates `public/photos/` and `src/data/photos.generated.ts`.
- **Hero image, category covers, selected works:** `src/data/catalogue.ts`.
- **Logo:** `npm run logo` regenerates the inline logo from `../Logo/*.svg`.

## Deploying

- **cPanel / FTP:** upload the contents of `out/` to `public_html/`.
- **Vercel:** works with no extra configuration.
