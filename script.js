const addBtn = document.getElementById("addTask");
const taskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");
const noteCountEl = document.getElementById("noteCount");

function updateNoteCount() {
  if (!noteCountEl || !taskList) return;
  noteCountEl.textContent = taskList.children.length;
}

updateNoteCount();

if (addBtn) {
  addBtn.addEventListener("click", () => {
    if (!taskInput || !taskList) return;

    const text = taskInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");

    /* visible text */
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    /* BIG editor */
    const input = document.createElement("textarea");
    input.className = "task-edit-input";
    input.rows = 4;
    input.style.display = "none";

    /* buttons */
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";

    const saveBtn = document.createElement("button");
    saveBtn.className = "save-btn";
    saveBtn.textContent = "Save";
    saveBtn.style.display = "none";

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancel-btn";
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.display = "none";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    /* build row */
    li.appendChild(span);
    li.appendChild(input);
    li.appendChild(editBtn);
    li.appendChild(saveBtn);
    li.appendChild(cancelBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    updateNoteCount();

    /* edit mode */
    editBtn.addEventListener("click", () => {
      input.value = span.textContent;
      span.style.display = "none";
      input.style.display = "block";

      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
      cancelBtn.style.display = "inline-block";

      input.focus();
    });

    /* save */
    saveBtn.addEventListener("click", () => {
      const newText = input.value.trim();
      if (newText === "") return;

      span.textContent = newText;
      span.style.display = "block";
      input.style.display = "none";

      editBtn.style.display = "inline-block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
    });

    /* cancel */
    cancelBtn.addEventListener("click", () => {
      span.style.display = "block";
      input.style.display = "none";

      editBtn.style.display = "inline-block";
      saveBtn.style.display = "none";
      cancelBtn.style.display = "none";
    });

    /* delete */
    deleteBtn.addEventListener("click", () => {
      li.remove();
      updateNoteCount();
    });

    /* keyboard shortcuts */
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveBtn.click();
      }
      if (e.key === "Escape") cancelBtn.click();
    });

    taskInput.value = "";
  });
}
