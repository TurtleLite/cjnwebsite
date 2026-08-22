// NAV: fondo sólido al hacer scroll
const nav = document.getElementById("siteNav");

function updateNav() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// MENÚ MÓVIL
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

closeMenu.addEventListener("click", closeMobileMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// CARRUSEL DE ACTIVIDADES
const scrollTrack = document.getElementById("actividadesScroll");
const btnLeft = document.getElementById("scrollLeft");
const btnRight = document.getElementById("scrollRight");
const STEP = 310;

function updateButtons() {
  btnLeft.classList.toggle(
    "hidden",
    scrollTrack.scrollLeft <= 0
  );
  btnRight.classList.toggle(
    "hidden",
    scrollTrack.scrollLeft + scrollTrack.clientWidth >=
      scrollTrack.scrollWidth - 1
  );
}

btnLeft.addEventListener("click", () => {
  scrollTrack.scrollBy({ left: -STEP, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  scrollTrack.scrollBy({ left: STEP, behavior: "smooth" });
});

scrollTrack.addEventListener("scroll", updateButtons, { passive: true });
window.addEventListener("resize", updateButtons);
updateButtons();

// APARICIÓN AL HACER SCROLL
const revealTargets = document.querySelectorAll("[data-reveal]");

if (revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealTargets.forEach((target) => observer.observe(target));
}

// LIGHTBOX
const galleryItems = Array.from(
  document.querySelectorAll(".gallery-item img, .rest-item img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[index];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
  updateLightboxButtons();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

function updateLightboxButtons() {
  lightboxPrev.classList.toggle("hidden", currentIndex === 0);
  lightboxNext.classList.toggle(
    "hidden",
    currentIndex === galleryItems.length - 1
  );
}

galleryItems.forEach((img) => {
  img.parentElement.addEventListener("click", () => {
    openLightbox(galleryItems.indexOf(img));
  });
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex > 0) openLightbox(currentIndex - 1);
});

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  if (currentIndex < galleryItems.length - 1) openLightbox(currentIndex + 1);
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft" && currentIndex > 0)
    openLightbox(currentIndex - 1);
  if (e.key === "ArrowRight" && currentIndex < galleryItems.length - 1)
    openLightbox(currentIndex + 1);
});

// AÑO ACTUAL EN EL FOOTER
document.getElementById("year").textContent =
  new Date().getFullYear().toString();
