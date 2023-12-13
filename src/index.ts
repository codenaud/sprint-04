const btnNextJoke = document.querySelector('#next-joke');

//#region | 00 ---> DOC [INFO]

// API: icanhazdadjoke.com URL: https://icanhazdadjoke.com/
// tutorial: //https://www.sohamkamani.com/typescript/rest-http-api-call/

//-----------------------------------------------------------------------
//#endregion

//#region | 01 ---> FUNCIÓN getJokes => FUNCION API => [icanhazdadjoke.com]
// TypeScript definición para la llamada a la API
interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}

// ---> FUNCIÓN getJokes =>
function getJokes(): Promise<JokeResponse> {
  const headers: Headers = new Headers();
  headers.set('Accept', 'application/json');
  const request: RequestInfo = new Request('https://icanhazdadjoke.com/', {
    method: 'GET',
    headers: headers,
  });
  return (
    fetch(request)
      // the JSON body is taken from the response
      .then((response) => response.json())
      .then((response) => {
        return response as JokeResponse;
      })
  );
}
//-----------------------------------------------------------------------
//#endregion

//#region | 02 --->  IMPRIMIR RESULTADO EN #jokes => [icanhazdadjoke.com]

const result = document.querySelector('#jokes');

//  02.1  ---> COMPROBACIÓN
// comprobación fuera de la función initialJoke para asegurarse de que result no sea null antes de entrar en la función
if (!result) {
  throw new Error('No element with class `jokes`');
}

//  02.2  ---> FUNCIÓN CARGAR JOKE INCIAL
// Cargar una broma inicial al cargar la página
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

//  02.3  ---> FUNCIONALIDAD BOTÓN [btnNextJoke]
// Click event listener for the button
if (btnNextJoke instanceof Element) {
  btnNextJoke.addEventListener('click', () => {
    getJokes().then((jokes) => {
      console.log(jokes.joke);
      result.innerHTML = jokes.joke;
    });
  });
}

// Exercici 3 [reportAcudits]
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

//#region   ----->  FUNCION API => [tiempo weather]

// Nivell 2 (weather API)
// API URL: https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13

const apiKey = 'c7a9318023982a05e89bbe262044580d';

function obtenerDatosMeteorologicos(ciudad: string) {
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

function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

function displayweather(ciudad: string) {
  const weatherContainer = document.querySelector('.weather-container');
  ciudad = 'Barcelona'; // Puedes cambiar a la ciudad que desees

  obtenerDatosMeteorologicos(ciudad).then((datos) => {
    console.log('Temperatura:', datos.temperatura);
    console.log('Icono:', datos.icono);

    if (!weatherContainer) {
      throw new Error('No weather container found');
    }

    // Utiliza innerHTML de manera adecuada para concatenar el contenido
    weatherContainer.innerHTML = `<img src="https://openweathermap.org/img/wn/${
      datos.icono
    }.png" alt="icono del tiempo" /><p> | ${datos.temperatura.toFixed(2)}°C</p>`;
  });
}

// Llama a la función displayweather cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
  displayweather('Barcelona');
});

//-----------------------------------------------------------------------
//#endregion

//#region   ----->  FUNCION API => [Chuck Norris] => COMENTADA!
/* ------- FUNCION DE CHUCK NORRIS SEPARADA

// Chuck Norris API Url: https://api.chucknorris.io/jokes/random

function chuckNorrisJokes() {
  console.log('Función llamada'); // Verifica si la función se llama

  const chuckContainer = document.querySelector('.chuck-container');
  const apiUrlOfChuck = 'https://api.chucknorris.io/jokes/random';

  if (chuckContainer) {
    return fetch(apiUrlOfChuck)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Asigna el valor al innerHTML del chuckContainer
        chuckContainer.innerHTML = data.value;
      })
      .catch((error) => {
        console.error('Error al obtener datos de Chuck Norris:', error);
        throw error;
      });
  } else {
    console.error('No se encontró el elemento con la clase `chuck-container`.');
    return Promise.reject('Elemento no encontrado');
  }
}

// Llama a la función chuckNorrisJokes cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
  chuckNorrisJokes();
});

//-----------------------------------------------------------------------
*/
//#endregion

//#region   ----->  FUNCION API => [Random Jokes of Chuck Norris y icanhazdadjoke.com]
function randomJoke(): Promise<void> {
  const chuckNorrisProbability = 0.5;
  const selectedApi = Math.random() < chuckNorrisProbability ? 'chuck' : 'icanhazdad';

  let apiUrl: string;

  if (selectedApi === 'chuck') {
    apiUrl = 'https://api.chucknorris.io/jokes/random';
  } else {
    apiUrl = 'https://icanhazdadjoke.com/';
  }

  const headers: Headers = new Headers();
  headers.set('Accept', 'application/json');

  const request: RequestInfo = new Request(apiUrl, {
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

      // Utiliza res.value en lugar de res.joke para Chuck Norris API
      const jokeToShow = selectedApi === 'chuck' ? res.value : res.joke;

      randomJokeContainer.innerHTML = jokeToShow;
    })
    .catch((error) => {
      console.error('Error al obtener chiste aleatorio:', error);
      throw error;
    });
}
// Llama a la función randomJoke cuando la página se carga
document.addEventListener('DOMContentLoaded', randomJoke);

//-----------------------------------------------------------------------
//#endregion
