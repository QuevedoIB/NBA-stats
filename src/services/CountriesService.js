import axios from 'axios';

class CountriesService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_COUNTRIES_API_ENDPOINT,
        });
    }

    fetchCountryCodes() {
        return this.service.get(
            `country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json`
        );
    }
}

const service = new CountriesService();

export default service;
