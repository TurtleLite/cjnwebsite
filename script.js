// NAV: fixed state on scroll
const nav = document.getElementById("siteNav");

function updateNav() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

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
  img.parentElement.addEventListener("click", () => openLightbox(galleryItems.indexOf(img));
);

lightboxClose.addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click", () => {
  if (currentIndex > 0) openLightbox(currentIndex - 1);
});

lightboxNext.addEventListener("click", () => {
  if (currentIndex < galleryItems.length - 1)
    openLightbox(currentIndex + 1);
);

// AÑO ACTUAL EN EL FOOTER
document.getElementById("year").textContent =
  new Date().getFullYear().toString();