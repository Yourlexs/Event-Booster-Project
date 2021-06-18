import eventTpl from '../temlates/event.hbs';
import pagesBuilder from './pagesBuilder'
import modalListener from './modal';


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
    // console.log(data);
    listBuilder(data);
    pagesBuilder(data);
    modalListener();
};


 export function listBuilderFromPages(data) {
    listBuilder(data)
    modalListener();
};



