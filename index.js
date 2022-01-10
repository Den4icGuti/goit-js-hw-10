import './css/styles.css';
import { onShortВescription, onFullDescriptionCountry } from './servise-info/country-cards';
import { fetchCountries, fethcCountry } from './servise-info/fetchCountries'
import lodashTrottle from 'lodash.debounce'
import { Notify } from 'notiflix';
 
const DEBOUNCE_DELAY = 300;


const refs = { 
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo:document.querySelector('.country-info')
}

const { input, countryList, countryInfo } = refs;

input.addEventListener('input',lodashTrottle(onSearch,300))

function onSearch(e) { 
  e.preventDefault();
 

  let search = input.value;
  
  if (search.trim() === "") { 
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    console.log('qwdqw')
    return;
  }

  fetchCountries(search.trim())
    .then(countries => { 
      if (countries > 10) { 
        Notify.failure('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
      }
      
    })
  // if(countries.length >= 2  && countries.length <= 10) {
  //   const listMarkup = countries.map(country => showCountryList(country))
  //   countryList.innerHTML = listMarkup.join('');
  //   countryInfo.innerHTML = "";
  //   }
  // if (countries > 2 && countries < 10) { 
  //   const listCountry = countries.map(country => onShortВescription(country));
  //   countryList.innerHTML = listCountry;
  // }
}



