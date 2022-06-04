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
//console.log(request);

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
//getCountryData('Australia');

btn.addEventListener('click', () => getCountryData('Italy'));

//getCountryData('kdhjslakjakfhfhk');

//Code Challenge
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `You have made too many requests in the past 3 seconds ${response.status}`
        );
      }

      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Country not found', response.status);
      }
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.log(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//whereAmI(41.3189957, 2.0746469);
//whereAmI(-33.933, 18.474);

/*
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

//executor funciton of promise
const lotteryPromise = new Promise(function (resolve, reject) {
  //contain the asynchronous behaviour

  console.log('Lottery draw is happening!!');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!!'); //the value passed to the resolve function will be the fullfilled valued of the promise that can later be consumed by the then method
    } else {
      reject(new Error('You lost...')); //the value passed to the reject function will be the valued that will be used in the catch method
    }
  }, 2000);
});

lotteryPromise
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

Promise.resolve('Resolved value').then(res => console.log(res));
Promise.reject(new Error('Rejected value')).catch(err => console.log(err));

// Promisifying Geolocation API
/*
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.log(new Error(err))
);

console.log('Getting position');
*/

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(new Error(err))
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition()
  .then(res => console.log(res))
  .catch(err => console.log(err));

////////////////
// Challenge 2
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

/*
let currentImage;
createImage('/img/img-1.jpg')
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('/img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.log(err));

*/

//////////////////////
// Async Await

const whereAmIAsync = async function () {
  try {
    //Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log(lat, lng);

    //Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting the coords');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;
  } catch (err) {
    console.log('error here', err.message);
  }
};

whereAmIAsync();

//////////////////////
//Running promises in parallel
//Promise.all: if any of the promises are rejected, it returns

const getJSONAsync = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(errMsg, response.status);
    }
    return response.json();
  });
};

const get3Countries = async function (country1, country2, country3) {
  try {
    /*
    //run one after another, even though they are not depending on each other
    const [data1] = await getJSONAsync(
      `https://restcountries.com/v3.1/name/${country1}`
    );
    const [data2] = await getJSONAsync(
      `https://restcountries.com/v3.1/name/${country2}`
    );
    const [data3] = await getJSONAsync(
      `https://restcountries.com/v3.1/name/${country3}`
    );
    
        console.log([...data1.capital, ...data2.capital, ...data3.capital]);
    */

    const data = await Promise.all([
      getJSONAsync(`https://restcountries.com/v3.1/name/${country1}`),
      getJSONAsync(`https://restcountries.com/v3.1/name/${country2}`),
      getJSONAsync(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err, 'getcountries error');
  }
};

get3Countries('turkey', 'canada', 'brasil');

//Promise combinators: race, allSettled and any
//Promise.race short circuit whenever one of the promises get settled (resolved or rejected)
(async function () {
  const res = await Promise.race([
    getJSONAsync(`https://restcountries.com/v3.1/name/italy`),
    getJSONAsync(`https://restcountries.com/v3.1/name/japan`),
    getJSONAsync(`https://restcountries.com/v3.1/name/china`),
  ]);
  //winning promise
  console.log(res);
})();

//automatically reject after a certain amount of time
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, s * 1000);
  });
};

Promise.race([
  getJSONAsync(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

//Promise.allSettled: no matter if the promise got rejected, it will return all settled promises
Promise.allSettled([
  Promise.resolve('success'),
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('success'),
  Promise.reject('Error'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('success'),
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => {
    console.log('promise all error');
  });

//Promise.any [ES2021]: returns the first fullfilled promise, no matter if is was rejected, unless all of them are rejected

Promise.any([
  Promise.resolve('success'),
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => {
    console.log('promise any error');
  });

Promise.any([Promise.reject('Error'), Promise.reject('Error')])
  .then(res => console.log(res))
  .catch(err => {
    console.log('promise any error');
  });

/*
//Challenge 3
const createImage2 = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', err => {
      reject(new Error('Challenge 3 error', err));
    });
  });
};

const loadNPause = async function () {
  try {
  } catch (err) {
    console.log('loand N Pause error');
  }
};

const loadAll = async function (imgArr) {
  const imgs = [];
  imgArr.map(img => {
    const data = Promise.all([]);
  });
  console.log(imgs);
};

//['/img/img-1.jpg','/img/img-2.jpg','/img/img-3.jpg']
createImage2('/img/img-1.jpg');

loadAll(['/img/img-1.jpg', '/img/img-2.jpg', '/img/img-3.jpg']);
*/

// Challenge 3

const createImage3 = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Image not found 3'));
    });
  });
};

const wait3 = function (seconds) {
  return new Promise(function (resolve, _) {
    setTimeout(resolve, seconds * 1000);
  });
};

let currImg;

const loadNPause3 = async function () {
  try {
    const res = await createImage3('./img/img-1.jpg');
    await wait3(2);
    res.style.display = 'none';
    const res2 = await createImage3('./img/img-2.jpg');
    await wait3(2);
    res2.style.display = 'none';
  } catch (err) {
    throw new Error('ooops');
  }
};
//loadNPause3();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(img => createImage(img));

    const res = await Promise.all(imgs);
    res.forEach(img => img.classList.add('parallel'));
    console.log('promises all', res);
  } catch (err) {
    throw new Error('ooops 3');
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
