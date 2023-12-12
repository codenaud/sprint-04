// tutorial: //https://www.sohamkamani.com/typescript/rest-http-api-call/

console.log('hello');

const btnNextJoke = document.querySelector('#next-joke');

// icanhazdadjoke.com API URL: https://icanhazdadjoke.com/

interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}

function getJokes(): Promise<JokeResponse> {
  // We can use the `Headers` constructor to create headers
  // and assign it as the type of the `headers` variable
  const headers: Headers = new Headers();
  // Add a few headers
  headers.set('Accept', 'application/json');

  // Create the request object, which will be a RequestInfo type.
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request('https://icanhazdadjoke.com/', {
    method: 'GET',
    headers: headers,
  });

  // For our example, the data is stored on a static `users.json` file
  return (
    fetch(request)
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        // The response has an `any` type, so we need to cast
        // it to the `User` type, and return it from the promise
        return res as JokeResponse;
      })
  );
}

const result = document.querySelector('#jokes');
if (!result) {
  throw new Error('No element with class `jokes`');
}
// Función para cargar una broma inicial
function initialJoke() {
  getJokes().then((jokes) => {
    if (result) {
      console.log(jokes.joke);
      result.innerHTML = jokes.joke;
    }
  });
}

// Llama a loadInitialJoke cuando la página se carga
document.addEventListener('DOMContentLoaded', initialJoke);

// Click event listener for the button
if (btnNextJoke instanceof Element) {
  btnNextJoke.addEventListener('click', () => {
    getJokes().then((jokes) => {
      console.log(jokes.joke);
      result.innerHTML = jokes.joke;
    });
  });
}

// Exercici 2 [reportAcudits]
const scoreButtons = document.querySelectorAll('.score-button');
let reportJokes: { joke: string; score: number; date: string }[] = [];
let currentScore: number | null = null; // Variable para almacenar la puntuación actual

function displayJoke(joke: string) {
  const result = document.querySelector('#jokes');
  if (!result) {
    throw new Error('No element with class `jokes`');
  }

  result.innerHTML = joke;
}

function handleScoreButtonClick(score: number) {
  // Actualiza la variable global de puntuación actual
  currentScore = score;
  console.log(`Puntuación actual: ${currentScore}`);
}

document.addEventListener('DOMContentLoaded', initialJoke);

if (btnNextJoke instanceof Element) {
  btnNextJoke.addEventListener('click', () => {
    const currentJoke = document.querySelector('#jokes')?.textContent;
    if (currentJoke && currentScore !== null) {
      const currentDate = new Date().toISOString();
      const jokeEntry = { joke: currentJoke, score: currentScore, date: currentDate };
      reportJokes.push(jokeEntry);

      // Log the current state of reportJokes
      console.log('Reported Jokes:', reportJokes);

      // Restablece la puntuación actual a null después de agregar la broma al array
      currentScore = null;

      // Muestra la siguiente broma
      getJokes().then((jokes) => {
        displayJoke(jokes.joke);
      });
    }
  });
}

scoreButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const score = index + 1; // Since index is zero-based
    handleScoreButtonClick(score);
  });
});
