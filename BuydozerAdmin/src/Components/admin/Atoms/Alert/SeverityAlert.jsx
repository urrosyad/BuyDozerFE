import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material'

const SeverityAlert = (props) => {
  const { severity, message } = props
  const [showAlert, setShowAlert] = useState(true)
  const duration = 3000
  
  useEffect(() => {
          const timer = setTimeout(() => {
            setShowAlert(false);
          }, duration);
      
          return () => clearTimeout(timer);
        }, [duration]);

  return (
          <>
          {showAlert && <Alert severity={severity} sx={{p:"10px", mb:"20px"}}>
          {message}
          </Alert>}
          </>
  )
}

export default SeverityAlert