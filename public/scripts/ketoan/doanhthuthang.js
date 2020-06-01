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

  const monthNeed = +e.target.elements.month.value;
  const yearNeed = +e.target.elements.year.value;

  if (
    monthNeed !== 0 &&
    yearNeed !== 0 &&
    yearNeed <= new Date().getFullYear()
  ) {
    const minDate = new Date(yearNeed, monthNeed - 1, 1, 7);
    const maxDate = new Date(yearNeed, monthNeed - 1, 1, 7);
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(maxDate.getDate() - 1);

    let sumTienPhong = 0;

    const phongs = [...xml.getElementsByTagName('PHONG')];

    const doanhThuTienPhong = {};
    phongs.forEach((phong) => {
      doanhThuTienPhong[phong.querySelector('MAPHONG').innerHTML] = 0;
    });

    const phieuThuePhongs = [
      ...xml.getElementsByTagName('PHIEU_THUEPHONG'),
    ].filter((phieu) => {
      const dateDen = new Date(phieu.querySelector('NGAYDEN').innerHTML);
      const dateDi = new Date(phieu.querySelector('NGAYDI').innerHTML);
      return (
        (dateDen.getMonth() + 1 === monthNeed &&
          dateDen.getFullYear() === yearNeed) ||
        (dateDi.getMonth() + 1 === monthNeed &&
          dateDi.getFullYear() === yearNeed)
      );
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

      const dateDen = new Date(phieu.querySelector('NGAYDEN').innerHTML);
      const dateDi = new Date(phieu.querySelector('NGAYDI').innerHTML);

      if (dateDen - minDate >= 0) {
        if (dateDi - maxDate <= 0) {
          ctThuePhong.forEach((ct) => {
            doanhThuTienPhong[ct.querySelector('MAPHONG').innerHTML] +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((dateDi - dateDen) / 864e5);
            sumTienPhong +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((dateDi - dateDen) / 864e5);
          });
        } else {
          ctThuePhong.forEach((ct) => {
            doanhThuTienPhong[ct.querySelector('MAPHONG').innerHTML] +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((maxDate - dateDen) / 864e5);
            sumTienPhong +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((maxDate - dateDen) / 864e5);
          });
        }
      } else {
        if (dateDi - maxDate <= 0) {
          ctThuePhong.forEach((ct) => {
            doanhThuTienPhong[ct.querySelector('MAPHONG').innerHTML] +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((dateDi - minDate) / 864e5);
            sumTienPhong +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((dateDi - minDate) / 864e5);
          });
        } else {
          ctThuePhong.forEach((ct) => {
            doanhThuTienPhong[ct.querySelector('MAPHONG').innerHTML] +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((maxDate - minDate) / 864e5);
            sumTienPhong +=
              +ct.querySelector('GIAPHONG').innerHTML *
              Math.floor((maxDate - minDate) / 864e5);
          });
        }
      }
    });

    // tính tiền dịch vụ
    let doanhThuDichVu = 0;

    phieuThuePhongs
      .filter((phieu) => {
        const dateDi = new Date(phieu.querySelector('NGAYDI').innerHTML);
        return (
          dateDi.getMonth() + 1 === monthNeed &&
          dateDi.getFullYear() === yearNeed
        );
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
    $.notify('Chưa nhập tháng cần tính doanh thu', 'warn');
  }
});
