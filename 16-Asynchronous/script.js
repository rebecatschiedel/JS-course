'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     //console.log(this.responseText); // same as console.log(request.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src='${data.flags.svg}' />
//     <div class="country__data">
//         <h3 class="country__name">${data.name.official}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${Number(
//           data.population / 1000000
//         ).toFixed(1)}</p>
//         <p class="country__row"><span>🗣️</span>${
//           Object.values(data.languages)[0]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies)[0].name
//         }</p>
//     </div>
//   </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('canada');
// getCountryData('turkey');

////////////////
//Callback hell
/*
const renderCountry = function (data, className = " = '") {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src='${data.flags.svg}' />
      <div class="country__data">
          <h3 class="country__name">${data.name.official}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${Number(
            data.population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText); // same as console.log(request.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country
    renderCountry(data);
    //get neighbour country
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    //AJAX call country 1
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      //console.log(this.responseText); // same as console.log(request.responseText);
      const [data] = JSON.parse(this.responseText);

      //Render country
      renderCountry(data, 'neighbour');
    });
  });
};

getCountryAndNeighbour('canada');
getCountryAndNeighbour('turkey');
*/

/////////////////////////
//Promises and fetch API

const request = fetch('https://restcountries.com/v3.1/name/brasil');
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const renderCountry = function (data, className = " = '") {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src='${data.flags.svg}' />
        <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${Number(
              data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
        </div>
      </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(errMsg, response.status);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  //   fetch(`https://restcountries.com/v3.1/name/${country}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Country not found ${response.status}`);
  //       }
  //       return response.json();
  //       //err => console.log(err)
  //     })
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not Found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      if (!neighbour) throw new Error('No neighbour found');

      //Neighbour country
      // return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not Found'
      );
    })
    //.then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err} error`);
      renderError(`Something went wrong ${err}`);
    })
    .finally(() => {
      //use: hide spinners, fade in the container...
      countriesContainer.style.opacity = 1;
    });
};

//getCountryData('brasil');
getCountryData('Australia');

btn.addEventListener('click', () => getCountryData('Italy'));

//getCountryData('kdhjslakjakfhfhk');
