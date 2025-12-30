(() => {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".custom-lightbox");
  const content = lightbox.querySelector(".lb-content");
  const prev = lightbox.querySelector(".lb-prev");
  const next = lightbox.querySelector(".lb-next");
  const close = lightbox.querySelector(".lb-close");

  let index = 0;

  function render() {
    content.innerHTML = "";
    const item = items[index];
    const isMobile = window.innerWidth <= 768;

    function handleTap(e, element) {
      e.stopPropagation();

      // Desktop → siempre siguiente
      if (!isMobile) {
        next.click();
        return;
      }

      // Mobile → izquierda / derecha
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;

      if (x > rect.width / 2) {
        next.click();
      } else {
        prev.click();
      }
    }

    // ===== VIDEO =====
    if (item.tagName === "VIDEO") {
      const video = document.createElement("video");
      video.src = item.dataset.full || item.src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = false;

      video.addEventListener("click", (e) => handleTap(e, video));
      content.appendChild(video);
      return;
    }

    // ===== IMAGEN =====
    const img = document.createElement("img");
    img.src = item.src;

    img.addEventListener("click", (e) => handleTap(e, img));
    content.appendChild(img);
  }

  function open(i) {
    index = i;
    lightbox.hidden = false;
    render();
  }

  items.forEach((el, i) => {
    el.addEventListener("click", () => open(i));
  });

  next.addEventListener("click", () => {
    index = (index + 1) % items.length;
    render();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    render();
  });

  close.addEventListener("click", () => {
    lightbox.hidden = true;
    content.innerHTML = "";
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close.click();
    if (e.key === "ArrowRight") next.click();
    if (e.key === "ArrowLeft") prev.click();
  });
})();