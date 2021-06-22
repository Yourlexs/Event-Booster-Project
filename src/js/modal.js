// Импорт шаблона информации для модального окна

import modalTpl from '../temlates/modal.hbs';
import apiSearch from './apiService';
import filter from './eventsFilter';

// Логика работы модального окна

const closeModalBtnEl = document.querySelector('.close-button');
const backdropEl = document.querySelector('.backdrop');
const modalInfoEl = document.querySelector('.modal__main-container');

closeModalBtnEl.addEventListener('click', toggleModal);
backdropEl.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) toggleModal();
});


function openModal(e) {
  if (e.target.classList.contains('place-performance')) { return };
  
  clearModalInfo();
  renderModalByEvent(e);
};


function toggleModal() {
  document.body.classList.toggle('modal-open');
  backdropEl.classList.toggle('is-hidden');
};


function clearModalInfo() {
  modalInfoEl.innerHTML = '';
};


async function renderModalByEvent(event) {
  const id = event.currentTarget.getAttribute('id');
  const responce = await apiSearch.getById(id).then(okay => okay).catch(console.log);
  const fixedResponce = filter(responce);

  // Передача исправленного ивента в шаблонизатор модалки
  const modalHtml = modalTpl(fixedResponce._embedded.events['0']);
  modalInfoEl.innerHTML = modalHtml;
  // Здесь включаем модалку чтоб не было пустого окошка
  toggleModal();
  console.log(fixedResponce, 'подробная информация по ивенту');
};


function listenerForModal() {
  const cardListArray = document.querySelectorAll('.list-executor');
  cardListArray.forEach(item => item.addEventListener('click', openModal));
};


export default listenerForModal;