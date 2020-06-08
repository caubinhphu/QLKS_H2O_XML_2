const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  const dichVus = [...xml.getElementsByTagName('DICHVU')].map((dv) => {
    return {
      id: dv.querySelector('MA_DICHVU').innerHTML,
      name: dv.querySelector('TEN_DICHVU').innerHTML,
    };
  });

  document
    .getElementById('btnthemdichvu')
    .addEventListener('click', function () {
      const select = document.createElement('select');
      select.name = 'dichvu';
      select.className = 'form-control form-control-sm';
      select.innerHTML = dichVus
        .map((dv) => `<option value="${dv.id}">${dv.name}</option>`)
        .join('');
      const input = document.createElement('input');
      input.type = 'number';
      input.name = 'soluong';
      input.value = 1;
      input.className = 'form-control form-control-sm';
      const button = document.createElement('button');
      button.className = 'btn btn-sm btn-danger';
      button.innerHTML = 'X';
      button.addEventListener('click', function () {
        this.parentElement.remove();
      });
      const divChild = document.createElement('div');
      divChild.className = 'd-flex';
      divChild.appendChild(select);
      divChild.appendChild(input);
      divChild.appendChild(button);

      document.getElementById('thuedichvu').appendChild(divChild);
    });

  const phongs = [...xml.getElementsByTagName('PHONG')]
    .filter((p) => p.querySelector('MA_TRANGTHAI').innerHTML === 'VC')
    .map((p) => p.querySelector('MAPHONG').innerHTML);

  document.getElementById('firstPhong').innerHTML = phongs
    .map((p) => `<option>${p}</option>`)
    .join('');

  document
    .getElementById('btnthemphong')
    .addEventListener('click', function () {
      const select = document.createElement('select');
      select.name = 'phong';
      select.className = 'form-control form-control-sm';
      select.innerHTML = phongs.map((p) => `<option>${p}</option>`).join('');
      const input = document.createElement('input');
      input.type = 'number';
      input.name = 'songuoi';
      input.value = 1;
      input.className = 'form-control form-control-sm';
      const button = document.createElement('button');
      button.className = 'btn btn-sm btn-danger';
      button.innerHTML = 'X';
      button.addEventListener('click', function () {
        this.parentElement.remove();
      });
      const divChild = document.createElement('div');
      divChild.className = 'd-flex';
      divChild.appendChild(select);
      divChild.appendChild(input);
      divChild.appendChild(button);

      document.getElementById('thuephong').appendChild(divChild);
    });

  document.getElementById('btnOK').addEventListener('click', function () {
    const data = {};
    data.customerInfo = {
      name: document.getElementById('hoten').value,
      code: document.getElementById('cmnd').value,
      gender: document.getElementById('gioitinh').value,
      phone: document.getElementById('dienthoai').value,
      country: document.getElementById('quoctich').value,
      dateOfBirth: document.getElementById('ngaysinh').value,
    };

    data.roomInfo = [];
    data.serviceInfo = [];

    const soNguois = [...document.getElementsByName('songuoi')];
    [...document.getElementsByName('phong')].forEach((phong, index) => {
      data.roomInfo.push({
        id: phong.value,
        num: soNguois[index].value,
      });
    });

    const soLuongs = [...document.getElementsByName('soluong')];
    [...document.getElementsByName('dichvu')].forEach((dichVu, index) => {
      data.serviceInfo.push({
        id: dichVu.value,
        num: soLuongs[index].value,
      });
    });

    data.voucherInfo = {
      dataCreate: formatDate(new Date()),
      dateArrival: formatDate(new Date()),
      dataLeave: document.getElementById('ngaydi').value,
      staff: getCookie('id'),
    };

    axios
      .post('/letan/thuephong', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
};

xhr.send(null);
