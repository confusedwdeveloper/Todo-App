import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// A function to render Todos
const renderTodos = () => {
    const array = getTodos()
    const object = getFilters()
    // create a filter list
    let newArr = array.filter((i) => i.text.toUpperCase().trim().includes(object.searchText.toUpperCase().trim()))
     newArr = newArr.filter((i) => {
        if (object.hideCompleted) {
            return !i.completed
        } else {
            return true
        }
        
        
    })
    const divEl =  document.querySelector('#div')
    
    // lets clear div before rendering 
    divEl.innerHTML = ''
    //generate summary 
    divEl.appendChild(generateSummaryDOM(newArr))

    // Render filtered list
    if (newArr.length > 0){
        newArr.forEach((i) => {
            const newV = generateTodoDOM(i)
           
            divEl.appendChild(newV)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Nothing to show over here'
        emptyMessage.classList.add('empty-message')
        divEl.appendChild(emptyMessage)
    }
}

// function to generate Todo dom elements
const generateTodoDOM = (i) => {
    // create root container
    const rootDiv = document.createElement('label')

    // creating div to make it easy to style
    const containerEl = document.createElement('div')

    // Set up and append a checkbox
    const checkDom = document.createElement('input')
    checkDom.setAttribute('type', 'checkbox')
    checkDom.checked = i.completed // checkbox event listener below
    containerEl.appendChild(checkDom)
    checkDom.addEventListener('change', (e) => {
        toggleTodo(i.id)
        renderTodos()
    })
        // set up and append a span
    const newV = document.createElement('span')
    newV.textContent = i.text
    containerEl.appendChild(newV)

    // set up container and classes
    rootDiv.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    rootDiv.appendChild(containerEl)


    // set up and append button
    const todoButton = document.createElement('button')
    todoButton.textContent = 'Remove'
    todoButton.classList.add('button', 'button--text')
    rootDiv.appendChild(todoButton)
    todoButton.addEventListener('click', (e) => {
        removeTodo(i.id)
        renderTodos()
    })

    return rootDiv
}

// A function to generate summary DOM
const generateSummaryDOM = (newArr) => {
     // Render number of todo left to complete
     const leftTodo = newArr.filter((item,index) => !item.completed)

     const newEl = document.createElement('h2')
     newEl.classList.add('list-title')
     const todo = leftTodo.length === 1 ? 'todo' : 'todos'
     newEl.textContent = `You have ${leftTodo.length} ${todo} left to complete`
     return newEl
}

export { renderTodos }
