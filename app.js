const form = document.querySelector('form');
const inpuTodo = document.querySelector('.todo-input');
const todContainer = document.querySelector('.todo-container');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.search');

let todos = JSON.parse(localStorage.getItem('todo')) || [];
let filterElements = [];

const addTodo = (event) => {
  event.preventDefault();
  const inputValue = inpuTodo.value.trim();
  if (inpuTodo.value === '') {
    alert('digite um valor');
    return;
  }
  const taskInfo = { name: inputValue };
  todos.push(taskInfo);
  inpuTodo.value = '';
  inpuTodo.focus();
  renderTodo();
  saveLocalStorage();
};

const renderTodo = () => {
  todoList.innerHTML = '';
  filterElements = todos.map((todo, index) => {
    const isCompleted = todo.status === 'completed' ? 'completed' : '';
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.dataset.todo = todo.name;
    todoDiv.innerHTML = `
    <li class="${isCompleted}">${todo.name}</li>
    <i class="bx bx-trash" onclick="deleteTodo('${index}')"></i>
    <i onclick="checkTodo('${todo.name}',${index})" class="bx bx-check"></i>
    `;
    todoList.append(todoDiv);

    return { name: todo.name, element: todoDiv };
  });
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  renderTodo();
  saveLocalStorage();
};

const updateStatus = (index) => {
  const el = todos[index];
  el.status = 'completed';
};

const checkTodo = (element, index) => {
  const check = document.querySelector(`[data-todo="${element}"]`);
  const checkElement = check.querySelector('li');
  checkElement.classList.add('completed');
  updateStatus(index);
  saveLocalStorage();
};

const filterToddo = (e) => {
  const filterValue = e.target.value.trim();
  filterElements.forEach((todo) => {
    const isVisible = todo.name.includes(filterValue);
    todo.element.classList.toggle('hide', !isVisible);
  });
};

const saveLocalStorage = () => {
  localStorage.setItem('todo', JSON.stringify(todos));
};

renderTodo();

form.addEventListener('submit', addTodo);
filter.addEventListener('input', filterToddo);
