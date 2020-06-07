require('dotenv').config();
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

app.get('/', (req, res) => {
  res.send('Hello');
});

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

app.listen(PORT, () => console.log('Server is opened'));
