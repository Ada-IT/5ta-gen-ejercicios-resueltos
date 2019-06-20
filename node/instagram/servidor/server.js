// importamos express y cors
const express = require('express');
const cors = require('cors');
// creamos nuestro servidor
const app = express();
// usabamos cors
app.use( cors() );
// que nos interprete el json de un pedido, como un objeto y no un string
app.use( express.json() );

const posts = [
  { id: 1, texto: 'Voluptua sanctus kasd sed est.', imagen: 'http://www.kangaroopert.com/wp-content/uploads/2018/03/programmers-be-like.jpg', likes: 0 }
];

let nextId = 2;

app.get('/api/posts', function (req, res) {
  res.json(posts);
});

app.post('/api/posts', function (req, res) {
  const newPost = req.body;

  newPost.id = nextId++;

  posts.unshift(newPost);

  res.json(newPost);
});

// una ruta o endpoint que sea un PUT
// en la dirección o URL vamos a tener que agregar el ID del post :id
// ir a buscar el post por ID
// si encontramos el post, incrementar en 1 la propiedad likes
// contestamos con res.json / res.send

// RESTful API

app.put('/api/posts/:postId/like', function (req, res) {
  const id = req.params.postId;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id == id) {
      posts[i].likes++;

      return res.json(posts[i]);
    }
  }
});


app.listen(3000);