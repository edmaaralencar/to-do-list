const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.form-search input')

let index = 3

const insertTodoIntoDOM = inputValue => {
  todosContainer.innerHTML += `
    <li data-number="${index}" class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i data-set="${index}" class="far fa-trash-alt delete"></i>
    </li>
  `
  event.target.reset()
} 

const addTodo = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  if (inputValue.length) { 

    insertTodoIntoDOM(inputValue)
  }
  index++
}

const removeTodo = event => {
  const clickedElement = event.target
  console.log(clickedElement)
  const clickedElementHasDeleteClass = clickedElement.classList.contains('delete')

  if (clickedElementHasDeleteClass) {
    const todosItems = document.querySelectorAll('li')
     
    todosItems.forEach(todo => {
      const attributeOfLi = todo.dataset.number
      const attributeOfClickedElement = clickedElement.dataset.set

      if (attributeOfLi === attributeOfClickedElement) {
        todo.remove()
      }
    })
  }
}

const hideUnfilteredTodos = todo => {
  todo.classList.remove('d-flex')
  todo.classList.add('hidden')
}

const showUnfilteredTodos = todo => {
  todo.classList.remove('hidden')
  todo.classList.add('d-flex')
}

const filterTodos = event => {
  const inputValue = event.target.value.trim().toLowerCase()

  const todosContainerInArray = Array.from(todosContainer.children)
  const todoTextDoesntIncludeInputValue = todo => !todo.textContent.toLowerCase().includes(inputValue)
  const todoTextIncludeInputValue = todo => todo.textContent.toLowerCase().includes(inputValue)

  todosContainerInArray
    .filter(todo => todoTextDoesntIncludeInputValue(todo))
    .forEach(todo => hideUnfilteredTodos(todo))

  todosContainerInArray
    .filter(todo => todoTextIncludeInputValue(todo))
    .forEach(todo => showUnfilteredTodos(todo)) 
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
inputSearchTodo.addEventListener('input', filterTodos)






// todosContainer.addEventListener('click', event => {
//   const clickedElement = event.target

//   if (clickedElement.classList.contains('delete')) {
//     clickedElement.parentElement.remove()
//   }
// })

