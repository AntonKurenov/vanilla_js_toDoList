const addButton = document.querySelector('.button--add');
const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.list-done');
const todoHead = document.querySelector('.list-todo-container .list-header');
const doneHead = document.querySelector('.list-done-container .list-header');

const stats = {
  remaining: 0,
	done: 0,
	refresh() {
		this.remaining = todoList.children.length;
		this.done = doneList.children.length;
		todoHead.innerText = 'ToDo: ' + this.remaining;
		doneHead.innerText = 'Done: ' + this.done;
	}
}

const mockTodo = ['Learn JS', 'Learn DOM and CSS', 'Learn React'];
const mockDone = ['Take a shower'];

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
	stats.refresh();
}

addEventListener('DOMContentLoaded', () => {
	mockTodo.map(elem => addTodo(elem));
	mockDone.map(elem => addToDone(elem));
	stats.refresh();
})

addButton.onclick = function(event) {
	event.preventDefault();
	addTodo(todoInput.value);
	todoInput.value = '';
}

function CreateButton(selector, value, title = '') {
	let button = document.createElement('button');
	button.innerHTML = value;
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
	doneList.prepend(todoDone);
	stats.refresh();
}

todoList.addEventListener('click', function(event) {
	let target = event.target;
	if (target.tagName !== 'BUTTON') {
		return ;
	}
	let doneTodo = target.closest('.todo-li');
	let doneTodoText = doneTodo.innerText;
	doneTodoText = doneTodoText.slice(0, doneTodoText.length - 2);
	doneTodo.remove();
	addToDone(doneTodoText);
})

//remove to-do from done list:
doneList.addEventListener('click', function (event) {
	if (event.target.tagName !== 'BUTTON') {
		return;
	}
	event.target.closest('.li-done').remove();
	stats.refresh();
});