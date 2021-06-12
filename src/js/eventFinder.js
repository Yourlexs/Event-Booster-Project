import eventApi from './apiService'

const refs = {
    form: document.querySelector('form'),
    input: document.querySelector('#js-input'),
    select: document.querySelector('#js-select')
};


refs.form.addEventListener('submit', formHandler);
function formHandler(event) {
    event.preventDefault();
};


refs.input.addEventListener('change', inputHandler);
refs.select.addEventListener('change', selectHandler);

function inputHandler(event) {
    const findWord = event.target.value.trim();
    const country = refs.select.value;

    if (!findWord && country.length > 2) { return alert('введите текст или выберите страну') };

    if (!findWord && country.length === 2) {
        console.log('поиск по стране (инпут)')
        eventApi.getByCountry(country).then(console.log);
        return
    }

    if (findWord && country.length === 2) {
        console.log('поиск по стране и слову (нпут)')
        eventApi.getByKeyAndCountry(findWord, country).then(console.log);
        return
    };

    console.log('поиск по слову (инпут)')
    eventApi.getByKey(findWord).then(console.log);

};

function selectHandler(event) {
    const country = event.target.value;
    const findWord = refs.input.value;

    if (country.length > 2) { return };

    if (findWord) {
        console.log('поиск по стране и слову (селектор)')
        eventApi.getByKeyAndCountry(findWord, country).then(console.log);
        return
    };

    console.log('поиск по стране (селектор)')
    eventApi.getByCountry(country).then(console.log);
};

