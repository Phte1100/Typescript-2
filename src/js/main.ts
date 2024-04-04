import { TodoList } from "./TodoList";
// Importera TodoList-klassen från filen TodoList.ts

// Väntar tills DOM är laddat
document.addEventListener('DOMContentLoaded', () => {
  TodoList.loadFromLocalStorage();
  updateUI();

  // Hämtar inputdatan
  const form = document.getElementById('todoForm') as HTMLFormElement;
  const taskInput = document.getElementById('task') as HTMLInputElement;
  const priorityInput = document.getElementById('priority') as HTMLSelectElement;

  form.onsubmit = (e) => {

    // Förhindra standardbeteendet för formulärsubmit
    e.preventDefault();
    if (TodoList.addTodo(taskInput.value, priorityInput.value as '1' | '2' | '3')) {
      taskInput.value = '';
      priorityInput.value = '1';
      updateUI();
    } else {
      alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
    }
  };

  const clearButton = document.getElementById('clearTodosButton') as HTMLButtonElement;
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
      `;

      // lägg till "Markera som klar"-knappen
      const markCompletedButton = document.createElement('button');
      markCompletedButton.innerText = 'Markera som klar';
      markCompletedButton.id = `compButton-${index}`; // Ger knappen ett unikt ID
      markCompletedButton.onclick = () => {
        TodoList.markTodoCompleted(index);
        updateUI();
      };

      // lägg till "Radera"-knappen
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Radera';
      deleteButton.id = `delButton-${index}`; // Ger knappen ett unikt ID
      deleteButton.onclick = () => {
        TodoList.removeTodo(index);
        updateUI();
      };

      todoDiv.appendChild(markCompletedButton);
      todoDiv.appendChild(deleteButton);

      userDetailsDiv.appendChild(todoDiv);
    });
  }
}


