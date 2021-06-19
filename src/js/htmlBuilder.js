import eventTpl from '../temlates/event.hbs';
import pagesBuilder from './pagesBuilder'
import modalListener from './modal';
import filter from './eventsFilter';


const refs = {
    ulElement: document.querySelector('.list-allExecutor')
};


function listBuilder(data) {
    refs.ulElement.innerHTML = '';
    if (!data.page.totalElements) { return console.log('подходящих ивентов не найдено') };
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
