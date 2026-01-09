function loadTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => renderTasks(data));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    fetch('/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskInput.value })
    })
    .then(response => response.json())
    .then(data => {
        taskInput.value = '';
        renderTasks(data);
    });
}

function completeTask(index) {
    fetch(`/complete/${index}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => renderTasks(data));
}

function deleteTask(index) {
    fetch(`/delete/${index}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => renderTasks(data));
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        li.innerHTML = `
            ${task.task}
            <div>
                <button onclick="completeTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}


