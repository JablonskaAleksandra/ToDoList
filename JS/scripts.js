let tasks = [];
let hideDoneTasks = false;

const newTask = (newTaskContent) => {
    tasks = [
        ...tasks,
        { content: newTaskContent },
    ];
    render();
};

const removeTask = (taskIndex) => {
    tasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1)
    ];

    render();
};

const toggleTaskDone = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) => {
        if (index === taskIndex) {
            return { ...task, done:!task.done };
        };

        return task;

    });

    tasks = updatedTasks;

    render();
};

const finishAllTasks = () => {
    const allTaskDone = tasks.map(task => {
        return { ...task, done: true };
    });

    tasks = allTaskDone;


    render();
};

const switchBoolean = () => {
    if (tasks.some(task => task.done) && !hideDoneTasks) {
        hideDoneTasks = true;
    } else {
        hideDoneTasks = false;
    }
    render();
};


const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
        removeButton.addEventListener("click", () => {
            removeTask(taskIndex);
        });
    });

};

const bindToggleDoneEvents = () => {
    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, taskIndex) => {
        doneButton.addEventListener("click", () => {
            toggleTaskDone(taskIndex);
        });
    });

};

const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
        tasksListHTMLContent += `
        <li class="task ${task.done && hideDoneTasks ? "task--hidden" : ""}">
                <button class="js-done task__button task__button--done">${task.done ? "✔" : ""}</button>
                <span class="${task.done ? "task--done" : ""}">${task.content}</span>
                <button class="js-remove task__button task__button--remove">🗑</button>
            </li>
        `;
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
};

const renderButtons = () => {

    let buttonsHTML = "";
    
    if (tasks.length > 0) {
        if (hideDoneTasks) {
          buttonsHTML = `
            <button class="js-hideDoneTasks section__button">Pokaż ukończone</button>
            <button class="js-doneAllTasks section__button" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
          `;
        }
        else {
          buttonsHTML = `
            <button class="js-hideDoneTasks section__button">Ukryj ukończone</button>
            <button class="js-doneAllTasks section__button" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
          `;
        };
      };
      

    document.querySelector(".js-buttons").innerHTML = buttonsHTML;
};

const bindButtonsEvents = () => {
    const doneAllTasksButton = document.querySelector(".js-doneAllTasks");
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

    if (doneAllTasksButton) {
        doneAllTasksButton.addEventListener("click", () => {
            finishAllTasks();
        });
    }
    if (hideDoneTasksButton) {
        hideDoneTasksButton.addEventListener("click", () => {
            switchBoolean();

        });
    };
};
    
    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            newTask(newTaskContent);
        };

        newTaskElement.focus();
        newTaskElement.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
