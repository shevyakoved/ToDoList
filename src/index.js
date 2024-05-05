let elements = document.querySelectorAll('.element');
let list = document.querySelector('.list');
let completedTasksButton = document.querySelector('.completedtasks');
let uncompletedTasksButton = document.querySelector('.uncompletedtasks');
let allTasksButton = document.querySelector('.alltask');
let color = 135;

function addRemoveHandler(element) {
    let remove = element.querySelector('.remove');
    let complete = element.querySelector('.complete');

    remove.addEventListener('click', () => {
        element.remove();
        elements = document.querySelectorAll('.element');
        color -= 30;
        updateTaskCount();
    });

    complete.addEventListener('click', () => {
        element.classList.toggle('completed');
        updateTaskCount();
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
    clearAllTasks()
});

function clearAllTasks() {
    list.innerHTML = '';
    color = 135;
    updateTaskCount();
}

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

        updateTaskCount();
    }
});

completedTasksButton.addEventListener('click', () => {
    filterTasks(true);
    removeBold(uncompletedTasksButton);
    removeBold(allTasksButton);
    toggleBold(completedTasksButton);
});

uncompletedTasksButton.addEventListener('click', () => {
    filterTasks(false);
    removeBold(completedTasksButton);
    removeBold(allTasksButton);
    toggleBold(uncompletedTasksButton);
});

allTasksButton.addEventListener('click', () => {
    showAllTasks();
    removeBold(completedTasksButton);
    removeBold(uncompletedTasksButton);
    toggleBold(allTasksButton);
});

function toggleBold(button) {
    button.classList.toggle('bold');
}

function removeBold(button) {
    button.classList.remove('bold');
}

function filterTasks(completed) {
    elements.forEach(element => {
        if (completed && !element.classList.contains('completed')) {
            element.classList.add('hidden');
        } else if (!completed && element.classList.contains('completed')) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    });
}

function showAllTasks() {
    elements.forEach(element => {
        element.classList.remove('hidden');
    });
}

function updateTaskCount() {
    let completedCount = 0;
    let uncompletedCount = 0;

    elements.forEach(element => {
        if (element.classList.contains('completed')) {
            completedCount++;
        } else {
            uncompletedCount++;
        }
    });


    let totalCount = elements.length;

    if (list.innerHTML == '') {
        completedCount = 0;
        uncompletedCount = 0;
        totalCount = 0;
    }

    completedTasksButton.textContent = `Сделано(${completedCount})`;
    uncompletedTasksButton.textContent = `Не сделано(${uncompletedCount})`;
    allTasksButton.textContent = `Все(${totalCount})`;
}

updateTaskCount();