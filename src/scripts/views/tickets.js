import currency from './currency';

class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections');
        this.favoriteContainer = document.querySelector('.dropdown-content');
        this.currencySymbol = currency.getCurrencySymbol;
    }

    renderTickets(tickets) {
        this.clearContainer();

        if (!tickets.length) {
            this.showEmpty();
            return;
        }

        let fragment = '';

        tickets.map(ticket => {
            fragment += TicketsUI.ticketTemplate(ticket, this.currencySymbol);
        })

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    renderFavorite(ticket) {
        let fragment = TicketsUI.favoriteTemplate(ticket, this.currencySymbol);
        this.favoriteContainer.insertAdjacentHTML('afterbegin', fragment);
    }

    deleteFavorite(ticket) {
        ticket.remove();
    }

    clearContainer() {
        this.container.innerHTML = '';
    }

    showEmpty() {
        const template = TicketsUI.emptyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template);
    }

    static emptyMsgTemplate() {
        return `
          <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
        `;
    }

    static ticketTemplate(ticket, currency) {
        return `
        <div class="container">
            <div class="col s12 m6">
                <div data-id="${ticket.id}" class="card ticket-card">
                    <div class="ticket-airline d-flex align-items-center">
                        <img src="${ticket.airline_logo}" class="ticket-airline-img" />
                        <span class="ticket-airline-name">${ticket.airline_name}</span>
                    </div>
                    <div class="ticket-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="ticket-city">${ticket.origin_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="ticket-city">${ticket.destination_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${ticket.departure_at}</span>
                        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                    </div>
                    <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto">
                                Add to favorites
                    </a>
                </div>
            </div>
        </div>
        `;
    }

    static favoriteTemplate(ticket, currency) {
        return `
            <div data-id="${ticket.id}" class="favorite-item  d-flex align-items-start">
                <img
                    src="${ticket.airline_logo}"
                    class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                    <div class="favorite-item-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="favorite-item-city">${ticket.origin_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="favorite-item-city">${ticket.destination_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${ticket.departure_at}</span>
                        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                    </div>
                    <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">
                        Delete
                    </a>
                </div>
            </div>
        `;
    }
}

export  default new TicketsUI(currency);