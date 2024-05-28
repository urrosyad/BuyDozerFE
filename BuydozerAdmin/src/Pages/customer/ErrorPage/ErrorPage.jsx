import { Box, Typography } from '@mui/material'
import { Home } from '@mui/icons-material'
import { flexCenter } from '@themes/commonStyles'
import ButtonContained from '@components/customer/Atoms/Button/ButtonContained'
import { useNavigate } from 'react-router-dom'
import error404 from '@assets/error404.png'


const ErrorPage = () => {
  const navigate = useNavigate()
  const role = localStorage.getItem("UserRole")
  console.log({role});

  const handleNavigate = () => {
    {role === "1999" 
      ? navigate("/admin/dashboard") 
      : navigate("/")
    }
  }


  return (
    <Box sx={{...flexCenter, flexDirection: "column", width:"100%", height:"100%", }}>
      <img src={error404} style={{width:"80%", height:"100%"}} />
      <Box sx={{...flexCenter, width:"15%", mr:"30px",mt:-18}}>
      <ButtonContained
        onClick={handleNavigate}
        text={
          <>
            { role === "1999" 
            ? (
              "Kembali ke Dasboard"
            ) : (
              <>
              <Home fontSize='small' sx={{m:"2px"}}/>
              Kembali ke beranda
              </>
            )
            }
          </>
        }
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

export default ErrorPage