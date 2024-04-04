import { TodoList } from "./TodoList";
document.addEventListener('DOMContentLoaded', () => {
    TodoList.loadFromLocalStorage();
    updateUI();
    const form = document.getElementById('todoForm');
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('priority');
    form.onsubmit = (e) => {
        e.preventDefault();
        if (TodoList.addTodo(taskInput.value, priorityInput.value)) {
            taskInput.value = '';
            priorityInput.value = '1';
            updateUI();
        }
        else {
            alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
        }
    };
    const clearButton = document.getElementById('clearTodosButton');
    clearButton.onclick = () => {
        TodoList.clearTodos();
        updateUI();
    };
});
// Uppdatera UI-funktionen
function updateUI() {
    const userDetailsDiv = document.getElementById("todoDetails");
    if (userDetailsDiv) {
        userDetailsDiv.innerHTML = '';
        TodoList.getTodos().sort((a, b) => parseInt(a.priority) - parseInt(b.priority)).forEach((todo, index) => {
            const todoDiv = document.createElement('div');
            todoDiv.className = todo.completed ? "todo-completed" : "";
            todoDiv.innerHTML = `
        <ul>
          <li><strong>Att göra:</strong> ${todo.task}</li>
          <li><strong>Prioritering:</strong> ${todo.priority}</li>
          <li><strong>Genomförd:</strong> ${todo.completed ? "Ja" : "Nej"}</li>
        </ul>
        <button id="compButton-${index}">Markera som klar</button>
      `;
            userDetailsDiv.appendChild(todoDiv);
            // Lägg till onclick-händelsehanterare
            const button = document.getElementById(`compButton-${index}`);
            if (button) {
                button.onclick = () => {
                    TodoList.markTodoCompleted(index);
                    updateUI();
                };
            }
        });
    }
}
