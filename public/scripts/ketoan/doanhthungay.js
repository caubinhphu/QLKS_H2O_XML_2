// get xml doc
let xml = null;
const xhr = new XMLHttpRequest();
xhr.open('get', '/data/QLKS_H2O.xml', false);
xhr.onload = function () {
  xml = this.responseXML;
};
xhr.send(null);

document.formDate.addEventListener('submit', function (e) {
  e.preventDefault();

  const date = e.target.elements.date.value;
  if (date !== '') {
    let sumTienPhong = 0;
    const phongs = [...xml.getElementsByTagName('PHONG')];

    const dateNeed = new Date(date);

    const doanhThuTienPhong = {};
    phongs.forEach((phong) => {
      doanhThuTienPhong[phong.querySelector('MAPHONG').innerHTML] = 0;
    });

    const phieuThuePhongs = [
      ...xml.getElementsByTagName('PHIEU_THUEPHONG'),
    ].filter((phieu) => {
      const dateDen = new Date(phieu.querySelector('NGAYDEN').innerHTML);
      const dateDi = new Date(phieu.querySelector('NGAYDI').innerHTML);
      return dateDen - dateNeed <= 0 && dateDi - dateNeed >= 0;
    });

    // tính tiền phòng
    phieuThuePhongs.forEach((phieu) => {
      const ctThuePhong = [...xml.querySelectorAll('CHITIET_THUEPHONG')].filter(
        (ct) => {
          return (
            ct.querySelector('SO_PHIEU').innerHTML ===
            phieu.querySelector('SO_PHIEU').innerHTML
          );
        }
      );

      ctThuePhong.forEach((ct) => {
        doanhThuTienPhong[
          ct.querySelector('MAPHONG').innerHTML
        ] += +ct.querySelector('GIAPHONG').innerHTML;
        sumTienPhong += +ct.querySelector('GIAPHONG').innerHTML;
      });
    });

    let doanhThuDichVu = 0;
    // tính tiền dịch vụ
    phieuThuePhongs
      .filter((phieu) => {
        const dateDi = new Date(phieu.querySelector('NGAYDI').innerHTML);
        return dateDi - dateNeed === 0;
      })
      .forEach((phieu) => {
        const ctThuePhong = [...xml.querySelectorAll('CT_THUE_DICHVU')].filter(
          (ct) => {
            return (
              ct.querySelector('SO_PHIEU').innerHTML ===
              phieu.querySelector('SO_PHIEU').innerHTML
            );
          }
        );

        ctThuePhong.forEach((ct) => {
          doanhThuDichVu +=
            +ct.querySelector('GIA_DICHVU').innerHTML *
            +ct.querySelector('SOLUONG').innerHTML;
        });
      });

    document.getElementById('tableBody').innerHTML = '';

    let index = 1;
    for (let phong in doanhThuTienPhong) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${index}</td><td>${phong}</td><td>${doanhThuTienPhong[phong]}</td>`;
      document.getElementById('tableBody').appendChild(tr);
      index++;
    }

    const trTongTienPhong = document.createElement('tr');
    trTongTienPhong.innerHTML = `<td colspan="2">Tổng doanh thu tiền phòng</td><td>${sumTienPhong}</td>`;
    document.getElementById('tableBody').appendChild(trTongTienPhong);

    const trTongTienDichVu = document.createElement('tr');
    trTongTienDichVu.innerHTML = `<td colspan="2">Tổng doanh thu tiền dịch vụ</td><td>${doanhThuDichVu}</td>`;
    document.getElementById('tableBody').appendChild(trTongTienDichVu);

    const trTongTien = document.createElement('tr');
    trTongTien.innerHTML = `<td colspan="2">Tổng doanh thu tiền phòng</td><td>${
      sumTienPhong + doanhThuDichVu
    }</td>`;
    document.getElementById('tableBody').appendChild(trTongTien);

    document.querySelector('table').style.display = 'table';
  } else {
    $.notify('Chưa nhập ngày cần tính doanh thu', 'warn');
  }
});
