document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".custom-lightbox");
  const lbPrev = document.querySelector(".lb-prev");
  const lbNext = document.querySelector(".lb-next");
  const lbClose = document.querySelector(".lb-close");

  let currentIndex = 0;
  let currentMedia = null;

  function openLightbox(index) {
    currentIndex = index;
    renderMedia();
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    if (currentMedia && currentMedia.tagName === "VIDEO") {
      currentMedia.pause();
      currentMedia.src = "";
    }
    currentMedia = null;
    lightbox.querySelectorAll("img, video").forEach(el => el.remove());
  }

  function renderMedia() {
    lightbox.querySelectorAll("img, video").forEach(el => el.remove());

    const item = items[currentIndex];

    if (item.tagName === "VIDEO") {
      const video = document.createElement("video");
      video.src = item.dataset.full || item.src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = false;
      video.preload = "auto";
      video.style.maxWidth = "80vw";
      video.style.maxHeight = "80vh";

      currentMedia = video;
      lightbox.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      currentMedia = img;
      lightbox.appendChild(img);
    }
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    renderMedia();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderMedia();
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  lbNext.addEventListener("click", showNext);
  lbPrev.addEventListener("click", showPrev);
  lbClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
});