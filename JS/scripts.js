{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,

        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };
    
    const getTaskClass = (task) => {
        return task.done ? "form__task--done" : "";
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
            const taskClass = getTaskClass(task);
            htmlString += `
              <li class="task ${taskClass}">
                <button class="js-done">zrobione?</button>
                <button class="js-remove">usuń</button>
                ${task.content}
              </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };
    
    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);

    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
};