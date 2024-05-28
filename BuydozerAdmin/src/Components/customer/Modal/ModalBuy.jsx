import { useState } from 'react'
import { Box, Grid, Typography, Dialog, DialogTitle, DialogContent, Divider, DialogActions, TextField, Checkbox, CircularProgress } from '@mui/material';
import ButtonCounter from '../Atoms/Button/ButtonCounter';
import ButtonContained from '../Atoms/Button/ButtonContained';
import formatRupiah from '@utils/formatRupiah';


const termAndConditions = `
Dengan melakukan pembelian unit alat berat ini, Anda setuju untuk mematuhi dan terikat oleh syarat dan ketentuan yang tercantum di bawah ini. 
Pertama, harga yang tertera adalah harga final dan tidak dapat dinegosiasikan lebih lanjut. 
Kedua, proses pembayaran dilakukan dalam negosiasi dengan administrator yang via whatsApp. 
Ketiga, pembayaran hanya bisa dilakukan dalam bentuk transfer dengan nota persetujuan yang ditandatangi oleh kedua belah pihak. 
Keempat, penerimaan pengiriman harus dikonfirmasi dalam waktu 48 jam setelah pengiriman tiba. 
Kelima, segala risiko dan tanggung jawab atas kerusakan atau kehilangan selama pengiriman menjadi tanggung jawab kami. 
`;

const labelChecked = `
Dengan menyetujui syarat dan ketentuan ini, Anda mengonfirmasi bahwa Anda telah membaca dan memahami isi keseluruhan dokumen ini sebelum melanjutkan pembelian unit alat berat.`

const checkWarning = `Pastikan anda membaca keseluruhan syarat dan ketentuan!`


const ModalBuy = (props) => {
  const { isOpen, onClose, onSubmit, onChange, priceBuy, formik, checked, onChecked, labelInput, isPending} = props

  const [priceBuyUnit, setPriceBuyUnit] = useState(priceBuy);

  const handlePlus = () => {
    formik.setValues({ ...formik.values, qtyTransaction: formik.values.qtyTransaction + 1 });
    setPriceBuyUnit(prevPrice => prevPrice + priceBuy);
  }

  const handleMinus = () => {
    const minusQty = formik.values.qtyTransaction - 1;
    formik.setValues({ ...formik.values, qtyTransaction: Math.max(0, minusQty) });
    setPriceBuyUnit(prevPrice => Math.max(0, prevPrice - priceBuy));
  }

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{ "& .MuiPaper-root": { width: "900px", height: "500px", borderRadius: "5px" } }}>
      <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>
        Pembelian Unit
      </DialogTitle>
      <Divider sx={{ width: "90%", alignSelf: "center" }} />
      <DialogContent >
        <Grid container>
          <Grid item xs={6}>

            {labelInput.map((item, index) => (
              <Box key={index} sx={{ mb: "10px" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                  {item.label}
                </Typography>
                <TextField
                  name={item.name}
                  value={item.value}
                  type={item.type}
                  onChange={onChange}
                  variant="outlined"
                  size="small"
                  color='primaryDark'
                  sx={{ width: "95%" }}
                  {...(item.name === "receiverAddress" && { rows: 4, multiline: true })}
                  hiddenLabel
                  helperText={formik.errors[item.name]}
                  error={Boolean(formik.errors[item.name])}
                />
              </Box>
            ))}

            <Box sx={{ mb: "10px" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71", mb: "2px" }}>
                Jumlah Unit
              </Typography>
              <ButtonCounter
                formik={formik}
                onMinus={handleMinus}
                onPlus={handlePlus}
              />
            </Box>
          </Grid>

          <Grid item xs={6} >
            <Typography sx={{ fontSize: "11px", fontWeight: "thin", color: "#193D71", paddingLeft: "38px" }}>
              {termAndConditions}
            </Typography>
            <Box sx={{ flexDirection: "row", display: "flex", justifyContent: "flex-start", mt: "20px" }}>
              <Box>
                <Checkbox
                  size='small'
                  checked={checked}
                  onChange={onChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "11px", fontWeight: "thin", color: "#193D71" }}>

                  {!checked &&
                    <Typography variant='caption' sx={{ color: "red", fontSize: "11px", }} >
                      {checkWarning}
                    </Typography>
                  }
                  {labelChecked}
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>

      </DialogContent>
      <Divider sx={{ width: "90%", alignSelf: "center" }} />
      <DialogActions>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", flexDirection: "column", gap: 0, width: "100%", margin: "5px 20px", borderRadius: "5px" }}
        >

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", gap: 1, m: "5px 0px " }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#193D71" }}>
              TOTAL:
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#193D71" }}>
              {formatRupiah(priceBuyUnit)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
            {checked && priceBuyUnit
              ? (
                <ButtonContained
                  onClick={onSubmit}
                  text={
                    isPending
                    ? "REQUESTING..." 
                    : "REQUEST A QUOTE"
                  }
                  primaryColor={"#D9D630"}
                  secondColor={"#193D71"}
                  hoverColor={"#215093"}
                  width={"100%"}
                  height={"40px"}
                  fz={"16px"}
                />
              ) : (
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "40px",
                  borderRadius: "10px",
                  color: "#D9D630",
                  border: `2px solid ${"#7688A3"}`,
                  backgroundColor: "#7688A3",
                  fontSize: "16px",
                }}>
                  REQUEST A QUOTE
                </Box>
              )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default ModalBuy