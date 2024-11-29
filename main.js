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
        this.renderTasks();
    }

    renderTasks() {
        this.todoList.innerHTML = '';
        
        // Render active tasks first
        const activeTasks = this.tasks.filter(task => !task.completed);
        const completedTasks = this.tasks.filter(task => task.completed);
        
        [...activeTasks, ...completedTasks].forEach(task => this.renderTask(task));
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
            this.renderTasks();
        });

        const label = document.createElement('span');
        label.className = 'task-label';
        label.textContent = task.text;
        label.setAttribute('contenteditable', 'true');
        
        // Make the label clickable
        label.addEventListener('click', (e) => {
            e.target.focus();
        });
        
        // Handle edit functionality
        label.addEventListener('blur', () => {
            const newText = label.textContent.trim();
            if (newText !== task.text) {
                if (newText) {
                    task.text = newText;
                } else {
                    this.tasks = this.tasks.filter(t => t.id !== task.id);
                }
                this.renderTasks();
            }
        });
        
        label.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                label.blur();
            }
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        this.todoList.appendChild(taskElement);
    }
}

// Initialize the app
const todoList = new TodoList();