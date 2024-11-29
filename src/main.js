// Импорт необходимых компонентов и утилит
import { TaskManager } from './utils/taskManager.js';
import { TaskInput } from './components/TaskInput.js';
import { TaskItem } from './components/TaskItem.js';

// Основной класс приложения
class TodoList {
    constructor() {
        this.taskManager = new TaskManager();
        this.tasks = [];
        this.activeList = document.getElementById('active-list');
        this.completedList = document.getElementById('completed-list');
        
        // Создание поля ввода
        const taskInputElement = document.getElementById('task-input');
        if (taskInputElement) {
            this.taskInput = new TaskInput((text) => this.addTask(text));
            taskInputElement.replaceWith(this.taskInput.element);
        }
        
        // Начальная отрисовка
        this.renderTasks();
    }

    // Добавление новой задачи
    addTask(text) {
        const task = this.taskManager.addTask(text);
        this.tasks.push(task);
        this.renderTasks();
    }

    // Обновление статуса задачи
    updateTaskStatus(taskId, completed) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = completed;
            this.renderTasks();
        }
    }

    // Обновление текста задачи
    updateTaskText(taskId, newText) {
        if (!newText) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
        } else {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                task.text = newText;
            }
        }
        this.renderTasks();
    }

    // Отрисовка списка задач
    renderTasks() {
        if (!this.activeList || !this.completedList) return;

        this.activeList.innerHTML = '';
        this.completedList.innerHTML = '';
        
        // Разделение задач на активные и выполненные
        const activeTasks = this.tasks.filter(task => !task.completed);
        const completedTasks = this.tasks.filter(task => task.completed);
        
        // Отрисовка активных задач
        activeTasks.forEach(task => {
            const taskItem = new TaskItem(
                task,
                (id, completed) => this.updateTaskStatus(id, completed),
                (id, text) => this.updateTaskText(id, text)
            );
            this.activeList.appendChild(taskItem.element);
        });
        
        // Отрисовка выполненных задач
        completedTasks.forEach(task => {
            const taskItem = new TaskItem(
                task,
                (id, completed) => this.updateTaskStatus(id, completed),
                (id, text) => this.updateTaskText(id, text)
            );
            this.completedList.appendChild(taskItem.element);
        });
    }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
});