"use strict";

let elFormListen = document.querySelector('.form-inline');
let elInputValue = document.querySelector('.form-control');
let elTodoList = document.querySelector('.list');
let elBtnResult1 = document.querySelector('.btn-outline-primary')
let elBtnResult2 = document.querySelector('.btn-outline-secondary');
let elBtnResult3 = document.querySelector('.btn-outline-danger');

let todos = []

elTodoList.addEventListener('click', (evt) => {
    if(evt.target.matches('.btn-delete')){

        let todoBtnId = evt.target.dataset.todoId * 1;

        const todoFoundIndexId = todos.findIndex(todo => {
            return todo.id === todoBtnId;
        })

        todos.splice(todoFoundIndexId, 1);

        elTodoList.innerHTML = null;

        renderTodos(todos, elTodoList);
    } else if(evt.target.matches('.check-btn')){

        let todoCheckId = evt.target.dataset.checkId * 1;

        const todoFoundCheckbox = todos.find(todo => {
            return todo.id === todoCheckId;
        })

        todoFoundCheckbox.isCompleted = !todoFoundCheckbox.isCompleted;

        elTodoList.innerHTML = null;

        console.log(todoFoundCheckbox);

        renderTodos(todos, elTodoList);
    }
})

const renderTodos = function(todosArray, element) {

    todosArray.forEach(todo => {

        //CREATE ELEMENTS
        let newDiv = document.createElement('div');
        let newItem = document.createElement('li');
        let newCheckbox = document.createElement('input');
        let newText = document.createElement('p');
        let newButton = document.createElement('button');

        //ATRIBUTES

        newCheckbox.type = "checkbox";

        //TEXTCONTENT

        newText.textContent = todo.title;
        newButton.textContent = "delete";

        //SETATRIBUT
        newDiv.setAttribute('class', 'div rounded border border-light')
        newItem.setAttribute('class', 'd-flex mb-3 mx-5 py-3 justify-content-between align-items-center text-ligt item')
        newText.setAttribute('class', 'fs-3 text-light')
        newButton.setAttribute('class', 'btn-delete btn btn-outline-danger');
        newCheckbox.setAttribute('class', 'check-btn bg-dark form-check-input border-light fs-3');

        //DATASET 
        
        newButton.dataset.todoId = todo.id;
        newCheckbox.dataset.checkId = todo.id;


        
        if(todo.isCompleted){
            newCheckbox.checked = true;
            newText.style.textDecoration = 'line-through';
        }

        //APPENDCHILD

        element.appendChild(newDiv);
        newDiv.appendChild(newItem);
        newItem.appendChild(newCheckbox);
        newItem.appendChild(newText);
        newItem.appendChild(newButton);
    })
}

elFormListen.addEventListener('submit', (evt) => {
    evt.preventDefault();

    elBtnResult1.textContent = "All: " + (todos.length + 1) 
    let inputValue = elInputValue.value.trim();

    let newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: inputValue,
        isCompleted: false,
    }

    elTodoList.innerHTML = null;

    todos.push(newTodo);

    elInputValue.value = null;
    
    renderTodos(todos, elTodoList);
})


elBtnResult2.addEventListener('click', ()=>{
    let selected = todos.filter(check =>{
        return check.isCompleted === true;
    })

    elBtnResult2.textContent = "Completed: " + (selected.length);
})

elBtnResult3.addEventListener('click', ()=>{
    let notSelected = todos.filter(notCheck =>{
        return notCheck.isCompleted === false;
    })

    elBtnResult3.textContent = "UnCompleted: " + (notSelected.length);
})