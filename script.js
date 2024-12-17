document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("input");
    const addButton = document.querySelector("#add");
    const todoList = document.querySelector("#todo-list");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
      }
    }
  
    function deleteTask(id) {
      tasks = tasks.filter((task) => task.id !== id);
      saveTasks();
      renderTasks();
    }
  
    function toggleTaskCompletion(id) {
      tasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      saveTasks();
      renderTasks();
    }
  
    function renderTasks() {
      todoList.innerHTML = "";
      tasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.classList.toggle("completed", task.completed);
        taskElement.innerHTML = `
          <span>${task.text}</span>
          <button class="delete-btn" data-id="${task.id}">Delete</button>
        `;
        todoList.appendChild(taskElement);
  
        taskElement.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") return;
          toggleTaskCompletion(task.id);
        });
  
        taskElement.querySelector(".delete-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          deleteTask(task.id);
        });
      });
    }
  
    loadTasks();
  
    addButton.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
      if (taskText === "") {
        alert("Please enter a todo");
        return;
      }
  
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(newTask);
      todoInput.value = "";
      saveTasks();
      renderTasks();
    });
  });