
fetch('http://localhost:4000/api/todos')
  .then(function (res) {
    return res.json();
  })
  .then(function (listaDeTareas) {
    const lis = listaDeTareas.map( function (t) {
      return `<li id="${t.id}">
        ${t.texto} <span class="estado">${t.completada}</span>
        <button class="remove">eliminar</button>
        <button onclick="completar(${t.id}, this)"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/1024px-Yes_Check_Circle.svg.png" /></button>
      </li>`;
    });

    document.querySelector('ul').innerHTML = lis.join('');

    document
      .querySelectorAll('li button.remove')
      .forEach(function (button) {
        button.onclick = eliminar;
      })
  })

function completar (id, button) {
  console.log(id, button);

  fetch(`http://localhost:4000/api/todos/${id}/complete`, {
    method: 'put'
  })
  .then(res => res.json())
  .then(todo => {
    const li = document
      .getElementById(`${id}`)
    // console.log(li)
    li
      .querySelector(`span.estado`)
      .innerHTML = todo.completada;
  })
}

function eliminar (e) {
  const id = e.target.parentNode.id;

  fetch(`http://localhost:4000/api/todos/${id}`, {
    method: 'delete'
  }).then(res => {
    document.getElementById(id).remove();
  });
}

document
  .querySelector('#nueva-tarea-btn')
  .onclick = function () {
  const texto = document.querySelector('#nueva-tarea').value;

  // { texto: '...', completada: false }

  const todo = {
    texto: texto,
    completada: false
  }

  fetch('http://localhost:4000/api/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(todo => {
    const nuevaTarea = `
      <li id="${todo.id}">
        ${texto} <span>${todo.completada}</span>
        <button>eliminar</button>
      </li>
    `;

    document.querySelector('ul').innerHTML += nuevaTarea;
  })
}