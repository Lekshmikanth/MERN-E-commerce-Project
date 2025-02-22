import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewPage = () => {
    const navigate = useNavigate();
  return (
    <>
        <Box>New Page</Box>
        <Button onClick={() => navigate("view")}>Button</Button>
    </>
  )
}

export default NewPage