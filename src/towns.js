/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {
    return new Promise((resolve, reject) => {
        fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => {
                if (response.status >= 400) {
                  
                    return Promise.reject();
                }
                
                return response.json();
            })
            .then(towns => {
                const townsSort = towns.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });
                
                resolve(townsSort);
            })
            .catch(() => {
                reject();
            })
    })
}
/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    return full.indexOf(chunk) !== -1;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

/* Кнопка "Повторить" */
const buttornRepeat = document.createElement('button');

buttornRepeat.textContent = 'Повторить';
buttornRepeat.style.display = 'none';
homeworkContainer.appendChild(buttornRepeat);

/* Убрать загрузку */
function offLoad() {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
}

offLoad();

let towns;

loadTowns()
    .then(response => {
        towns = response;
    })
    .catch(() => {
        loadingBlock.innerHTML = 'Не удалось загрузить города';
        loadingBlock.style.display = 'block';
        filterBlock.style.display = 'none';
        buttornRepeat.style.display = 'block';
    })

/* Обработчик нажатия клавиш в текстовом поле */
filterInput.addEventListener('keyup', function() {

    let valueInput = this.value;

    filterResult.innerHTML = '';

    if (valueInput !== '') {
        for (let town of towns) {
            if (isMatching(town.name, valueInput)) {
                let elem = document.createElement('p');

                elem.textContent = town.name;
                filterResult.appendChild(elem);
            }
        }
    }
});

export {
    loadTowns,
    isMatching
};
