import SubmitButton from '../Buttons/SubmitButton'
import CancelButton from '../Buttons/CancelButton'
import { TextareaAutosize } from '@mui/base'
import { Typography, Button, Dialog, DialogTitle, DialogContentText, TextField, DialogActions, Divider, Grid, styled, FormControl, Box, DialogContent } from '@mui/material'


const ModalUser = ({ typeModal, onClose, onSubmit, onChange, isOpen, labelInput, formik }) => {

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{
      "& .MuiPaper-root": { borderRadius: "20px", width:"450px" }
    }}>
      <DialogTitle variant="h5" sx={{ width: "100%", fontWeight: "medium" }}>{typeModal}</DialogTitle>
      <Divider sx={{ width: "90%", alignSelf: "center", marginBottom: "20px" }} />
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <FormControl sx={{ width: "95%", marginLeft: "5px" }}>
              {labelInput.map((data, index) => (
                <Box key={index} style={{ marginBottom: "5px" }}>
                  <DialogContentText sx={{ fontSize: "14px", fontWeight: "medium" }}>
                    {data.label}
                  </DialogContentText>
                  <TextField name={data.name} value={data.value || ''} type={data.type} variant="outlined" size='small' sx={{ fontSize: "14px" }} onChange={onChange} />
                </Box>
              ))}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider sx={{ width: "93%", alignSelf: "center", marginTop: "20px" }} />
      <DialogActions sx={{ margin: "10px 20px", gap: "2px" }}>
        <SubmitButton onSubmit={onSubmit} />
        <CancelButton onClose={onClose} />
      </DialogActions>
    </Dialog>
  )
}

export default ModalUser