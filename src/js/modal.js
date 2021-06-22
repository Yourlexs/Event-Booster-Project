// Импорт шаблона информации для модального окна
import modalTpl from '../temlates/modal.hbs';
import apiSearch from './apiService';
import filter from './eventsFilter';
import * as htmlConstructor from './htmlBuilder';

// Логика работы модального окна

const closeModalBtnEl = document.querySelector('.close-button');
const backdropEl = document.querySelector('.backdrop');
const modalInfoEl = document.querySelector('.modal__main-container');
const input = document.querySelector('#js-input');
const select = document.querySelector('#js-select');


closeModalBtnEl.addEventListener('click', toggleModal);
backdropEl.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) toggleModal();
});


function openModal(e) {
  if (e.target.classList.contains('place-performance') || e.target.classList.contains('material-icons')) { return };
 
  document.addEventListener('keydown', onCloseModalEsc);
  clearModalInfo();
  renderModalByEvent(e);
};


function toggleModal() {
  document.body.classList.toggle('modal-open');
  backdropEl.classList.toggle('is-hidden');
};

function onCloseModalEsc(e) {
  if (e.code === 'Escape') {
    toggleModal();
    document.removeEventListener('keydown', onCloseModalEsc);
  };
}


function clearModalInfo() {
  modalInfoEl.innerHTML = '';
};

let authorName;
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

  // логика по клику на кнопку "показать больше"
  authorName = fixedResponce._embedded.events['0'].name;
  const moreInfoBtn = document.querySelector('.modal__more-info-link');
  moreInfoBtn.addEventListener('click', showMore);
};

function showMore(event) {
  event.preventDefault();
  input.value = authorName;;
  const country = select.value;
  select.value = 'Choose country'
  toggleModal();
  
  if (country.length > 2) {
    apiSearch.getByKey(authorName).then(htmlConstructor.listBuilderFromForm).catch(console.log);
    return
  };

  apiSearch.getByKeyAndCountry(authorName, country).then(htmlConstructor.listBuilderFromForm).catch(console.log);
}

// функция дл вызова в htmlbuilder'е - нужна чтобы получить динамичкскую разметку с карточек
function listenerForModal() {
  const cardListArray = document.querySelectorAll('.list-executor');
  cardListArray.forEach(item => item.addEventListener('click', openModal));
};


export default listenerForModal;