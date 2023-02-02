const addButton = document.querySelector('.button--add');
const todoInput = document.querySelector('.input-todo');
const todoList = document.querySelector('.todo-list');
const doneList = document.querySelector('.list-done');
const todoHead = document.querySelector('.list-todo-container .list-header');
const doneHead = document.querySelector('.list-done-container .list-header');
const statsTotal = document.querySelector('.stats-total');
const cheeringPopup = document.querySelector('.window-message');

const stats = {
	remaining: 0,
	done: 0,
	refresh: function() {
		this.remaining = todoList.children.length;
		this.done = doneList.children.length;
		todoHead.innerText = 'ToDo: ' + this.remaining;
		doneHead.innerText = 'Done: ' + this.done;
	}
}

let allTodos = {
	notDone: [],
	done: [],
	total: 0,
}

const motivationPhrases = ['Well done!', 'Amazing!', 'Great!', 'Good Job!', 'Great Job!'];
let emptyErrorTrigger = false;

function handleInput(content) {
	if (content === '') {
		if (emptyErrorTrigger) {
			return;
		}
		emptyErrorTrigger = true;
		let timerId = setInterval(() => {
			todoInput.classList.toggle('empty-error');
		}, 200);
		setTimeout(() => {
			emptyErrorTrigger = false;
			clearInterval(timerId)
		}, 1200);
		todoInput.classList.remove('empty-error');
	} else {
		allTodos.notDone.push(content);
		localStorage.setItem('allTodos', JSON.stringify(allTodos));
		addToTodoList(content);
	}
}

function addToTodoList(content) {
	let todoLi = document.createElement('LI');
	todoLi.classList.add('todo-li');
	todoLi.innerHTML = content;
	let doneButton = new CreateButton('button-done', 'V', 'move to Done');
	todoLi.append(doneButton);
	todoList.append(todoLi);
	stats.refresh();
}

// const mockTodo = ['Learn JS', 'Learn DOM and CSS', 'Learn React'];
// const mockDone = ['Take a shower', 'Go to the gym'];

function CreateButton(selector, value, title = '') {
	let button = document.createElement('button');
	button.innerText = value;
	button.setAttribute('title', title);
	button.classList.add(selector);
	return button;
}

const addToDone = function (text) {
	let todoDone = document.createElement('li');
	todoDone.classList.add('li-done');
	todoDone.innerText = text;
	let deleteButton = new CreateButton('button-done', 'X', 'delete ToDo');
	todoDone.append(deleteButton);
	doneList.prepend(todoDone);
	stats.refresh();
}

function putDateAndTime() {
	let date = new Date();
	const timeElem = document.querySelector('.time');
	const dateElem = document.querySelector('.date');
	//place the time and date
	timeElem.innerHTML = `${date.getHours()} : 
		${date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes()}`;
	dateElem.innerHTML = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function showMessage() {
	if (cheeringPopup.classList.contains('show')) {
		return ;
	}
	let text = motivationPhrases[Math.floor(Math.random() * motivationPhrases.length)];
	cheeringPopup.innerText = text;
	// let elemWidth = cheeringPopup.offsetWidth;
	cheeringPopup.style.left = `${window.innerWidth / 2 - cheeringPopup.offsetWidth / 2}px`
	cheeringPopup.classList.toggle('show');
	setTimeout(() => cheeringPopup.classList.toggle('show'), 1500);
}

//move to-do from notDoneList to doneList when click on done button:
todoList.addEventListener('click', function (event) {
	let target = event.target;
	if (target.tagName !== 'BUTTON') {
		return;
	}
	let doneTodo = target.closest('.todo-li');
	let doneTodoText = doneTodo.innerText;
	doneTodoText = doneTodoText.slice(0, doneTodoText.length - 2);
	doneTodo.remove();
	addToDone(doneTodoText);
	allTodos.notDone.splice(allTodos.notDone.indexOf(doneTodoText), 1);
	allTodos.done.push(doneTodoText);
	allTodos.total++;
	localStorage.setItem('allTodos', JSON.stringify(allTodos));
	statsTotal.innerText = 'Total completed: ' + allTodos.total;
	//show motivation message:
	showMessage();
})

addButton.onclick = function (event) {
	event.preventDefault();
	handleInput(todoInput.value);
	todoInput.value = '';
}

//remove to-do from doneList:
doneList.addEventListener('click', function (event) {
	if (event.target.tagName !== 'BUTTON') {
		return;
	}
	let elem = event.target.closest('.li-done');
	let todoText = elem.innerText.slice(0, -2);
	allTodos.done.splice(allTodos.done.indexOf(todoText), 1);
	localStorage.setItem('allTodos', JSON.stringify(allTodos));
	elem.remove();
	stats.refresh();
});

//actions on page load:
document.addEventListener('DOMContentLoaded', () => {
	// mockTodo.map(elem => {
	// 	allTodos.notDone.push(elem)
	// });
	// mockDone.map(elem => {
	// 	allTodos.done.push(elem)
	// });
	// localStorage.setItem('allTodos', JSON.stringify(allTodos));
	putDateAndTime();
	setInterval(putDateAndTime, 5000);
	if (JSON.parse(localStorage.getItem('allTodos'))) {
		allTodos = JSON.parse(localStorage.getItem('allTodos'));
	}
	statsTotal.innerText = 'Total completed: ' + allTodos.total;
	allTodos.notDone.map((el) => addToTodoList(el));
	allTodos.done.map((el) => addToDone(el));
	stats.refresh();
})