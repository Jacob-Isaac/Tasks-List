{
  const tasks = [
    {
      content: "nagrać lekcję",
      done: false,
    },
    {
      content: "zrobić zakupy",
      done: true,
    },
  ];

  init();

  function init() {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
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
      done: true,
    });
  }
  function render() {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `<li 
      ${task.done ? ' style="text-decoration: line-through"' : ""}> 
      <button class="js-remove"> usuń </button>
      ${task.content}</li>`;
    }
    document.querySelector(".js-list").innerHTML = htmlString;

    const removeButtons = document.querySelectorAll(".js-remove");
removeButtons.forEach((removeButton, index)=> {
    removeButton.addEventListener("click", () => {
    removeTask(index);
    });
});

}
function removeTask(index){
tasks.splice(index, 1);
render();
}
}