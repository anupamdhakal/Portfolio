// ----------------------------------------------------------------------------
// PROJECT DATA & CONFIGURATION
// ----------------------------------------------------------------------------
const projectsData = [
    {
        github: "https://github.com/anupamdhakal/devtools-web",
        fallbackTitle: "devtools-web",
        fallbackDescription: "A modern, privacy-focused collection of free developer tools for everyday web development, programming, and data-processing tasks. Built with React and TypeScript.",
        fallbackLanguage: "TypeScript",
    },
    {
        github: "https://github.com/anupamdhakal/PortPilot",
        fallbackTitle: "PortPilot",
        fallbackDescription: "A lightweight local dashboard for monitoring listening ports, processes, and local network services.",
        fallbackLanguage: "HTML",
    },
    {
        github: "https://github.com/anupamdhakal/URL-Inspector",
        fallbackTitle: "URL-Inspector",
        fallbackDescription: "A fast utility for inspecting, parsing, and verifying URL parameters, security redirects, and endpoints.",
        fallbackLanguage: "JavaScript",
    },
    {
        github: "https://github.com/anupamdhakal/FSS_TAP",
        fallbackTitle: "FSS_TAP",
        fallbackDescription: "An all-in-one school management system for attendance, finance, and more using NFC cards.",
        fallbackLanguage: "JavaScript",
    },
];

// ----------------------------------------------------------------------------
// GITHUB API FETCHER
// ----------------------------------------------------------------------------
async function fetchProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = ''; // Clear loading spinner

    for (const project of projectsData) {
        // Extract repo owner and name from URL
        const urlParts = project.github.split('/');
        const owner = urlParts[3];
        const repo = urlParts[4];
        
        let title = project.fallbackTitle;
        let description = project.fallbackDescription;
        let language = project.fallbackLanguage;

        try {
            // Fetch from GitHub API
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (response.ok) {
                const data = await response.json();
                title = data.name || title;
                description = data.description || description;
                language = data.language || language;
            }
        } catch (error) {
            console.warn(`Failed to fetch ${repo}, using fallback data.`, error);
        }

        // Create Project Card
        const card = document.createElement('div');
        card.className = 'project-card scroll-reveal';
        card.innerHTML = `
            <div class="project-title">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                    ${title} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8em;"></i>
                </a>
            </div>
            <p class="project-description">${description}</p>
            <div class="project-meta">
                <div class="project-language">
                    <span class="language-dot"></span>
                    <span>${language}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    }
    
    // Re-initialize scroll observer for newly added elements
    initScrollReveal();
}

// ----------------------------------------------------------------------------
// CLIPBOARD COPY FUNCTIONALITY
// ----------------------------------------------------------------------------
function copyEmail() {
    const email = "info@anupam-dhakal.com.np";
    
    navigator.clipboard.writeText(email).then(() => {
        showToast();
    }).catch(err => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToast();
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ----------------------------------------------------------------------------
// SCROLL REVEAL ANIMATION (Intersection Observer)
// ----------------------------------------------------------------------------
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));
}

// ----------------------------------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    initScrollReveal();
});