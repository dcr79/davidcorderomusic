/* ==========================================================
   DAVID CORDERO
   Official Website
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".main-nav a");

    const sections = document.querySelectorAll("main section[id]");


    /* ======================================================
       Smooth Scroll
    ====================================================== */

    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const id = link.getAttribute("href");

            const target = document.querySelector(id);

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ======================================================
       Active Navigation
    ====================================================== */

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute("id");

            links.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${id}`
                );

            });

        });

    }, {

        root: null,

        rootMargin: "-35% 0px -55% 0px",

        threshold: 0

    });


    sections.forEach(section => observer.observe(section));

});