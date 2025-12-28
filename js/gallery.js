(() => {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".custom-lightbox");
  const img = lightbox.querySelector("img");
  const prev = lightbox.querySelector(".lb-prev");
  const next = lightbox.querySelector(".lb-next");
  const close = lightbox.querySelector(".lb-close");

  let index = 0;

  function show() {
    const src = items[index].dataset.full || items[index].src;
    img.src = src;
  }

  items.forEach((el, i) => {
    el.addEventListener("click", () => {
      index = i;
      lightbox.hidden = false;
      show();
    });
  });

  next.onclick = () => {
    index = (index + 1) % items.length;
    show();
  };

  prev.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    show();
  };

  close.onclick = () => {
    lightbox.hidden = true;
    img.src = "";
  };

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) {
      close.click();
    }
  });
})();

document.addEventListener("keydown", (e) => {
  const lightbox = document.querySelector(".custom-lightbox");
  if (!lightbox || lightbox.hasAttribute("hidden")) return;

  if (e.key === "ArrowRight") {
    e.preventDefault();
    document.querySelector(".lb-next")?.click();
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    document.querySelector(".lb-prev")?.click();
  }

  if (e.key === "Escape") {
    e.preventDefault();
    document.querySelector(".lb-close")?.click();
  }
});