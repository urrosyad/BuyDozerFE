import { KeyRounded, KeyOffRounded } from '@mui/icons-material'
import { IconButton, Box } from '@mui/material'

const KeyButton = ({onClick, isAdmin}) => {
  return (
      <Box>
          <IconButton color={isAdmin ? "success" : "gray"} onClick={onClick}>
            {isAdmin 
            ? 
            <KeyRounded style={{ fontSize: "16px" }} />
            : 
            <KeyOffRounded style={{ fontSize: "16px" }} />
            }
          </IconButton>
      </Box>
  )
}

export default KeyButton