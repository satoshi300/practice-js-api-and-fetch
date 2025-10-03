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

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('DOM');
    handleSubmit();
}

const submitInput = document.querySelector('.form__submit')
submitInput.addEventListener('click', handleSubmit)

console.log(submitInput)

function handleSubmit() {
    // console.log('test przycisku')
    const promise = fetch('https://api.weatherbit.io/v2.0/current?key=deeaed3434f040bab058e759479f90f5&lang=pl&lat=52.232222&lon=21.008333&units=I&description');

    promise
        .then(resp => {
            if (resp.ok) { return resp.json(); }
            return Promise.reject(resp);
        })
        .then(resp => {
            console.log(resp.data[0].lat, resp.data[0].lon, resp.data[0].temp, resp.data[0].weather.description)
        })
        .catch(err => console.error(err))
        .finally(() => {
            console.log('Odpytywanie API zakończone!')
        });
}