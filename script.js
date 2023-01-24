const addButton = document.querySelector('.button--add');
const todoInput = document.querySelector('input');
const todoList = document.querySelector('.toDo-list');
const doneList = document.querySelector('.done-list');

addButton.onclick = function(event) {
	event.preventDefault();
	let todoLi = document.createElement('LI');
	todoLi.classList.add('.todo-li');
	todoLi.innerText = todoInput.value;
	todoList.append(todoLi);
	todoInput.value = '';
}
