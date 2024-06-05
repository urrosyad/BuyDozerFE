
function numToWord(angka) {
    if (angka === 0) return 'Nol';

    const satuan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    const belasan = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
    const puluhan = ['', 'Sepuluh', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];
  
    const ribuan = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];
  
    // Fungsi untuk mengonversi blok tiga digit menjadi terbilang
    const terbilangTigaDigit = (num) => {
      let result = '';
      const ratusan = Math.floor(num / 100);
      const puluhanan = Math.floor((num % 100) / 10);
      const satuanan = num % 10;
  
      if (ratusan > 0) {
        if (ratusan === 1) {
          result += 'Seratus ';
        } else {
          result += satuan[ratusan] + ' Ratus ';
        }
      }
  
      if (puluhanan === 1 && satuanan > 0) {
        result += belasan[satuanan] + ' ';
      } else if (puluhanan === 1 && satuanan === 0) {
        result += puluhan[puluhanan] + ' ';
      } else {
        result += puluhan[puluhanan] + ' ' + satuan[satuanan] + ' ';
      }
  
      return result.trim();
    };
  
    let result = '';
    let counter = 0;
  
    // Memproses blok tiga digit pada setiap ribuan
    while (angka > 0) {
      const num = angka % 1000;
      if (num > 0) {
        result = terbilangTigaDigit(num) + ' ' + ribuan[counter] + ' ' + result;
      }
      angka = Math.floor(angka / 1000);
      counter++;
    }
  
    return result.trim();
}

export default numToWord