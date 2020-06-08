document.getElementById('btnThem').addEventListener('click', function () {
  axios
    .post('/quanly/dichvu', {
      id: document.getElementById('madichvu').value,
      name: document.getElementById('tendichvu').value,
      price: document.getElementById('giadichvu').value,
    })
    .then((res) => {
      if (res.data === 'OK') {
        location.href = '/quanly/dichvu.html';
      }
    })
    .catch((err) => location.reload());
});
