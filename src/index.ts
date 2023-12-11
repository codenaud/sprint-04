// tutorial: //https://www.sohamkamani.com/typescript/rest-http-api-call/

console.log('hello');

const btn = document.querySelector('button');

console.log(btn);

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

const result = document.querySelector('.jokes');
if (!result) {
  throw new Error('No element with class `jokes`');
}
// Función para cargar una broma inicial
function initialJoke() {
  getJokes().then((jokes) => {
    if (result) {
      result.innerHTML = jokes.joke;
    }
  });
}

// Llama a loadInitialJoke cuando la página se carga
document.addEventListener('DOMContentLoaded', initialJoke);

// Click event listener for the button
if (btn instanceof Element) {
  btn.addEventListener('click', () => {
    getJokes().then((jokes) => {
      console.log(jokes.joke);
      result.innerHTML = jokes.joke;
    });
  });
}
