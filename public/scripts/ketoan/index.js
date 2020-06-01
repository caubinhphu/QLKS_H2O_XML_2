// get xml doc
let xml = null;
const xhr = new XMLHttpRequest();
xhr.open('get', '/data/QLKS_H2O.xml', false);
xhr.onload = function () {
  xml = this.responseXML;
};
xhr.send(null);

// truy xuất các hóa đơn
const phieuThue = [...xml.getElementsByTagName('PHIEU_THUEPHONG')];
let stt = 1;

phieuThue.forEach((phieu) => {
  if (phieu.getAttribute('DATRAPHONG') === '1') {
    // tính tồng tiền phòng
    const ctThuePhong = [...xml.querySelectorAll('CHITIET_THUEPHONG')];
    let tienPhong = 0;
    ctThuePhong.forEach((ct) => {
      if (
        ct.querySelector('SO_PHIEU').innerHTML ===
        phieu.querySelector('SO_PHIEU').innerHTML
      ) {
        const ngayDen = new Date(phieu.querySelector('NGAYDEN').innerHTML);
        const ngayDi = new Date(phieu.querySelector('NGAYDI').innerHTML);
        tienPhong +=
          Math.floor((ngayDi - ngayDen) / 864e5) *
          +ct.querySelector('GIAPHONG').innerHTML;
      }
    });

    // tính tồng tiền dịch vụ
    const ctThueDichVu = [...xml.querySelectorAll('CT_THUE_DICHVU')];
    let tienDichVu = 0;
    ctThueDichVu.forEach((ct) => {
      if (
        ct.querySelector('SO_PHIEU').innerHTML ===
        phieu.querySelector('SO_PHIEU').innerHTML
      ) {
        tienDichVu +=
          +ct.querySelector('SOLUONG').innerHTML *
          +ct.querySelector('GIA_DICHVU').innerHTML;
      }
    });

    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${stt}</td>
      <td>${phieu.querySelector('SO_PHIEU').innerHTML}</td>
      <td>${phieu.querySelector('NGAYDEN').innerHTML}</td>
      <td>${phieu.querySelector('NGAYDI').innerHTML}</td>
      <td>${tienPhong}</td>
      <td>${tienDichVu}</td>
      <td>${tienPhong + tienDichVu}</td>`;
    document.getElementById('tableBody').appendChild(tr);

    stt++;
  }
});
