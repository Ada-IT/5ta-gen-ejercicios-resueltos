const express = require('express');
// creo un router de express
const router = express.Router();

const bands = [
  { id: 1, name: 'Nirvana', genre: 'Grunge' },
  { id: 2, name: 'Foo Fighters', genre: 'Hard Rock' }
];

const albums = [
  { id: 1, bandId: 1, name: 'Bleach', year: 1989 },
  { id: 2, bandId: 1, name: 'Nevermind', year: 1991 },
  { id: 3, bandId: 2, name: 'Foo Fighters', year: 1995 },
  { id: 4, bandId: 2, name: 'The Colour and the Shape', year: 1997 },
  { id: 5, bandId: 2, name: 'There Is Nothing Left to Lose', year: 1999 }
];

const nextId = (col = []) => col.length ? (col[ col.length - 1 ].id + 1) : 1;

router.get('/bands', (req, res) => {
  // contesto al cliente con todo el listado de bandas
  res.json(bands);
});

router.get('/bands/:bandId', (req, res) => {
  // me guardo el id que me enviaron en la URL
  const bandId = parseInt(req.params.bandId);
  // hago una copia del array para no editar el original
  const band = { ...bands.find(b => b.id === bandId) };
  // filtro unicamente los discos de la banda, y los guardo en la propiedad albums
  band.albums = albums.filter(a => a.bandId === bandId);
  // contesto al cliente con el objeto de la banda
  res.json(band);
});

router.post('/bands', (req, res) => {
  // guardo los datos de la banda que me llegaron en el POST
  const newBand = req.body;
  // agrego la propiedad ID al nuevo objeto
  newBand.id = nextId(bands);
  // guardo la nueva banda en el array de bandas
  bands.push(newBand);
  // repsondo al cliente con el nuevo objeto
  res.json(newBand);
});

router.delete('/bands/:bandId', (req, res) => {
  // me guardo el ID de la banda a eliminar
  const toDelete = req.params.bandId;
  // itero por cada banda
  for (let i = 0; i < bands.length; i++) {
    if (bands[i].id == toDelete) {
      // borro el elemento
      bands.splice(i, 1);
    }
  }
  // itero por cada album y borro los que son únicamente de la banda que estamos borrando
  for (let i = 0; i < albums.length; i++) {
    // si el album es de la banda
    if (albums[i].bandId == toDelete) {
      // borro el elemento
      albums.splice(i, 1);
      // como borré un elemento, pero tengo que seguir buscando si hay más... decremento el índice
      i--;
    }
  }

  res.send('banda volada');
});

router.get('/bands/:bandId/albums', (req, res) => {
  // filtro y devuelvo al cliente los discos de la banda que me pidieron y enviaron en la URL
  res.json(albums.filter(a => a.bandId == req.params.bandId));
});

router.post('/bands/:bandId/albums', (req, res) => {
  // guardo los datos del album que me llegaron en el POST
  const newAlbum = req.body;
  // agrego la propiedad ID y el ID de la banda al nuevo objeto
  newAlbum.id = nextId(albums);
  newAlbum.bandId = parseInt(req.params.bandId); // necesito guardarlo como número
  // agrego el nuevo objeto al array del albums
  albums.push(newAlbum);
  // devuelvo el nuevo objeto al cliente
  res.json(newAlbum);
});

router.delete('/albums/:albumId', (req, res) => {
  // me guardo el ID de la album a eliminar
  const toDelete = req.params.albumId;
  // itero por cada album
  for (let i = 0; i < albums.length; i++) {
    if (albums[i].id == toDelete) {
      // borro el elemento
      albums.splice(i, 1);
    }
  }

  res.send('album volado');
});

module.exports = router;