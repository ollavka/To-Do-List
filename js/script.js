let taskTitle = document.querySelector('.to-do__task-title');
let taskDescription = document.querySelector('.to-do__task-subtitle');
let listTask = document.querySelector('.to-do__list');
let button = document.querySelector('.to-do__button-add');
const myStorage = window.localStorage;

checkStorage();

button.addEventListener('click', () => {
    if (taskTitle.value == '' || taskDescription.value == '') {
        taskTitle.classList.add('red');
        taskDescription.classList.add('red');

        taskTitle.placeholder = 'Please add a title!';
        taskDescription.placeholder = 'Please add a description!';
    } else {
        taskTitle.classList.remove('red');
        taskDescription.classList.remove('red');

        taskTitle.placeholder = 'Title';
        taskDescription.placeholder = 'Description';

        let myTaskTitle = taskTitle.value;
        let myTaskDescription = taskDescription.value;
        let template = `
        <div class="list__item list-item">
        <div class="list-item__block1">
            <div class="list-item__checker">
                <img src="./img/check-circle1.svg" alt="check1">
                <img src="./img/check-circle2.svg" alt="check2">
            </div>
            <div class="list-item__title">${myTaskTitle}</div>
            <div class="list-item__buttons">
                <img class="list-item__change" src="./img/pencil.svg" alt="pencil">
                <img class="list-item__remove" src="./img/trash-red.svg" alt="trash">
            </div>
        </div>
        <div class="list-item__line"></div>
        <div class="list-item__block2">
            <div class="list-item__subtitle">${myTaskDescription}</div>
        </div>
        </div>`;

        listTask.insertAdjacentHTML(
        'beforeend',
        template
        );
        
        taskTitle.value = '';
        taskDescription.value = '';

        myStorage.setItem(myTaskTitle, myTaskDescription);
        window.location.reload();
    }
});

let listItem = document.querySelectorAll('.list__item');
let itemChecker = document.querySelectorAll('.list-item__checker');
let itemChange = document.querySelectorAll('.list-item__change');
let itemRemove = document.querySelectorAll('.list-item__remove');

for (let i in [...itemRemove]) {
    itemRemove[i].addEventListener('click', () => {
        window.location.reload();
        listItem[i].outerHTML = '';
        myStorage.removeItem(myStorage.key(i));
    });
}

for (let i in [...itemChecker]) {
    itemChecker[i].addEventListener('click', () => {
       listItem[i].classList.toggle('active');
    });
}

function checkStorage() {
    if (myStorage.length != 0) {
        for (let i = 0; i < myStorage.length; i++) {
            listTask.insertAdjacentHTML(
                'beforeend',
                `<div class="list__item list-item">
                 <div class="list-item__block1">
                    <div class="list-item__checker">
                        <img src="./img/check-circle1.svg" alt="check1">
                        <img src="./img/check-circle2.svg" alt="check2">
                    </div>
                    <div class="list-item__title">${myStorage.key(i)}</div>
                    <div class="list-item__buttons">
                        <img class="list-item__change" src="./img/pencil.svg" alt="pencil">
                        <img class="list-item__remove" src="./img/trash-red.svg" alt="trash">
                    </div>
                </div>
                <div class="list-item__line"></div>
                <div class="list-item__block2">
                <div class="list-item__subtitle">${myStorage.getItem(myStorage.key(i))}</div>
                </div>
                </div>`
            );
        }
    }
}

