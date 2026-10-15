(() => {
  const counter = document.getElementById('counter');
  const dateEl = document.getElementById('date');
  const taskList = document.getElementById('task-list');

  if (!counter || !taskList) return;

  function updateCounter() {
    const boxes = taskList.querySelectorAll('input[type="checkbox"]');
    const done = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
    counter.textContent = done + '/' + boxes.length;
  }

  function showDate() {
    if (!dateEl) return;
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    dateEl.textContent = dd + '.' + mm + '.' + now.getFullYear();
  }

  taskList.addEventListener('change', updateCounter);
  new MutationObserver(updateCounter).observe(taskList, { childList: true });

  showDate();
  updateCounter();
})();
