import { Button, Typography } from '@mui/material'
import { Box, width } from '@mui/system'
import React from 'react'

const ButtonCounter = ({formik, onMinus, onPlus}) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="row" gap={1}>
      <Button
        onClick={onMinus}
        variant="contained"
        size='small'
        style={{minWidth:"auto", width:"30px", backgroundColor: '#F5E94C', color: '#193D71', boxShadow:"unset"
      }}>
        -
      </Button>
      <Box sx={{ width:"30px", height:"30px", display: 'flex', alignItems: 'center', bgcolor:"#EEF2FF", borderRadius:"5px" }}>
      <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#193D71', margin: '0 10px' }}>
        {formik.values.qtyTransaction}
      </Typography>
      </Box>
      <Button
        onClick={onPlus}
        variant="contained"
        size='small'
        style={{minWidth:"auto", width:"30px", backgroundColor: '#F5E94C', color: '#193D71', boxShadow:"unset"
      }}>
        +
      </Button>
    </Box>
  )
}

export default ButtonCounter