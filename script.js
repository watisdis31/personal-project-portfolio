function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const toggles = document.querySelectorAll(".theme-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggles.forEach((btn) => {
      btn.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";
    });
  });
});
