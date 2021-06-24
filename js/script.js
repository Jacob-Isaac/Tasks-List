{
  let tasks = [];

  const tasksCopy = (tasksCopyContent) => {
    tasks = [...tasks, { content: taskCopyContent }];
    render();
  };
  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };
  const render = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li class="section__list--item"> 
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
    pushTasks(newTaskContent);
    newTaskFocus.focus();
    newTaskFocus.value = "";
    render();
  };
  const pushTasks = (newTaskContent) => {
    if (newTaskContent === "") {
      return;
    }
    tasks.push({
      content: newTaskContent,
    });
  };
  const removeTask = (removeIndex) => {
    tasks = [...tasks.slice(0, removeIndex)];
    tasks.splice(removeIndex, 1);
    render();
  };
  const toggleTask = (toggleIndex) => {
    tasks[toggleIndex].done = !tasks[toggleIndex].done;
    render();
  };

  init();
}
