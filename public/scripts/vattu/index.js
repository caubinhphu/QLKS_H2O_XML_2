const xhr = new XMLHttpRequest();

let xml = null;

xhr.open('get', '/data/QLKS_H2O.xml', false);

xhr.onload = function () {
  xml = this.responseXML;
};

xhr.send(null);

const xsltProcessor = new XSLTProcessor();

// Load the xsl file using synchronous (third param is set to false) XMLHttpRequest
const xhr2 = new XMLHttpRequest();
xhr2.open('get', '/data/vattuindex.xsl', false);

xhr2.onload = function () {
  xsltProcessor.importStylesheet(this.responseXML);

  const doc = xsltProcessor.transformToDocument(xml);

  const text = doc.firstElementChild.outerHTML;

  const table = `<table class="table table-sm mt-3 table-striped text-center" style="display: none" id="table">
      <thead class="thead-dark">
        <tr>
          <th>STT</th>
          <th>Tên vật tư</th>
          <th>Số lượng</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody id="tabalBody"></tbody>
    </table>`;

  document.getElementById('main').innerHTML = text + table;
};

xhr2.send(null);

document.getElementById('xemBtn').addEventListener('click', function () {
  const loaiPhong = document.getElementById('selectLoaiPhong').value;

  const vatTuLoaiPhong = [
    ...xml.getElementsByTagName('VATTU_LOAIPHONG'),
  ].filter(
    (lp) => lp.getElementsByTagName('MA_LOAIPHONG')[0].innerHTML === loaiPhong
  );

  document.getElementById('tabalBody').innerHTML = '';

  vatTuLoaiPhong.forEach((item, index) => {
    const vatTu = [...xml.getElementsByTagName('VATTU')].find((vt) => {
      return (
        vt.getElementsByTagName('MA_VATTU')[0].innerHTML ===
        item.getElementsByTagName('MA_VATTU')[0].innerHTML
      );
    });

    let tenVatTu = '';

    if (vatTu) {
      tenVatTu = vatTu.getElementsByTagName('TEN_VATTU')[0].innerHTML;
    }

    const tr = document.createElement('tr');

    tr.innerHTML = `<td>${index + 1}</td>
      <td>${tenVatTu}</td>
      <td>
        <input class="form-control form-control-sm w-25 mx-auto text-center" type="number" value="${
          item.getElementsByTagName('SOLUONG')[0].innerHTML
        }" class="text-center">
      </td>
      <td>
        <button class="btn btn-success btn-sm">Lưu</button>
      </td>`;

    document.getElementById('tabalBody').appendChild(tr);
    document.getElementById('table').style.display = 'table';
  });
});
