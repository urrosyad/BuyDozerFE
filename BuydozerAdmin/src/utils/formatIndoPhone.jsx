import React from 'react'

const formatIndoPhone = (phoneNumber) => {
          const cleaned = ('' + phoneNumber).replace(/\D/g, '');
          // Menambahkan awalan +62
          const formatted = cleaned.replace(/^0/, '+62 ');
          // Memisahkan setiap 4 angka dengan tanda "-"
          const separated = formatted.replace(/(\d{4})(?=\d)/g, '$1-');
          console.log({ cleaned, formatted, separated });
          return separated;
}

export default formatIndoPhone