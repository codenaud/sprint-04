"use strict";
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
if (btnNextJoke instanceof Element) {
    btnNextJoke.addEventListener('click', () => {
        var _a, _b;
        const currentJoke = (_b = (_a = document.querySelector('#jokes')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
        const currentDate = new Date().toISOString();
        const currentScoreToSave = currentScore !== null ? currentScore : 0;
        const jokeEntry = { joke: currentJoke, score: currentScoreToSave, date: currentDate };
        reportJokes.push(jokeEntry);
        console.log('Reported Jokes:', reportJokes);
        currentScore = null;
        getJokes().then((jokes) => {
            displayJoke(jokes.joke);
        });
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
        .then((response) => response.json())
        .then((response) => {
        const randomJokeContainer = document.querySelector('#randomJoke');
        if (!randomJokeContainer) {
            throw new Error('No element with id `randomJoke` found');
        }
        const jokeToShow = selectedApi === 'chuck' ? response.value : response.joke;
        randomJokeContainer.innerHTML = jokeToShow;
        return jokeToShow;
    })
        .catch((error) => {
        console.error('Error al obtener chiste aleatorio:', error);
        throw error;
    });
}
document.addEventListener('DOMContentLoaded', randomJoke);
const btnNextRandomJoke = document.querySelector('#random-next-joke');
const randomJokeContainer = document.querySelector('#randomJoke');
if (!randomJokeContainer) {
    throw new Error('No element with id `randomJoke` found');
}
if (btnNextRandomJoke instanceof Element) {
    btnNextRandomJoke.addEventListener('click', () => {
        randomJoke().then((jokeToShow) => {
            console.log(jokeToShow);
            randomJokeContainer.innerHTML = jokeToShow;
        });
    });
}
const scoreRandomButtons = document.querySelectorAll('.random-score-button');
let reportRandomJokes = [];
let currentRandomScore = null;
function displayRandomJoke(joke) {
    const result = document.querySelector('#randomJoke');
    if (!result) {
        throw new Error('No element with class `randomJoke`');
    }
    result.innerHTML = joke;
}
function handleRandomScoreButtonClick(score) {
    currentRandomScore = score;
    console.log(`Puntuación actual: ${currentRandomScore}`);
}
if (btnNextRandomJoke instanceof Element) {
    btnNextRandomJoke.addEventListener('click', () => {
        var _a, _b;
        const currentRandomJoke = (_b = (_a = document.querySelector('#randomJoke')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
        const currentDate = new Date().toISOString();
        const currentRandomScoreToSave = currentRandomScore !== null ? currentRandomScore : 0;
        const randomJokeEntry = { joke: currentRandomJoke, score: currentRandomScoreToSave, date: currentDate };
        reportRandomJokes.push(randomJokeEntry);
        console.log('Reported Random Jokes:', reportRandomJokes);
        currentRandomScore = null;
        randomJoke().then((jokeToShow) => {
            console.log(jokeToShow);
            randomJokeContainer.innerHTML = jokeToShow;
        });
    });
}
scoreRandomButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const score = index + 1;
        handleRandomScoreButtonClick(score);
    });
});
//# sourceMappingURL=index.js.map