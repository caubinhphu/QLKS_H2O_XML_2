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

    document.getElementById('ngaydi').innerHTML = phieuThue.querySelector(
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
      document.getElementById('tenkhach').innerHTML = khach.querySelector(
        'HOTEN_KHACH'
      ).innerHTML;

      document.getElementById('cmnd').innerHTML = khach.querySelector(
        'CMND_PASSPORT'
      ).innerHTML;

      document.getElementById('gioitinh').innerHTML = khach.querySelector(
        'GIOITINH'
      ).innerHTML;

      document.getElementById('ngaysinh').innerHTML = khach.querySelector(
        'NGAYSINH'
      ).innerHTML;

      document.getElementById('dienthoai').innerHTML = khach.querySelector(
        'DIENTHOAI'
      ).innerHTML;

      document.getElementById('quoctich').innerHTML = khach.querySelector(
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

    //   const maLoaiPhong = phong.querySelector('MA_LOAIPHONG').innerHTML;
    //   const loaiPhong = [...xml.getElementsByTagName('LOAIPHONG')].find(
    //     (lp) => lp.querySelector('MA_LOAIPHONG').innerHTML === maLoaiPhong
    //   );

    //   if (loaiPhong) {
    //     document.getElementById('loaiphong').innerHTML = loaiPhong.querySelector(
    //       'TEN_LOAIPHONG'
    //     ).innerHTML;

    //     const maTrangThai = phong.querySelector('MA_TRANGTHAI').innerHTML;
    //     const trangThai = [...xml.getElementsByTagName('TRANGTHAI_PHONG')].find(
    //       (tt) => tt.querySelector('MA_TRANGTHAI').innerHTML === maTrangThai
    //     );

    //     if (trangThai) {
    //       document.getElementById(
    //         'trangthai'
    //       ).innerHTML = trangThai.querySelector('TEN_TRANGTHAI').innerHTML;
    //     }

    //     const vatTus = [...xml.getElementsByTagName('VATTU_LOAIPHONG')].filter(
    //       (item) => item.querySelector('MA_LOAIPHONG').innerHTML === maLoaiPhong
    //     );

    //     vatTus.forEach((item, index) => {
    //       const vatTu = [...xml.getElementsByTagName('VATTU')].find(
    //         (vt) =>
    //           vt.querySelector('MA_VATTU').innerHTML ===
    //           item.querySelector('MA_VATTU').innerHTML
    //       );
    //       if (vatTu) {
    //         const tr = document.createElement('tr');
    //         tr.innerHTML = `<td>${index + 1}</td>
    //                       <td>${vatTu.querySelector('TEN_VATTU').innerHTML}</td>
    //                       <td>${item.querySelector('SOLUONG').innerHTML}</td>`;

    //         document.getElementById('vattuBody').appendChild(tr);
    //       }
    //     });
    //   }

    //   const ctThuePhongs = [...xml.getElementsByTagName('CHITIET_THUEPHONG')];

    //   const phieuThuePhong = [...xml.getElementsByTagName('PHIEU_THUEPHONG')]
    //     .filter((phieu) => phieu.getAttribute('DATRAPHONG') === '0')
    //     .map((phieu) => {
    //       phieu.chiTiet = ctThuePhongs.filter(
    //         (ct) =>
    //           ct.querySelector('SO_PHIEU').innerHTML ===
    //             phieu.querySelector('SO_PHIEU').innerHTML &&
    //           ct.querySelector('MAPHONG').innerHTML === idPhong
    //       );
    //       return phieu;
    //     })
    //     .find((phieu) => phieu.chiTiet.length > 0);

    //   if (phieuThuePhong) {
    //     console.log(phieuThuePhong);
    //     document.getElementById('phieuthue').innerHTML = `<hr>
    //               <div class="text-center w-50 mx-auto"><h5>PHIẾU THUÊ PHÒNG</h5></div>
    //               <div class="d-flex w-50 mx-auto flex-wrap">
    //                 <div class="col-6">SỐ PHIẾU: <a href="/phieuthue?id=${
    //                   phieuThuePhong.querySelector('SO_PHIEU').innerHTML
    //                 }">${
    //       phieuThuePhong.querySelector('SO_PHIEU').innerHTML
    //     }</a></div>
    //                 <div class="col-6">MÃ KHÁCH: ${
    //                   phieuThuePhong.querySelector('MAKHACH').innerHTML
    //                 }</div>
    //                 <div class="col-6">MÃ NHÂN VIÊN: ${
    //                   phieuThuePhong.querySelector('MA_NHANVIEN').innerHTML
    //                 }</div>
    //                 <div class="col-6">NGÀY LẬP PHIẾU: ${
    //                   phieuThuePhong.querySelector('NGAYLAP_PHIEU').innerHTML
    //                 }</div>
    //                 <div class="col-6">NGÀY ĐẾN: ${
    //                   phieuThuePhong.querySelector('NGAYDEN').innerHTML
    //                 }</div>
    //                 <div class="col-6">NGÀY ĐI: ${
    //                   phieuThuePhong.querySelector('NGAYDI').innerHTML
    //                 }</div>
    //               </div>
    //               `;
    //   }

    //   document.getElementById('giaphong').innerHTML = phong.querySelector(
    //     'GIAPHONG'
    //   ).innerHTML;
    //   const giaphong = phong.querySelector('GIAPHONG').innerHTML;
    //   const gp = [...xml.getElementsByTagName('PHONG')].find(
    //     (giap) => giap.querySelector('GIAPHONG').innerHTML === giaphong
    //   );
  }
};

xhr.send(null);
