console.log("SCRIPT CARGADO");

/* ==========================================================
   DAVID CORDERO
   Official Website
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* ======================================================
       LOAD SECTIONS
    ====================================================== */

    await loadSections();

    const navLinks = [
        ...document.querySelectorAll(".desktop-nav a"),
        ...document.querySelectorAll(".mobile-nav a")
    ];

    const panels = [...document.querySelectorAll(".panel[id]")];

    /* ======================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    function closeMenu() {

        if (!menuToggle || !mobileNav) return;

        mobileNav.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";

    }

    function toggleMenu() {

        if (!menuToggle || !mobileNav) return;

        const isOpen = mobileNav.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute("aria-expanded", isOpen);

        document.body.style.overflow = isOpen ? "hidden" : "";

    }

    if (menuToggle) {

        menuToggle.addEventListener("click", toggleMenu);

        window.addEventListener("resize", () => {

            if (window.innerWidth >= 1024) {

                closeMenu();

            }

        });

    }

    if (!navLinks.length || !panels.length) return;

    /* ======================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function setActive(id) {

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
            );

        });

    }

    /* ======================================================
       SMOOTH SCROLL
    ====================================================== */

    function scrollToPanel(id) {

        const panel = document.getElementById(id);

        if (!panel) return;

        panel.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

    navLinks.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const id = link
                .getAttribute("href")
                .replace("#", "");

            setActive(id);

            scrollToPanel(id);

            closeMenu();

            history.replaceState(
                null,
                "",
                `#${id}`
            );

        });

    });

    /* ======================================================
       OBSERVER
    ====================================================== */

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            setActive(entry.target.id);

            history.replaceState(
                null,
                "",
                `#${entry.target.id}`
            );

        });

    }, {

        root: null,
        threshold: 0.55

    });

    panels.forEach(panel => observer.observe(panel));

    /* ======================================================
       INITIAL STATE
    ====================================================== */

    const hash = window.location.hash.replace("#", "");

    if (hash && document.getElementById(hash)) {

        setActive(hash);

        setTimeout(() => {

            scrollToPanel(hash);

        }, 100);

    } else {

        setActive(panels[0].id);

    }

});


/* ==========================================================
   LOAD HTML SECTIONS
========================================================== */

async function loadSections() {

    const container = document.getElementById("content");

    const sections = [

        "home",
        "about",
        "releases",
        "scoring",
        "performances",
        "noray",
        "contact"

    ];

    for (const section of sections) {

        const response = await fetch(`sections/${section}.html`);

        if (!response.ok) {

            console.error(`Unable to load sections/${section}.html`);

            continue;

        }

        const html = await response.text();

        container.insertAdjacentHTML("beforeend", html);

    }

}