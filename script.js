const addButton = document.querySelector('.button--add');
const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.toDo-list');
const doneList = document.querySelector('.done-list');

const mockTodo = ['Learn JS', 'Learn DOM and CSS', 'Learn ReactJS']

const addTodo = function (content) {
	if (content === '') {
		let timerId = setInterval(() => {
			todoInput.classList.toggle('empty-error');
		}, 200);
		setTimeout(() => clearInterval(timerId), 1200);
		todoInput.classList.remove('empty-error');
		return ;
	}
	let todoLi = document.createElement('LI');
	todoLi.classList.add('todo-li');
	todoLi.innerText = content;
	let doneButton = document.createElement('input');
	doneButton.setAttribute('type', 'button');
	doneButton.setAttribute('value', 'V');
	// doneButton.setAttribute('hidden', false);
	todoLi.append(doneButton);
	todoList.append(todoLi);
}

addEventListener('DOMContentLoaded', () => {
	mockTodo.map(elem => addTodo(elem));
})

addButton.onclick = function(event) {
	event.preventDefault();
	addTodo(todoInput.value);
	todoInput.value = '';
}

todoList.addEventListener('click', function(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return ;
	}
	console.log('button click!');
	let li =  target.get
})