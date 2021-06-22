function filter(data) {
    // data = await api.getByCountry('AU', 0).then(item => item); тестовая переменная, работает только в асинхронной функции;

    // если вернулся пустой массив, то функция вернет его назад в htmlBuilder без изменений
    if (!data.page.totalElements) { return data };

    // начало работы логики
    let newImages;
    let newDate;
    console.log(data, 'data')
    const responce = data;
    const events = responce._embedded.events;
    events.map(item => {
        newImages = imagesFilter(item.images);
        item.images = newImages;

        // в блоке иф проверка на наличие времени проведения ивента. Если ее нет, то ничего не меняется
        if(!item.dates.start.localTime) { return }
        newDate = dateNormalizer(item.dates.start.localTime);
        item.dates.start.localTime = newDate;
    });

    // Обновление информации в копии объекта с ивентами
    responce._embedded.events = events;
    return responce;
};

function imagesFilter(array) {
    const filtredImages = [];
    array.forEach(item => {
        if (item.ratio === '3_2' || item.width > 2000) { filtredImages.push(item) };
    });
    
    return filtredImages.sort((a, b) => { return a.width - b.width });
};

function dateNormalizer(date) {
    const splitDate = date.split(':');
    splitDate.splice(2, 1);
    const result = splitDate.join(':');
    return result 
};

// filter();

export default filter;