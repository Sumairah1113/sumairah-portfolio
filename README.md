# sumairahrahman.com

Sumairah Rahman’s personal portfolio. The site itself is the project: a Mac-style first boot, then a desktop with folders for the work.

Live: [sumairahrahman.com](https://sumairahrahman.com)  
Repo: [github.com/Sumairah1113/sumairah-portfolio](https://github.com/Sumairah1113/sumairah-portfolio)

No Framer. No paid template. Static HTML, CSS, and JavaScript on GitHub Pages. The domain stays at GoDaddy.

---

## What we already did

### Left Framer, kept the domain

The old site lived on a Framer template. Framer was disconnected so the domain was free to point somewhere else. The domain itself stayed registered at GoDaddy — we only changed DNS.

### Built a custom site from scratch

The old resume case studies were not carried over. This folder is a new site:

| File | What it is |
| --- | --- |
| `index.html` | Boot screen + desktop shell |
| `css/styles.css` | Layout, Mac chrome, windows, dock |
| `js/main.js` | Hello cycle, clock, window manager |
| `work/_template.html` | Blank case-study page for later |
| `CNAME` | Tells GitHub Pages to use `sumairahrahman.com` |

### Hosting and DNS

The repo is on GitHub as `Sumairah1113/sumairah-portfolio`. GitHub Pages deploys from `main` (root).

GoDaddy records that should be in place:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `Sumairah1113.github.io` |

GitHub Pages is free. The only recurring cost is the GoDaddy domain. After DNS changes, some resolvers can still cache old Framer IPs for a while.

### The first-boot Hello

On load you get a peach Mac-style Hello, then the desktop. Languages, one at a time:

1. **hello** — Pacifico
2. **नमस्ते** — Kalam
3. **hola** — Pacifico
4. **سلام** — Noto Nastaliq Urdu

Rainbow fill on the word, Skip in the corner. We tried a “writing on paper” animation and dropped it — it never looked like real letterforms. Hello now just shows the real fonts, then fades to the desktop.

### The desktop

After Hello, you land in a lilac Mac window: grid wallpaper, menu bar, sticky note, hero (“welcome to my portfolio.”), scattered icons, and a dock.

Clickable folders / apps:

- **UX Projects** — empty on purpose until new case studies exist
- **Software** — same, for code / product work
- **Personal / About Me** — short bio, GWU, past roles
- **Resume** — education, Tenstorrent, ZMQ, Qaff, skills
- **Contact** — email and LinkedIn
- **Don’t Look** (trash) — a joke window
- **About** (the S in the menu bar)

Windows can be dragged, closed, minimized, and maximized. Icons need a double-click on a mouse; a single tap should still open them on a phone.

### Local preview

```bash
python3 -m http.server 5173
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

---

## What we have in plan next

Nothing here is built yet unless it already appears on the desktop.

1. **Confirm the domain**  
   Apex and `www` should both load this GitHub Pages site over HTTPS, not leftover Framer. Recheck GoDaddy if anything still 500s or points at old IPs.

2. **Push the current Hello + desktop**  
   Local work is ahead of GitHub until we commit and push. Pages only updates after a push to `main`.

3. **Real work in the folders**  
   UX and Software are empty shells. Next content should be new projects, not the old Framer case studies unless we choose to rebuild one on purpose. Copy `work/_template.html` for a long-form writeup, then link it from the folder window.

4. **Resume that is actually a PDF**  
   The Resume window is HTML. If there is a real PDF, drop it in the repo and wire the Resume icon / dock item to it.

5. **Polish the desktop as a UX piece**  
   Tighter icon placement, mobile layout, maybe liquid-glass on the dock, maybe a bit more personality on the sticky / About window. Keep it low-key like the Inika-style grid inspo — not a generic landing page.

6. **Contact that can actually send**  
   Email and LinkedIn links work. A form or a better “say hi” flow is optional later.

7. **Keep building in this repo**  
   New pages, new windows, new folders — same static stack. No template subscription.

---

## Contact

[Sumairahrahman02@gmail.com](mailto:Sumairahrahman02@gmail.com)  
[linkedin.com/in/sumairahrahman](https://www.linkedin.com/in/sumairahrahman/)
