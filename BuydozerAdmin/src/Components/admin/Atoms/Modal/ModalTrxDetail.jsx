import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, FormControl, Box, DialogContent } from '@mui/material'
import CancelButton from '../Buttons/CancelButton'

const ModalTrxDetail = ({ typeModal, onClose, onChange, isOpen, labelInput, formik, statusConfig }) => {

    const statusIndex = formik.values.statusTransaction;
    let statusContent, statusColor;
    if (statusConfig.hasOwnProperty(statusIndex)) {
        statusContent = statusConfig[statusIndex].content;
        statusColor = statusConfig[statusIndex].color;

    } else {
    }


    return (
        <Dialog open={isOpen} onClose={onClose} sx={{
            "& .MuiPaper-root": { borderRadius: "20px", width:"800px" }
        }}>
            <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>{typeModal}</DialogTitle>
            <Divider sx={{ width: "90%", alignSelf: "center" }} />
            <DialogContent>
                <Box sx={{ width: "100%", height: "50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: "medium", fontSize: "18px", color: "#193d71" }}>
                            {formik.values.transactionNum}
                        </Typography>
                        <Typography sx={{ fontWeight: "medium", fontSize: "18px", color: "#193d71" }}>
                            {formik.values.dateTransaction}
                        </Typography>
                    </Box>
                    <Box>
                        <Button variant='contained' 
                        sx={{
                            width: "100px", color: "white", bgcolor: statusColor, borderRadius: "10px", boxShadow: 'unset', ":hover": {
                            bgcolor: statusColor}
                        }}>
                            {statusContent}
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ padding: "20px 0" }}>
                    <Grid container>
                        {[0, 1, 2].map(gridIndex => (
                            <Grid key={gridIndex} item xs={4}>
                                <FormControl sx={{ width: "95%", marginLeft: "5px" }}>
                                    {labelInput.slice(gridIndex * Math.ceil(labelInput.length / 3), (gridIndex + 1) * Math.ceil(labelInput.length / 3)).map((data, index) => (
                                        <Box key={index} style={{ marginBottom: "5px" }}>
                                            <DialogContentText sx={{ fontSize: "14px", fontWeight: "medium" }}>
                                                {data.label}
                                            </DialogContentText>
                                            <TextField name={data.name} value={data.value || ''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} disabled />
                                            {/* {data.type == "datetime-local" ?
                                                <DateTimePicker label="readOnly" name={data.name} value={formatDateTime(data.value)} readOnly />
                                                : null} */}
                                        </Box>
                                    ))}
                                </FormControl>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DialogContent>
            <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
            <DialogActions sx={{ margin: "10px 20px", gap: "2px" }}>
                <CancelButton onClose={onClose} />
            </DialogActions>
        </Dialog>
    )
}

export default ModalTrxDetail