const task_array = [];

function makeNewTask() {
  const userinput = document.querySelector("#userinput");
  const tasktext = userinput.value.trim();

  if (tasktext === "") {
    return;
  }
  const task = {};
  task.id = self.crypto.randomUUID();
  task.todo = tasktext;
  task_array.push(task);
  console.log("task_array", task_array);
  showList();

  userinput.value = "";
}

const addbnt = document.querySelector("#addbnt");
addbnt.addEventListener("click", makeNewTask);

function showList() {
  const openListcontainer = document.querySelector("#opentasks");
  const completedListcontainer = document.querySelector("#completedtasks");

  openListcontainer.innerHTML = "";
  completedListcontainer.innerHTML = "";

  task_array.forEach((task) => {
    console.log(task);
    const clone = document.querySelector("template").content.cloneNode(true);
    const deleteBtn = clone.querySelector(".deletebnt");
    const checkbox = clone.querySelector(".task_completed");

    deleteBtn.addEventListener("click", () => {
      deleteBtn.classList.add("clicked");
      setTimeout(() => {
        deleteTask(task.id);
      }, 300);

      checkbox.addEventListener("change", () => {
        updateTaskStatus(task.id, checkbox.checked);
      });

      clone.querySelector("p").textContent = task.todo;

      if (task.completed) {
        completedListcontainer, append(clone);
        checkbox.checked = true; // if the task is completed, check the checkbox
      } else {
        openListcontainer.append(clone);
      }
    });
  });
}

function updateTaskStatus(taskId, completed) {
  const task = task_array.find((task) => task.id === taskId);
  if (task) {
    task.completed = completed;
    showList();
  }
}

// Move deleteTask function outside showList
function deleteTask(taskId) {
  const index = task_array.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    task_array.splice(index, 1);
    showList(); // Update the list after removing the task
  }
}
