function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const toggle = document.querySelectorAll(".dark-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

toggle.forEach(btn => {
  btn.addEventListener("click", () => {
    body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  });
});

const reveals = document.querySelectorAll(".reveal, .text-reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.6,
  },
);

document
  .querySelectorAll(".letter-reveal")
  .forEach((el) => observer.observe(el));

reveals.forEach((el) => observer.observe(el));

const letterElements = document.querySelectorAll(".letter-reveal");

letterElements.forEach((el) => {
  const text = el.textContent;
  el.textContent = "";

  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.transitionDelay = `${i * 0.04}s`;
    el.appendChild(span);
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
