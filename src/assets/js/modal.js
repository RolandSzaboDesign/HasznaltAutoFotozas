function openModal() {
	document.body.classList.add('modal-open');
	document.querySelector('.modal').classList.add('active');
}

function closeModal() {
	document.body.classList.remove('modal-open');
	document.querySelector('.modal').classList.remove('active');
}
