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
        .then((res) => res.json())
        .then((res) => {
        return res;
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
//# sourceMappingURL=index.js.map