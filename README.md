# CSS Property Reference

A categorized, searchable reference covering CSS properties across 9 categories — box model, typography, color & background, borders & effects, display & position, flexbox, grid, transforms & animation, and modern misc properties. Each entry shows the syntax, common values, and a live preview rendered directly by the browser. Shorthand properties are flagged with a badge.

## Files

- `index.html` — main page
- `style.css` — styling (same dark theme as the HTML reference)
- `data.js` — the property reference data
- `app.js` — renders the cards, search/filter, and scroll-spy nav

No build step or dependencies — pure HTML/CSS/JS.

## Cara upload ke GitHub

**Lewat browser:**
1. Buat repo baru di GitHub (jangan centang "Add a README").
2. Klik **Add file → Upload files**.
3. Drag semua isi folder ini.
4. Commit.

**Lewat git:**
```bash
git init
git add .
git commit -m "Add CSS property reference"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## Aktifin GitHub Pages

1. **Settings → Pages**.
2. Branch `main`, folder `/ (root)`.
3. Save. Link muncul dalam format `https://USERNAME.github.io/REPO/`.

## Nambah properti baru

Edit `data.js`, tambahin object baru di array `properties` pada kategori yang sesuai:

```js
{ prop: "nama-properti", desc: "Deskripsi singkat.", syntax: "nama-properti: nilai;", values: "nilai umum yang valid", demo: "<div style='...'>preview</div>" }
```

Tambahin `shorthand: true` kalau properti itu shorthand buat beberapa properti turunan (kayak `margin`, `border`, `flex`).
