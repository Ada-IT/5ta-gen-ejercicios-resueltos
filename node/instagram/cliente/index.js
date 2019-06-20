const baseURL = 'http://localhost:3000';

const container = document.querySelector('.posts-container');

const persona = {
  nombre: 'eze',
  saludar: function () {
    this.nombre // eze
  }
}

fetch(`${baseURL}/api/posts`)
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => {
      const postHTML = `
        <div id="${post.id}" class="post">
          <img src="${post.imagen}" />
          <button onclick="meGusta(${post.id}, this)" class="like">${post.likes} Me gusta</button>
          <p>${post.texto}</p>
        </div>
      `;

      // agregamos los posteos al DOM
      container.innerHTML += postHTML;

      // vamos a agregar un botón "me gusta"
      // al botón le vamos a agregar el onclick
      // cuando hacemos click en el botón, con fetch vamos a pedir al servidor que agregue un like
      // fetch(direccion, { method: 'put' }) - también pueden encontrarse con PATCH
      // si salio todo bien, modificamos el DOM para ir cambiando el número de likes que tiene ese posteo
      // configurarBotones();
    });
  });

document.getElementById('nuevo-post').onsubmit = function (e) {
  e.preventDefault();
  const texto = document.querySelector('#nuevo-post input[name="texto"]').value;
  const imagen = document.querySelector('#nuevo-post input[name="imagen"]').value;

  const post = {
    texto: texto,
    imagen: imagen,
    likes: 0
  };

  fetch(`${baseURL}/api/posts`, {
    method: 'post',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(nuevoPost => {
    const postHTML = document.createElement('div');
    postHTML.classList.add('post');
    postHTML.setAttribute('id', `${nuevoPost.id}`);
    postHTML.innerHTML = `
      <img src="${nuevoPost.imagen}" />
      <button onclick="meGusta" class="like">${nuevoPost.likes} Me gusta</button>
      <p>${nuevoPost.texto}</p>
    `;

    container.insertBefore(postHTML, container.firstChild);

    // configurarBotones();
  })
}

function meGusta (postId, el) {
    // PUT http://localhost:3000/api/posts/1/like
    // const postId = e.target.parentNode.id;

    fetch(`${baseURL}/api/posts/${postId}/like`, {
      method: 'put'
    })
    .then(res => res.json())
    .then(post => {
      console.log(post);
      el.innerHTML = `${post.likes}`;
    })
}

function configurarBotones () {
  // agregamos onclick al boton like
  const botonesLike = document.querySelectorAll('button.like');

  for (let i = 0; i < botonesLike.length; i++) {
    const boton = botonesLike[i];

    boton.onclick = function (e) {
      // PUT http://localhost:3000/api/posts/1/like
      const postId = e.target.parentNode.id;

      fetch(`${baseURL}/api/posts/${postId}/like`, {
        method: 'put'
      })
      .then(res => res.json())
      .then(post => {
        console.log(post);
        boton.innerHTML = `${post.likes} Me gusta`;
      })
    }
  }
}

// vamos a agregar un botón "me gusta"
// al botón le vamos a agregar el onclick
// cuando hacemos click en el botón, con fetch vamos a pedir al servidor que agregue un like
// fetch(direccion, { method: 'put' })
// si salio todo bien, modificamos el DOM para ir cambiando el número de likes que tiene ese posteo