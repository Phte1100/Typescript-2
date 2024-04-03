import { TodoList } from "./main"; 
import './domInteractions';

console.log('domInteractions.ts is loaded');
document.addEventListener('DOMContentLoaded', () => {
    
  const todoList = new TodoList();

  todoList.printUserDetails();
  console.log("DOM fully loaded and parsed");
  const form = document.getElementById('todoForm') as HTMLFormElement;
  console.log('Form:', form);
  const taskInput = document.getElementById('task') as HTMLInputElement;
  const priorityInput = document.getElementById('priority') as HTMLSelectElement;

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

  const clearTodosButton = document.getElementById('clearTodosButton') as HTMLButtonElement;
  clearTodosButton.addEventListener('click', () => {
    todoList.clearTodos();
    todoList.printUserDetails();
  });
});
