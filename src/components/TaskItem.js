// Компонент отдельной задачи
export class TaskItem {
    // Создание элемента задачи
    constructor(task, onStatusChange, onTextChange) {
        this.element = document.createElement('div');           // Создание контейнера задачи
        this.element.className = 'task-item';                  // Установка класса
        
        // Создание чекбокса
        this.checkbox = this.createCheckbox(task, onStatusChange);
        
        // Создание текстовой метки
        this.label = this.createLabel(task, onTextChange);
        
        // Добавление элементов в контейнер
        this.element.appendChild(this.checkbox);
        this.element.appendChild(this.label);
    }

    // Создание чекбокса
    createCheckbox(task, onStatusChange) {
        const checkbox = document.createElement('input');       // Создание элемента чекбокса
        checkbox.type = 'checkbox';                            // Установка типа
        checkbox.className = 'task-checkbox';                  // Установка класса
        checkbox.checked = task.completed;                     // Установка состояния
        
        // Обработчик изменения состояния
        checkbox.addEventListener('change', () => {
            onStatusChange(task.id, checkbox.checked);
        });
        
        return checkbox;
    }

    // Создание текстовой метки
    createLabel(task, onTextChange) {
        const label = document.createElement('span');          // Создание элемента метки
        label.className = 'task-label';                       // Установка класса
        label.textContent = task.text;                        // Установка текста
        label.setAttribute('contenteditable', 'true');        // Включение редактирования
        
        // Обработчики событий редактирования
        this.setupLabelEvents(label, task, onTextChange);
        
        return label;
    }

    // Настройка обработчиков событий метки
    setupLabelEvents(label, task, onTextChange) {
        // Фокус при клике
        label.addEventListener('click', (e) => {
            e.target.focus();
        });
        
        // Сохранение при потере фокуса
        label.addEventListener('blur', () => {
            const newText = label.textContent.trim();
            if (newText !== task.text) {
                onTextChange(task.id, newText);
            }
        });
        
        // Обработка нажатия Enter
        label.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                label.blur();
            }
        });
    }
}