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
	if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
		closeModal();
	}
});
