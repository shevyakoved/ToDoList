let elements: NodeListOf<HTMLDivElement> = document.querySelectorAll('.element');
const list: HTMLDivElement | null = document.querySelector('.list');
const completedTasksButton: HTMLButtonElement | null = document.querySelector('.completedtasks');
const uncompletedTasksButton: HTMLButtonElement | null = document.querySelector('.uncompletedtasks');
const allTasksButton: HTMLButtonElement | null = document.querySelector('.alltask');
let color: number = 135;

function addRemoveHandler(element: HTMLDivElement) {
    const remove: HTMLElement | null = element.querySelector('.remove');
    const complete: HTMLElement | null = element.querySelector('.complete');

    if (remove && complete) {
        remove.addEventListener('click', () => {
            element.remove();
            color -= 30;
            updateTaskCount();
        });

        complete.addEventListener('click', () => {
            element.classList.toggle('completed');
            updateTaskCount();
        });
    }
}

elements.forEach(element => {
    addRemoveHandler(element);
});

elements.forEach(element => {
    element.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
    color += 30;
});

const createButton: HTMLButtonElement | null = document.querySelector('.create');
const input: HTMLInputElement | null = document.querySelector('.newElementInput');

const clearButton: HTMLButtonElement | null = document.querySelector('.clear');

if (clearButton) {
    clearButton.addEventListener('click', () => {
        clearAllTasks();
    });
}

function clearAllTasks() {
    if (list) {
        list.innerHTML = '';
        color = 135;
        updateTaskCount();
    }
}

if (createButton && input) {
    createButton.addEventListener('click', () => {
        const inputText: string = input.value.trim();
        if (inputText !== '' && list) {
            const currentDate: string = new Date().toLocaleDateString();
            list.innerHTML += `<div class='element'><div class='complete'>✔</div><div class='content'><div class='text'>${inputText}</div><div class='date'>от ${currentDate}</div></div><div class='remove'>×</div></div>`;
            input.value = '';

            elements = document.querySelectorAll('.element');
            const lastElement = elements[elements.length - 1];
            if (lastElement) {
                lastElement.style.backgroundColor = `rgb(${color}, ${color}, ${color})`;
                color += 30;
                elements.forEach(element => {
                    addRemoveHandler(element);
                });
        
                updateTaskCount();
            }
        }
        if (color >= 255) color = 135
    });
}

if (completedTasksButton) {
    completedTasksButton.addEventListener('click', () => {
        filterTasks(true);
        if (uncompletedTasksButton) {
            removeBold(uncompletedTasksButton);
        }
        
        if (allTasksButton) {
            removeBold(allTasksButton);
        }
        toggleBold(completedTasksButton);
    });
}

if (uncompletedTasksButton) {
    uncompletedTasksButton.addEventListener('click', () => {
        filterTasks(false);
        if (uncompletedTasksButton) {
            removeBold(uncompletedTasksButton);
        }
        
        if (allTasksButton) {
            removeBold(allTasksButton);
        }
        toggleBold(uncompletedTasksButton);
    });
}

if (allTasksButton) {
    allTasksButton.addEventListener('click', () => {
        showAllTasks();
        if (uncompletedTasksButton) {
            removeBold(uncompletedTasksButton);
        }
        
        if (allTasksButton) {
            removeBold(allTasksButton);
        }
        toggleBold(allTasksButton);
    });
}

function toggleBold(button: HTMLButtonElement) {
    button.classList.toggle('bold');
}

function removeBold(button: HTMLButtonElement) {
    button.classList.remove('bold');
}

function filterTasks(completed: boolean) {
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
    let completedCount: number = 0;
    let uncompletedCount: number = 0;

    elements.forEach(element => {
        if (element.classList.contains('completed')) {
            completedCount++;
        } else {
            uncompletedCount++;
        }
    });

    let totalCount: number = elements.length;

    if (list && list.innerHTML === '') {
        completedCount = 0;
        uncompletedCount = 0;
        totalCount = 0;
    }

    if (completedTasksButton && uncompletedTasksButton && allTasksButton) {
        completedTasksButton.textContent = `Сделано(${completedCount})`;
        uncompletedTasksButton.textContent = `Не сделано(${uncompletedCount})`;
        allTasksButton.textContent = `Все(${totalCount})`;
    }
}

updateTaskCount();
