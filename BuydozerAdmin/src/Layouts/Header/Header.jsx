import { useState, cloneElement } from 'react';
import { useTheme, Box, Button, Typography, Tooltip, Zoom, useScrollTrigger } from '@mui/material';
import { SupportAgentRounded, ExitToApp, Notifications, Key } from '@mui/icons-material';
import theme from '../../theme';


const Header = () => {
  const theme = useTheme();
  
  const [isHover, setIsHover] = useState(null)
  
  const headerIcon = [
    { icon: <SupportAgentRounded  fontSize='small' sx={{ color: theme.palette.primary.dark }} />, tooltip: "Admin" },
    { icon: <Notifications fontSize='small' sx={{ color: theme.palette.primary.dark }} />, tooltip: "Notifications" },
    { icon: <ExitToApp fontSize='small' sx={{ color: theme.palette.primary.dark }} />, tooltip: "Logout" },
  ]


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "30px",
        width: "auto",
        height: "80px",
        backgroundColor: "#F9FAFF",
        // boxShadow: 1,
      }}

    >
      <Box sx={{ color: theme.palette.primary.dark, mr: "10px" }}>
        <Typography variant="h6" sx={{ fontWeight: theme.typography.fontWeightRegular, display: "block", mb: -1, textAlign: 'right' }}>
          Hi!
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", display: "block" }}>
          Ulur Rosyad
        </Typography>
      </Box>

      {headerIcon.map((item, index) => (
        <Tooltip key={index} TransitionComponent={Zoom} title={item.tooltip} arrow>
          <Box
            onMouseEnter={() => setIsHover(index)}
            onMouseLeave={() => setIsHover(null)}
            sx={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "13px",
              border: `2px solid ${theme.palette.primary.dark}`,
              backgroundColor: isHover === index ? theme.palette.primary.dark : "initial",
              color: isHover === index ? "F9FAFF" : theme.palette.primary.dark,
              margin: "0px 5px",
            }}
          >
            {cloneElement(item.icon, {
              sx: {
                color: isHover === index ? "#F9FAFF" : theme.palette.primary.dark,
                
              },
            })}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

export default Header