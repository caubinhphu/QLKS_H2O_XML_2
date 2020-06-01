const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;
};

xhr.send(null);

document.loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (xml) {
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    const user = [...xml.getElementsByTagName('NHANVIEN')].find((nhanVien) => {
      return (
        nhanVien.querySelector('MA_NHANVIEN').innerHTML === username &&
        nhanVien.querySelector('PASSWORD').innerHTML === password
      );
    });
    if (user) {
      setCookie('id', username, 1);
      location.href = '/letan/index.html';
    } else {
      $.notify('Đăng nhập thất bại', 'error');
    }
  } else {
    $.notify('Đăng nhập thất bại', 'error');
  }
});
