// ====== CONFIG ======
const BUSINESS_NAME = "Aluminio y Cristales González";
const PHONE_E164 = "+529992443442";
const EMAIL = "aluminio-cristales-gonzalez@hotmail.com";

// WhatsApp message (NO reparación)
const waMessage = `Hello,

I would like a quote for aluminum / glass work:
- Type: (door / window / gate / shower enclosure / showcase / glass)
- Approximate size (width x height):
- Location / neighborhood:

I can send photos. Thank you.`;

// ====== Helpers ======
function waLink(phoneE164, message) {
  const text = encodeURIComponent(message.replace("[TU NOMBRE]", BUSINESS_NAME));
  const digits = phoneE164.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${text}`;
}

// ====== Wire up buttons ======
const waUrl = waLink(PHONE_E164, waMessage);

const waTop = document.getElementById("waTop");
const waHero = document.getElementById("waHero");
const waContact = document.getElementById("waContact");
if (waTop) waTop.href = waUrl;
if (waHero) waHero.href = waUrl;
if (waContact) waContact.href = waUrl;

const callBtn = document.getElementById("callBtn");
if (callBtn) callBtn.href = `tel:${PHONE_E164}`;

const mailBtn = document.getElementById("mailBtn");
if (mailBtn) {
  mailBtn.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Cotización cancelería de aluminio y cristales"
  )}`;
}

const waTemplate = document.getElementById("waTemplate");
if (waTemplate) {
  waTemplate.textContent = waMessage.replace("[TU NOMBRE]", BUSINESS_NAME);
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ====== Gallery Lightbox ======
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("lightboxClose");
const gallery = document.getElementById("gallery");

if (gallery && lightbox && lightboxImg && lightboxCaption && closeBtn) {
  gallery.addEventListener("click", (e) => {
    const fig = e.target.closest("figure.thumb");
    if (!fig) return;

    const img = fig.querySelector("img");
    const cap = fig.querySelector("figcaption")?.textContent || "";
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || cap;
    lightboxCaption.textContent = cap;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
