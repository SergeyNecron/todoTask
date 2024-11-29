// Компонент поля ввода новой задачи
export class TaskInput {
    // Инициализация компонента
    constructor(onTaskAdd) {
        this.element = document.createElement('input');           // Создание элемента ввода
        this.element.type = 'text';                             // Установка типа input
        this.element.id = 'task-input';                         // Установка ID
        this.element.className = 'task-input';                  // Установка класса стилей
        this.element.placeholder = 'New task...';               // Установка плейсхолдера
        
        // Обработчик нажатия клавиши Enter
        this.element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const taskText = this.element.value.trim();     // Получение текста задачи
                if (taskText) {
                    onTaskAdd(taskText);                        // Вызов callback-функции
                    this.element.value = '';                    // Очистка поля ввода
                }
            }
        });
    }
}