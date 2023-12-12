"use strict";
console.log('hello');
const btnNextJoke = document.querySelector('#next-joke');
function getJokes() {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    const request = new Request('https://icanhazdadjoke.com/', {
        method: 'GET',
        headers: headers,
    });
    return (fetch(request)
        .then((response) => response.json())
        .then((response) => {
        return response;
    }));
}
const result = document.querySelector('#jokes');
if (!result) {
    throw new Error('No element with class `jokes`');
}
function initialJoke() {
    getJokes().then((jokes) => {
        if (result) {
            console.log(jokes.joke);
            result.innerHTML = jokes.joke;
        }
    });
}
document.addEventListener('DOMContentLoaded', initialJoke);
if (btnNextJoke instanceof Element) {
    btnNextJoke.addEventListener('click', () => {
        getJokes().then((jokes) => {
            console.log(jokes.joke);
            result.innerHTML = jokes.joke;
        });
    });
}
const scoreButtons = document.querySelectorAll('.score-button');
let reportJokes = [];
let currentScore = null;
function displayJoke(joke) {
    const result = document.querySelector('#jokes');
    if (!result) {
        throw new Error('No element with class `jokes`');
    }
    result.innerHTML = joke;
}
function handleScoreButtonClick(score) {
    currentScore = score;
    console.log(`Puntuación actual: ${currentScore}`);
}
document.addEventListener('DOMContentLoaded', initialJoke);
if (btnNextJoke instanceof Element) {
    btnNextJoke.addEventListener('click', () => {
        var _a;
        const currentJoke = (_a = document.querySelector('#jokes')) === null || _a === void 0 ? void 0 : _a.textContent;
        if (currentJoke && currentScore !== null) {
            const currentDate = new Date().toISOString();
            const jokeEntry = { joke: currentJoke, score: currentScore, date: currentDate };
            reportJokes.push(jokeEntry);
            console.log('Reported Jokes:', reportJokes);
            currentScore = null;
            getJokes().then((jokes) => {
                displayJoke(jokes.joke);
            });
        }
    });
}
scoreButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const score = index + 1;
        handleScoreButtonClick(score);
    });
});
const apiKey = 'c7a9318023982a05e89bbe262044580d';
function obtenerDatosMeteorologicos(ciudad) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;
    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
        const temperaturaCelsius = kelvinToCelsius(data.main.temp);
        return {
            temperatura: temperaturaCelsius,
            icono: data.weather[0].icon,
        };
    })
        .catch((error) => {
        console.error('Error al obtener datos meteorológicos:', error);
        throw error;
    });
}
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
function displayweather(ciudad) {
    const weatherContainer = document.querySelector('.weather-container');
    ciudad = 'Barcelona';
    obtenerDatosMeteorologicos(ciudad).then((datos) => {
        console.log('Temperatura:', datos.temperatura);
        console.log('Icono:', datos.icono);
        if (!weatherContainer) {
            throw new Error('No weather container found');
        }
        weatherContainer.innerHTML = `<img src="https://openweathermap.org/img/wn/${datos.icono}.png" alt="icono del tiempo" /><p> | ${datos.temperatura.toFixed(2)}°C</p>`;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    displayweather('Barcelona');
});
function randomJoke() {
    const chuckNorrisProbability = 0.5;
    const selectedApi = Math.random() < chuckNorrisProbability ? 'chuck' : 'icanhazdad';
    let apiUrl;
    if (selectedApi === 'chuck') {
        apiUrl = 'https://api.chucknorris.io/jokes/random';
    }
    else {
        apiUrl = 'https://icanhazdadjoke.com/';
    }
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    const request = new Request(apiUrl, {
        method: 'GET',
        headers: headers,
    });
    return fetch(request)
        .then((res) => res.json())
        .then((res) => {
        const randomJokeContainer = document.querySelector('#randomJoke');
        if (!randomJokeContainer) {
            throw new Error('No element with id `randomJoke` found');
        }
        const jokeToShow = selectedApi === 'chuck' ? res.value : res.joke;
        randomJokeContainer.innerHTML = jokeToShow;
    })
        .catch((error) => {
        console.error('Error al obtener chiste aleatorio:', error);
        throw error;
    });
}
document.addEventListener('DOMContentLoaded', randomJoke);
//# sourceMappingURL=index.js.map