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

function renderProjects() {
  const grid = document.querySelector("#projects-grid");
  grid.replaceChildren(
    ...projects.map((project, index) => {
      const card = document.createElement("a");
      card.className = "project-card glass reveal";
      card.dataset.revealVariant = ["left", "rise", "right", "rise", "scale"][
        index
      ];
      card.href = project.url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", `Open ${project.name} on GitHub`);
      card.style.setProperty("--card-index", index);
      card.innerHTML = `<div class="project-topline"><span class="card-index">${project.mark} / 05</span><i class="fa-brands fa-github project-logo" aria-hidden="true"></i></div><h3 class="project-name">${project.name}</h3><p class="project-description">${project.description}</p><div class="project-bottom"><span class="project-language"><i></i><span>${project.language}</span></span><span class="project-cta">View repository <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span></div>`;
      card.dataset.repo = project.url.split("/").pop();
      return card;
    }),
  );
  observeReveals(grid.querySelectorAll(".reveal"));
  enableCardLight(grid.querySelectorAll(".project-card"));
  enrichProjectsFromGitHub(grid);
}

async function enrichProjectsFromGitHub(grid) {
  const cards = [...grid.querySelectorAll(".project-card")];
  await Promise.all(
    cards.map(async (card) => {
      const repo = card.dataset.repo;
      try {
        const response = await fetch(
          `https://api.github.com/repos/anupamdhakal/${encodeURIComponent(repo)}`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: AbortSignal.timeout(5000),
          },
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
        card.classList.add("api-updated");
      } catch (_) {
        // Keep the included project details visible when GitHub is unavailable.
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
    ? "#10151c"
    : "#f2f4f2";
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
  enableCardLight(
    document.querySelectorAll(".tool-card, .maker-card, .music-feature"),
  );

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
