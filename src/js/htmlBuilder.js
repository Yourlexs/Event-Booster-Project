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
        lastElementOfPages.textContent = totalPages;

        const pageSymbol = document.createElement('span');
        pageSymbol.classList.add('ellipsis');
        pageSymbol.textContent = '...';
        lastElementOfPages.before(pageSymbol);
    }
    
    
};

function pageLinkHandler(event) {

}


// function listBuilderFromPages(data) {
//     // console.log(data);
//     ulElement.innerHTML = '';
//     if (!data.page.totalElements) { return console.log('подходящих ивентов не найдено') };
    
//     const events = data._embedded.events;

//     refs.form.after(ulElement);
//     const liElement = document.createElement('li');
    
//     events.forEach(item => {
//         const liElement = document.createElement('li');
//         liElement.textContent = `здесь будут карточки, а пока имя исполнителя - ${item.name}`;
//         ulElement.append(liElement);
//     });

// };

export default listBuilderFromForm;