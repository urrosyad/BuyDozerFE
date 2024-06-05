import React from 'react'

const dateToMonth = (date) => {
          const months = [
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                  ];
                
                  const [year, month, day] = date.split('-');
                
                  const formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
                  return formattedDate;
}

export default dateToMonth