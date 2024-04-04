"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TodoList_1 = require("./TodoList");
// Importera TodoList-klassen från filen TodoList.ts
// Väntar tills DOM är laddat
document.addEventListener('DOMContentLoaded', function () {
    TodoList_1.TodoList.loadFromLocalStorage();
    updateUI();
    // Hämtar inputdatan
    var form = document.getElementById('todoForm');
    var taskInput = document.getElementById('task');
    var priorityInput = document.getElementById('priority');
    form.onsubmit = function (e) {
        // Förhindra standardbeteendet för formulärsubmit
        e.preventDefault();
        if (TodoList_1.TodoList.addTodo(taskInput.value, priorityInput.value)) {
            taskInput.value = '';
            priorityInput.value = '1';
            updateUI();
        }
        else {
            alert('Ogiltig inmatning. Kontrollera uppgiften och prioritet.');
        }
    };
    var clearButton = document.getElementById('clearTodosButton');
    clearButton.onclick = function () {
        TodoList_1.TodoList.clearTodos();
        updateUI();
    };
});
// Uppdatera UI-funktionen
function updateUI() {
    var userDetailsDiv = document.getElementById("todoDetails");
    if (userDetailsDiv) {
        userDetailsDiv.innerHTML = '';
        TodoList_1.TodoList.getTodos().sort(function (a, b) { return parseInt(a.priority) - parseInt(b.priority); }).forEach(function (todo, index) {
            var todoDiv = document.createElement('div');
            todoDiv.className = todo.completed ? "todo-completed" : "";
            todoDiv.innerHTML = "\n        <ul>\n          <li><strong>Att g\u00F6ra:</strong> ".concat(todo.task, "</li>\n          <li><strong>Prioritering:</strong> ").concat(todo.priority, "</li>\n          <li><strong>Genomf\u00F6rd:</strong> ").concat(todo.completed ? "Ja" : "Nej", "</li>\n        </ul>\n      ");
            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Radera';
            deleteButton.onclick = function () {
                TodoList_1.TodoList.removeTodo(index);
                updateUI();
            };
            todoDiv.appendChild(deleteButton);
            userDetailsDiv.appendChild(todoDiv);
        });
    }
}
