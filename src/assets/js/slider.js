document.addEventListener('DOMContentLoaded', () => {
	const slider = document.getElementById('slider');
	const slides = slider.querySelectorAll('.slide');
	const dots = document.querySelectorAll('.slider-dot');

	let current = 0;
	const intervalTime = 3000;
	let sliderInterval;
	let startX = 0;
	let endX = 0;
	const swipeThreshold = 50; // min. pixelkülönbség a váltáshoz

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
		stopAutoSlide(); // biztonság kedvéért
		sliderInterval = setInterval(nextSlide, intervalTime);
	}

	function stopAutoSlide() {
		clearInterval(sliderInterval);
	}

	// Dot click
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			stopAutoSlide();
			showSlide(index);
			startAutoSlide();
		});
	});

	// Hover pause (desktop)
	slider.addEventListener('mouseenter', stopAutoSlide);
	slider.addEventListener('mouseleave', startAutoSlide);

	// Swipe (mobile / touch)
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
