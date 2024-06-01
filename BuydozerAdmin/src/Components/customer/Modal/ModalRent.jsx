import { useEffect, useState } from 'react'
import { Box, Grid, Typography, Dialog, DialogTitle, DialogContent, Divider, DialogActions, TextField, Checkbox, Select, MenuItem, FormControl, OutlinedInput } from '@mui/material';
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

const ModalRent = (props) => {
  const { isOpen, onClose, onSubmit, onChange, priceRent, formik, checked, onChecked, labelInput, dataPricelist, isPending, pricelistIsFetching } = props

  const [priceRentUnit, setPriceRentUnit] = useState(priceRent);
  const [totalPriceRent, setTotalPriceRent] = useState(0);
  const [tax, setTax] = useState(1);
  const [month, setMonth] = useState(0);

  const handlePlus = () => {
    formik.setValues({ ...formik.values, qtyTransaction: formik.values.qtyTransaction + 1 });
    setPriceRentUnit(prevPrice => prevPrice + priceRent);
  }

  const handleMinus = () => {
    const minusQty = formik.values.qtyTransaction - 1;
    formik.setValues({ ...formik.values, qtyTransaction: Math.max(0, minusQty) });
    setPriceRentUnit(prevPrice => Math.max(0, prevPrice - priceRent));
  }

  const handlePricelist = (e) => {
    const selectedValue = e.target.value;
    const selectedPriceList = dataPricelist.find(item => item.priceRentUnit === selectedValue);
    setTax(e.target.value);
    setMonth(selectedPriceList.months);
    formik.setValues({ ...formik.values, priceListRentId: selectedPriceList?.id });
  }

  useEffect(() => {
    setTotalPriceRent(priceRentUnit + (tax * priceRentUnit));
  }, [priceRentUnit, tax])

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{ "& .MuiPaper-root": { width: "900px", height: "500px", borderRadius: "5px" } }}>
      <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>
        Penyewaan Unit
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

            <FormControl sx={{ minWidth: 120, mb: "10px" }} size="small">
              <Typography sx={{ fontSize: "16px", fontWeight: "medium", color: "#193D71" }}>
                Durasi Sewa
              </Typography>

              <Select
                displayEmpty
                color='primaryDark'
                input={<OutlinedInput />}
                onChange={handlePricelist}
                value={tax}
              >
                {pricelistIsFetching
                  ? <MenuItem
                    value={0}
                  >
                    0
                  </MenuItem>
                  : dataPricelist.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.priceRentUnit}
                    >
                      {item.nameRent}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

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
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", flexDirection: "column", gap: 0, width: "100%", margin: "5px 20px", borderRadius: "5px" }}>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", gap: 1 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#193D71" }}>
              Harga Sewa:
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "medium", color: "#193D71" }}>
              {month
                ? formatRupiah(priceRentUnit) + "x" + month + " Bulan"
                : formatRupiah(priceRentUnit)
              }
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", gap: 1 }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#193D71" }}>
              Tax:
            </Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "medium", color: "#28D156" }}>
              + {formatRupiah(totalPriceRent - (priceRentUnit * month))}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", gap: 1, m: "5px 0px " }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "medium", color: "#193D71" }}>
              TOTAL:
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "#193D71" }}>
              {formatRupiah(totalPriceRent)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%" }}>
            {checked && priceRentUnit
              ? (
                <ButtonContained
                  onClick={onSubmit}
                  text={
                    isPending
                      ? "REQUESTING..."
                      : "REQUEST A QUOTE"
                  }
                  primaryColor={"#193D71"}
                  secondColor={"#D9D630"}
                  hoverColor={"#F5E94C"}
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
                  color: "#193D71",
                  border: `2px solid ${"#ECEBB2"}`,
                  backgroundColor: "#ECEBB2",
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

export default ModalRent