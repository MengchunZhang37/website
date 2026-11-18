'use strict';
const dialog = document.getElementById('figure-dialog');
const image = document.getElementById('dialog-image');
const caption = document.getElementById('figure-caption');
const media = dialog.querySelector('.dialog-media');
let lastTrigger;
for (const trigger of document.querySelectorAll('[data-figure]')) {
  trigger.addEventListener('click', () => {
    lastTrigger = trigger;
    image.src = trigger.dataset.figure;
    image.alt = trigger.querySelector('img')?.alt || trigger.dataset.caption;
    caption.textContent = trigger.dataset.caption;
    media.className = 'dialog-media';
    if (trigger.dataset.crop) {
      media.classList.add('is-cropped', trigger.dataset.crop);
    }
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
}
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const box = dialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  lastTrigger?.focus();
});
