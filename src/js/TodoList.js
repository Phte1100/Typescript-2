"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
var TodoList = /** @class */ (function () {
    function TodoList() {
    }
    TodoList.loadFromLocalStorage = function () {
        var data = localStorage.getItem('todos');
        if (data) {
            TodoList.todos = JSON.parse(data);
        }
    };
    TodoList.saveToLocalStorage = function () {
        localStorage.setItem('todos', JSON.stringify(TodoList.todos));
    };
    TodoList.addTodo = function (task, priority) {
        if (task === '' || !['1', '2', '3'].includes(priority)) {
            return false;
        }
        var newTodo = { task: task, completed: false, priority: priority };
        TodoList.todos.push(newTodo);
        TodoList.saveToLocalStorage();
        return true;
    };
    TodoList.markTodoCompleted = function (index) {
        if (index >= 0 && index < TodoList.todos.length) {
            TodoList.todos[index].completed = true;
            TodoList.saveToLocalStorage();
        }
    };
    TodoList.clearTodos = function () {
        TodoList.todos = [];
        TodoList.saveToLocalStorage();
    };
    TodoList.getTodos = function () {
        return TodoList.todos;
    };
    TodoList.removeTodo = function (index) {
        TodoList.todos.splice(index, 1);
        TodoList.saveToLocalStorage();
    };
    TodoList.todos = [];
    return TodoList;
}());
exports.TodoList = TodoList;
