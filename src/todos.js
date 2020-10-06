import { v4 as uuidv4} from 'uuid'

let toDoList = []

// fetch existing todos from localStorage

const loadTodos =  () => {

    let toDoJSON = localStorage.getItem('toDoList')

    toDoList =  toDoJSON  ?  JSON.parse(toDoJSON) : []
}

// Save todos to localStorge

const saveTodos = () => {
    localStorage.setItem('toDoList' , JSON.stringify(toDoList))
}


const getTodos = () => toDoList


const createTodo = (text) => {
    toDoList.unshift({
        id : uuidv4() , 
        text ,
        completed : false 
    })

    saveTodos()
}


// remove the todo by id using the the remove button

const removeTodo = (todoId) => {
    const todoIndex = toDoList.findIndex( (todo) => todo.id === todoId )

    if (todoIndex > -1){
        toDoList.splice(todoIndex,1)
        saveTodos()
    }

}

// Toggle the completed value for a given todo 

const toggleTodo = (todoId) => {

    const theMatchedTodo = toDoList.find( (todo) => todo.id === todoId ) 

    if(theMatchedTodo){
        theMatchedTodo.completed = !theMatchedTodo.completed
        saveTodos()
    }
}


loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }
