export function onShortDescription({ flags, name }) { 
  return `
  <li>
     <img  src="${flags.svg}" alt="${name.official}" width=50/>
    <h2>${name.official}</h2>
  </li>
  `
}

export function onFullDescriptionCountry({ flags, name, capital, population, languages }) {
  return `
    <div>
        <img class='country-flag' src='${flags.svg}' alt='${name.official}' width=100 />
        <h2 class='country-title'>${name.official}</h2>
     </div>
    <div>
        <p class='country-text'>Capital:</p>
        <span class='country-subtext'>${capital}</span>
    </div>
    <div>
        <p class='country-text'>Population:</p>
        <span class='country-subtext'>${population}</span>
    </div>
    <div>
        <p class='country-text'>Languages:</p>
        <span class='country-subtext'>${Object.values(languages)}</span>
    </div>
    `
}