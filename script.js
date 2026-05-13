const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const totalCount = document.getElementById('total-count');
const activeCount = document.getElementById('active-count');
const completedCount = document.getElementById('completed-count');
const clearCompletedButton = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

const storageKey = 'synent-task5-todos';
let currentFilter = 'all';
let todos = loadTodos();

function loadTodos() {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(storageKey, JSON.stringify(todos));
}

function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function updateSummary() {
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.length - completed;

  totalCount.textContent = todos.length;
  activeCount.textContent = active;
  completedCount.textContent = completed;
}

function renderTodos() {
  const visibleTodos = getVisibleTodos();

  todoList.innerHTML = visibleTodos
    .map(
      (todo) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
          <input class="task-toggle" type="checkbox" ${todo.completed ? 'checked' : ''} aria-label="Mark task completed" />
          <span class="task-text">${escapeHtml(todo.text)}</span>
          <button class="delete-btn" type="button">Delete</button>
        </li>
      `
    )
    .join('');

  emptyState.style.display = visibleTodos.length ? 'none' : 'block';
  updateSummary();
  saveTodos();
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function addTodo(text) {
  todos.unshift({
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
  });
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = todoInput.value.trim();
  if (!value) {
    return;
  }

  addTodo(value);
  todoInput.value = '';
  todoInput.focus();
});

todoList.addEventListener('click', (event) => {
  const listItem = event.target.closest('.todo-item');
  if (!listItem) {
    return;
  }

  const todoId = listItem.dataset.id;

  if (event.target.classList.contains('delete-btn')) {
    deleteTodo(todoId);
  }
});

todoList.addEventListener('change', (event) => {
  const listItem = event.target.closest('.todo-item');
  if (!listItem || !event.target.classList.contains('task-toggle')) {
    return;
  }

  toggleTodo(listItem.dataset.id);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

clearCompletedButton.addEventListener('click', clearCompleted);

renderTodos();
