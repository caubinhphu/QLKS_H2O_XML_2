const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;

  const dichVus = [...xml.getElementsByTagName('DICHVU')].reduce((acc, cur) => {
    acc[cur.querySelector('MA_DICHVU').innerHTML] = {
      name: cur.querySelector('TEN_DICHVU').innerHTML,
      num: 0,
      price: cur.querySelector('GIA_DICHVU').innerHTML,
    };
    return acc;
  }, {});

  [...xml.getElementsByTagName('CT_THUE_DICHVU')].forEach((ct) => {
    dichVus[ct.querySelector('MA_DICHVU').innerHTML].num += +ct.querySelector(
      'SOLUONG'
    ).innerHTML;
  });

  let textHTML = '';
  let index = 1;
  for (let dichVu in dichVus) {
    textHTML += `<tr>
      <td>${index}</td>
      <td>${dichVus[dichVu].name}</td>
      <td>${dichVus[dichVu].price}</td>
      <td>${dichVus[dichVu].num}</td>
    </tr>`;
    index++;
  }

  document.getElementById('tableBody').innerHTML = textHTML;
};

xhr.send(null);
