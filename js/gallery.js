(function () {
  const gallery = document.querySelector(".custom-gallery");
  const lightbox = document.querySelector(".custom-lightbox");

  if (!gallery || !lightbox) return;

  const prevBtn = lightbox.querySelector(".lb-prev");
  const nextBtn = lightbox.querySelector(".lb-next");
  const closeBtn = lightbox.querySelector(".lb-close");

  const items = Array.from(gallery.querySelectorAll(".gallery-item"));
  let index = 0;

  function clearLightbox() {
    lightbox.querySelectorAll(".media-wrapper").forEach(el => el.remove());
  }

  function render() {
    clearLightbox();

    const wrapper = document.createElement("div");
    wrapper.className = "media-wrapper";
    lightbox.appendChild(wrapper);

    const item = items[index];
    let media;

    if (item.tagName === "VIDEO") {
      media = document.createElement("video");
      media.src = item.dataset.full || item.src;
      media.muted = true;
      media.loop = true;
      media.autoplay = true;
      media.playsInline = true;
      media.preload = "auto";
    } else {
      media = document.createElement("img");
      media.src = item.src;
    }

    wrapper.appendChild(media);
  }

  function open(i) {
    index = i;
    lightbox.hidden = false;
    render();
  }

  function close() {
    lightbox.hidden = true;
    clearLightbox();
  }

  items.forEach((item, i) => {
    item.addEventListener("click", () => open(i));
  });

  nextBtn.onclick = e => {
    e.stopPropagation();
    index = (index + 1) % items.length;
    render();
  };

  prevBtn.onclick = e => {
    e.stopPropagation();
    index = (index - 1 + items.length) % items.length;
    render();
  };

  closeBtn.onclick = e => {
    e.stopPropagation();
    close();
  };

  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") {
      index = (index + 1) % items.length;
      render();
    }
    if (e.key === "ArrowLeft") {
      index = (index - 1 + items.length) % items.length;
      render();
    }
  });
})();
