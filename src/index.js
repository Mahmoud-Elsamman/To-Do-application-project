
import { renderingTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'


document.querySelector("#filter-todo").addEventListener("input",(ev) => {

    setFilters({
        searchText: ev.target.value
    })
    renderingTodos()
})

renderingTodos()

document.querySelector("#new-todo").addEventListener("submit" , (ev) => {

    const text = ev.target.text.value.trim()
    ev.preventDefault()

    if(text.length > 0)
    {
        createTodo(text)
        renderingTodos()
        ev.target.text.value = ''
    }
    else
    {
        alert('You must type a TODO!')
    }
})

document.querySelector("#hide-completed").addEventListener("change" , (ev) => {

   setFilters({
       hideCompleted: ev.target.checked
   })
   renderingTodos()
})

window.addEventListener('storage', (ev) => {

    if(ev.key === 'toDoList'){
        loadTodos()
        renderingTodos()
    }
})