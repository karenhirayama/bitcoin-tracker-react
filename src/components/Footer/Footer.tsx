import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      mt={8}
      mb={4}
      sx={{
        width: '80%',
      }}
    >
      <Typography
        sx={{
          [theme.breakpoints.down(600)]: {
            fontSize: 10
          }
        }}
      >
        Disclaimer: Trading in cryptocurrencies involves a high level of risk and can lead to the total loss of the capital invested. None of the information contained herein should be construed as investment advice.
      </Typography>
    </Box>
  )
}
