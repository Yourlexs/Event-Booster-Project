// Импорт шаблона информации для модального окна

import modalTpl from '../temlates/modal.hbs';

// Логика работы модального окна

const openModalEl = document.querySelector('.list-allExecutor');
const closeModalBtnEl = document.querySelector('.close-button');
const backdropEl = document.querySelector('.backdrop');
const modalInfoEl = document.querySelector('.modal__main-container');

openModalEl.addEventListener('click', openModal);
closeModalBtnEl.addEventListener('click', closeModal);
backdropEl.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closeModal();
});


function openModal(e) {
  const isEvent = e.target.classList.contains('page-albom');
  if (!isEvent) {
        return;
  }
  clearModalInfo();
  renderModalInfo();
  toggleModal();
};

function closeModal() {
  toggleModal();
  // clearModalInfo();
};

function toggleModal() {
  document.body.classList.toggle('modal-open');
  backdropEl.classList.toggle('is-hidden');
};

function renderModalInfo() {
  modalInfoEl.insertAdjacentHTML('beforeend', modalTpl());
};

function clearModalInfo() {
  modalInfoEl.innerHTML = '';
}