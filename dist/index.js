"use strict";
console.log('hello');
const btn = document.querySelector('button');
console.log(btn);
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
const result = document.querySelector('.jokes');
if (!result) {
    throw new Error('No element with class `jokes`');
}
function initialJoke() {
    getJokes().then((jokes) => {
        if (result) {
            result.innerHTML = jokes.joke;
        }
    });
}
document.addEventListener('DOMContentLoaded', initialJoke);
if (btn instanceof Element) {
    btn.addEventListener('click', () => {
        getJokes().then((jokes) => {
            console.log(jokes.joke);
            result.innerHTML = jokes.joke;
        });
    });
}
//# sourceMappingURL=index.js.map