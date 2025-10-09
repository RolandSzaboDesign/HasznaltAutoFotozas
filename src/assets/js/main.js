document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.js-prevent-default').forEach((el) => {
		el.addEventListener('click', (e) => {
			e.preventDefault();
		});
	});
});
