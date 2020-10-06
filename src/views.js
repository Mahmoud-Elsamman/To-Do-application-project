import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

// Render application todos based on filters 

const renderingTodos = () => {

    const { searchText, hideCompleted } = getFilters()

    let filterdTodos = getTodos().filter( (todo) => {

        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())

        const hideCompletedMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch

    })

    let nonCompletedTodos = filterdTodos.filter( (todo) => !todo.completed )

    document.querySelector("#todos").innerHTML = ''
    
    let todoSummaryDOM = generateSummaryDOM(nonCompletedTodos)
    document.querySelector('#todos').appendChild(todoSummaryDOM)

    if (filterdTodos.length > 0) {

        filterdTodos.forEach( (todo) => {
    
            let eachFilterdTodo = generateTodoDOM(todo)
            document.querySelector('#todos').appendChild(eachFilterdTodo)
        })

    } else {
        const emptyMsgElement = document.createElement('p')
        emptyMsgElement.classList.add('empty-message')
        emptyMsgElement.textContent = 'No Todos to show'
        document.querySelector('#todos').appendChild(emptyMsgElement)
    }

    
}


// Get the DOM element for an individual todo

const generateTodoDOM = (todoElement) => {

    const todoDomElement = document.createElement('label')
    const containerDomElement = document.createElement('div')
    const checkBoxDomElement = document.createElement('input')
    const textDomElement = document.createElement('span')
    const buttonDomElement = document.createElement('button')

    // Setup todo checkbox
    checkBoxDomElement.setAttribute('type' , 'checkbox')
    checkBoxDomElement.checked = todoElement.completed
    containerDomElement.appendChild(checkBoxDomElement)

    checkBoxDomElement.addEventListener('change' , (ev) => { 
        toggleTodo(todoElement.id)
        renderingTodos()
    })
    

    // Setup the todo text 
    textDomElement.textContent = todoElement.text
    containerDomElement.appendChild(textDomElement)

    // Setup the todo Dom element 
    todoDomElement.classList.add('list-item')

    // Setup the container 
    containerDomElement.classList.add('list-item__container')
    todoDomElement.appendChild(containerDomElement)

    // Setup the todo remove button
    buttonDomElement.textContent = 'Remove'
    buttonDomElement.classList.add('button', 'button--text')
    todoDomElement.appendChild(buttonDomElement)
    buttonDomElement.addEventListener('click' , () => {
        removeTodo(todoElement.id)
        renderingTodos()

    })
    
    return todoDomElement
}

// Get the DOM element for list summary

let generateSummaryDOM =  (nonCompletedTodos) => {

    let nonCompletedTodoSummary = document.createElement('h3')
    nonCompletedTodoSummary.classList.add('list-title')
    let pluralTodo = nonCompletedTodos.length === 1 ? '' : 's'
    nonCompletedTodoSummary.textContent = `You have ${nonCompletedTodos.length} Todo${pluralTodo} left`
    return nonCompletedTodoSummary
}


export { generateTodoDOM, renderingTodos, generateSummaryDOM }
