{
    let tasks = [];

    const newTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        const removedTasks = [
            ...tasks.slice(0, taskIndex), 
            ...tasks.slice(taskIndex + 1)
        ];

        tasks = removedTasks;

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        const removedTasks = [
            ...tasks
        ];
        
        removedTasks[taskIndex] = { ...removedTasks[taskIndex], done: !removedTasks[taskIndex].done };

        tasks = removedTasks;

        render();
    };


    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="task">
            <button class="js-done task__button task__button--done">${task.done ? "✔" : ""}</button>
            <span class="${task.done ? "task--done" : ""}">${task.content}</span>
            <button class="js-remove task__button task__button--remove">🗑</button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

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
};