const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const parseString = require('xml2js').parseString;
const xml2js = require('xml2js');

const app = express();

const PORT = process.env.PORT || 3000;

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.put('/vattu/vattu', (req, res) => {
  const { loaiPhong, vatTu, soLuong } = req.body;

  fs.readFile('./public/data/QLKS_H2O.xml', 'utf-8', (err, data) => {
    if (err) res.sendStatus(400);
    parseString(data, function (error, result) {
      if (error) res.sendStatus(500);

      // here we log the results of our xml string conversion
      const vatTuLoaiPhong = result.QLKS_H2O.VATTU_LOAIPHONG.find((item) => {
        return item.MA_VATTU[0] === vatTu && item.MA_LOAIPHONG[0] === loaiPhong;
      });
      if (vatTuLoaiPhong) {
        vatTuLoaiPhong.SOLUONG[0] = soLuong;
      }

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('./public/data/QLKS_H2O.xml', xml, function (err, data) {
        if (err) res.sendStatus(500);
      });

      res.json('OK');
    });
  });
});

app.put('/vattu/trangthai', (req, res) => {
  const { phong, trangThai } = req.body;

  fs.readFile('./public/data/QLKS_H2O.xml', 'utf-8', (err, data) => {
    if (err) res.sendStatus(400);
    parseString(data, function (error, result) {
      if (error) res.sendStatus(500);

      // here we log the results of our xml string conversion
      const phongNeed = result.QLKS_H2O.PHONG.find(
        (item) => item.MAPHONG[0] === phong
      );
      if (phongNeed) {
        phongNeed.MA_TRANGTHAI[0] = trangThai;
      }

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('./public/data/QLKS_H2O.xml', xml, function (err, data) {
        if (err) res.sendStatus(500);
      });

      res.json('OK');
    });
  });
});

app.post('/letan/thuephong', (req, res) => {
  const { customerInfo, roomInfo, serviceInfo, voucherInfo } = req.body;

  fs.readFile('./public/data/QLKS_H2O.xml', 'utf-8', (err, data) => {
    if (err) res.sendStatus(400);
    parseString(data, function (error, result) {
      if (error) res.sendStatus(500);

      const customerId = Math.round(Math.random() * 1e9)
        .toString()
        .padStart(9, '0');
      const voucherId = Math.round(Math.random() * 1e9)
        .toString()
        .padStart(9, '0');

      // save customer info
      result.QLKS_H2O.KHACH.push({
        MA_KHACH: [customerId],
        HOTEN_KHACH: [customerInfo.name],
        GIOITINH: [customerInfo.gender],
        NGAYSINH: [customerInfo.dateOfBirth],
        CMND_PASSPORT: [customerInfo.code],
        DIENTHOAI: [customerInfo.phone],
        QUOCTICH: [customerInfo.country],
      });

      // save voucher info
      result.QLKS_H2O.PHIEU_THUEPHONG.push({
        SO_PHIEU: [voucherId],
        MAKHACH: [customerId],
        MA_NHANVIEN: [voucherInfo.staff],
        NGAYLAP_PHIEU: [voucherInfo.dataCreate],
        NGAYDEN: [voucherInfo.dateArrival],
        NGAYDI: [voucherInfo.dataLeave],
        $: { DATRAPHONG: '0' },
      });

      // save roomInfo
      roomInfo.forEach((room) => {
        const r = result.QLKS_H2O.PHONG.find(
          (phong) => phong.MAPHONG[0] === room.id
        );

        if (r) {
          result.QLKS_H2O.CHITIET_THUEPHONG.push({
            SO_PHIEU: [voucherId],
            MAPHONG: [room.id],
            SONGUOI: [room.num],
            GIAPHONG: [r.GIAPHONG[0]],
          });

          // update status of this room
          r.MA_TRANGTHAI[0] = 'OC';
        }
      });

      // save serviceInfo
      serviceInfo.forEach((service) => {
        const sv = result.QLKS_H2O.DICHVU.find(
          (dv) => dv.MA_DICHVU[0] === service.id
        );

        if (sv) {
          result.QLKS_H2O.CT_THUE_DICHVU.push({
            SO_PHIEU: [voucherId],
            MA_DICHVU: [service.id],
            SOLUONG: [service.num],
            GIA_DICHVU: [sv.GIA_DICHVU[0]],
          });
        }
      });

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('./public/data/QLKS_H2O.xml', xml, function (err, data) {
        if (err) res.sendStatus(500);
      });

      res.json('OK');
    });
  });
});

app.listen(PORT, () => console.log('Server is opened'));
