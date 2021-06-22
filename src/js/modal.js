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
  const country = select.value;
  const keyWord = authorName;
  toggleModal()
  if (country.length > 2) {
    console.log('сработал селект')
    apiSearch.getByKey(keyWord).then(htmlConstructor.listBuilderFromForm).catch(console.log);
  };

  apiSearch.getByKeyAndCountry(keyWord, country).then(htmlConstructor.listBuilderFromForm).catch(console.log);

  
  

}

// функция дл вызова в htmlbuilder'е - нужна чтобы получить динамичкскую разметку с карточек
function listenerForModal() {
  const cardListArray = document.querySelectorAll('.list-executor');
  cardListArray.forEach(item => item.addEventListener('click', openModal));
};


export default listenerForModal;