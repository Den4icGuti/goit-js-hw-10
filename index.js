import './css/styles.css';
import {httpInquiry } from './srvice/fetchCountries'
import { shortDescCountry } from './servise-info/shortDescCountry';
import { onFullInfoCountry } from './servise-info/fullDesc'
import debounce from 'lodash.debounce'
// import { Notify } from 'notiflix';

 import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;



const refs = { 
  inputSearch:document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfoShort:document.querySelector('.country-info')
}

 const { inputSearch, countryList, countryInfoShort } = refs;

inputSearch.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(e) {
  e.preventDefault()

  let valueSearchCountry = inputSearch.value;

  if(valueSearchCountry.trim() === '') { 
    
    countryList.innerHTML = '';
    countryInfoShort.innerHTML = '';
    return;
  };
   
  httpInquiry(valueSearchCountry.trim())
    .then(countries => { 
      if (countries.length > 10) { 
        Notify.info("Too many matches found. Please enter a more specific name.");
        countryList.innerHTML = '';
        countryInfoShort.innerHTML = ''
        return;
      }

    if (countries.length > 2 && countries.length < 10) { 
      const marcup = countries.map(country => shortDescCountry(country));
      countryInfoShort.innerHTML = '';
      countryList.innerHTML = marcup.join(' ');;
    }
      
      if (countries.length === 1) { 
        const fullInfo = countries.map(country => onFullInfoCountry(country));
        countryInfoShort.innerHTML = fullInfo.join();
        countryList.innerHTML = '';
      }
      
    })
    .catch(error => { 
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfoShort.innerHTML = '';
      return error;
    })
}





