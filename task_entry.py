import tkinter as tk
import styles

class TaskEntry(tk.Entry):
    def __init__(self, parent):
        super().__init__(
            parent,
            font=styles.ENTRY_FONT,
            bg=styles.ENTRY_BG,
            fg=styles.TEXT_COLOR,
            insertbackground=styles.TEXT_COLOR,
            relief=tk.FLAT
        )
        
        self.on_task_add = None
        self.bind("<Return>", self._handle_return)
    
    def _handle_return(self, event):
        task_text = self.get().strip()
        if task_text and self.on_task_add:
            self.on_task_add(task_text)
            self.delete(0, tk.END)