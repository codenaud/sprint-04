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

//-----------------------------------------------------------------------
//#endregion

//#region | 03 --->  PUNTUACIÓN Y GUARDAR DATO EN ARRAY

const scoreButtons = document.querySelectorAll('.score-button');

// 03.1  ---> CREACIÓN ARRAY [reportJokes]
// Crear Array reportjokes
let reportJokes: { joke: string; score: number; date: string }[] = [];
let currentScore: number | null = null; // Variable para almacenar la puntuación actual

function displayJoke(joke: string) {
  const result = document.querySelector('#jokes');
  if (!result) {
    throw new Error('No element with class `jokes`');
  }

  result.innerHTML = joke;
}

// 03.2 ---> FUNCIÓN almacenar 'score' en una varible para poder mostrarlo
function handleScoreButtonClick(score: number) {
  // Actualiza la variable global de puntuación actual
  currentScore = score;
  console.log(`Puntuación actual: ${currentScore}`);
}

// 03.3 ---> Match entre SCORE y JOKE para almacenar en la array REPORTJOKES
if (btnNextJoke instanceof Element) {
  btnNextJoke.addEventListener('click', () => {
    const currentJoke = document.querySelector('#jokes')?.textContent ?? ''; // Asegúrate de que currentJoke sea una cadena
    const currentDate = new Date().toISOString();

    // Si no hay una puntuación asignada, podrías asignar un valor predeterminado, como 0
    const currentScoreToSave = currentScore !== null ? currentScore : 0;

    const jokeEntry = { joke: currentJoke, score: currentScoreToSave, date: currentDate };
    reportJokes.push(jokeEntry);

    // Log the current state of reportJokes
    console.log('Reported Jokes:', reportJokes);

    // Restablece la puntuación actual a null después de agregar la broma al array
    currentScore = null;

    // Muestra la siguiente broma
    getJokes().then((jokes) => {
      displayJoke(jokes.joke);
    });
  });
}
// 03.4 ---> Actualizamos la variable 'currentScore' con la puntuación actual
scoreButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const score = index + 1; // Since index is zero-based
    handleScoreButtonClick(score);
  });
});

//-----------------------------------------------------------------------
//#endregion

//#region | 04 --->  FUNCION API => [tiempo weather]

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

//#region | 05 --->  FUNCION API => [Chuck Norris] => COMENTADA!
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

//#region | Random: 01 --->  FUNCION API => [Random Jokes of Chuck Norris y icanhazdadjoke.com]

// 06.1  ---> FUNCIÓN MOSTRAR 'JOKES' de manera aleatoria [randomJoke]
function randomJoke(): Promise<string> {
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
    .then((response) => response.json())
    .then((response) => {
      const randomJokeContainer = document.querySelector('#randomJoke');
      if (!randomJokeContainer) {
        throw new Error('No element with id `randomJoke` found');
      }

      // Utiliza res.value en lugar de res.joke para Chuck Norris API
      const jokeToShow = selectedApi === 'chuck' ? response.value : response.joke;

      randomJokeContainer.innerHTML = jokeToShow;

      // Retorna el chiste para que pueda ser utilizado en la cadena de promesas
      return jokeToShow;
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

//#region | Random: 02 --->  FUNCIONALIDAD BOTÓN [btnNextJoke] API => [Random Jokes of Chuck Norris y icanhazdadjoke.com]
//  07.3  ---> FUNCIONALIDAD BOTÓN [btnNextJoke]

const btnNextRandomJoke = document.querySelector('#random-next-joke');
const randomJokeContainer = document.querySelector('#randomJoke');

if (!randomJokeContainer) {
  throw new Error('No element with id `randomJoke` found');
}
// Click event listener for the button
if (btnNextRandomJoke instanceof Element) {
  btnNextRandomJoke.addEventListener('click', () => {
    // Utiliza la función randomJoke y espera a que se resuelva
    randomJoke().then((jokeToShow) => {
      console.log(jokeToShow);
      randomJokeContainer.innerHTML = jokeToShow;
    });
  });
}

//-----------------------------------------------------------------------
//#endregion

//#region | Random: 03 --->  PUNTUACIÓN Y GUARDAR DATO EN ARRAY

const scoreRandomButtons = document.querySelectorAll('.random-score-button');

// 03.1  ---> CREACIÓN ARRAY [reportRandomJokes]
// Crear Array reportRandomJokes
let reportRandomJokes: { joke: string; score: number; date: string }[] = [];
let currentRandomScore: number | null = null; // Variable para almacenar la puntuación actual

function displayRandomJoke(joke: string) {
  const result = document.querySelector('#randomJoke');
  if (!result) {
    throw new Error('No element with class `randomJoke`');
  }

  result.innerHTML = joke;
}

// 03.2 ---> FUNCIÓN almacenar 'score' en una varible para poder mostrarlo
function handleRandomScoreButtonClick(score: number) {
  // Actualiza la variable global de puntuación actual
  currentRandomScore = score;
  console.log(`Puntuación actual: ${currentRandomScore}`);
}

// 03.3 ---> Match entre SCORE y JOKE para almacenar en la array 'reportRandomJokes'
if (btnNextRandomJoke instanceof Element) {
  btnNextRandomJoke.addEventListener('click', () => {
    const currentRandomJoke = document.querySelector('#randomJoke')?.textContent ?? ''; // Asegúrate de que currentRandomJoke sea una cadena
    const currentDate = new Date().toISOString();

    // Si no hay una puntuación asignada, podrías asignar un valor predeterminado, como 0
    const currentRandomScoreToSave = currentRandomScore !== null ? currentRandomScore : 0;

    const randomJokeEntry = { joke: currentRandomJoke, score: currentRandomScoreToSave, date: currentDate };
    reportRandomJokes.push(randomJokeEntry);

    // Log the current state of reportRandomJokes
    console.log('Reported Random Jokes:', reportRandomJokes);

    // Restablece la puntuación actual a null después de agregar la broma al array
    currentRandomScore = null;

    // Muestra la siguiente broma
    randomJoke().then((jokeToShow) => {
      console.log(jokeToShow);
      randomJokeContainer.innerHTML = jokeToShow;
    });
  });
}

// 03.4 ---> Actualizamos la variable 'currentRandomScore' con la puntuación actual
scoreRandomButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const score = index + 1; // Since index is zero-based
    handleRandomScoreButtonClick(score);
  });
});

//-----------------------------------------------------------------------
//#endregion
