const refs = {
  countryListRef: document.querySelector('.country-list'),
  countryInfoDivRef: document.querySelector('.country-info'),
};

export function createCountryListMarkup(countries) {
  const markup = countries.reduce((acc, { flags, name }) => {
    return (
      acc +
      `<li>
        <img src="${flags.svg}" alt="${name.official}" width="50">
        <p class='country-name'>${name.official}</p>`
    );
  }, '');
  refs.countryListRef.insertAdjacentHTML('beforeend', markup);
}

export function createCountryInfoMarkup(countries) {
  const markup = countries.reduce(
    (acc, { flags, name, capital, population, languages }) => {
      return (
        acc +
        `<div class='wrapper'>
        <img src="${flags.svg}" alt="${name.official}" width="50" />
        <p class='country-name'>${name.official}</p>
      </div>
      <p><span class='country-option'>Capital: </span>${capital}</p>
      <p><span class='country-option'>Population: </span>${population}</p>
      <p><span class='country-option'>Languages: </span>${Object.values(
        languages
      ).join(', ')}</p>`
      );
    },
    ''
  );
  refs.countryInfoDivRef.insertAdjacentHTML('beforeend', markup);
}

export function resetMarkup() {
  refs.countryListRef.innerHTML = '';
  refs.countryInfoDivRef.innerHTML = '';
}
