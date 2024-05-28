import {Box, IconButton} from '@mui/material'
import { BorderColorRounded } from '@mui/icons-material'


const EditButton = ({ onClick }) => {
  return (
      <Box>
        <IconButton color='warning' onClick={onClick}>
          <BorderColorRounded style={{fontSize: "16px"}}/>
        </IconButton>
      </Box>
  )
}

export default EditButton