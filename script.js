let dataPendaftar = [

  {
    kode:'A01-1',
    nama:'Nur Ali Mahpudin',
    jk:'Laki-Laki',
    ttl:'Tangerang, 15-03-2001',
    asal:'SMA Negeri 3 Pamulang',
    rata:'90.0',
    status:'Lulus',
    cls:'badge-lulus'
  },

  {
    kode:'B02-2',
    nama:'Ali',
    jk:'Laki-Laki',
    ttl:'Serang, 10-05-2002',
    asal:'SMA Negeri 1 Serang',
    rata:'72.3',
    status:'Lulus',
    cls:'badge-lulus'
  },

  {
    kode:'V03-1',
    nama:'Mahoudi',
    jk:'Laki-Laki',
    ttl:'Pandeglang, 12-11-2003',
    asal:'SMA Al-Fawaz',
    rata:'62.3',
    status:'Cadangan',
    cls:'badge-cadangan'
  },

  {
    kode:'A04-3',
    nama:'Nur',
    jk:'Perempuan',
    ttl:'Lebak, 08-08-2002',
    asal:'SMA Negeri 5 Lebak',
    rata:'54.3',
    status:'Tidak Lulus',
    cls:'badge-tidak'
  }

];

function updateKode(){

  const g = document.getElementById('gedung').value;
  const n = document.getElementById('nomor').value;
  const k = document.getElementById('ket').value;

  const preview = document.getElementById('kodePreview');

  if(!g || !n || !k){
    preview.innerHTML = '—';
    return;
  }

  preview.innerHTML =
    g +
    String(n).padStart(2,'0') +
    '-' +
    k;
}

function hitungRata(){

  const mat =
    parseFloat(document.getElementById('mat').value) || 0;

  const indo =
    parseFloat(document.getElementById('indo').value) || 0;

  const ing =
    parseFloat(document.getElementById('ing').value) || 0;

  const rata =
    ((mat + indo + ing) / 3).toFixed(1);

  document.getElementById('rataPreview')
    .innerHTML = rata;
}

function tambahData(){

  const kode =
    document.getElementById('kodePreview').innerHTML;

  const nama =
    document.getElementById('nama').value;

  const jk =
    document.getElementById('jk').value;

  const ttl =
    document.getElementById('ttl').value;

  const asal =
    document.getElementById('asal').value;

  const rata =
    document.getElementById('rataPreview').innerHTML;

  if(
    kode === '—' ||
    nama === '' ||
    jk === '' ||
    ttl === '' ||
    asal === ''
  ){
    alert('Lengkapi data terlebih dahulu!');
    return;
  }

  let status = 'Tidak Lulus';
  let cls = 'badge-tidak';

  if(rata >= 70){
    status = 'Lulus';
    cls = 'badge-lulus';
  }
  else if(rata >= 60){
    status = 'Cadangan';
    cls = 'badge-cadangan';
  }

  dataPendaftar.push({
    kode,
    nama,
    jk,
    ttl,
    asal,
    rata,
    status,
    cls
  });

  renderTable();
  updateStatistik();
  resetForm();

  alert('Data berhasil ditambahkan!');
}

function renderTable(){

  const tbody =
    document.getElementById('tbody');

  const cari =
    document.getElementById('searchInput')
    .value
    .toLowerCase();

  tbody.innerHTML = '';

  dataPendaftar
  .filter(d => d.nama.toLowerCase().includes(cari))
  .forEach((d,index)=>{

    tbody.innerHTML += `
      <tr>

        <td>
          <span class="kode-tag">
            ${d.kode}
          </span>
        </td>

        <td>${d.nama}</td>

        <td>${d.jk}</td>

        <td>${d.ttl}</td>

        <td>${d.asal}</td>

        <td>
          <b>${d.rata}</b>
        </td>

        <td>
          <span class="badge ${d.cls}">
            ${d.status}
          </span>
        </td>

        <td>
          <button
            class="btn btn-danger"
            onclick="hapusData(${index})">
            Hapus
          </button>
        </td>

      </tr>
    `;
  });
}

function hapusData(index){

  const konfirmasi =
    confirm('Yakin ingin menghapus data?');

  if(konfirmasi){

    dataPendaftar.splice(index,1);

    renderTable();
    updateStatistik();

  }

}

function updateStatistik(){

  document.getElementById('totalPendaftar')
    .innerHTML = dataPendaftar.length;

  document.getElementById('totalLulus')
    .innerHTML =
    dataPendaftar.filter(d=>d.status==='Lulus').length;

  document.getElementById('totalCadangan')
    .innerHTML =
    dataPendaftar.filter(d=>d.status==='Cadangan').length;

  document.getElementById('totalTidak')
    .innerHTML =
    dataPendaftar.filter(d=>d.status==='Tidak Lulus').length;
}

function resetForm(){

  document.getElementById('kodePreview').innerHTML = '—';

  document.getElementById('rataPreview').innerHTML = '—';

  document.querySelectorAll('input').forEach(i=>{
    i.value='';
  });

  document.querySelectorAll('select').forEach(s=>{
    s.selectedIndex=0;
  });

}

renderTable();
updateStatistik();