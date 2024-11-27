import tkinter as tk
from tkinter import ttk
import styles
from todo_list import TodoList
from task_entry import TaskEntry

class TodoApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Todo List")
        self.root.configure(bg=styles.BACKGROUND_COLOR)
        
        # Configure window size and position
        self.root.geometry("400x600")
        self.root.minsize(300, 400)
        
        # Configure grid weights
        self.root.grid_rowconfigure(1, weight=1)
        self.root.grid_columnconfigure(0, weight=1)
        
        # Create and place the header
        self.header = tk.Label(
            root,
            text="Введите заголовок",
            font=styles.HEADER_FONT,
            bg=styles.BACKGROUND_COLOR,
            fg=styles.TEXT_COLOR
        )
        self.header.grid(row=0, column=0, pady=(20, 10), padx=20, sticky="ew")
        
        # Create and place the task entry
        self.task_entry = TaskEntry(root)
        self.task_entry.grid(row=2, column=0, padx=20, pady=(0, 10), sticky="ew")
        
        # Create and place the todo list
        self.todo_list = TodoList(root)
        self.todo_list.grid(row=1, column=0, padx=20, sticky="nsew")
        
        # Bind the task entry to the todo list
        self.task_entry.on_task_add = self.todo_list.add_task

def main():
    root = tk.Tk()
    app = TodoApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()