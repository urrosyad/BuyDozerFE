import * as yup from 'yup';

export const unitSchema = yup.object().shape({
        nameUnit: yup.string().min(5, 'Deskripsi unit minimal 5 character').required('Required!'),
        typeUnit: yup.string().min(5, 'Deskripsi unit minimal 5 character').required('Required!'),
        descUnit: yup.string().min(10, 'Deskripsi unit minimal 20 character').required('Reuqired'),
        imgUnit: yup.mixed().required('Required!'),
        imgBrand: yup.mixed().required('Required!'), 
        priceBuyUnit: yup.number().required('Required!').min(0, 'Harga Jual tidak boleh negatif'),
        priceRentUnit: yup.number().required('Required!').min(0, 'Harga Sewa tidak boleh negatif'),
        qtyUnit: yup.number().required('Required!').min(0, 'Ketersediaan Unit tidak boleh negatif'),
        })

export const registerSchema = yup.object().shape({
        email: yup.string().email('email tidak valid').required('required!'),
        username: yup.string()
          .matches(/^[a-zA-Z0-9]+$/, { message: 'tidak boleh mengandung spasi', excludeEmptyString: true })
          .required('required!'),
        password: yup.string()
          .min(6, 'minimal 6 characters')
          .matches(/[A-Z]/, 'harus mengandung huruf uppercase')
          .matches(/[a-z]/, 'harus mengandung huruf lowecase')
          .matches(/[0-9]/, 'harus mengandung angka (0-9)')
          .matches(/[^a-zA-Z0-9]/, 'harus mengandung character simbol')
          .required('required!'),
        confirmPassword: yup.string()
          .oneOf([yup.ref('password'), null], 'Passwords tidak cocok')
          .required('required!'),
        companyUser: yup.string().required('required!'),
        positionUser: yup.string().required('required!'),
});