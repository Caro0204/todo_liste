const task_array = [];
makeNewTask();
makeNewTask();

function makeNewTask() {
  const task = { name: "Defult name", done: false };
  task_array.push(task);
  console.log("task_array", task_array);
  filterAndSortList();
}

function filterAndSortList() {
  let listToShow;

  // sortering og filtering

  listToShow = task_array;

  showList();
}

function showList() {
  console.log("Show list");
  const tbody = document.querySelector("ul");
  tbody.innerHTML = "";
  task_array.forEach((task) => {
    const clone = document.querySelector("template").content.cloneNode(true);
    if (task.done) {
      clone.querySelector("button").textContent = "DONE";
    } else {
      clone.querySelector("button").textContent = "TO DO";
    }
    clone.querySelector("button").addEventListener("click", () => {
      console.log("KLIK");
      task.done = !task.done; // sætter den til det modsatte af havd den var
      filterAndSortList();
      console.log("task_array", task_array);
    });
    clone.querySelector("p").textContent = task.name;

    tbody.appendChild(clone);
  });
}
