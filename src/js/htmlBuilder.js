import eventTpl from '../temlates/event.hbs';
import pagesBuilder from './pagesBuilder'
import modalListener from './modal';
import filter from './eventsFilter';


const refs = {
    ulElement: document.querySelector('.list-allExecutor'),
    select: document.querySelector('#js-select'),
    options: document.querySelectorAll('.option')
};

function listBuilder(data) {
    refs.ulElement.innerHTML = '';
    if (!data.page.totalElements) {
        // refs.ulElement.innerHTML = '<li class="sorry-message">Извините, запрос не найден</>'
        alert('Подходящие запросы не найдены, измените критерии поиска')
        return console.log('подходящих ивентов не найдено')
    };
    const events = data._embedded.events;
    const cardListHtml = eventTpl(events);
    refs.ulElement.insertAdjacentHTML('beforeend', cardListHtml);
};


export function listBuilderFromForm(data) {
    const fixedResponce = filter(data);
    listBuilder(fixedResponce);
    pagesBuilder(fixedResponce);
    modalListener();
};


export function listBuilderFromPages(data) {
    const fixedResponce = filter(data);
    listBuilder(fixedResponce);
    modalListener();
};

export function listBuilderRandom(data) {
    const random = data.page.number;
    const fixedResponce = filter(data);
    listBuilder(fixedResponce);
    pagesBuilder(fixedResponce, random);
    modalListener();
};



refs.select.addEventListener('focus', selectOpen);
refs.select.addEventListener('blur', selectClosed);

function selectOpen(event) {
    event.target.size = '7';
    event.target.style.height = '200px';

};

function selectClosed(event) {
    event.target.size = '';
    event.target.style.height = '';    
};

