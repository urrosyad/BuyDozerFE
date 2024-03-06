import React from 'react'
import { useState } from 'react';
import { MenuItem } from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { Divider, Box } from '@mui/material';
import theme from '../../theme';

const MenuPage = ({menu, icon, link, seleceted, setSelected}) => {
    const [isHover, setIsHover] = useState(true)
    
    return(
              <MenuItem
                onClick={() => setSelected(menu)}
                active={seleceted === menu}
                component={<Link to={link}/>}
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
                style={{
                  padding: '30px 20px',
                  position: 'relative',
                  backgroundColor: !isHover ? theme.palette.primary.text : 'initial',
                  color: !isHover ? theme.palette.primary.light : "black",
                  borderRadius: !isHover ? '10px' : '0',
                }}>
                <Box component={"div"} sx={{display: "flex",borderWidth: 1,gap: 2,}}>
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