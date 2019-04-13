// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
//............................................................................................

import uuidv4 from 'uuid/v4'

//setting up empty todos array
let todos = []

// A function to load todos
const loadTodos = () => {
    const todoJson = localStorage.getItem('todo')
    try {
        todos = todoJson ? JSON.parse(todoJson) : []
    } catch (e) {
        todos = []
    }
}

// Function to save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todo', JSON.stringify(todos))
}

// function to expose todos to other files
const getTodos = () => todos

// Function to createtodo
const createTodo = (todoText) => {
    todos.push({
        id: uuidv4(),
            text: todoText,
            completed: false
    })
    saveTodos()
}

// Function to remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((i) => i.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// function to toggle completed status of todos
const toggleTodo = (id) => {
    const todo = todos.find((i) => i.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()
export { saveTodos, getTodos, createTodo, removeTodo, toggleTodo, loadTodos }