class CurrencyUI {
    constructor() {
        this.currency = document.getElementById('currency');
        this.dictionary = {
            USD: '$',
            EUR: '€'
        }
    }

    get getCurrencyValue() {
        return this.currency.value;
    }

    get getCurrencySymbol() {
        return this.dictionary[this.getCurrencyValue];
    }
}

export default new CurrencyUI();