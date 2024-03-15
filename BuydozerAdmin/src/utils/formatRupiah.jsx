
export default function formatRupiah(number){
       let number_string = number.toString();
       let split = number_string.split(',');
       let sisa = split[0].length % 3;
       let rupiah = split[0].substr(0, sisa);
       let ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);
       
       if (ribuan) {
         let separator = sisa ? '.' : '';
         rupiah += separator + ribuan.join('.');
       }
       
       rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
       
       return 'Rp' + rupiah;
}
