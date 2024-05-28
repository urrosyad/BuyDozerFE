import { SearchRounded } from '@mui/icons-material'
import { Box, InputBase } from '@mui/material'

const SearchInput = ({ placeholder, searchValue, handleSearch, color, bgColor}) => {
  
  return (
          <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", border: `2px solid ${color}`, bgcolor: bgColor, color: color, borderRadius: "5px", }}>
          <SearchRounded sx={{ fontSize: "16px", ml: "10px" }} />
          <InputBase 
          sx={{
            pl: "10px", 
            color: color, 
            fontWeight: "medium", 
            fontSize: "14px"
          }} 
          placeholder={placeholder} 
          color={color}
          value={searchValue} onChange={handleSearch} />
        </Box>
  )
}

export default SearchInput