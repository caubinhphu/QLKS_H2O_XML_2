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
      switch (user.querySelector('BOPHAN').innerHTML) {
        case 'Lễ tân':
          location.href = '/letan/index.html';
          break;
        case 'Kế toán':
          location.href = '/ketoan/index.html';
          break;
        case 'Vật tư':
          location.href = '/vattu/index.html';
          break;
        case 'Quản lý':
          location.href = '/quanly/index.html';
          break;
      }
    } else {
      $.notify('Đăng nhập thất bại', 'error');
    }
  } else {
    $.notify('Đăng nhập thất bại', 'error');
  }
});
