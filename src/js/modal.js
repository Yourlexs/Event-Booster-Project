// Импорт шаблона информации для модального окна

import modalTpl from '../temlates/modal.hbs';
import apiSearch from './apiService';
import filter from './eventsFilter';

// Логика работы модального окна

// const openModalEl = document.querySelector('.list-allExecutor');
const closeModalBtnEl = document.querySelector('.close-button');
const backdropEl = document.querySelector('.backdrop');
const modalInfoEl = document.querySelector('.modal__main-container');

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
  // renderModalInfo();
  renderModalByEvent(e);
  toggleModal();
};

function closeModal(e) {
  toggleModal();
  // clearModalInfo();
};

function toggleModal() {
  document.body.classList.toggle('modal-open');
  backdropEl.classList.toggle('is-hidden');
  
};

// function renderModalInfo() {
//   modalInfoEl.insertAdjacentHTML('beforeend', modalTpl());
// };

function clearModalInfo() {
  modalInfoEl.innerHTML = '';
};

async function renderModalByEvent(event) {
  const id = event.currentTarget.getAttribute('id');
  const responce = await apiSearch.getById(id).then(okay => okay).catch(console.log);
  const fixedResponce = filter(responce);


    // передача нужного ивента в шаблонизатор 
  const modalHtml = modalTpl(fixedResponce._embedded.events['0']);
  modalInfoEl.innerHTML = modalHtml;
  console.log(fixedResponce, 'подробная информация по ивенту');
};

  
function listenerForModal() {
  const cardListArray = document.querySelectorAll('.list-executor');
  cardListArray.forEach(item => item.addEventListener('click', openModal));
};



export default listenerForModal;





