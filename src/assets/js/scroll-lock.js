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
