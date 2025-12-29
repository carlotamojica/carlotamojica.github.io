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

  if (item.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = item.dataset.full || item.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;

    // clic video = next
    video.addEventListener("click", (e) => {
      e.stopPropagation();
      next.click();
    });

    content.appendChild(video);

  } else {
    const img = document.createElement("img");
    img.src = item.src;

    // clic image = next
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      next.click();
    });

    content.appendChild(img);
  }
}

  function open(i) {
    index = i;
    lightbox.hidden = false;
    render();
  }

  items.forEach((el, i) => {
    el.addEventListener("click", () => open(i));
  });

  next.onclick = () => {
    index = (index + 1) % items.length;
    render();
  };

  prev.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    render();
  };

  close.onclick = () => {
    lightbox.hidden = true;
    content.innerHTML = "";
  };

  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close.click();
    if (e.key === "ArrowRight") next.click();
    if (e.key === "ArrowLeft") prev.click();
  });
  
})();