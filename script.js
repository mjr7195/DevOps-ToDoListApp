const addBtn = document.getElementById("addTask");
const taskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;
    const li = document.createElement("li");
    li.textContent = taskInput.value;
    taskList.appendChild(li);
    taskInput.value = "";
  });
}
