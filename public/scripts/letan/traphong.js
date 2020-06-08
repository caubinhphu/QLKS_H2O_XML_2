const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  const idPhieu = new URLSearchParams(location.search).get('idphieu');

  const phieuThuePhong = [...xml.getElementsByTagName('PHIEU_THUEPHONG')].find(
    (phieu) => phieu.querySelector('SO_PHIEU').innerHTML === idPhieu
  );

  if (phieuThuePhong) {
    const khach = [...xml.getElementsByTagName('KHACH')].find(
      (k) =>
        k.querySelector('MA_KHACH').innerHTML ===
        phieuThuePhong.querySelector('MAKHACH').innerHTML
    );
    if (khach) {
      document.getElementById('hoten').innerHTML = khach.querySelector(
        'HOTEN_KHACH'
      ).innerHTML;

      document.getElementById('cmnd').innerHTML = khach.querySelector(
        'CMND_PASSPORT'
      ).innerHTML;

      document.getElementById('quoctich').innerHTML = khach.querySelector(
        'QUOCTICH'
      ).innerHTML;

      document.getElementById('dienthoai').innerHTML = khach.querySelector(
        'DIENTHOAI'
      ).innerHTML;
    }

    // thông tin thuê phòng
    let tienPhong = 0;

    const ngayTra = formatDate(new Date());

    const soNgay =
      (new Date(ngayTra) -
        new Date(phieuThuePhong.querySelector('NGAYDEN').innerHTML)) /
        864e5 || 1;

    const ctThuePhongs = [
      ...xml.getElementsByTagName('CHITIET_THUEPHONG'),
    ].filter((phieu) => phieu.querySelector('SO_PHIEU').innerHTML === idPhieu);

    ctThuePhongs.forEach((phieu, index) => {
      const tien = soNgay * +phieu.querySelector('GIAPHONG').innerHTML;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${index + 1}</td>
        <td>${phieu.querySelector('MAPHONG').innerHTML}</td>
        <td>${soNgay}</td>
        <td>${phieu.querySelector('GIAPHONG').innerHTML}</td>
        <td>${tien}</td>`;

      document.getElementById('phongBody').appendChild(tr);
      tienPhong += tien;
    });

    const trEndPhong = document.createElement('tr');
    trEndPhong.innerHTML = `<th colspan="4" class="text-left">Tổng cộng</th>
      <td>${tienPhong}</td>`;
    document.getElementById('phongBody').appendChild(trEndPhong);

    // thông tin thuê dịch vụ
    let tienDichVu = 0;
    const ctThueDichVus = [...xml.querySelectorAll('CT_THUE_DICHVU')].filter(
      (phieu) => phieu.querySelector('SO_PHIEU').innerHTML === idPhieu
    );
    ctThueDichVus.forEach((phieu, index) => {
      const tien =
        +phieu.querySelector('SOLUONG').innerHTML *
        +phieu.querySelector('GIA_DICHVU').innerHTML;
      const dichVu = [...xml.querySelectorAll('DICHVU')].find(
        (dv) =>
          dv.querySelector('MA_DICHVU').innerHTML ===
          phieu.querySelector('MA_DICHVU').innerHTML
      );
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${index + 1}</td>
        <td>${
          dichVu
            ? dichVu.querySelector('TEN_DICHVU').innerHTML
            : phieu.querySelector('MA_DICHVU').innerHTML
        }</td>
        <td>${phieu.querySelector('SOLUONG').innerHTML}</td>
        <td>${phieu.querySelector('GIA_DICHVU').innerHTML}</td>
        <td>${tien}</td>`;

      document.getElementById('dichVuBody').appendChild(tr);
      tienDichVu += tien;
    });

    const trEndDichVu = document.createElement('tr');
    trEndDichVu.innerHTML = `<th colspan="4" class="text-left">Tổng cộng</th>
      <td>${tienDichVu}</td>`;
    document.getElementById('dichVuBody').appendChild(trEndDichVu);

    document.getElementById('tien').innerHTML = tienPhong + tienDichVu;
    document.getElementById('tong').innerHTML = (tienPhong + tienDichVu) * 1.1;

    document.getElementById('btnOK').addEventListener('click', function () {
      axios
        .post('/letan/traphong', {
          id: idPhieu,
          ngayTra,
        })
        .then((res) => {
          if (res.data === 'OK') {
            location.href = '/letan/index.html';
          }
        })
        .catch((err) => {
          $.notify('Tả phòng thất bại', 'error');
        });
    });
  }
};

xhr.send(null);
