import axios from 'axios';
import config from '../config/api.config';

class Api {
    constructor(config) {
        this.URL = config.URL;
    }

    async getLocation(endpoint) {
        try {
            const response = await axios.get(`${this.URL}/${endpoint}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getAirlines() {
        try {
            const response = await axios.get(`${this.URL}/airlines`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getPrices(params) {

        try {
            const response = await axios.get(`${this.URL}/prices/cheap`, {
                    params
            });
            const res = await axios.get(`${this.URL}/prices/cheap`, {
                params
            })
                .then(response => {
                    let res = Object.keys(response.data.data);
                });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default new Api(config);