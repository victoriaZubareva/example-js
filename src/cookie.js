/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let cookies;

/* собираем все cookie*/
function getCookies() {
    cookies = document.cookie.split('; ');

    return cookies;
}

/* функция проверяет встречается ли подстрока*/
function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    return full.indexOf(chunk) !== -1;
}

function addCookiesTable() {
    const filterInput = filterNameInput.value.trim();
    let cookies = getCookies();
    
    if (filterInput !== '') {
        cookies = cookies.filter(cookie => {
            const [name, value] = cookie.split('=');
            
            return (isMatching(name, filterInput ) || isMatching(value, filterInput ));
        });
    }
    listTable.innerHTML = '';
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');

        const tr = document.createElement('tr');
        const tdNameCookie = document.createElement('td');
        const tdValueCookie = document.createElement('td');
        const tdButtonDelete = document.createElement('td');
        const buttonDelete = document.createElement('button');

        tdNameCookie.textContent = name;
        tdValueCookie.textContent = value;

        tr.appendChild(tdNameCookie);
        tr.appendChild(tdValueCookie);
        tr.appendChild(tdButtonDelete);

        buttonDelete.textContent = 'удалить';
        buttonDelete.setAttribute('data-id', name);
        tdButtonDelete.appendChild(buttonDelete);

        tr.setAttribute('data-id', name);
        listTable.appendChild(tr);
    });

}

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    addCookiesTable();
});

addButton.addEventListener('click', function() {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    const nameCookie = addNameInput.value.trim();
    const valueCookie = addValueInput.value.trim();

    document.cookie = `${nameCookie}=${valueCookie}; expires=Tue, 19 Jan 2038 03:14:07 GMT;`;
    getCookies();
    addCookiesTable();
});

/* удаление cookie*/
listTable.addEventListener('click', function(e) {
    if (e.target.nodeName === 'BUTTON') {
        const name = e.target.dataset.id;
        const tr = listTable.querySelector(`tr[data-id="${name}"]`);
        
        document.cookie = `${e.target.dataset.id}='REMOVED';expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        tr.parentNode.removeChild(tr);
        getCookies();
    }
})

addCookiesTable();