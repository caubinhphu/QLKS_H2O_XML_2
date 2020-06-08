const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  const idPhieu = new URLSearchParams(location.search).get('idphieu');

  const phieuThue = [...xml.getElementsByTagName('PHIEU_THUEPHONG')].find(
    (p) => p.querySelector('SO_PHIEU').innerHTML === idPhieu
  );

  if (phieuThue) {
    document.getElementById('idphieu').innerHTML = phieuThue.querySelector(
      'SO_PHIEU'
    ).innerHTML;

    document.getElementById('ngayden').innerHTML = phieuThue.querySelector(
      'NGAYDEN'
    ).innerHTML;

    document.getElementById('ngaydi').value = phieuThue.querySelector(
      'NGAYDI'
    ).innerHTML;

    document.getElementById('ngaylap').innerHTML = phieuThue.querySelector(
      'NGAYLAP_PHIEU'
    ).innerHTML;

    const nhanVien = [...xml.getElementsByTagName('NHANVIEN')].find(
      (nv) =>
        nv.querySelector('MA_NHANVIEN').innerHTML ===
        phieuThue.querySelector('MA_NHANVIEN').innerHTML
    );

    if (nhanVien) {
      document.getElementById('nhanvien').innerHTML = nhanVien.querySelector(
        'HOTEN_NHANVIEN'
      ).innerHTML;
    }

    const idKhach = phieuThue.querySelector('MAKHACH').innerHTML;
    document.getElementById('idkhach').innerHTML = idKhach;

    const khach = [...xml.getElementsByTagName('KHACH')].find(
      (k) => k.querySelector('MA_KHACH').innerHTML === idKhach
    );

    if (khach) {
      document.getElementById('tenkhach').value = khach.querySelector(
        'HOTEN_KHACH'
      ).innerHTML;

      document.getElementById('cmnd').value = khach.querySelector(
        'CMND_PASSPORT'
      ).innerHTML;

      const gt = khach.querySelector('GIOITINH').innerHTML;
      if (gt === 'Nam') {
        document.getElementById('gioitinh').selectedIndex = 0;
      } else {
        document.getElementById('gioitinh').selectedIndex = 1;
      }

      document.getElementById('ngaysinh').value = khach.querySelector(
        'NGAYSINH'
      ).innerHTML;

      document.getElementById('dienthoai').value = khach.querySelector(
        'DIENTHOAI'
      ).innerHTML;

      document.getElementById('quoctich').value = khach.querySelector(
        'QUOCTICH'
      ).innerHTML;
    }

    const ctThuePhong = [
      ...xml.getElementsByTagName('CHITIET_THUEPHONG'),
    ].filter((ct) => ct.querySelector('SO_PHIEU').innerHTML === idPhieu);

    const phongText = ctThuePhong
      .map((ct, index) => {
        return `<tr>
        <td>${index + 1}</td>
        <td>${ct.querySelector('MAPHONG').innerHTML}</td>
        <td>${ct.querySelector('SONGUOI').innerHTML}</td>
      </tr>`;
      })
      .join('');

    document.getElementById('bodyphong').innerHTML = phongText;

    const ctThueDichVu = [...xml.getElementsByTagName('CT_THUE_DICHVU')].filter(
      (ct) => ct.querySelector('SO_PHIEU').innerHTML === idPhieu
    );

    const dichVuText = ctThueDichVu
      .map((ct, index) => {
        const dichVu = [...xml.getElementsByTagName('DICHVU')].find(
          (dv) =>
            dv.querySelector('MA_DICHVU').innerHTML ===
            ct.querySelector('MA_DICHVU').innerHTML
        );

        if (dichVu) {
          return `<tr>
            <td>${index + 1}</td>
            <td>${dichVu.querySelector('TEN_DICHVU').innerHTML}</td>
            <td>${ct.querySelector('SOLUONG').innerHTML}</td>
          </tr>`;
        }
        return '';
      })
      .join('');

    document.getElementById('bodydichvu').innerHTML = dichVuText;

    if (phieuThue.getAttribute('DATRAPHONG') === '0') {
      const control = document.getElementById('control');
      control.innerHTML = `<button class="btn btn-success" id="btnupdate">Cập nhật</button>
      <a class="btn btn-danger" href="/letan/traphong.html?idphieu=${idPhieu}">Trả phòng</a>`;

      control.querySelector('button').addEventListener('click', function () {
        const data = {};
        data.customerInfo = {
          name: document.getElementById('tenkhach').value,
          code: document.getElementById('cmnd').value,
          gender: document.getElementById('gioitinh').value,
          phone: document.getElementById('dienthoai').value,
          country: document.getElementById('quoctich').value,
          dateOfBirth: document.getElementById('ngaysinh').value,
        };

        data.serviceInfo = [];

        const soLuongs = [...document.getElementsByName('soluong')];
        [...document.getElementsByName('dichvu')].forEach((dichVu, index) => {
          data.serviceInfo.push({
            id: dichVu.value,
            num: soLuongs[index].value,
          });
        });

        data.voucherInfo = {
          dataLeave: document.getElementById('ngaydi').value,
          staff: getCookie('id'),
          id: idPhieu,
        };

        axios
          .put('/letan/thuephong', data)
          .then((res) => {
            if (res.data === 'OK') {
              location.reload();
            }
          })
          .catch((err) => location.reload());
      });

      const dichVus = [...xml.getElementsByTagName('DICHVU')].map((dv) => {
        return {
          id: dv.querySelector('MA_DICHVU').innerHTML,
          name: dv.querySelector('TEN_DICHVU').innerHTML,
        };
      });

      const div = document.createElement('div');
      div.className = 'text-right';
      div.innerHTML = `<div id="themdichvu" class="w-75 ml-auto"></div>
        <button class="btn btn-secondary btn-sm mt-2" id="btnthemdichvu">Thêm dịch vụ</button>`;

      div.querySelector('button').addEventListener('click', function () {
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
        div.querySelector('div').appendChild(divChild);
      });

      document.getElementById('dvthue').appendChild(div);
    }
  }
};

xhr.send(null);
