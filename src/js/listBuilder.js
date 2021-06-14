const refs = {
    form: document.querySelector('form'),
    input: document.querySelector('#js-input'),
    select: document.querySelector('#js-select')
};

const ulElement = document.createElement('ul');

    
    
function listBuilder(data) {
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

export default listBuilder;