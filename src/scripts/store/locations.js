import apiServices from "../services/apiServices";
import { formatDate } from "../helpers/date";

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = {};
        this.cities = {};
        this.shortCities = {};
        this.airlines = {};
        this.lastSearch = {};
        this.formatDate = helpers.formatDate;
    }

    async init() {
        const responses = await Promise.all([
            this.api.getLocation('countries'),
            this.api.getLocation('cities'),
            this.api.getAirlines()
        ]);

        const [countries, cities, airlines] = responses;
        this.countries = this.serializeCounties(countries);
        this.cities = this.serializeCities(cities);
        this.shortCities = this.createShortCities(this.cities);
        this.airlines = this.serializeAirlines(airlines);
    }

    serializeCounties(countries = {}) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities = {}) {
        return cities.reduce((acc, city) => {
            const country_name = this.countries[city.country_code].name;
            city.name = city.name || city.name_translations.en;
            const full_name = `${city.name},${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            };
            return acc;
        }, {});
    }

    createShortCities(cities= {}) {
        return Object.entries(cities).reduce((acc, [_, city]) => {
            acc[city.full_name] = null;
            return acc;
        }, {});
    }

    serializeAirlines(airlines = {}) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        }, {});
    }

    async fetchTickets(params) {
        const response = await this.api.getPrices(params);
        this.lastSearch = this.serializeTickets(response.data);
    }

    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                id: this.createUUID(),
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(
                    ticket.departure_at,
                    'dd MMM yyyy hh:mm',
                ),
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            };
        });
    }

    getCityCodeByKey(key) {
        const city = Object.values(this.cities).find(
            city => city.full_name === key,
        );
        return city.code;
    }

    getCityNameByCode(code) {
        return this.cities[code].name;
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : null;
    }

    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    createUUID() {
        let dt = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}

export default new Locations(apiServices, { formatDate });