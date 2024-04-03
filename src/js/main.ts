import { Todo } from "./ITodo";

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

  markTodoCompleted(index: number): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].completed = true;
      this.saveToLocalStorage();
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

  printUserDetails(): void {
    const userDetailsDiv = document.getElementById("todoDetails");
    if (userDetailsDiv) {
      userDetailsDiv.innerHTML = ''; 
      this.todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.innerHTML = `
          <ul>
            <li><strong>Att göra:</strong> ${todo.task}</li>
            <li><strong>Prioritering:</strong> ${todo.priority}</li>
            <li><strong>Genomförd:</strong> ${todo.completed ? "Ja" : "Nej"}</li>
          </ul>
        `;
        userDetailsDiv.appendChild(todoDiv);
      });
    }
  }

}

console.log("test att main körs!");
export { TodoList };

