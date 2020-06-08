const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  document.getElementById('loaiphong').innerHTML = [
    ...xml.getElementsByTagName('LOAIPHONG'),
  ]
    .map((lp) => {
      return `<option value="${lp.querySelector('MA_LOAIPHONG').innerHTML}">${
        lp.querySelector('TEN_LOAIPHONG').innerHTML
      }</option>`;
    })
    .join('');

  document.getElementById('trangthai').innerHTML = [
    ...xml.getElementsByTagName('TRANGTHAI_PHONG'),
  ]
    .map((tt) => {
      return `<option value="${tt.querySelector('MA_TRANGTHAI').innerHTML}">${
        tt.querySelector('TEN_TRANGTHAI').innerHTML
      }</option>`;
    })
    .join('');

  document.getElementById('btnThem').addEventListener('click', function () {
    axios
      .post('/quanly/phong', {
        id: document.getElementById('maphong').value,
        type: document.getElementById('loaiphong').value,
        status: document.getElementById('trangthai').value,
        price: document.getElementById('giaphong').value,
      })
      .then((res) => {
        if (res.data === 'OK') {
          location.href = '/quanly/phong.html';
        }
      })
      .catch((err) => location.reload());
  });
};

xhr.send(null);
