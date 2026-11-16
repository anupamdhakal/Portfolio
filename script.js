const projects = [
  {
    name: "devtools-web",
    description:
      "A modern, privacy-focused collection of free developer tools for everyday web development, programming, and data-processing tasks.",
    language: "TypeScript",
    url: "https://github.com/anupamdhakal/devtools-web",
    mark: "01",
  },
  {
    name: "PortPilot",
    description:
      "A lightweight local dashboard for monitoring listening ports, processes, and local network services.",
    language: "HTML",
    url: "https://github.com/anupamdhakal/PortPilot",
    mark: "02",
  },
  {
    name: "URL-Inspector",
    description:
      "A fast utility for inspecting, parsing, and verifying URL parameters, security redirects, and endpoints.",
    language: "JavaScript",
    url: "https://github.com/anupamdhakal/URL-Inspector",
    mark: "03",
  },
  {
    name: "FSS_TAP",
    description:
      "An all-in-one school management system for attendance, finance, and more using NFC cards.",
    language: "JavaScript",
    url: "https://github.com/anupamdhakal/FSS_TAP",
    mark: "04",
  },
  {
    name: "MMP — Multi-OS Media Player",
    description:
      "A media player designed for use across multiple operating systems, with a focus on easy installation and use.",
    language: "CSS",
    url: "https://github.com/anupamdhakal/Multi-OS-Media-Player-MMP-",
    mark: "05",
  },
];

const projectIcons = [
  "fa-screwdriver-wrench",
  "fa-network-wired",
  "fa-arrow-up-right-from-square",
  "fa-address-card",
  "fa-compact-disc",
];

function renderProjects() {
  const grid = document.querySelector("#projects-grid");
  grid.replaceChildren(
    ...projects.map((project, index) => {
      const card = document.createElement("a");
      card.className = "project-entry";
      card.href = project.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", `Open ${project.name} on GitHub`);
      card.innerHTML = `<span class="project-entry-index">${project.mark}</span><span class="project-entry-icon" aria-hidden="true"><i class="fa-solid ${projectIcons[index]}"></i></span><span class="project-entry-copy"><strong class="project-name">${project.name}</strong><small class="project-description">${project.description}</small></span><span class="project-language"><i></i><span>${project.language}</span></span><i class="fa-solid fa-arrow-up-right-from-square project-entry-arrow" aria-hidden="true"></i>`;
      return card;
    }),
  );
  enrichProjectsFromGitHub(grid);
}

async function enrichProjectsFromGitHub(grid) {
  await Promise.all(
    [...grid.querySelectorAll(".project-entry")].map(async (card) => {
      const repo = card.href.split("/").pop();
      try {
        const response = await fetch(
          `https://api.github.com/repos/anupamdhakal/${encodeURIComponent(repo)}`,
          { headers: { Accept: "application/vnd.github+json" }, signal: AbortSignal.timeout(5000) },
        );
        if (!response.ok) return;
        const data = await response.json();
        const title = card.querySelector(".project-name");
        const description = card.querySelector(".project-description");
        const language = card.querySelector(".project-language span");
        if (data.name) title.textContent = data.name;
        if (data.description) description.textContent = data.description;
        if (data.language) language.textContent = data.language;
        card.setAttribute("aria-label", `Open ${title.textContent} on GitHub`);
      } catch (_) {
        // The authored project details remain visible when GitHub is unavailable.
      }
    }),
  );
}

function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  const button = document.querySelector("#theme-toggle");
  const dark = theme === "dark";
  button.setAttribute(
    "aria-label",
    `Switch to ${dark ? "light" : "dark"} theme`,
  );
  button.innerHTML = `<i class="fa-solid ${dark ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#080b17"
    : "#f2f3fb";
  if (persist) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (_) {
      /* Private browsing may disable storage. */
    }
  }
}

async function copyEmail() {
  const email = document.querySelector("#email-text").textContent.trim();
  try {
    if (navigator.clipboard && window.isSecureContext)
      await navigator.clipboard.writeText(email);
    else {
      const field = document.createElement("textarea");
      field.value = email;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      let copied = false;
      try {
        field.select();
        copied = document.execCommand("copy");
      } finally {
        field.remove();
      }
      if (!copied) throw new Error("Clipboard copy was rejected");
    }
    const dialog = document.querySelector("#copy-dialog");
    document.querySelector("#copy-dialog-title").textContent = "Copied";
    if (!dialog.open) dialog.showModal();
  } catch (_) {
    const dialog = document.querySelector("#copy-dialog");
    document.querySelector("#copy-dialog-title").textContent =
      "Copy unavailable";
    if (!dialog.open) dialog.showModal();
  }
}

let revealObserver;
let navCloseTimer;
function observeReveals(elements = document.querySelectorAll(".reveal")) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  revealObserver ||= new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  elements.forEach((el) => revealObserver.observe(el));
}

function enableCardLight(cards) {
  if (
    matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        if (card.classList.contains("project-card")) {
          card.style.setProperty("--tilt-x", `${(x - 0.5) * 4}deg`);
          card.style.setProperty("--tilt-y", `${(0.5 - y) * 4}deg`);
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pageProgress = document.querySelector(".scroll-progress");
  let progressFrame = 0;
  const updatePageProgress = () => {
    if (progressFrame) return;
    progressFrame = requestAnimationFrame(() => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
      pageProgress?.style.setProperty("--page-progress", String(Math.min(1, Math.max(0, amount))));
      progressFrame = 0;
    });
  };
  window.addEventListener("scroll", updatePageProgress, { passive: true });
  window.addEventListener("resize", updatePageProgress, { passive: true });
  window.addEventListener("load", updatePageProgress, { once: true });
  updatePageProgress();

  setTheme(document.documentElement.dataset.theme || "dark", false);
  document
    .querySelector("#theme-toggle")
    .addEventListener("click", () =>
      setTheme(
        document.documentElement.dataset.theme === "dark" ? "light" : "dark",
      ),
    );
  document.querySelector("#copy-email").addEventListener("click", copyEmail);
  const copyDialog = document.querySelector("#copy-dialog");
  document
    .querySelector("#copy-dialog-done")
    .addEventListener("click", () => copyDialog.close());
  copyDialog.addEventListener("close", () => {
    document.querySelector("#copy-dialog-title").textContent = "Copied";
    document.querySelector("#copy-email").focus();
  });
  const navbar = document.querySelector(".navbar");
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const keepOpen = () => {
      clearTimeout(navCloseTimer);
      navbar.classList.add("is-open");
    };
    const closeSoon = () => {
      clearTimeout(navCloseTimer);
      navCloseTimer = setTimeout(() => navbar.classList.remove("is-open"), 320);
    };
    navbar.addEventListener("pointerenter", keepOpen);
    navbar.addEventListener("pointerleave", closeSoon);
    navbar.addEventListener("focusin", keepOpen);
    navbar.addEventListener("focusout", (event) => {
      if (!navbar.contains(event.relatedTarget)) closeSoon();
    });
  }
  renderProjects();
  observeReveals();
  const navMenu = document.querySelector("#nav-menu");
  navMenu.addEventListener("click", () => {
    const open = navbar.classList.toggle("is-open");
    navMenu.setAttribute("aria-expanded", String(open));
    navMenu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navMenu.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}" aria-hidden="true"></i>`;
  });
  document.querySelectorAll(".nav-links a").forEach((link) =>
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      navMenu.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-label", "Open navigation");
      navMenu.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    }),
  );
  const wave = document.querySelector(".editorial-wave");
  wave.replaceChildren(...Array.from({ length: 37 }, (_, index) => {
    const bar = document.createElement("i");
    const height = 12 + Math.abs(Math.sin(index * 0.71) * Math.cos(index * 0.19)) * 78;
    bar.style.height = `${Math.round(height)}px`;
    return bar;
  }));

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".nav-links a")];
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            links.forEach((link) => {
              const active = link.hash === `#${entry.target.id}`;
              link.classList.toggle("active", active);
              if (active) link.setAttribute("aria-current", "location");
              else link.removeAttribute("aria-current");
            });
        }),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((section) => navObserver.observe(section));
  }
});
