import { TodoList } from "./main";
import './domInteractions';
console.log('domInteractions.ts is loaded');
document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList();
    todoList.printUserDetails();
    console.log("DOM fully loaded and parsed");
    const form = document.getElementById('todoForm');
    console.log('Form:', form);
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('priority');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const added = todoList.addTodo(taskInput.value, priorityInput.value);
        if (added) {
            form.reset();
            todoList.printUserDetails();
        }
        else {
            alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
        }
    });
    const clearTodosButton = document.getElementById('clearTodosButton');
    clearTodosButton.addEventListener('click', () => {
        todoList.clearTodos();
        todoList.printUserDetails();
    });
});
