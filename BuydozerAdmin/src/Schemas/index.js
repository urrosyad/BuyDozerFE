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




