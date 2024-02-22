const task_array = [];
let countDone = 0;
let countTodo = 0;

function makeNewTask() {
  const userinput = document.querySelector("#userinput");
  const tasktext = userinput.value.trim(); // userinput feltet bliver tomt

  if (tasktext === "") {
    return;
  }
  const task = {};
  task.id = self.crypto.randomUUID();
  task.todo = tasktext;
  task.checked = false;

  task_array.push(task);
  console.log("task_array", task_array);
  showList();

  userinput.value = "";
  //Run count
  changeCount();
}

const addbtn = document.querySelector("#addbtn");
addbtn.addEventListener("click", makeNewTask);

function showList() {
  const openListcontainer = document.querySelector("#opentasks");
  const completedListcontainer = document.querySelector("#completedtasks");

  openListcontainer.innerHTML = "";
  completedListcontainer.innerHTML = "";

  task_array.forEach((task) => {
    console.log(task);
    const clone = document.querySelector("template").content.cloneNode(true);
    const deleteBtn = clone.querySelector(".deletebtn");
    const checkbox = clone.querySelector(".task_completed");

    // delete knappen //
    deleteBtn.addEventListener("click", () => {
      deleteBtn.classList.add("clicked");
      setTimeout(() => {
        deleteTask(task.id);
      }, 300);
    });
    // check box //
    checkbox.addEventListener("change", () => {
      updateTaskStatus(task, checkbox.checked);
    });

    clone.querySelector("p").textContent = task.todo;

    if (task.checked) {
      completedListcontainer.appendChild(clone);
      checkbox.checked = true; // hvis task er checked, check the checkbox
    } else {
      openListcontainer.appendChild(clone);
    }
  });
}

function updateTaskStatus(task) {
  if (task.checked) {
    task.checked = false;
  } else {
    task.checked = true;
  }
  console.log(task_array);
  showList();
  //Run count
  changeCount();
}

function changeCount() {
  const countDoneFilter = task_array.filter((task) => task.checked === true);
  countDone = countDoneFilter.length;
  document.querySelector("#donecount").textContent = countDone;

  const countTodoFilter = task_array.filter((task) => task.checked === false);
  countTodo = countTodoFilter.length;
  document.querySelector("#todocount").textContent = countTodo;
}

// fjerner task-id'et //
function deleteTask(taskId) {
  const index = task_array.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    task_array.splice(index, 1);
    showList();
    //Run count
    changeCount();
  }
}
