class TodoList {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById('task-input');
        this.todoList = document.getElementById('todo-list');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const taskText = this.taskInput.value.trim();
                if (taskText) {
                    this.addTask(taskText);
                    this.taskInput.value = '';
                }
            }
        });
    }

    addTask(text) {
        const task = {
            id: Date.now(),
            text,
            completed: false
        };

        this.tasks.push(task);
        this.renderTask(task);
    }

    renderTask(task) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
        });

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = task.text;

        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        this.todoList.appendChild(taskElement);
    }
}

// Initialize the app
const todoList = new TodoList();