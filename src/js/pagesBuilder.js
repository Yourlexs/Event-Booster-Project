import apiSearch from './apiService';
import * as htmlConstructor from './htmlBuilder';

const refs = {
    input: document.querySelector('#js-input'),
    select: document.querySelector('#js-select'),
    pagination: document.querySelector('#js-pagination')
};
// сommonRandom необходим только для генерации рандомных ивентов
let commonRandom = 0
function pagesBuilder(data, random = 0) {
    // параметр random нужен только для рандомных ивентов!!

    refs.pagination.innerHTML = '';
    const totalPages = Math.ceil(data.page.totalElements / 12);
    const maximumPageLinks = 6;
    let pageNumber = 1;

    if (totalPages <= 1) { return };
    
    for (let i = 0; i < totalPages && i < maximumPageLinks; i++) {
        const pageLinkElement = document.createElement('a');
        refs.pagination.append(pageLinkElement);
        pageLinkElement.classList.add('link');
        pageLinkElement.textContent = pageNumber++;
        pageLinkElement.addEventListener('click', pageLinkHandler);

    };

    const allPageLinkElements = document.querySelectorAll('a.link');
    allPageLinkElements[0].classList.add('link--current');

    if (totalPages > maximumPageLinks) {
        const lastElementOfPages = allPageLinkElements[allPageLinkElements.length - 1];
        totalPages > 50 ? lastElementOfPages.textContent = 50 : lastElementOfPages.textContent = totalPages;

        const pageSymbol = document.createElement('span');
        pageSymbol.classList.add('ellipsis');
        pageSymbol.textContent = '...';
        lastElementOfPages.before(pageSymbol);
    };
        // условия для рандомных событий
    if (!refs.input.value && refs.select.value.length > 2) {
        const allPages = document.querySelectorAll('.link');
        allPages.forEach(item => item.removeEventListener('click', pageLinkHandler));
        allPages.forEach(item => item.addEventListener('click', randomHandler));
        commonRandom = random;
    };

};


function pageLinkHandler(event) {
    console.log('вы листаете не рандомные ивенты')
    const findword = refs.input.value.trim();
    const country = refs.select.value;
    const page = event.target.textContent - 1;
    const currentPage = document.querySelector('.link--current').textContent;
    const clickedPage = event.target.textContent;
    
    if (clickedPage === currentPage) { return };

    if (findword && country.length > 2) {
        apiSearch.getByKey(findword, page).then(htmlConstructor.listBuilderFromPages);
    };

    if (!findword && country.length === 2) {
        apiSearch.getByCountry(country, page).then(htmlConstructor.listBuilderFromPages);
    };

    if (findword && country.length === 2) {
        apiSearch.getByKeyAndCountry(findword, country, page).then(htmlConstructor.listBuilderFromPages);
    };

        pageNumberSwitcher(event);
};
function pageNumberSwitcher(event) {
    let allPages = document.querySelectorAll('a.link');
    const clickedPageNumer = event.target.textContent;
    const lastPageNumber = allPages[allPages.length - 1].textContent;

    if (lastPageNumber > 6) {

        if (clickedPageNumer <= 4) {
            const template = `
            <a class="link" href="#1">1</a>
            <a class="link" href="#2">2</a>
            <a class="link" href="#3">3</a>
            <a class="link" href="#4">4</a>
            <a class="link" href="#5">5</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;
            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', pageLinkHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });
        };

        if (clickedPageNumer > 4 && clickedPageNumer < (lastPageNumber - 3)) {
            const template = `
            <a class="link" href="#1">1</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#3">${parseInt(clickedPageNumer) - 1}</a>
            <a class="link" href="#4">${clickedPageNumer}</a>
            <a class="link" href="#5">${parseInt(clickedPageNumer) + 1}</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;
            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', pageLinkHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });
        };

        if (clickedPageNumer > (lastPageNumber - 4)) {
            
            const template = `
            <a class="link" href="#1">1</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#2">${parseInt(lastPageNumber) - 4}</a>
            <a class="link" href="#3">${parseInt(lastPageNumber) - 3}</a>
            <a class="link" href="#4">${parseInt(lastPageNumber) - 2}</a>
            <a class="link" href="#5">${parseInt(lastPageNumber) - 1}</a>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;

            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', pageLinkHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });

        };
    
        return
    };


    if (lastPageNumber < 6) {
        allPages.forEach(item => { item.classList.contains('link--current') ? item.classList.remove('link--current') : true; });
        event.target.classList.add('link--current');
        return
    };
    
};



// ниже функции только для рандом ивентов
function randomHandler(event) {
    console.log('вы листаете рандомные ивенты')
    const currentPage = document.querySelector('.link--current').textContent;
    const clickedPage = event.target.textContent;
    if (clickedPage > currentPage) {
        commonRandom +=  parseInt(clickedPage - currentPage);
        apiSearch.getRandom(commonRandom).then(htmlConstructor.listBuilderFromPages)
    };

    if (clickedPage < currentPage) {
        commonRandom -= parseInt(currentPage - clickedPage);
        apiSearch.getRandom(commonRandom).then(htmlConstructor.listBuilderFromPages);
    };

    if (clickedPage === currentPage) { return };
    pageNumberSwitcherForRandom(event);

};

function pageNumberSwitcherForRandom(event) {
    let allPages = document.querySelectorAll('a.link');
    const clickedPageNumer = event.target.textContent;
    // const firsPageNumber = allPages[0].textContent;
    const lastPageNumber = allPages[allPages.length - 1].textContent;

    if (lastPageNumber > 6) {

        if (clickedPageNumer <= 4) {
            const template = `
            <a class="link" href="#1">1</a>
            <a class="link" href="#2">2</a>
            <a class="link" href="#3">3</a>
            <a class="link" href="#4">4</a>
            <a class="link" href="#5">5</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;
            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', randomHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });
        };

        if (clickedPageNumer > 4 && clickedPageNumer < (lastPageNumber - 3)) {
            const template = `
            <a class="link" href="#1">1</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#3">${parseInt(clickedPageNumer) - 1}</a>
            <a class="link" href="#4">${clickedPageNumer}</a>
            <a class="link" href="#5">${parseInt(clickedPageNumer) + 1}</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;
            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', randomHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });
        };

        if (clickedPageNumer > (lastPageNumber - 4)) {
            
            const template = `
            <a class="link" href="#1">1</a>
            <span class="ellipsis">...</span>
            <a class="link" href="#2">${parseInt(lastPageNumber) - 4}</a>
            <a class="link" href="#3">${parseInt(lastPageNumber) - 3}</a>
            <a class="link" href="#4">${parseInt(lastPageNumber) - 2}</a>
            <a class="link" href="#5">${parseInt(lastPageNumber) - 1}</a>
            <a class="link" href="#${lastPageNumber}">${lastPageNumber}</a>`;

            refs.pagination.innerHTML = template;
            const newAllPages = document.querySelectorAll('.link');
            newAllPages.forEach(item => item.addEventListener('click', randomHandler));
            newAllPages.forEach(item => {
                item.textContent === clickedPageNumer ? item.classList.add('link--current') : true;
            });

        };
    
        return
    };


    if (lastPageNumber < 6) {
        allPages.forEach(item => { item.classList.contains('link--current') ? item.classList.remove('link--current') : true; });
        event.target.classList.add('link--current');
        return
    };
    
};

export default pagesBuilder;