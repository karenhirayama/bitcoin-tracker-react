import { Box, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Box
      mt={8}
      mb={4}
      sx={{
        width: '80%',

      }}
    >
      <Typography>
      Disclaimer: Trading in cryptocurrencies involves a high level of risk and can lead to the total loss of the capital invested. None of the information contained herein should be construed as investment advice.
      </Typography>
    </Box>
  )
}
