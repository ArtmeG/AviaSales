import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from '../plugins/materialize';

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this.locationForm = document.forms['locationControls'];
    this.origin = document.getElementById('autocomplete-origin');
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destination = document.getElementById('autocomplete-destination');
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departure = datePickerInstance(
      document.getElementById('datepicker-departure'),
    );
    this.arrival = datePickerInstance(
      document.getElementById('datepicker-arrival'),
    );

  }

  get form() {
    return this.locationForm;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departure.toString();
  }

  get arrivalDateValue() {
    return this.arrival.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

export default new FormUI(getAutocompleteInstance, getDatePickerInstance);
