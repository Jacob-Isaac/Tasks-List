{
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zrobić zakupy",
      done: false,
    },
  ];

  init();

  function init() {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  }
  function render() {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li class="list__item 
      ${task.done ? " list__item--decoration" : ""}"> 
      <button class="js-remove"> usuń </button>
      <button class="js-done"> tick </button>
      ${task.content}</li>`;
    }
    document.querySelector(".js-list").innerHTML = htmlString;
    buttonsEvents();
  }
  function buttonsEvents() {
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
  }
  function onFormSubmit(event) {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-input").value.trim();

    pushTasks(newTaskContent);
    render();
  }
  function pushTasks(newTaskContent) {
    if (newTaskContent === "") {
      return;
    }
    tasks.push({
      content: newTaskContent,
    });
  }
  function removeTask(removeIndex) {
    tasks.splice(removeIndex, 1);
    render();
  }
  function toggleTask(toggleIndex) {
    tasks[toggleIndex].done = !tasks[toggleIndex].done;
    render();
  }
}
