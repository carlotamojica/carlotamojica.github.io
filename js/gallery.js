const items = Array.from(document.querySelectorAll('.home-footer-track img, .home-footer-track video'));
const lightbox = document.querySelector('.custom-lightbox');
const content = document.querySelector('.lb-content');
const prev = document.querySelector('.lb-prev');
const next = document.querySelector('.lb-next');
const closeBtn = document.querySelector('.lb-close');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  renderItem();
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
  content.innerHTML = '';
}

function renderItem() {
  content.innerHTML = '';
  const item = items[currentIndex];

  if (item.tagName === 'VIDEO') {
    const video = document.createElement('video');
    video.src = item.dataset.full || item.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    content.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.dataset.full || item.src;
    content.appendChild(img);
  }
}

items.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

prev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  renderItem();
});

next.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  renderItem();
});

closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') prev.click();
});