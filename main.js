let elements = document.querySelectorAll('.element');
let list = document.querySelector('.list');
let color = 135;

function addRemoveHandler(element) {
    let remove = element.querySelector('.remove');
    let complete = element.querySelector('.complete');

    remove.addEventListener('click', () => {
        element.remove();
        elements = document.querySelectorAll('.element');
        color -= 30;
    });

    complete.addEventListener('click', () => {
        element.classList.toggle('completed');
    });
}

elements.forEach(element => {
    addRemoveHandler(element);
});

elements.forEach(element => {
    element.style.backgroundColor = 'rgb(' + color + ', ' + color + ', ' + color + ')';
    color += 30;
});

let createButton = document.querySelector('.create');
let input = document.querySelector('.newElementInput');

let clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    list.innerHTML = '';
    color = 135;
});

createButton.addEventListener('click', () => {
    let inputText = input.value.trim();
    if (inputText !== '') {
        let currentDate = new Date().toLocaleDateString();
        list.innerHTML += "<div class='element'><div class='complete'>✔</div><div class='content'><div class='text'>" + inputText + "</div><div class='date'>от " + currentDate + "</div></div><div class='remove'>×</div></div>";
        input.value = '';

        elements = document.querySelectorAll('.element');
        let lastElement = elements[elements.length - 1];
        lastElement.style.backgroundColor = 'rgb(' + color + ', ' + color + ', ' + color + ')';
        color += 30;
        elements.forEach(element => {
            addRemoveHandler(element);
        });
    }
});