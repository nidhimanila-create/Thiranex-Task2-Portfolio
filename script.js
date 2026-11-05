// ==========================================
// THEME SWITCHER
// ==========================================

const root = document.documentElement;

const themeButton = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");


// Apply selected theme

function applyTheme(theme) {

    root.dataset.theme = theme;

    const isLight = theme === "light";

    themeIcon.textContent = isLight ? "☾" : "☼";

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    themeButton.setAttribute(
        "title",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    document.querySelector('meta[name="theme-color"]')
        .setAttribute(
            "content",
            isLight ? "#f5f7fb" : "#0b1020"
        );
}


// Load saved theme or system preference

const savedTheme = localStorage.getItem("portfolio-theme");

const preferredTheme =
    window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

applyTheme(savedTheme || preferredTheme);


// Theme toggle button

themeButton.addEventListener("click", () => {

    const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    localStorage.setItem("portfolio-theme", nextTheme);

});


// ==========================================
// MOBILE NAVIGATION
// ==========================================

function closeMenu() {

    navigation.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


// Open and close mobile menu

menuButton.addEventListener("click", () => {

    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu"
    );

    navigation.classList.toggle("is-open", !isOpen);

});


// Close menu after clicking a navigation link

navigation.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", closeMenu);

});


// Close menu when switching to desktop size

window.addEventListener("resize", () => {

    if (window.innerWidth >= 760) {
        closeMenu();
    }

});


// ==========================================
// AUTOMATIC FOOTER YEAR
// ==========================================

document.querySelector("#year").textContent =
    new Date().getFullYear();