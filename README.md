# sumairahrahman.com

Personal site, built from scratch. Static HTML/CSS/JS — no Framer, no paid template.

Work pages live in `work/`. Copy `_template.html` when adding a new project.

## Preview locally

```bash
python3 -m http.server 5173
```

Open http://localhost:5173

## Put it on your domain (free)

1. Create a GitHub repository and push this folder.
2. Enable GitHub Pages (Settings → Pages → Deploy from branch `main` / root).
3. In GoDaddy DNS, add:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR_GITHUB_USERNAME.github.io` |

GitHub Pages is free. The only recurring cost is the GoDaddy domain itself.
