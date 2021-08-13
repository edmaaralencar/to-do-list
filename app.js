const formAddTodo = document.querySelector('.form-add-todo')
const todosContainer = document.querySelector('.todos-container')
const inputSearchTodo = document.querySelector('.form-search input')


const addTodo = inputValue => {
  if (inputValue.length) { 
      todosContainer.innerHTML += `
      <li data-todo="${inputValue}" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${inputValue}</span>
        <div class="options">
          <i data-trash="${inputValue}" class="far fa-trash-alt delete"></i>
        </div>
      </li>
    `

    event.target.reset()
  }
}

const removeTodo = event => {
  const clickedElement = event.target
  const dataTrashValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${dataTrashValue}"]`)

  if (dataTrashValue) {
    todo.remove()
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

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  addTodo(inputValue)
})
todosContainer.addEventListener('click', event => removeTodo(event))
inputSearchTodo.addEventListener('input', event => filterTodos(event))

