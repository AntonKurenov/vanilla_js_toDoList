const addButton = document.querySelector('.button--add');
const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.list-done');
let remaining = 0;
let done = 0;

const mockTodo = ['Learn JS', 'Learn DOM and CSS', 'Learn ReactJS'];

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
	let doneButton = new CreateButton('button-done', 'V',
		'move to Done');
	todoLi.append(doneButton);
	todoList.append(todoLi);
}

addEventListener('DOMContentLoaded', () => {
	mockTodo.map(elem => addTodo(elem));
	// remaining = todoList.
})

addButton.onclick = function(event) {
	event.preventDefault();
	addTodo(todoInput.value);
	todoInput.value = '';
}

function countTodos(type) {
	let [remaining, done] = [...document.querySelectorAll('.list-header')];
	if (type === 'add') {
		// remaining.innerHTM
		return;
	}
}

function CreateButton(selector, value, title = '') {
	let button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', value);
	button.setAttribute('title', title);
	button.classList.add(selector);
	return button;
}

const addToDone = function(text) {
	let todoDone = document.createElement('li');
	todoDone.classList.add('li-done');
	todoDone.innerText = text;
	let deleteButton = new CreateButton('button-done', 'X',
		'delete ToDo');
	todoDone.append(deleteButton);
	doneList.append(todoDone);
}

todoList.addEventListener('click', function(event) {
	let target = event.target;
	if (target.tagName !== 'INPUT') {
		return ;
	}
	let doneTodo = target.closest('.todo-li');
	let doneTodoText = doneTodo.innerText;
	doneTodo.remove();
	addToDone(doneTodoText);
})

doneList.addEventListener('click', function (event) {
	if (event.target.tagName !== 'INPUT') {
		return;
	}
	event.target.closest('.li-done').remove();
});