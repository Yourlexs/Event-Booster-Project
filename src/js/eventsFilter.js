import api from './apiService'
async function filter(data) {
    const array = await api.getByCountry('US', 0).then(x => x._embedded.events);
    console.log(array);
    array.map(item => {
        imagesFilter(item.images);
    })
};

function imagesFilter(array) {
    const filtredImages = [];
    const imagesArray = array.forEach(item => {
        if (item.width > 1000) {
            filtredImages.push(item);
        };
    });

    console.log(filtredImages, 'отфильтрованые картинки')
};

filter();