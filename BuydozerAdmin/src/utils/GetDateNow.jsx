
export default function GetDateNow(){
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tambah 1 karena bulan dimulai dari 0
   const day = String(currentDate.getDate()).padStart(2, '0');
   return `${year}-${month}-${day}`;
}
