
 // EasyTask: Add-task logic for desktop and mobile.
 // Matches the IDs and class names used in the group's index.html.
 (() => {
   const taskInput = document.getElementById('task-input');
   const addButton = document.getElementById('add-button');
   const taskList = document.getElementById('task-list');

   if (!taskInput || !addButton || !taskList) {
     console.warn('EasyTask: missing task input, add button, or task list.');
     return;
   }

   function addTask() {
     const taskName = taskInput.value.trim();

     // Empty input adds nothing.
     if (!taskName) return;

     const row = document.createElement('li');
     row.className = 'task-row';

     const label = document.createElement('label');
     label.className = 'task-row__left';

     const checkbox = document.createElement('input');
     checkbox.className = 'task-row__checkbox';
     checkbox.type = 'checkbox';

     const text = document.createElement('span');
     text.className = 'task-row__text';
     text.textContent = taskName;

     const menu = document.createElement('button');
     menu.className = 'task-row__menu';
     menu.type = 'button';
     menu.setAttribute('aria-label', 'Task options');
     menu.textContent = '⋮';

     label.append(checkbox, text);
     row.append(label, menu);
     taskList.append(row);

     // Clear input after adding.
     taskInput.value = '';
     taskInput.focus();
   }

   // Add task when + is clicked.
   addButton.addEventListener('click', addTask);

   // Add task when Enter is pressed.
   taskInput.addEventListener('keydown', (event) => {
     if (event.key === 'Enter') {
       event.preventDefault();
       addTask();
     }
   });
 })();

