import React from 'react'
import { useState } from 'react';
import { MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { Divider, Box } from '@mui/material';
import theme from '../../../../theme';

const MenuPage = ({ menu, icon, link, selected, setSelected }) => {
  const [isHover, setIsHover] = useState(true)

  const handleActive = () => {
    setSelected(link)
    console.log(`Menu: ${menu}, Link: ${link}, Active: ${selected}`);
  }

  const menuItemStyle = {
    width: selected === link ? "200px " : !isHover ? "auto" : "auto",
    padding: '30px 20px',
    marginLeft: selected === link ? "8px" : 0,
    margin: "2px 0px",
    position: 'relative',
    backgroundColor: selected === link ? "#FFFFFF" : !isHover ? "#FDFDFF" : "#F9FAFF",
    color: selected === link ? theme.palette.primary.light : theme.palette.primary.dark,
    borderRadius: selected === link ? '10px' : '0',
    fontSize: "14px"
  };

  return (
    <MenuItem
      onClick={(handleActive)}
      active={selected === link}
      component={<Link to={link} />}
      onMouseEnter={() => setIsHover(false)}
      onMouseLeave={() => setIsHover(true)}
      style={menuItemStyle}>
      <Box sx={{
        display: "flex",
        borderWidth: 1,
        gap: 2
      }}>
        {icon}
        {menu}
      </Box>
      {!isHover && (
        <Divider
          orientation="vertical"
          sx={{
            position: 'absolute',
            right: 20,
            bottom: 15,
            borderRadius: '5px',
            border: `1px solid ${theme.palette.primary.light}`,
            height: "30px"
          }}
        />
      )}
    </MenuItem>
  )
}

export default MenuPage