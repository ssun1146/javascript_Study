let todoWrap = document.querySelector('.todo__wrap');
let todoInput = document.querySelector('.todo__input');
let todoBtnAdd = document.querySelector('.todo__btn-add');
let todoContainer = document.querySelector('.todo__container');

let todoBtnSlctAll = document.querySelector('.todo__btn-slct_all');
let todoBtnCpltAll = document.querySelector('.todo__btn-cplt_all');
todoBtnCpltAll.innerHTML = '전체완료'

let todoBtnShowAll = document.querySelector('.todo__btn-show_all');
let todoBtnProgress = document.querySelector('.todo__btn-progress');
let todoBtnDltAll = document.querySelector('.todo__btn-dlt_all');
let todoInfoCount = document.querySelector('.todo__info-count');

let todos = [
	// {id:'r', isCompleted:false, content:'r'},
	// {id:'s', isCompleted:false, content:'s'},
	// {id:'e', isCompleted:false, content:'e'},
	// {id:'f', isCompleted:false, content:'f'},
	// {id:'a', isCompleted:false, content:'a'},
]
let id = 0;

let isAllCompleted = false; 
const setIsAllCompleted = (bool) => { isAllCompleted = bool };

const setTodos = (newTodos) => {
	todos = newTodos;
}

const getAllTodos = () => {
	return todos;
}

const appendTodos = (text) => {
	const newId = id++;
	const newTodos = getAllTodos().concat({id:newId, isCompleted:false, content:text});
	setTodos(newTodos)
	checkIsAllcompleted();
	paintTodo();	// 리스트 추가시, 목록 하나가 추가됨
	setLeftItemCount();
}

const deleteTodo = (todoId) => {
	const newTodos = getAllTodos().filter(todo => todo.id !== todoId);		// array.filter :: 조건에 해당하는 리스트보여주기 (해당 버튼이 속한 리스트만 제외하고 나머지 보여주기)
	setTodos(newTodos)
	paintTodo();	
	setLeftItemCount();
}

const completeTodo = (todoId) => {
	const newTodos = getAllTodos().map(todo => todo.id == todoId ? {...todo, isCompleted:true} : todo);
	setTodos(newTodos)
	paintTodo();
	checkIsAllcompleted();
}

// 먼저 갯수 get
const getLeftItemCount = () => {
	return todos.filter(todo => todo.isCompleted == false);
}
// set 해 
const setLeftItemCount = () => {
	const itemsCount = getLeftItemCount();
	todoInfoCount.innerHTML = `${itemsCount.length} Items Left`
}


// 전체완료, 전체완료해제
const completeAll = () => {
	todoBtnCpltAll.classList.add('on');
	todoBtnCpltAll.innerHTML = '전체해제'
	const newTodos = getAllTodos().map(todo => ({...todo, isCompleted:true}) )
	setTodos(newTodos);
}
const incompleteAll = () => {
	todoBtnCpltAll.classList.remove('on');
	todoBtnCpltAll.innerHTML = '전체완료'
	const newTodos = getAllTodos().map(todo => ({...todo, isCompleted:false}) )
	setTodos(newTodos);
}

// 완료된 애들만 리스트..!
const getCompletedTodos = () => {
	return todos.filter(todo => todo.isCompleted == true);
}

const checkIsAllcompleted = () => {
	if (getAllTodos().length === getCompletedTodos().length){
		setIsAllCompleted(true);
		todoBtnCpltAll.classList.add('on')
		todoBtnCpltAll.innerHTML = '전체해제'
	} else {
		setIsAllCompleted(false);
		todoBtnCpltAll.classList.remove('on')
		todoBtnCpltAll.innerHTML = '전체완료'
	}
}

const onClickCompleteAll = () => {
	if (!getAllTodos().length) return; // 리스트가 0개면 return

	if (isAllCompleted) incompleteAll();	// 전체완료상태일 때 버튼 클릭하면 전체완료해제
	else completeAll(); 

	setIsAllCompleted(!isAllCompleted);
	paintTodo();
	setLeftItemCount();
}

// 목록 보여주기..!
let currentType = 'show_all' 			// show_all | progress | dlt_all
const setCurrentShowType = (newShowType) => currentShowType = newShowType;

const onClickShowList = (e) => {
	const currentBtn = e.target;
	const newShowType = currentBtn.dataset.type;

	if (currentShowType === newShowType) return;

	const preBtnType = document.querySelector(`.todo__btn-${currentType}`);
	preBtnType.classList.remove('on');

	currentBtn.classList.add('on');
	setCurrentShowType(newShowType);

	paintTodos();
}



const editTodo = (e, todoId) => {
	// 수정 입력창 만들기
	var editTxt = e.target;
	var todoListParent = editTxt.parentNode.parentNode;

	var todoEdit = document.createElement('div');
	todoEdit.classList.add('todo__edit');

	var todoEditInput = document.createElement('input');
	todoEditInput.classList.add('todo__edit_input');
	todoEditInput.placeholder = e.target.innerHTML; 
	// (포커스 맞추기) todoEditInput.focus();

	var todoDoneEdit = document.createElement('button');
	todoDoneEdit.classList.add('todo__done-edit');
	todoDoneEdit.innerText = '수정'

	// 수정 종료하기
	todoEditInput.addEventListener('keypress', (e) => {
		if (e.key == 'Enter'){
			updateTodo(e.target.value, todoId);
		}
	})

	todoDoneEdit.addEventListener('click', () => {
		updateTodo(todoEditInput.value, todoId);
	})

	todoListParent.appendChild(todoEdit);
	todoEdit.appendChild(todoEditInput);
	todoEdit.appendChild(todoDoneEdit);
}

// 완료시, 내용 저장하기
const updateTodo = (text, todoId) => {
	const newTodos = getAllTodos().map(todo => todo.id == todoId ? {...todo, content:text} : todo);
	setTodos(newTodos)
	paintTodo();
}

const paintTodo = () => {
	todoContainer.innerHTML = null;
	const allTodos = getAllTodos();

	allTodos.forEach(todo => {
		var todoList = document.createElement('li');
		todoList.classList.add('todo__list')
	
		var todoBox = document.createElement('div');
		todoBox.classList.add('todo__box');
	
		var todoTxt = document.createElement('p');
		todoTxt.innerHTML = todo.content; 

		// 입력 완료 되면 수정하지뭬
		if (todo.isCompleted == false){
			todoTxt.addEventListener('dblclick', function(){
				editTodo(event, todo.id);
			})
		} else if (todo.isCompleted){
			todoTxt.addEventListener('dblclick', function(){
				alert('또잉')
			})
		}

		// 리스트 삭제하기
		var todoDlt = document.createElement('button');
		todoDlt.classList.add('todo__dlt');
		todoDlt.innerText = '삭제'
		// 리스트가 아니공 데이터를 지우는걸로..!
		todoDlt.addEventListener('click', function(){
			deleteTodo(todo.id);
		})

		// 리스트 완료처리하기
		var todoDone = document.createElement('button');
		todoDone.classList.add('todo__done');
		todoDone.innerText = '완료'
		todoDone.addEventListener('click', function(){	
			completeTodo(todo.id);
		})
		if (todo.isCompleted){
			todoBox.classList.add('on');
		}

		todoContainer.appendChild(todoList);
		todoList.appendChild(todoBox);
		todoBox.appendChild(todoTxt);
		todoBox.appendChild(todoDone);
		todoBox.appendChild(todoDlt);
	})
}

// 입력에 대한 이벤트 리스너 등록
const init = () => {
	todoInput.addEventListener('keypress', function(e){
		if (e.key === 'Enter' && todoInput.value == ''){
			alert('내용입력')
			return
		}
		else if (e.key === 'Enter' && todoInput.value != ''){
			appendTodos(e.target.value);
			todoInput.value = '';
		}
	})

	todoBtnAdd.addEventListener('click', function(){
		if (todoInput.value !== ''){
			appendTodos(todoInput.value);
			todoInput.value = '';
		}
		
		else if (todoInput.value == ''){
			alert('내용입력');
			return;
		}
	});
	
	// todoBtnSlctAll.addEventListener('click', onClickSlctAll);
	todoBtnCpltAll.addEventListener('click', onClickCompleteAll);

	setLeftItemCount();
}

init();








