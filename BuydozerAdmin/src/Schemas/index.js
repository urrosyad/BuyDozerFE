import * as yup from 'yup';

export const unitSchema = yup.object().shape({
        nameUnit: yup.string().min(5, 'Deskripsi unit minimal 5 character').required('harus diisi!'),
        typeUnit: yup.string().min(5, 'Deskripsi unit minimal 5 character').required('harus diisi!'),
        descUnit: yup.string().min(10, 'Deskripsi unit minimal 20 character').required('harus diisi'),
        imgUnit: yup.mixed().required('harus diisi!'),
        imgBrand: yup.mixed().required('harus diisi!'), 
        priceBuyUnit: yup.number().required('harus diisi!').min(0, 'Harga Jual tidak boleh negatif'),
        priceRentUnit: yup.number().required('harus diisi!').min(0, 'Harga Sewa tidak boleh negatif'),
        qtyUnit: yup.number().required('harus diisi!').min(0, 'Ketersediaan Unit tidak boleh negatif'),
        })

export const registerSchema = yup.object().shape({
        email: yup.string().email('email tidak valid').required('email harus diisi!'),
        username: yup.string()
          .matches(/^[a-zA-Z0-9]+$/, { message: 'tidak boleh mengandung spasi', excludeEmptyString: true })
          .required('username harus diisi!'),
        password: yup.string()
          .min(6, 'minimal 6 characters')
          .matches(/[A-Z]/, 'harus mengandung huruf uppercase')
          .matches(/[a-z]/, 'harus mengandung huruf lowecase')
          .matches(/[0-9]/, 'harus mengandung angka (0-9)')
          .matches(/[^a-zA-Z0-9]/, 'harus mengandung character simbol')
          .required('harus diisi!'),
        confirmPassword: yup.string()
          .oneOf([yup.ref('password'), null], 'Passwords tidak cocok')
          .required('harus diisi!'),
        companyUser: yup.string().required('Perusahaan harus diisi!'),
        positionUser: yup.string().required('Posisi harus diisi!'),
});

export const buySchema = yup.object().shape({
  receiverName: yup.string().required('nama pemesan harus diisi!'),
  receiverHp: yup.string().required('no hp harus diisi!').min(12, 'nomor tidak valid').max(13, 'nomor tidak valid'),
  receiverAddress: yup.string().required('alamat harus diisi!'),
  qtyTransaction: yup.string().required('jumlah tidak boleh 0!'),
})

export const rentSchema = yup.object().shape({
  receiverName: yup.string().required('nama pemesan harus diisi!'),
  receiverHp: yup.string().required('no hp harus diisi!').min(12, 'nomor tidak valid').max(13, 'nomor tidak valid'),
  receiverAddress: yup.string().required('alamat harus diisi!'),
  qtyTransaction: yup.string().required('jumlah tidak boleh 0!'),
})