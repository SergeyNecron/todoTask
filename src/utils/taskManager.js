// Класс для управления задачами
export class TaskManager {
    // Конструктор класса
    constructor() {
        this.tasks = [];  // Массив для хранения задач
    }

    // Добавление новой задачи
    addTask(text) {
        return {
            id: Date.now(),         // Уникальный идентификатор задачи
            text,                   // Текст задачи
            completed: false        // Статус выполнения
        };
    }

    // Сортировка задач (активные первыми, затем выполненные)
    sortTasks(tasks) {
        const activeTasks = tasks.filter(task => !task.completed);    // Фильтрация активных задач
        const completedTasks = tasks.filter(task => task.completed);  // Фильтрация выполненных задач
        return [...activeTasks, ...completedTasks];                   // Объединение отсортированных задач
    }
}