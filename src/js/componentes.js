import { Todo } from '../classes'
import { todoList } from '../index'

//Referencias en el HTML

const divTodoList = document.querySelector('.todo-list');
const toDo = document.querySelector('.new-todo');
const completados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');

const anchorFiltro = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
						<div class="view">
							<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
							<label>${ todo.tarea }</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}


// Eventos
toDo.addEventListener('keyup', (event) => {


    if (event.keyCode === 13 && toDo.value.length > 0) {

        const nuevoTodo = new Todo(toDo.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        toDo.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {


    const nombreElemento = event.target.localName; //input, label, button

    const todoElemento = event.target.parentElement.parentElement;

    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } //click en el check
    else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    } // Borrar el todo
});


completados.addEventListener('click', () => {

    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if (!filtro) { return; }

    anchorFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemen of divTodoList.children) {
        elemen.classList.remove('hidden');
        const comple = elemen.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (comple) {
                    elemen.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!comple) {
                    elemen.classList.add('hidden');
                }
                break;
        }
    }
});