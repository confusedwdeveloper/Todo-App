import { getFilters, setFilters } from './filters'
import {saveTodos, getTodos, createTodo, removeTodo, toggleTodo, loadTodos } from './todos'
import { renderTodos } from './views'

renderTodos()

document.querySelector('#filter').addEventListener('input',(e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()   
})
// working on form
document.querySelector('#todo-form').addEventListener('submit',(e) => {
    e.preventDefault()
    let text = e.target.elements.newTodo.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.newTodo.value = ''
    }
    
})
// setting up event listener for checkbox
document.querySelector('#checkbox').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
   renderTodos()
})

// setting up synchorization
window.addEventListener('storage', (e) => {
    if (e.key === 'todo') {
        loadTodos()
        renderTodos()
    }
})