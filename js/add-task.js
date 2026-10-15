// EasyTask — Add-task logic (works in desktop and mobile layouts).
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const completedCount = document.getElementById('completed-count');
const totalCount = document.getElementById('total-count');
const announcement = document.getElementById('task-announcement');

function updateTaskCounter() {
  const allTasks = taskList.querySelectorAll('.task-item');
  const completedTasks = taskList.querySelectorAll('.task-checkbox-input:checked');
  completedCount.textContent = completedTasks.length;
  totalCount.textContent = allTasks.length;
}

function createTaskRow(taskName) {
  const row = document.createElement('li');
  row.className = 'task-item';
  row.style.setProperty('--check-color', '#8275c5');

  const label = document.createElement('label');
  label.className = 'task-label';

  const checkbox = document.createElement('input');
  checkbox.className = 'task-checkbox-input';
  checkbox.type = 'checkbox';

  const checkboxDisplay = document.createElement('span');
  checkboxDisplay.className = 'task-checkbox-visual';
  checkboxDisplay.setAttribute('aria-hidden', 'true');

  const text = document.createElement('span');
  text.className = 'task-text';
  text.textContent = taskName; // Safe: text is not interpreted as HTML.

  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'task-menu-button';
  menuButton.setAttribute('aria-label', `Options for ${taskName}`);
  menuButton.setAttribute('aria-expanded', 'false');
  const dots = document.createElement('span');
  dots.setAttribute('aria-hidden', 'true');
  dots.textContent = '⋮';
  menuButton.append(dots);

  label.append(checkbox, checkboxDisplay, text);
  row.append(label, menuButton);
  return row;
}

// Add on + click, or when Enter is pressed in the field.
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskName = taskInput.value.trim();

  if (!taskName) return; // Empty or spaces-only input adds nothing.

  taskList.appendChild(createTaskRow(taskName));
  taskInput.value = ''; // Clear after a successful addition.
  updateTaskCounter();
  announcement.textContent = `Added task: ${taskName}`;
  taskInput.focus();
});

// Change task completion, using event delegation so newly added tasks work too.
taskList.addEventListener('change', (event) => {
  if (event.target.matches('.task-checkbox-input')) updateTaskCounter();
});

// The optional three-dot menu allows a task to be deleted.
function closeTaskMenus() {
  taskList.querySelectorAll('.task-popover').forEach((popover) => popover.remove());
  taskList.querySelectorAll('.task-menu-button[aria-expanded="true"]').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
}

taskList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-button');
  if (deleteButton) {
    const row = deleteButton.closest('.task-item');
    const name = row.querySelector('.task-text').textContent;
    row.remove();
    updateTaskCounter();
    announcement.textContent = `Deleted task: ${name}`;
    return;
  }

  const menuButton = event.target.closest('.task-menu-button');
  if (!menuButton) return;

  const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
  closeTaskMenus();
  if (wasOpen) return;

  const popover = document.createElement('div');
  popover.className = 'task-popover';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'delete-button';
  button.textContent = 'Delete task';
  popover.append(button);
  menuButton.closest('.task-item').append(popover);
  menuButton.setAttribute('aria-expanded', 'true');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.task-menu-button, .task-popover')) closeTaskMenus();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeTaskMenus();
});

updateTaskCounter();
