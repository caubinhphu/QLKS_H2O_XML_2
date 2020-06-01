const express = require('express');
const path = require('path');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const xml2js = require('xml2js');

const app = express();

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  fs.readFile('./public/data/test.xml', 'utf-8', (err, data) => {
    if (err) throw err;
    parseString(data, function (error, result) {
      if (error) console.log(error);
      // here we log the results of our xml string conversion
      console.log(result);

      result.QLKS_H2O.LOAIPHONG[0].MA_LOAIPHONG[0] = 'xxxxxxxxxxxxxxxxx';

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile('./public/data/test.xml', xml, function (err, data) {
        if (err) console.log(err);

        console.log('successfully written our update xml to file');
      });

      res.json(result);
    });
  });
});

app.listen(3000, () => console.log('Server is opened'));
