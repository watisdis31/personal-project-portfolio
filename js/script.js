/* =========================
   MENU NAVIGATION
========================= */

const buttons = document.querySelectorAll(".menu-btn");
const panels = document.querySelectorAll(".panel");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;

    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    panels.forEach((panel) => {
      panel.classList.remove("active");
      panel.style.visibility = "hidden"; // 🔥 force hide
    });

    const activePanel = document.getElementById(target);
    activePanel.classList.add("active");
    activePanel.style.visibility = "visible";
  });
});

/* =========================
   PROJECTS – BW2 SCROLL
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".projects-container");
  const thumb = document.querySelector(".pokedex-scroll-thumb");
  const track = document.querySelector(".pokedex-scroll-track");

  if (!container || !thumb || !track) return;

  function updateThumb() {
    const scrollHeight = container.scrollHeight - container.clientHeight;

    if (scrollHeight <= 0) {
      thumb.style.top = "0px";
      return;
    }

    const trackHeight = track.clientHeight - thumb.clientHeight;
    const snap = 8; // DS pixel snapping

    const rawTop = (container.scrollTop / scrollHeight) * trackHeight;
    const snappedTop = Math.round(rawTop / snap) * snap;

    thumb.style.top = snappedTop + "px";
  }

  // DS-style stepped scrolling
  container.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const step = 16; // BW2 scroll step
      container.scrollTop += e.deltaY > 0 ? step : -step;
    },
    { passive: false }
  );

  container.addEventListener("scroll", updateThumb);
  updateThumb();
});

/* =========================
   TRAINER CARD FLIP
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const trainerFlip = document.getElementById("trainerFlip");
  const flipControl = document.querySelector(".trainer-flip-control");

  if (!trainerFlip || !flipControl) return;

  let flipped = false;

  function updateFlip() {
    trainerFlip.classList.toggle("flipped", flipped);
  }

  flipControl.addEventListener("click", () => {
    flipped = !flipped;
    updateFlip();
  });

  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("trainer-panel")?.classList.contains("active")) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      flipped = !flipped;
      updateFlip();
    }
  });
});

/* ===============================
   📱 BW2 SWIPE FLIP (TOGGLE)
   =============================== */

(() => {
  const flipWrapper = document.getElementById("trainerFlip");
  if (!flipWrapper) return;

  let startX = 0;
  let startY = 0;
  let tracking = false;

  const THRESHOLD = 40;

  flipWrapper.addEventListener("touchstart", (e) => {
    if (!document.getElementById("trainer-panel")?.classList.contains("active")) {
      return;
    }

    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = true;
  }, { passive: true });

  flipWrapper.addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    // Ignore vertical swipes
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (Math.abs(dx) < THRESHOLD) return;

    // 🔥 TOGGLE FLIP
    flipWrapper.classList.toggle("flipped");

    // Update dots if you still use them
    const dots = document.querySelectorAll(".page-dot");
    const flipped = flipWrapper.classList.contains("flipped");

    dots[0]?.classList.toggle("active", !flipped);
    dots[1]?.classList.toggle("active", flipped);
  }, { passive: true });
})();
