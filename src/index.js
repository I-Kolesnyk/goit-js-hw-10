import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import {
  createCountryListMarkup,
  createCountryInfoMarkup,
  resetMarkup,
} from './js/createMarkup';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector('#search-box'),
  countryListRef: document.querySelector('.country-list'),
  countryInfoDivRef: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));

function handleSearch(event) {
  resetMarkup();

  const searchCountryName = event.target.value.trim();

  if (searchCountryName === '') {
    resetMarkup();
    return;
  }

  fetchCountries(searchCountryName).then(handleSuccess).catch(handleError);
}

function handleSuccess(countries) {
  if (countries.length > 10) {
    Notiflix.Report.info(
      '',
      'Too many matches found. Please enter a more specific name.',
      'OK'
    );
  } else if (countries.length === 1) {
    refs.countryListRef.innerHTML = '';
    createCountryInfoMarkup(countries);
  } else {
    refs.countryInfoDivRef.innerHTML = '';
    createCountryListMarkup(countries);
  }
}

function handleError() {
  Notiflix.Report.failure('', 'Oops, there is no country with that name', 'OK');
  refs.inputRef.value = '';
}
