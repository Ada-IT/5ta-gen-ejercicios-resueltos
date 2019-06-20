# SERVER

- Crear una app que nos va a permitir guardar información sobre bandas y sus albums

- Como vamos a guardar información de dos tipos de documentos (Bandas y Albums), vamos a necesitar dos arrays

- Cada objeto que representa a una banda tiene las propiedades
  - id
  - name: Nombre de la banda
  - genre: Género de la banda

- Cada objeto que representa a un albúm tiene las propiedades
  - ID
  - bandId: ID de la banda
  - name: Nombre del disco
  - year: Año lanzamiento del disco

```js
const bandas = [
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
```

- La API va a tener los siguientes endpoints:
  - GET `/api/bands` -> devuelve el array de todas las bandas
  - GET `/api/bands/:bandId` -> devuelve una banda específica con una propiedad `albums` que tiene el array de todos los albums de la banda. Por ejemplo, si hacemos GET `/api/bands/2`, nos debería devolver:
    ```js
    {
      id: 1,
      name: 'Nirvana',
      genre: 'Grunge',
      albums: [
        { id: 1, bandId: 1, name: 'Bleach', year: 1989 },
        { id: 2, bandId: 1, name: 'Nevermind', year: 1991 }
      ]
    }
    ```
  - POST `/api/bands` -> guarda una nueva banda en el array
  - DELETE `/api/bands/:bandId` -> borra una banda del array y todos los albums asociados a esta banda. Si borro la banda con ID == **1**, también tengo que borrar todos los albums con `bandId` == **1**
  - GET `/api/bands/:bandId/albums` -> devuelve todos los albums del array que sean de la banda que nos llega por parámetro `bandId`
  - POST `/api/bands/:bandId/albums` -> guarda un nuevo album en el array de album, asociado a la banda que llega en el parámetro `bandId`


# CLIENT
**Paso 1:**
- Vamos a tener una página web con una tabla que muestre un listado de todas las bandas que nos devuelve nuestra API
  - En la tabla vamos a mostrar `name`, `genre` y dos botones: 'Eliminar' y 'Ver discos'.
  - Cuando hacemos click en eliminar, borramos esa banda.
  - Cuando hacemos click en 'Ver Discos', hacemos un fetch a nuestra API `/api/bands/:bandId/albums` para pedirle todos los discos de una banda específica, y los mostramos en una tabla con las columnas `name` y `year`.