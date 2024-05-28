import { Dialog, DialogTitle,  Divider, DialogContent } from '@mui/material'

const ModalPaymentConfirm
    = ({ typeModal, onClose, isOpen, labelInput, formik, img }) => {

        return (
            <Dialog open={isOpen} onClose={onClose} sx={{
                "& .MuiPaper-root": { borderRadius: "20px" }
            }}>
                <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>{typeModal}</DialogTitle>
                <Divider sx={{ width: "90%", alignSelf: "center", marginBottom: "20px" }} />
                <DialogContent>
                    <img src={formik ? formik.values.paymentConfirmationReceipt : img} alt="Foto Bukti Pembayaran" style={{width:"100%", height:"100%" }} />
                </DialogContent>
                <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
            </Dialog>
        )
    }

export default ModalPaymentConfirm
