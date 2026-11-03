
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const themeToggle = document.getElementById("themeToggle");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close mobile navigation after selecting a link
navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Dark and light theme
function setTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "☀" : "☾";
    try {
        localStorage.setItem("amra-theme", theme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
}

themeToggle.addEventListener("click", () => {
    const darkMode = document.body.classList.contains("dark");
    setTheme(darkMode ? "light" : "dark");
});

// Restore the saved theme
try {
    setTheme(localStorage.getItem("amra-theme") || "light");
} catch (error) {
    setTheme("light");
}

// Automatically update copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth reveal animation when sections enter the screen
const revealElements = document.querySelectorAll(
    ".project-card, .skill-card, .experience-card, .timeline-item"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}
