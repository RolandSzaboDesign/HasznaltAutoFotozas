const lightbox = document.getElementById('lightbox');
const prevBtn = lightbox.querySelector('.lightbox__arrow--prev');
const nextBtn = lightbox.querySelector('.lightbox__arrow--next');
const closeBtn = lightbox.querySelector('.lightbox__close');
const caption = lightbox.querySelector('.lightbox__caption');

const prevImg = lightbox.querySelector('.lightbox__image--prev');
const currentImg = lightbox.querySelector('.lightbox__image--current');
const nextImg = lightbox.querySelector('.lightbox__image--next');

const thumbnails = Array.from(document.querySelectorAll('.js-lightbox'));
let activeIndex = 0;

function updateLightboxImages(index) {
	const prev = thumbnails[(index - 1 + thumbnails.length) % thumbnails.length];
	const current = thumbnails[index];
	const next = thumbnails[(index + 1) % thumbnails.length];

	prevImg.src = prev.dataset.highres;
	prevImg.alt = prev.alt || '';
	currentImg.src = current.dataset.highres;
	currentImg.alt = current.alt || '';
	nextImg.src = next.dataset.highres;
	nextImg.alt = next.alt || '';

	caption.textContent = current.alt || '';
	activeIndex = index;
}

function showLightbox(index) {
	updateLightboxImages(index);
	lightbox.classList.add('active');
	document.body.classList.add('lightbox-open');
}

function hideLightbox() {
	lightbox.classList.remove('active');
	document.body.classList.remove('lightbox-open');
}

function showNext() {
	const newIndex = (activeIndex + 1) % thumbnails.length;
	updateLightboxImages(newIndex);
}

function showPrev() {
	const newIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
	updateLightboxImages(newIndex);
}

thumbnails.forEach((thumb, index) => {
	thumb.addEventListener('click', (e) => {
		e.preventDefault();
		showLightbox(index);
	});
});

closeBtn.addEventListener('click', hideLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

window.addEventListener('keydown', (e) => {
	if (lightbox.hasAttribute('hidden')) return;
	if (e.key === 'ArrowLeft') showPrev();
	if (e.key === 'ArrowRight') showNext();
	if (e.key === 'Escape') hideLightbox();
});

// Touch support
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

lightbox.addEventListener('touchstart', (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
	touchEndX = e.changedTouches[0].screenX;
	const diff = touchEndX - touchStartX;
	if (Math.abs(diff) > swipeThreshold) {
		diff < 0 ? showNext() : showPrev();
	}
});
