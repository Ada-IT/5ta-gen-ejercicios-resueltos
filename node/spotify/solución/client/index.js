const bandsTableTBody = document.getElementById('bands').querySelector('tbody');
const albumsTableTBody = document.getElementById('albums').querySelector('tbody');

const newBandModal = document.getElementById('new-band-form');
const newAlbumModal = document.getElementById('new-album-form');

let newAlbumBand = null;

const createBandNode = band => {
  return `
    <tr id="band-${band.id}">
      <td>${band.name}</td>
      <td>${band.genre}</td>
      <td>
        <span onclick="deleteBand(${band.id})" class="icon">
          <i class="fas fa-trash"></i>
        </span>
        <span onclick="viewAlbums(${band.id})" class="icon">
          <i class="fas fa-compact-disc"></i>
        </span>
        <a onclick="newAlbum(${band.id})" class="button is-text">Agregar Disco</a>
      </td>
    </tr>
  `;
};

const createAlbumNode = album => {
  return `
    <tr id="album-${album.id}">
      <td>${album.name}</td>
      <td>${album.year}</td>
      <td>
        <span onclick="deleteAlbum(${album.id})" class="icon">
          <i class="fas fa-trash"></i>
        </span>
      </td>
    </tr>
  `;
};

fetch('http://localhost:3000/api/bands')
  .then(res => res.json())
  .then(bands => {
    bands.forEach(band => bandsTableTBody.innerHTML += createBandNode(band));
  });

const deleteBand = bandId => {
  fetch(`http://localhost:3000/api/bands/${bandId}`, { method: 'delete' })
    .then(res => bandsTableTBody.querySelector(`#band-${bandId}`).remove());
};

const viewAlbums = bandId => {
  albumsTableTBody.innerHTML = '';

  fetch(`http://localhost:3000/api/bands/${bandId}/albums`)
    .then(res => res.json())
    .then(albums => {
      albums.forEach(album => albumsTableTBody.innerHTML += createAlbumNode(album));
    })
};

const deleteAlbum = albumId => {
  fetch(`http://localhost:3000/api/albums/${albumId}`, { method: 'delete' })
    .then(res => albumsTableTBody.querySelector(`#album-${albumId}`).remove());
}

const newAlbum = bandId => {
  newAlbumBand = bandId;
  newAlbumModal.classList.add('is-active');
}

const saveAlbum = () => {
  const albumName = newAlbumModal.querySelector('#name').value;
  const albumYear = parseInt(newAlbumModal.querySelector('#year').value);

  fetch(`http://localhost:3000/api/bands/${newAlbumBand}/albums`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: albumName,
      year: albumYear
    })
  })
    .then(res => res.json())
    .then(newAlbum => {
      newAlbumModal.classList.remove('is-active');
      viewAlbums(newAlbumBand);
    });
}

const saveBand = () => {
  const bandName = newBandModal.querySelector('#name').value;
  const bandGenre = newBandModal.querySelector('#genre').value;

  fetch(`http://localhost:3000/api/bands`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: bandName,
      genre: bandGenre
    })
  })
    .then(res => res.json())
    .then(newBand => {
      newBandModal.classList.remove('is-active');
      bandsTableTBody.innerHTML += createBandNode(newBand);
    });
}

newAlbumModal
  .querySelector('#save')
  .onclick = saveAlbum;

newBandModal
  .querySelector('#save')
  .onclick = saveBand;

document
  .querySelectorAll('.modal .delete')
  .forEach(btn => btn.onclick = e => e.target.closest('.modal').classList.remove('is-active'));

document
  .querySelector('#new-band-btn')
  .onclick = () => newBandModal.classList.add('is-active');