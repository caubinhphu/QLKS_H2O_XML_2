const btnAddTonThat = document.getElementById('add-tonthat');
const listTonThat = document.getElementById('list-tonthat');
const bangTonThat = document.getElementById('bang-tonthat');

btnAddTonThat.addEventListener('click', () => {
  listTonThat.value += `"${document.getElementById('vattu-tonthat').value}":"${document.getElementById('soluong-tonthat').value}",`;
  document.getElementById('soluong-tonthat').value = "";
  var tonThat = JSON.parse(`{${listTonThat.value.slice(0, listTonThat.value.length - 1)}}`);
  var table = '';
  for (let tt in tonThat) {
    table += `<tr><td>${tt}</td><td>${parseInt(tonThat[tt])}</td></tr>`
  }
  bangTonThat.innerHTML = table;
});
