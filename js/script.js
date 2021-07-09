{
  let tasks = [];
  let hideShowTasks = false;

  const newTasks = (newTaskContent) => {
    if (newTaskContent === "") {
      return;
    }
    tasks = [...tasks, { content: newTaskContent }];
    renderTasks();
    renderButtons();
  };
  const removeTask = (removeIndex) => {
    tasks = [...tasks.slice(0, removeIndex), ...tasks.slice(removeIndex + 1)];
    renderTasks();
    renderButtons();
  };
  const toggleTask = (toggleIndex) => {
    tasks = [
      ...tasks.slice(0, toggleIndex),
      {
        ...tasks[toggleIndex],
        done: !tasks[toggleIndex].done,
      },
      ...tasks.slice(toggleIndex + 1),
    ];
    renderTasks();
    renderButtons();
  };
  const markAllTasks = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    renderTasks();
    renderButtons();
  };
  const hideShowAllTasks = () => {
    hideShowTasks = !hideShowTasks;
    renderTasks();
    renderButtons();
  };

  const renderButtons = () => {
    let actionString = "";
    actionString += `<button class="section__button js-hideShowButton${
      tasks.length === 0 ? " section__button--hidden" : ""
    }"${tasks.every(({ done }) => !done) ? "disabled" : ""}>${
      hideShowTasks ? "Pokaż" : "Ukryj"
    } ukończone</button>
      <button class="section__button js-markAllButton${
        tasks.length === 0 ? " section__button--hidden" : ""
      }"${
      tasks.every(({ done }) => done) ? "disabled" : ""
    }>Ukończ wszystkie</button>`;

    document.querySelector(".js-actionButtons").innerHTML = actionString;
    bindButtonsEvents();
  };
  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li class="section__list--item${
        task.done && hideShowTasks ? " section__list--hidden" : ""
      }"> 
      <button class="js-remove button button__remove">🗑</button>
      <button class="js-done button button__done"> ${
        task.done ? "✔" : ""
      }</button>
      <span class="content
      ${task.done ? "content--decoration" : ""}">
      ${task.content}</span></li>`;
    }
    document.querySelector(".js-list").innerHTML = htmlString;
    buttonsEvents();
    bindButtonsEvents();
  };

  const bindButtonsEvents = () => {
    const markAllButton = document.querySelector(".js-markAllButton");

    if (markAllButton) {
      markAllButton.addEventListener("click", markAllTasks);
    }

    const hideShowButton = document.querySelector(".js-hideShowButton");

    if (hideShowButton) {
      hideShowButton.addEventListener("click", hideShowAllTasks);
    }
  };
  const buttonsEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, removeIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(removeIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, toggleIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTask(toggleIndex);
      });
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskFocus = document.querySelector(".js-input");
    const newTaskContent = newTaskFocus.value.trim();
    newTasks(newTaskContent);
    newTaskFocus.focus();
    newTaskFocus.value = "";
  };
  const init = () => {
    renderTasks();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
