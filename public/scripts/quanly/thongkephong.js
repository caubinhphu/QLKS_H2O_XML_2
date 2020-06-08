const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  const phongs = [...xml.getElementsByTagName('PHONG')].reduce((acc, cur) => {
    acc[cur.querySelector('MAPHONG').innerHTML] = {
      num: 0,
      price: cur.querySelector('GIAPHONG').innerHTML,
    };
    return acc;
  }, {});

  [...xml.getElementsByTagName('CHITIET_THUEPHONG')].forEach((ct) => {
    phongs[ct.querySelector('MAPHONG').innerHTML].num++;
  });

  let textHTML = '';
  let index = 1;
  for (let phong in phongs) {
    textHTML += `<tr>
      <td>${index}</td>
      <td>${phong}</td>
      <td>${phongs[phong].price}</td>
      <td>${phongs[phong].num}</td>
    </tr>`;
    index++;
  }

  document.getElementById('tableBody').innerHTML = textHTML;
};

xhr.send(null);
