// Elements
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const toTop = document.getElementById("toTop");

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Sticky navbar + back-to-top button
function onScroll() {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle("scrolled", scrolled);
  toTop.classList.toggle("show", window.scrollY > 500);
}
window.addEventListener("scroll", onScroll);
onScroll();

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Menu category filter
const tabs = document.querySelectorAll(".tab");
const items = document.querySelectorAll(".menu-item");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;
    items.forEach((item) => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hide", !show);
    });
  });
});

// Reveal elements as they scroll into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Reservation form (front-end only)
const form = document.getElementById("reserveForm");
const formMsg = document.getElementById("formMsg");

// Don't allow past dates
document.getElementById("date").min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  formMsg.textContent = `Thanks ${name}! Your table request for ${date} at ${time} has been received. ☕`;
  form.reset();
});
