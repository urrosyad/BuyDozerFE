export const formatDateTime = (dateString) => {
    // Gunakan objek Date dan toLocaleDateString untuk memformat tanggal
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options); // Menggunakan format tanggal yang sesuai dengan preferensi lokal (ID)
};

export const formatDate = (dateString) => {
    // Gunakan objek Date dan toLocaleDateString untuk memformat tanggal
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options); // Menggunakan format tanggal yang sesuai dengan preferensi lokal (ID)
};

export const formatDateTimeOffset = (dateTimeOffsetString) => {
    const dateTimeOffset = new Date(dateTimeOffsetString);
    // Menggunakan fungsi built-in dari objek Date untuk mendapatkan tanggal dan waktu dalam format yang diinginkan
    const formattedDateTimeLocal = dateTimeOffset.toISOString().slice(0, 16);
    return formattedDateTimeLocal;
}
