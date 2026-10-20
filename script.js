/* =====================================
   BUSHRA.DEV — INTERACTIVE FEATURES
   ===================================== */

// 1. Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a section
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}


// 2. Update the copyright year automatically
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 3. Reveal sections smoothly as visitors scroll
const revealTargets = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".project-card, .education-card, .contact-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealTargets.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


// 4. Add a subtle interactive glow to project cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});


// 5. Add a gentle active state to the navigation links
const pageSections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                sectionLinks.forEach((link) => {
                    const isCurrent =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    if (isCurrent) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


