const API_KEY = 'ANBH06wQWJqNnsrzLRgMmHkDjkygmPyZ';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';


const eventsApi = {

    async getByKey(keyWord, page = 0) {
        try {
            const searchRequest = `${BASE_URL}events.json?&keyword=${keyWord}&apikey=${API_KEY}&size=12&page=${page}`;
            const responce = await fetch(searchRequest);
            const result = await responce.json();
            return result;
        } catch (err) { return err };
    },
    
    async getByCountry(countryCode, page = 0) {
        try {
            const searchRequest = `${BASE_URL}events.json?&countryCode=${countryCode}&apikey=${API_KEY}&size=12&page=${page}`;
            const responce = await fetch(searchRequest);
            const result = await responce.json();
            return result;
        } catch (err) { return err };
    },

    async getByKeyAndCountry(keyWord, countryCode, page = 0) {
        try {
            const searchRequest = `${BASE_URL}events.json?&keyword=${keyWord}&countryCode=${countryCode}&apikey=${API_KEY}&size=12&page=${page}`;
            const responce = await fetch(searchRequest);
            const result = await responce.json();
            return result;
        } catch (err) { return err };

    }
};



export default eventsApi ;

