import '../style/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketUI from './views/tickets';

document.addEventListener('DOMContentLoaded', () => {
    // UI
    const form = formUI.form;
    const ticketsContainer = ticketUI.container;
    const ticketFavoriteContainer = ticketUI.favoriteContainer;

    // Events
    initApp();
    form.addEventListener('submit', onSubmitHandler);
    ticketsContainer.addEventListener('click', onSubmitFavoriteHandler);
    ticketFavoriteContainer.addEventListener('click', onSubmitFavoriteDelHandler);

    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCities);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        await renderDataForm();
    }

    async function onSubmitFavoriteHandler({target}) {
        if (!target.classList.contains('add-favorite')) {
            return;
        }

        let currentTicket = locations.lastSearch.find(({ id }) => id === target.parentElement.dataset.id);
        await renderFavoriteTicket(currentTicket);
    }

    async function onSubmitFavoriteDelHandler({target}) {
        if (!target.classList.contains('delete-favorite')) {
            return;
        }
        let delTicket = target.closest('[data-id]');
        await renderDelFavoriteTicket(delTicket);
    }

    async function renderDelFavoriteTicket(ticket) {
        ticketUI.deleteFavorite(ticket);
    }

    async function renderFavoriteTicket(currentTicket) {
        ticketUI.renderFavorite(currentTicket);
    }

    async function renderDataForm() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const departDate = formUI.departDateValue;
        const arrivalDate = formUI.arrivalDateValue;
        const currency = currencyUI.getCurrencyValue;

        await locations.fetchTickets( {
            origin,
            departDate,
            destination,
            arrivalDate,
            currency
        });

        ticketUI.renderTickets(locations.lastSearch);
    }
});
