// Prevent Default
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.js-prevent-default').forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
		});
	});
});



// Scroll Lock
function lockBodyScroll() {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	if (scrollBarWidth > 0) {
		document.body.style.paddingRight = `${scrollBarWidth}px`;
	}
	document.body.classList.add('scroll-lock');
}

function unlockBodyScroll() {
	document.body.classList.remove('scroll-lock');
	document.body.style.paddingRight = '';
}



// Modal
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('.js-modal-open');
const closeModalBtn = document.querySelector('.js-modal-close');
const modalOverlay = modal?.querySelector('.modal__overlay');

function openModal() {
	if (!modal) return;
	modal.classList.add('modal--active');
	lockBodyScroll();
}

function closeModal() {
	if (!modal) return;
	modal.classList.remove('modal--active');
	unlockBodyScroll();
}

openModalBtn?.addEventListener('click', openModal);
closeModalBtn?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modal?.classList.contains('modal--active')) closeModal();
});



// Hero Slider
document.addEventListener('DOMContentLoaded', () => {
	const slider = document.getElementById('slider');
	const slides = slider.querySelectorAll('.slide');
	const dots = document.querySelectorAll('.slider-dot');

	let current = 0;
	const intervalTime = 3000;
	let sliderInterval;
	let startX = 0;
	let endX = 0;
	const swipeThreshold = 50;

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('slide--active', i === index);
			slide.setAttribute('aria-hidden', i !== index);
			if (dots[i]) {
				dots[i].classList.toggle('slider-dot--active', i === index);
				dots[i].setAttribute('aria-current', i === index ? 'true' : 'false');
			}
		});
		current = index;
	}

	function nextSlide() {
		const newIndex = (current + 1) % slides.length;
		showSlide(newIndex);
	}

	function prevSlide() {
		const newIndex = (current - 1 + slides.length) % slides.length;
		showSlide(newIndex);
	}

	function startAutoSlide() {
		stopAutoSlide();
		sliderInterval = setInterval(nextSlide, intervalTime);
	}

	function stopAutoSlide() {
		clearInterval(sliderInterval);
	}

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			stopAutoSlide();
			showSlide(index);
			startAutoSlide();
		});
	});

	slider.addEventListener('mouseenter', stopAutoSlide);
	slider.addEventListener('mouseleave', startAutoSlide);

	slider.addEventListener('pointerdown', e => {
		startX = e.clientX;
		stopAutoSlide();
	});
	slider.addEventListener('pointerup', e => {
		endX = e.clientX;
		const diff = endX - startX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff < 0) nextSlide();
			else prevSlide();
		}
		startAutoSlide();
	});

	showSlide(current);
	startAutoSlide();
});



// Lightbox
const lightbox = document.getElementById('lightbox');
const prevBtn = lightbox.querySelector('.lightbox__arrow--prev');
const nextBtn = lightbox.querySelector('.lightbox__arrow--next');
const closeBtn = lightbox.querySelector('.lightbox__close');
const caption = lightbox.querySelector('.lightbox__caption');
const lightboxOverlay = lightbox.querySelector('.lightbox__overlay');

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
	lockBodyScroll();
	lightbox.classList.add('lightbox--active');
}

function hideLightbox() {
	lightbox.classList.remove('lightbox--active');
	unlockBodyScroll();
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
	if (!lightbox.classList.contains('lightbox--active')) return;
	if (e.key === 'ArrowLeft') showPrev();
	if (e.key === 'ArrowRight') showNext();
	if (e.key === 'Escape') hideLightbox();
});

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 50;

lightbox.addEventListener('touchstart', (e) => {
	touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
	touchEndX = e.changedTouches[0].screenX;
	const diff = touchEndX - touchStartX;
	if (Math.abs(diff) > swipeThreshold) {
		diff < 0 ? showNext() : showPrev();
	}
}, { passive: true });

lightboxOverlay.addEventListener('click', hideLightbox);
