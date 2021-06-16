import apiSearch from './apiService';

const refs = {
    form: document.querySelector('#js-form'),
    input: document.querySelector('#js-input'),
    select: document.querySelector('#js-select'),
    pagination: document.querySelector('#js-pagination')
};

const ulElement = document.createElement('ul');
    
function listBuilderFromForm(data) {
    // console.log(data);
    ulElement.innerHTML = '';
    refs.pagination.innerHTML = '';
    if (!data.page.totalElements) { return console.log('подходящих ивентов не найдено') };
    
    const events = data._embedded.events;

    refs.form.after(ulElement);
    const liElement = document.createElement('li');
    
    events.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = `здесь будут карточки, а пока имя исполнителя - ${item.name}`;
        ulElement.append(liElement);
    });

    pagesBuilder(data);
};

function pagesBuilder(data) {
    // const eventsArray = data._embedded.events;
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
    }
};

function listBuilderFromPages(data) {
    // console.log(data);
    ulElement.innerHTML = '';
    if (!data.page.totalElements) { return console.log('подходящих ивентов не найдено') };
    
    const events = data._embedded.events;

    refs.form.after(ulElement);
    const liElement = document.createElement('li');
    
    events.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = `здесь будут карточки, а пока имя исполнителя - ${item.name}`;
        ulElement.append(liElement);
    });
};

function pageLinkHandler(event) {
    const findword = refs.input.value.trim();
    const country = refs.select.value;
    const page = event.target.textContent - 1;

    if (findword && country.length > 2) {

        apiSearch.getByKey(findword, page).then(listBuilderFromPages);
    };

    if (!findword && country.length === 2) {
        apiSearch.getByCountry(country, page).then(listBuilderFromPages);
    };

    if (findword && country.length === 2) {
        apiSearch.getByKeyAndCountry(findword, country, page).then(listBuilderFromPages);
    };

        pageNumberSwitcher(event);
};



function pageNumberSwitcher(event) {
    let allPages = document.querySelectorAll('a.link');
    const clickedPageNumer = event.target.textContent;
    const firsPageNumber = allPages[0].textContent;
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

export default listBuilderFromForm;