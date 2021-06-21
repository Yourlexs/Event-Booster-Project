import eventApi from './apiService';
import * as htmlConstructor from './htmlBuilder';

const refs = {
    form: document.querySelector('#js-form'),
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
        eventApi.getByCountry(country).then(htmlConstructor.listBuilderFromForm).catch(console.log);
        return
    }

    if (findWord && country.length === 2) {
        console.log('поиск по стране и слову (нпут)')
        eventApi.getByKeyAndCountry(findWord, country).then(htmlConstructor.listBuilderFromForm).catch(console.log);
        return
    };

    console.log('поиск по слову (инпут)')
    eventApi.getByKey(findWord).then(htmlConstructor.listBuilderFromForm).catch(console.log);

};

function selectHandler(event) {
    const country = event.target.value;
    const findWord = refs.input.value.trim();

    if (country.length > 2) {
        event.target.blur();
        return
    };

    if (findWord) {
        console.log('поиск по стране и слову (селектор)')
        eventApi.getByKeyAndCountry(findWord, country).then(htmlConstructor.listBuilderFromForm).catch(console.log);
        event.target.blur();
        return
    };

    console.log('поиск по стране (селектор)')
    eventApi.getByCountry(country).then(htmlConstructor.listBuilderFromForm).catch(console.log);
    event.target.blur();
};
    



callRandomEvents();
function callRandomEvents() {
    const randomNumber = Math.floor(Math.random() * 49);
    eventApi.getRandom(randomNumber).then(htmlConstructor.listBuilderRandom).catch(console.log);
};


