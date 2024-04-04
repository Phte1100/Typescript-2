export class TodoList {
    static loadFromLocalStorage() {
        const data = localStorage.getItem('todos');
        if (data) {
            TodoList.todos = JSON.parse(data);
        }
    }
    static saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(TodoList.todos));
    }
    static addTodo(task, priority) {
        if (task === '' || !['1', '2', '3'].includes(priority)) {
            return false;
        }
        const newTodo = { task, completed: false, priority };
        TodoList.todos.push(newTodo);
        TodoList.saveToLocalStorage();
        return true;
    }
    static markTodoCompleted(index) {
        if (index >= 0 && index < TodoList.todos.length) {
            TodoList.todos[index].completed = true;
            TodoList.saveToLocalStorage();
        }
    }
    static clearTodos() {
        TodoList.todos = [];
        TodoList.saveToLocalStorage();
    }
    static getTodos() {
        return TodoList.todos;
    }
}
TodoList.todos = [];
