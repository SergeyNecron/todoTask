import tkinter as tk
from tkinter import ttk
import styles

class TodoList(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent, bg=styles.BACKGROUND_COLOR)
        
        # Configure grid weights
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(0, weight=1)
        
        # Create canvas and scrollbar
        self.canvas = tk.Canvas(
            self,
            bg=styles.BACKGROUND_COLOR,
            highlightthickness=0
        )
        self.scrollbar = ttk.Scrollbar(
            self,
            orient="vertical",
            command=self.canvas.yview
        )
        
        # Create task frame inside canvas
        self.task_frame = tk.Frame(
            self.canvas,
            bg=styles.BACKGROUND_COLOR
        )
        
        # Configure canvas
        self.canvas.configure(yscrollcommand=self.scrollbar.set)
        self.canvas_frame = self.canvas.create_window(
            (0, 0),
            window=self.task_frame,
            anchor="nw",
            width=self.canvas.winfo_reqwidth()
        )
        
        # Grid layout
        self.canvas.grid(row=0, column=0, sticky="nsew")
        self.scrollbar.grid(row=0, column=1, sticky="ns")
        
        # Bind events
        self.task_frame.bind("<Configure>", self._on_frame_configure)
        self.canvas.bind("<Configure>", self._on_canvas_configure)
        
        self.tasks = []
    
    def add_task(self, task_text):
        task_var = tk.BooleanVar()
        
        task_frame = tk.Frame(
            self.task_frame,
            bg=styles.BACKGROUND_COLOR
        )
        
        checkbox = tk.Checkbutton(
            task_frame,
            variable=task_var,
            bg=styles.BACKGROUND_COLOR,
            fg=styles.CHECKBOX_FG,
            selectcolor=styles.CHECKBOX_BG,
            activebackground=styles.BACKGROUND_COLOR
        )
        
        task_label = tk.Label(
            task_frame,
            text=task_text,
            font=styles.TASK_FONT,
            bg=styles.BACKGROUND_COLOR,
            fg=styles.TEXT_COLOR,
            anchor="w"
        )
        
        checkbox.pack(side=tk.LEFT, padx=(0, 5))
        task_label.pack(side=tk.LEFT, fill=tk.X, expand=True)
        task_frame.pack(fill=tk.X, pady=2)
        
        self.tasks.append((task_frame, task_var, task_label))
    
    def _on_frame_configure(self, event=None):
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))
    
    def _on_canvas_configure(self, event):
        self.canvas.itemconfig(
            self.canvas_frame,
            width=event.width
        )