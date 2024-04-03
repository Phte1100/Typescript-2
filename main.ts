interface Todo {
  task: string;
  completed: boolean;
  priority: '1' | '2' | '3';
}

class TodoList {
  todos: Todo[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: '1' | '2' | '3'): boolean {
    if (task === '' || !['1', '2', '3'].includes(priority)) {
      return false;
    }

    const newTodo: Todo = {
      task: task,
      completed: false,
      priority: priority,
    };

    this.todos.push(newTodo);

    this.saveToLocalStorage();
    return true;
  }

  markTodoCompleted(index: number) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].completed = true;
      this.saveToLocalStorage();
      this.printUserDetails(); // Uppdatera UI för att reflektera ändringen
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    }
  }

  clearTodos(): void {
    this.todos = [];
    this.saveToLocalStorage();
  }
// lyft ut till separat fil
printUserDetails(): void {
  const userDetailsDiv = document.getElementById("todoDetails");
  if (userDetailsDiv) {
    userDetailsDiv.innerHTML = '';

    this.todos.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));

      this.todos.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.className = todo.completed ? "todo-completed" : "";
        todoDiv.innerHTML = `
          <ul>
            <li><strong>Att göra:</strong> ${todo.task}</li>
            <li><strong>Prioritering:</strong> ${todo.priority}</li>
            <li><strong>Genomförd:</strong> ${todo.completed ? "Ja" : "Nej"}</li>
          </ul>
        `;
        const markCompletedButton = document.createElement('button');
        markCompletedButton.innerText = 'Markera som klar';
        markCompletedButton.id = `compButton-${index}`;
        markCompletedButton.addEventListener('click', () => this.markTodoCompleted(index));
        todoDiv.appendChild(markCompletedButton);
        userDetailsDiv.appendChild(todoDiv);
      });
    }
  }
  

}
// lyft ut till separat fil
document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();

  todoList.printUserDetails();

  const form = document.getElementById('todoForm') as HTMLFormElement;
  const taskInput = document.getElementById('task') as HTMLInputElement;
  const priorityInput = document.getElementById('priority') as HTMLSelectElement; // Ändrat till HTMLSelectElement

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const added = todoList.addTodo(taskInput.value, priorityInput.value as '1' | '2' | '3');
    if (added) {
      form.reset();
      todoList.printUserDetails();
    } else {
      alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
    }
  });

  // Flyttat utanför form.onsubmit
  const clearTodosButton = document.getElementById('clearTodosButton') as HTMLButtonElement;
  clearTodosButton.addEventListener('click', () => {
    todoList.clearTodos();
    todoList.printUserDetails();
  });
});

//test