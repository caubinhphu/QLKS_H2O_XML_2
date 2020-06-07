const idUser = getCookie('id');

if (idUser) {
} else {
  location.href = '/index.html';
}
