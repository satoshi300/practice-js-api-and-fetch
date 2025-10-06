// W pliku `app.js` ponownie masz przygotowany kod, który ustawia kolor obramowania dla wyszukanych `divów`. Tym razem jest on zabezpieczony przed podaniem nieprawidłowego elementu czy przed brakiem *callbacka*.

// Twoim zadaniem jest przebudowanie funkcji `setBorderColorAsync()` w taki sposób, aby realizowała swoje dotychczasowe zadanie przy pomocy obietnic (`Promise`), tj. powinna zwracać obiekt utworzony przy pomocy `new Promise( (resolve, reject) => ...)`;

// Pamiętaj, że `resolve` to funkcja, która jest uruchamiana w przypadku powodzenia, natomiast `reject` – w przypadku, gdy coś jest nie tak.

// Po wprowadzeniu zmian musisz również zmienić wykorzystanie tej funkcji zgodnie z jej obecną implementacją. Pamiętaj, że `.then` może być wykorzystane wielokrotnie.


document.addEventListener('DOMContentLoaded', init);

function init() {
    const divList = document.querySelectorAll('div');

    setBorderColorAsync(divList[0], 'red')
        .then(() => setBorderColorAsync(divList[1], 'blue'))
        .then(() => setBorderColorAsync(divList[2], 'green'))
        .then(() => console.log('finish'))
        .catch(err => console.error(err));

}

function setBorderColorAsync(element, color) {
    return new Promise((resolve, reject) => {
        if (!(element && element instanceof HTMLElement)) {
            reject('Paremetr ~element~ musi być prawidłowym elementem DOM');
            return;
        } setTimeout(() => {
            element.style.border = `3px solid ${color}`;
            resolve(); // informuje, że operacja się udała
        }, Math.random() * 3000);
    })
}


