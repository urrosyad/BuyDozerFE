import { Box } from "@mui/material"
import { flexCenter } from '@themes/commonStyles'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import error401 from "@assets/error401.png"
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'

const UnauthorizedPage = () => {
  const navigate = useNavigate()
  const { logoutAuth } = useAuth()

  return (
    <Box sx={{...flexCenter, flexDirection: "column", width:"100%", height:"100%", }}>
      <img src={error401} style={{width:"80%", height:"100%", zIndex:0}} />
      <Box sx={{...flexCenter, width:"10%", mr:8, mt:-41, zIndex:1}}>
      <ButtonContained
        onClick={logoutAuth()}
        text={"LOGIN AGAIN"}
        primaryColor={"#D9D630"}
        secondColor={"#193D71"}
        hoverColor={"#215093"}
        width={"100%"}
        height={"40px"}
        fz={"14px"}
        />
        </Box>

    </Box>
  )
}

export default UnauthorizedPage