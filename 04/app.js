// W tym zadaniu musisz pobrać aktualną pogodę dla podanych w polu formularza współrzędnych.

// Wykorzystaj do tego API o nazwie weatherbit.io, które umożliwia wykonanie 500 odpytań dziennie w darmowym planie.

// Aby móc skorzystać z tego API, musisz zarejestrować się i uzyskać tzw. key.

// Adres, pod którym dostępne są dane o pogodzie to: https://api.weatherbit.io/v2.0/current?key=[key]&lat=[latitude]&lon=[longitude], gdzie:

// [key] – to Twój identyfikator,
// [latitude] – szerokość geograficzna,
// [longitude] – długość geograficzna.
// Przykładowe współrzędne to:

// Warszawa: 52.232222, 21.008333,
// Kraków: 50.061389, 19.938333,
// Wrocław: 51.11, 17.022222.
// Zapoznaj się z dokumentacją, która prezentuje strukturę odpowiedzi. Znajdziesz tam również informacje o tym, jak pobierać dane w języku polskim.

// Uwaga! Podczas tworzenia rozwiązań wykorzystujących API, możesz się spotkać z problemem dotyczącym CORS. Jeśli on wystąpi, to nie będziesz mógł pobrać danych z API. Wszystko zależy od konfiguracji przeglądarki i serwera. Problem zidentyfikujesz przez odpowiedni komunikat w konsoli. Możesz próbować wyłączyć to zabezpieczenie w przeglądarce przez odpowiedni plugin lub wykorzystać pośrednika. Problem z CORS może być spowodowany również tym, że uruchamiasz plik przez protokół file://. Wówczas wystarczy, że uruchomisz plik .html przy pomocy rozszerzenia Live Server do VSC.

// document.addEventListener('DOMContentLoaded', init);

// function init() {
//     console.log('DOM');
//     // handleSubmit();
//     // getWeather();
//     // getInfo();
// }

const submitEl = document.querySelector('.form__submit');
submitEl.addEventListener('click', getWeather);
console.log(submitEl)

function getWeather(e) {
    e.preventDefault();
    const latEl = document.querySelector('.form__field--lat');
    const lngEl = document.querySelector('.form__field--lng');

    keyEl = 'deeaed3434f040bab058e759479f90f5';
    langEl = 'pl'
    latVal = latEl.value.trim();
    lngVal = lngEl.value.trim();

    if (latVal === '' || lngVal === '') {
        alert('Podaj współrzędne – pola nie mogą być puste!');
        return;
    }

    latVal = Number(latVal);
    lngVal = Number(lngVal);

    if (isNaN(latVal) && isNaN(lngVal)) {
        alert('Podaj prawidłowe liczby dla współrzędnych!');
        return;
    }
    
    if (latVal < -90 || latVal > 90 || lngVal < -180 || lngVal > 180) {
        alert("Wprowadź poprawny zakres: szerokość -90 do 90, długość -180 do 180.");
        return;
    }

    const promise = fetch(`https://api.weatherbit.io/v2.0/current?key=${keyEl}&lang=pl&lat=${latVal}&lon=${lngVal}&units=I&description`);

    promise
        .then(resp => {
            if (resp.ok) { return resp.json(); }
            return Promise.reject(resp);
        })
        .then(resp => {
            const weatherLat = document.querySelector('.weather__lat')
            const weatherLng = document.querySelector('.weather__lng')
            const weatherSummary = document.querySelector('.weather__summary')
            const weatherTemp = document.querySelector('.weather__temperature')
            weatherLat.innerText = latVal;
            weatherLng.innerText = lngVal;
            weatherSummary.innerText = resp.data[0].weather.description;
            weatherTemp.innerText = resp.data[0].temp;
            console.log(weatherLat)
            console.log(resp.data[0].lat, resp.data[0].lon, resp.data[0].temp, resp.data[0].weather.description)
        })
        .catch(err => console.error(err))
        .finally(() => {
            console.log('Odpytywanie API zakończone!')
        });
}


