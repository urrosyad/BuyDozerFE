import React from 'react'
import { useTheme, Box, Button, Typography } from '@mui/material';
import theme from '../../theme';



const Header = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{ display:"flex", justifyContent: "space-between", alignItems: "center", padding: 3, boxShadow: 1, width: "auto", height: "auto", border: 1 }}>
      <Box flexDirection={"row"}>
        <Typography variant="h4" color={theme.palette.primary.main} sx={{ fontWeight: theme.typography.fontWeight.medium }}>
        </Typography>
      </Box>
      <Box bgcolor={theme.palette.primary.text}>
        <Button variant="outlined" size="small" sx={{ color: theme.palette.primary.dark, borderRadius: "10px" }}>
          <Typography variant="h8" color={theme.palette.primary.main} sx={{ fontWeight: theme.typography.fontWeight.reguler, }}>
            Logout
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header