import { Todo } from "./ITodo";

// Exportera klassen TodoList 
export class TodoList {
  // Statisk array av todos
  static todos: Todo[] = [];

  // Laddar todos från localStorage och initierar `todos` arrayen
  static loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    if (data) {
      TodoList.todos = JSON.parse(data);
    }
  }
  // Sparar nuvarande tillstånd av `todos` arrayen till localStorage
  static saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(TodoList.todos));
  }
  /* Lägger till en ny todo till `todos` arrayen baserat på given task och priority.
  Returnerar true om operationen lyckades, annars false */
  static addTodo(task: string, priority: '1' | '2' | '3'): boolean {
    if (task === '' || !['1', '2', '3'].includes(priority)) {
      return false;
    }
    const newTodo: Todo = { task, completed: false, priority };
    TodoList.todos.push(newTodo);
    TodoList.saveToLocalStorage();
    return true;
  }
  // Markerar en todo som klar
  static markTodoCompleted(index: number) {
    if (index >= 0 && index < TodoList.todos.length) {
      TodoList.todos[index].completed = true;
      TodoList.saveToLocalStorage();
    }
  }
  // Rensar todos arrayen
  static clearTodos() {
    TodoList.todos = [];
    TodoList.saveToLocalStorage();
  }

  static getTodos(): Todo[] {
    return TodoList.todos;
  }
  // Tar bort en todo baserat på dess index. Ändringarna sparas sedan i localStorage.
  static removeTodo(index: number) {
    TodoList.todos.splice(index, 1); 
    TodoList.saveToLocalStorage();
  }
  
}