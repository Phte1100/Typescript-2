import { Todo } from "./ITodo";

export class TodoList {
  static todos: Todo[] = [];

  static loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    if (data) {
      TodoList.todos = JSON.parse(data);
    }
  }

  static saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(TodoList.todos));
  }

  static addTodo(task: string, priority: '1' | '2' | '3'): boolean {
    if (task === '' || !['1', '2', '3'].includes(priority)) {
      return false;
    }
    const newTodo: Todo = { task, completed: false, priority };
    TodoList.todos.push(newTodo);
    TodoList.saveToLocalStorage();
    return true;
  }

  static markTodoCompleted(index: number) {
    if (index >= 0 && index < TodoList.todos.length) {
      TodoList.todos[index].completed = true;
      TodoList.saveToLocalStorage();
    }
  }

  static clearTodos() {
    TodoList.todos = [];
    TodoList.saveToLocalStorage();
  }

  static getTodos(): Todo[] {
    return TodoList.todos;
  }
}