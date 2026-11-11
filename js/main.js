const HELLOS = [
  { text: "hello", font: "Pacifico" },
  { text: "नमस्ते", font: "Kalam" },
  { text: "hola", font: "Pacifico" },
  { text: "سلام", font: "Noto Nastaliq Urdu", rtl: true },
];

const windowsRoot = document.getElementById("windows");
const template = document.getElementById("window-template");
const clock = document.getElementById("clock");
const boot = document.getElementById("boot");
const helloWord = document.getElementById("hello-word");

let z = 10;
let awake = false;
let helloTimer = null;
const openIds = new Map();

const content = {
  ux: {
    title: "UX Projects",
    width: 640,
    height: 420,
    html: finder("UX Projects", "No case studies in this folder yet. This is where new UX work will live."),
  },
  software: {
    title: "Software",
    width: 640,
    height: 420,
    html: finder("Software", "Empty on purpose. Drop software projects in here as we build them."),
  },
  personal: {
    title: "Personal",
    width: 560,
    height: 460,
    html: `
      <div class="note">
        <h3>A few true things</h3>
        <p>I’m Sumairah. I design and I write code, usually in the same week. I like products that feel obvious once they exist and impossible right before.</p>
        <p>Right now I’m in Washington, DC, doing an MS in Computer Science at GWU. Before that: UX/UI at ZMQ, an intern summer at Tenstorrent, Android at Qaff, and a lot of figuring it out in public.</p>
        <p>This desktop is the portfolio. Folders first, case studies next. If you want the human version, that’s this window.</p>
        <p><a href="mailto:Sumairahrahman02@gmail.com">Sumairahrahman02@gmail.com</a><br />
        <a href="https://www.linkedin.com/in/sumairahrahman/">LinkedIn</a></p>
      </div>`,
  },
  resume: {
    title: "Resume.pdf",
    width: 560,
    height: 520,
    html: `
      <div class="resume">
        <h3>Sumairah Rahman</h3>
        <p>UX/UI · Product · Computer Science<br />Washington, DC</p>
        <h4>Education</h4>
        <p>MS Computer Science, The George Washington University (2025–present)<br />BTech Computer Science, Amity University (2020–2024)</p>
        <h4>Experience</h4>
        <p><strong>Tenstorrent</strong> — AI Workflow Automation Intern, 2026<br />Built an internal forecasting app for headcount and budget visibility in the Office of the CEO.</p>
        <p><strong>ZMQ Development</strong> — UX/UI Designer, 2024<br />Designed interfaces for nonprofit technology with research, product, and engineering.</p>
        <p><strong>Qaff Technology</strong> — Mobile App Developer Intern, 2023<br />Android in Java/Kotlin; load times down about 30%.</p>
        <h4>Skills</h4>
        <p>Figma, user research, UI design, React, HTML/CSS, Python, Swift, Java</p>
      </div>`,
  },
  "about-mac": {
    title: "About this Mac",
    width: 420,
    height: 280,
    html: `
      <div class="about-card">
        <h3>Sumairah’s Mac</h3>
        <p>A first boot, then a desktop, then folders that are actually the work. Low-key grid paper. High-key motion.</p>
      </div>`,
  },
  contact: {
    title: "Contact",
    width: 420,
    height: 260,
    html: `
      <div class="about-card">
        <h3>Say hi</h3>
        <p><a href="mailto:Sumairahrahman02@gmail.com">Sumairahrahman02@gmail.com</a></p>
        <p><a href="https://www.linkedin.com/in/sumairahrahman/">LinkedIn</a></p>
      </div>`,
  },
  trash: {
    title: "Don’t Look",
    width: 420,
    height: 260,
    html: `
      <div class="about-card">
        <h3>Told you.</h3>
        <p>Old Framer tabs, abandoned type samples, and three versions of this desktop. Nothing to see. Close the window.</p>
      </div>`,
  },
};

function finder(place, empty) {
  return `
    <div class="finder">
      <aside class="sidebar">
        <strong>Favorites</strong>
        <button type="button" class="is-on">${place}</button>
        <button type="button" data-open="personal">Personal</button>
        <button type="button" data-open="resume">Resume</button>
      </aside>
      <div class="files">
        <p class="empty">${empty}</p>
      </div>
    </div>`;
}

function tickClock() {
  const now = new Date();
  clock.textContent = now.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function openWindow(id, origin) {
  if (openIds.has(id)) {
    const existing = openIds.get(id);
    existing.classList.remove("is-min");
    focusWindow(existing);
    return;
  }

  const spec = content[id];
  if (!spec) return;

  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.id = id;
  const area = windowsRoot.getBoundingClientRect();
  const left = Math.max(16, Math.min((area.width - spec.width) / 2 + openIds.size * 28, area.width - spec.width - 16));
  node.style.width = spec.width + "px";
  node.style.height = spec.height + "px";
  node.style.left = left + "px";
  node.style.top = 28 + openIds.size * 26 + "px";
  node.querySelector(".window-title").textContent = spec.title;
  node.querySelector(".window-body").innerHTML = spec.html;
  windowsRoot.appendChild(node);
  openIds.set(id, node);
  focusWindow(node);
  bindWindow(node);

  if (origin) {
    const r = origin.getBoundingClientRect();
    node.style.transformOrigin = `${r.left}px ${r.top}px`;
  }
}

function focusWindow(node) {
  z += 1;
  node.style.zIndex = String(z);
  node.focus();
}

function closeWindow(id) {
  const node = openIds.get(id);
  if (!node) return;
  node.remove();
  openIds.delete(id);
}

function bindWindow(node) {
  const id = node.dataset.id;
  node.addEventListener("mousedown", () => focusWindow(node));

  node.querySelector('[data-action="close"]').addEventListener("click", () => closeWindow(id));
  node.querySelector('[data-action="min"]').addEventListener("click", () => {
    node.classList.add("is-min");
    setTimeout(() => {
      node.style.display = "none";
    }, 280);
  });
  node.querySelector('[data-action="max"]').addEventListener("click", () => {
    node.classList.toggle("is-max");
  });

  const bar = node.querySelector(".titlebar");
  let drag = null;
  bar.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".tl") || node.classList.contains("is-max")) return;
    drag = {
      x: event.clientX - node.offsetLeft,
      y: event.clientY - node.offsetTop,
    };
    bar.setPointerCapture(event.pointerId);
  });
  bar.addEventListener("pointermove", (event) => {
    if (!drag) return;
    node.style.left = event.clientX - drag.x + "px";
    node.style.top = Math.max(28, event.clientY - drag.y) + "px";
  });
  bar.addEventListener("pointerup", () => {
    drag = null;
  });
}

function onOpenClick(event) {
  const trigger = event.currentTarget;
  const id = trigger.dataset.open;
  const icon = trigger.closest(".desk-icon");
  if (icon) {
    document.querySelectorAll(".desk-icon").forEach((el) => el.classList.remove("is-selected"));
    icon.classList.add("is-selected");
    if (event.detail < 2 && !window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
  }
  openWindow(id, trigger);
}

function wireOpens(root = document) {
  root.querySelectorAll("[data-open]").forEach((el) => {
    el.addEventListener("click", onOpenClick);
  });
}

function startDesktop() {
  if (awake) return;
  awake = true;
  clearTimeout(helloTimer);
  boot.classList.add("is-done");
  boot.setAttribute("aria-hidden", "true");
}

function wait(ms) {
  return new Promise((resolve) => {
    helloTimer = setTimeout(resolve, ms);
  });
}

async function runHello() {
  tickClock();
  setInterval(tickClock, 1000);
  await document.fonts.ready;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    helloWord.style.fontFamily = `"${HELLOS[0].font}"`;
    helloWord.textContent = HELLOS[0].text;
    helloWord.classList.add("is-on");
    await wait(1200);
    startDesktop();
    return;
  }

  for (const item of HELLOS) {
    if (awake) return;
    helloWord.style.fontFamily = `"${item.font}"`;
    helloWord.textContent = item.text;
    helloWord.classList.toggle("is-rtl", Boolean(item.rtl));
    helloWord.classList.add("is-on");
    await wait(1400);
    if (awake) return;
    helloWord.classList.remove("is-on");
    await wait(380);
  }

  startDesktop();
}

document.getElementById("skip-boot").addEventListener("click", startDesktop);
document.querySelector(".wallpaper").addEventListener("click", () => {
  document.querySelectorAll(".desk-icon").forEach((el) => el.classList.remove("is-selected"));
});

windowsRoot.addEventListener("click", (event) => {
  const nested = event.target.closest("[data-open]");
  if (!nested) return;
  event.preventDefault();
  openWindow(nested.dataset.open, nested);
});

wireOpens();
runHello();
