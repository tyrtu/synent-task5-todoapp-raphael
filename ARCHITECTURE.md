# Synent Task 5 — To‑Do App Architecture

Overview
--------
Small single-page vanilla JavaScript app that manages a list of to-dos in browser `localStorage`.

Files
-----
- `index.html` — HTML UI and semantic structure.
- `styles.css` — Styling and responsive layout.
- `script.js` — Application logic and event handling.

Key concepts
------------
- Data model: each todo is an object `{ id, text, completed }` stored in an array `todos`.
- Persistence: serialized JSON saved under the `localStorage` key `synent-task5-todos`.
- Routing/state: single page only; filter state (`all|active|completed`) is kept in `currentFilter` variable.
- DOM rendering: `renderTodos()` computes visible items and updates `#todo-list` via `innerHTML`.
- Accessibility: checkboxes and labels provided; `aria-label` added to checkbox inputs.

Main functions (in `script.js`)
- `loadTodos()` / `saveTodos()` — read/write from `localStorage`.
- `getVisibleTodos()` — apply current filter.
- `renderTodos()` — render list, update counts, save state.
- `addTodo(text)` — prepend a new todo with `crypto.randomUUID()` id.
- `toggleTodo(id)`, `deleteTodo(id)`, `clearCompleted()` — modify state and re-render.

Event listeners
---------------
- Form submit to add todos.
- Click delegation for delete buttons.
- Change listener on checkbox inputs to toggle items.
- Filter buttons set `currentFilter` and re-render.

Testing notes
-------------
- To test persistence: add items, refresh page, verify they remain.
- To test filters: add a few items, toggle some completed, then click each filter.

Next steps (recommended)
------------------------
- (Optional) Add a small test harness for `addTodo`, `toggleTodo`, and `clearCompleted`.
- (Optional) Add keyboard shortcuts and ARIA improvements for accessibility.
