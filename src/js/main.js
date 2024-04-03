class TodoList {
    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    addTodo(task, priority) {
        if (task === '' || !['1', '2', '3'].includes(priority)) {
            return false;
        }
        const newTodo = {
            task: task,
            completed: false,
            priority: priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }
    markTodoCompleted(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = true;
            this.saveToLocalStorage();
        }
    }
    getTodos() {
        return this.todos;
    }
    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    loadFromLocalStorage() {
        const data = localStorage.getItem('todos');
        if (data) {
            this.todos = JSON.parse(data);
        }
    }
    clearTodos() {
        this.todos = [];
        this.saveToLocalStorage();
    }
    printUserDetails() {
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
